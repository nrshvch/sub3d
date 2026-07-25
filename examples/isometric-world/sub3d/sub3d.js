const wd = {
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
var bd = xE.prototype;
bd.scene = null;
bd.time = null;
bd.tickRegister = function(n) {
  n._tickerIndex === void 0 && (n._tickerIndex = this.list.length, this.list.push(n));
};
bd.tickUnregister = function(n) {
  const l = n._tickerIndex;
  if (l === void 0) return;
  const s = this.list.pop();
  s !== n && (this.list[l] = s, s._tickerIndex = l), n._tickerIndex = void 0;
};
bd.update = function(n) {
  const l = this.list;
  for (let s = 0; s < l.length; s++)
    l[s].tick(n);
};
bd.tick = function() {
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
function cr() {
}
var Dy = cr.prototype;
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
  var p = l[0], h = l[1], y = l[2], v = l[3], C = l[4], E = l[5], T = l[6], b = l[7], R = l[8], D = l[9], O = l[10], L = l[11], U = l[12], j = l[13], X = l[14], J = l[15], B = s[0], ee = s[1], q = s[2], re = s[3];
  return n[0] = B * p + ee * C + q * R + re * U, n[1] = B * h + ee * E + q * D + re * j, n[2] = B * y + ee * T + q * O + re * X, n[3] = B * v + ee * b + q * L + re * J, B = s[4], ee = s[5], q = s[6], re = s[7], n[4] = B * p + ee * C + q * R + re * U, n[5] = B * h + ee * E + q * D + re * j, n[6] = B * y + ee * T + q * O + re * X, n[7] = B * v + ee * b + q * L + re * J, B = s[8], ee = s[9], q = s[10], re = s[11], n[8] = B * p + ee * C + q * R + re * U, n[9] = B * h + ee * E + q * D + re * j, n[10] = B * y + ee * T + q * O + re * X, n[11] = B * v + ee * b + q * L + re * J, B = s[12], ee = s[13], q = s[14], re = s[15], n[12] = B * p + ee * C + q * R + re * U, n[13] = B * h + ee * E + q * D + re * j, n[14] = B * y + ee * T + q * O + re * X, n[15] = B * v + ee * b + q * L + re * J, n;
}
var ct = 1e-6, xn = typeof Float32Array < "u" ? Float32Array : Array, uo = Math.random, CE = "zyx";
function qo(n) {
  return n >= 0 ? Math.round(n) : n % 0.5 === 0 ? Math.floor(n) : Math.round(n);
}
function O_(n) {
  xn = n;
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
    return xn;
  },
  EPSILON: ct,
  RANDOM: uo,
  equals: U_,
  round: qo,
  setMatrixArrayType: O_,
  toDegree: N_,
  toRadian: A_
}, Symbol.toStringTag, { value: "Module" }));
function F_() {
  var n = new xn(4);
  return xn != Float32Array && (n[1] = 0, n[2] = 0), n[0] = 1, n[3] = 1, n;
}
function P_(n) {
  var l = new xn(4);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l;
}
function H_(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n;
}
function $_(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function V_(n, l, s, p) {
  var h = new xn(4);
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
  var p = l[0], h = l[1], y = l[2], v = l[3], C = s[0], E = s[1], T = s[2], b = s[3];
  return n[0] = p * C + y * E, n[1] = h * C + v * E, n[2] = p * T + y * b, n[3] = h * T + v * b, n;
}
function Q_(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = Math.sin(s), E = Math.cos(s);
  return n[0] = p * E + y * C, n[1] = h * E + v * C, n[2] = p * -C + y * E, n[3] = h * -C + v * E, n;
}
function G_(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = s[0], E = s[1];
  return n[0] = p * C, n[1] = h * C, n[2] = y * E, n[3] = v * E, n;
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
  var s = n[0], p = n[1], h = n[2], y = n[3], v = l[0], C = l[1], E = l[2], T = l[3];
  return Math.abs(s - v) <= ct * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(p - C) <= ct * Math.max(1, Math.abs(p), Math.abs(C)) && Math.abs(h - E) <= ct * Math.max(1, Math.abs(h), Math.abs(E)) && Math.abs(y - T) <= ct * Math.max(1, Math.abs(y), Math.abs(T));
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
  var n = new xn(6);
  return xn != Float32Array && (n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0), n[0] = 1, n[3] = 1, n;
}
function ck(n) {
  var l = new xn(6);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l;
}
function fk(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n;
}
function dk(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function pk(n, l, s, p, h, y) {
  var v = new xn(6);
  return v[0] = n, v[1] = l, v[2] = s, v[3] = p, v[4] = h, v[5] = y, v;
}
function vk(n, l, s, p, h, y, v) {
  return n[0] = l, n[1] = s, n[2] = p, n[3] = h, n[4] = y, n[5] = v, n;
}
function hk(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], C = l[5], E = s * y - p * h;
  return E ? (E = 1 / E, n[0] = y * E, n[1] = -p * E, n[2] = -h * E, n[3] = s * E, n[4] = (h * C - y * v) * E, n[5] = (p * v - s * C) * E, n) : null;
}
function mk(n) {
  return n[0] * n[3] - n[1] * n[2];
}
function RE(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = l[4], E = l[5], T = s[0], b = s[1], R = s[2], D = s[3], O = s[4], L = s[5];
  return n[0] = p * T + y * b, n[1] = h * T + v * b, n[2] = p * R + y * D, n[3] = h * R + v * D, n[4] = p * O + y * L + C, n[5] = h * O + v * L + E, n;
}
function yk(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = l[4], E = l[5], T = Math.sin(s), b = Math.cos(s);
  return n[0] = p * b + y * T, n[1] = h * b + v * T, n[2] = p * -T + y * b, n[3] = h * -T + v * b, n[4] = C, n[5] = E, n;
}
function gk(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = l[4], E = l[5], T = s[0], b = s[1];
  return n[0] = p * T, n[1] = h * T, n[2] = y * b, n[3] = v * b, n[4] = C, n[5] = E, n;
}
function Sk(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = l[4], E = l[5], T = s[0], b = s[1];
  return n[0] = p, n[1] = h, n[2] = y, n[3] = v, n[4] = p * T + y * b + C, n[5] = h * T + v * b + E, n;
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
  var s = n[0], p = n[1], h = n[2], y = n[3], v = n[4], C = n[5], E = l[0], T = l[1], b = l[2], R = l[3], D = l[4], O = l[5];
  return Math.abs(s - E) <= ct * Math.max(1, Math.abs(s), Math.abs(E)) && Math.abs(p - T) <= ct * Math.max(1, Math.abs(p), Math.abs(T)) && Math.abs(h - b) <= ct * Math.max(1, Math.abs(h), Math.abs(b)) && Math.abs(y - R) <= ct * Math.max(1, Math.abs(y), Math.abs(R)) && Math.abs(v - D) <= ct * Math.max(1, Math.abs(v), Math.abs(D)) && Math.abs(C - O) <= ct * Math.max(1, Math.abs(C), Math.abs(O));
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
  var n = new xn(9);
  return xn != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[0] = 1, n[4] = 1, n[8] = 1, n;
}
function Lk(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[4], n[4] = l[5], n[5] = l[6], n[6] = l[8], n[7] = l[9], n[8] = l[10], n;
}
function Ak(n) {
  var l = new xn(9);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l[6] = n[6], l[7] = n[7], l[8] = n[8], l;
}
function Nk(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n[8] = l[8], n;
}
function Uk(n, l, s, p, h, y, v, C, E) {
  var T = new xn(9);
  return T[0] = n, T[1] = l, T[2] = s, T[3] = p, T[4] = h, T[5] = y, T[6] = v, T[7] = C, T[8] = E, T;
}
function jk(n, l, s, p, h, y, v, C, E, T) {
  return n[0] = l, n[1] = s, n[2] = p, n[3] = h, n[4] = y, n[5] = v, n[6] = C, n[7] = E, n[8] = T, n;
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
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], C = l[5], E = l[6], T = l[7], b = l[8], R = b * v - C * T, D = -b * y + C * E, O = T * y - v * E, L = s * R + p * D + h * O;
  return L ? (L = 1 / L, n[0] = R * L, n[1] = (-b * p + h * T) * L, n[2] = (C * p - h * v) * L, n[3] = D * L, n[4] = (b * s - h * E) * L, n[5] = (-C * s + h * y) * L, n[6] = O * L, n[7] = (-T * s + p * E) * L, n[8] = (v * s - p * y) * L, n) : null;
}
function $k(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], C = l[5], E = l[6], T = l[7], b = l[8];
  return n[0] = v * b - C * T, n[1] = h * T - p * b, n[2] = p * C - h * v, n[3] = C * E - y * b, n[4] = s * b - h * E, n[5] = h * y - s * C, n[6] = y * T - v * E, n[7] = p * E - s * T, n[8] = s * v - p * y, n;
}
function Vk(n) {
  var l = n[0], s = n[1], p = n[2], h = n[3], y = n[4], v = n[5], C = n[6], E = n[7], T = n[8];
  return l * (T * y - v * E) + s * (-T * h + v * C) + p * (E * h - y * C);
}
function _E(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = l[4], E = l[5], T = l[6], b = l[7], R = l[8], D = s[0], O = s[1], L = s[2], U = s[3], j = s[4], X = s[5], J = s[6], B = s[7], ee = s[8];
  return n[0] = D * p + O * v + L * T, n[1] = D * h + O * C + L * b, n[2] = D * y + O * E + L * R, n[3] = U * p + j * v + X * T, n[4] = U * h + j * C + X * b, n[5] = U * y + j * E + X * R, n[6] = J * p + B * v + ee * T, n[7] = J * h + B * C + ee * b, n[8] = J * y + B * E + ee * R, n;
}
function Ik(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = l[4], E = l[5], T = l[6], b = l[7], R = l[8], D = s[0], O = s[1];
  return n[0] = p, n[1] = h, n[2] = y, n[3] = v, n[4] = C, n[5] = E, n[6] = D * p + O * v + T, n[7] = D * h + O * C + b, n[8] = D * y + O * E + R, n;
}
function Bk(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = l[4], E = l[5], T = l[6], b = l[7], R = l[8], D = Math.sin(s), O = Math.cos(s);
  return n[0] = O * p + D * v, n[1] = O * h + D * C, n[2] = O * y + D * E, n[3] = O * v - D * p, n[4] = O * C - D * h, n[5] = O * E - D * y, n[6] = T, n[7] = b, n[8] = R, n;
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
  var s = l[0], p = l[1], h = l[2], y = l[3], v = s + s, C = p + p, E = h + h, T = s * v, b = p * v, R = p * C, D = h * v, O = h * C, L = h * E, U = y * v, j = y * C, X = y * E;
  return n[0] = 1 - R - L, n[3] = b - X, n[6] = D + j, n[1] = b + X, n[4] = 1 - T - L, n[7] = O - U, n[2] = D - j, n[5] = O + U, n[8] = 1 - T - R, n;
}
function Kk(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], C = l[5], E = l[6], T = l[7], b = l[8], R = l[9], D = l[10], O = l[11], L = l[12], U = l[13], j = l[14], X = l[15], J = s * C - p * v, B = s * E - h * v, ee = s * T - y * v, q = p * E - h * C, re = p * T - y * C, pe = h * T - y * E, ze = b * U - R * L, he = b * j - D * L, le = b * X - O * L, Oe = R * j - D * U, Re = R * X - O * U, fe = D * X - O * j, ye = J * fe - B * Re + ee * Oe + q * le - re * he + pe * ze;
  return ye ? (ye = 1 / ye, n[0] = (C * fe - E * Re + T * Oe) * ye, n[1] = (E * le - v * fe - T * he) * ye, n[2] = (v * Re - C * le + T * ze) * ye, n[3] = (h * Re - p * fe - y * Oe) * ye, n[4] = (s * fe - h * le + y * he) * ye, n[5] = (p * le - s * Re - y * ze) * ye, n[6] = (U * pe - j * re + X * q) * ye, n[7] = (j * ee - L * pe - X * B) * ye, n[8] = (L * re - U * ee + X * J) * ye, n) : null;
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
  var s = n[0], p = n[1], h = n[2], y = n[3], v = n[4], C = n[5], E = n[6], T = n[7], b = n[8], R = l[0], D = l[1], O = l[2], L = l[3], U = l[4], j = l[5], X = l[6], J = l[7], B = l[8];
  return Math.abs(s - R) <= ct * Math.max(1, Math.abs(s), Math.abs(R)) && Math.abs(p - D) <= ct * Math.max(1, Math.abs(p), Math.abs(D)) && Math.abs(h - O) <= ct * Math.max(1, Math.abs(h), Math.abs(O)) && Math.abs(y - L) <= ct * Math.max(1, Math.abs(y), Math.abs(L)) && Math.abs(v - U) <= ct * Math.max(1, Math.abs(v), Math.abs(U)) && Math.abs(C - j) <= ct * Math.max(1, Math.abs(C), Math.abs(j)) && Math.abs(E - X) <= ct * Math.max(1, Math.abs(E), Math.abs(X)) && Math.abs(T - J) <= ct * Math.max(1, Math.abs(T), Math.abs(J)) && Math.abs(b - B) <= ct * Math.max(1, Math.abs(b), Math.abs(B));
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
  var n = new xn(16);
  return xn != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0), n[0] = 1, n[5] = 1, n[10] = 1, n[15] = 1, n;
}
function cD(n) {
  var l = new xn(16);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l[6] = n[6], l[7] = n[7], l[8] = n[8], l[9] = n[9], l[10] = n[10], l[11] = n[11], l[12] = n[12], l[13] = n[13], l[14] = n[14], l[15] = n[15], l;
}
function fD(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n[8] = l[8], n[9] = l[9], n[10] = l[10], n[11] = l[11], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15], n;
}
function dD(n, l, s, p, h, y, v, C, E, T, b, R, D, O, L, U) {
  var j = new xn(16);
  return j[0] = n, j[1] = l, j[2] = s, j[3] = p, j[4] = h, j[5] = y, j[6] = v, j[7] = C, j[8] = E, j[9] = T, j[10] = b, j[11] = R, j[12] = D, j[13] = O, j[14] = L, j[15] = U, j;
}
function pD(n, l, s, p, h, y, v, C, E, T, b, R, D, O, L, U, j) {
  return n[0] = l, n[1] = s, n[2] = p, n[3] = h, n[4] = y, n[5] = v, n[6] = C, n[7] = E, n[8] = T, n[9] = b, n[10] = R, n[11] = D, n[12] = O, n[13] = L, n[14] = U, n[15] = j, n;
}
function iS(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function vD(n, l) {
  if (n === l) {
    var s = l[1], p = l[2], h = l[3], y = l[6], v = l[7], C = l[11];
    n[1] = l[4], n[2] = l[8], n[3] = l[12], n[4] = s, n[6] = l[9], n[7] = l[13], n[8] = p, n[9] = y, n[11] = l[14], n[12] = h, n[13] = v, n[14] = C;
  } else
    n[0] = l[0], n[1] = l[4], n[2] = l[8], n[3] = l[12], n[4] = l[1], n[5] = l[5], n[6] = l[9], n[7] = l[13], n[8] = l[2], n[9] = l[6], n[10] = l[10], n[11] = l[14], n[12] = l[3], n[13] = l[7], n[14] = l[11], n[15] = l[15];
  return n;
}
function DE(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], C = l[5], E = l[6], T = l[7], b = l[8], R = l[9], D = l[10], O = l[11], L = l[12], U = l[13], j = l[14], X = l[15], J = s * C - p * v, B = s * E - h * v, ee = s * T - y * v, q = p * E - h * C, re = p * T - y * C, pe = h * T - y * E, ze = b * U - R * L, he = b * j - D * L, le = b * X - O * L, Oe = R * j - D * U, Re = R * X - O * U, fe = D * X - O * j, ye = J * fe - B * Re + ee * Oe + q * le - re * he + pe * ze;
  return ye ? (ye = 1 / ye, n[0] = (C * fe - E * Re + T * Oe) * ye, n[1] = (h * Re - p * fe - y * Oe) * ye, n[2] = (U * pe - j * re + X * q) * ye, n[3] = (D * re - R * pe - O * q) * ye, n[4] = (E * le - v * fe - T * he) * ye, n[5] = (s * fe - h * le + y * he) * ye, n[6] = (j * ee - L * pe - X * B) * ye, n[7] = (b * pe - D * ee + O * B) * ye, n[8] = (v * Re - C * le + T * ze) * ye, n[9] = (p * le - s * Re - y * ze) * ye, n[10] = (L * re - U * ee + X * J) * ye, n[11] = (R * ee - b * re - O * J) * ye, n[12] = (C * he - v * Oe - E * ze) * ye, n[13] = (s * Oe - p * he + h * ze) * ye, n[14] = (U * B - L * q - j * J) * ye, n[15] = (b * q - R * B + D * J) * ye, n) : null;
}
function hD(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = l[4], C = l[5], E = l[6], T = l[7], b = l[8], R = l[9], D = l[10], O = l[11], L = l[12], U = l[13], j = l[14], X = l[15], J = s * C - p * v, B = s * E - h * v, ee = s * T - y * v, q = p * E - h * C, re = p * T - y * C, pe = h * T - y * E, ze = b * U - R * L, he = b * j - D * L, le = b * X - O * L, Oe = R * j - D * U, Re = R * X - O * U, fe = D * X - O * j;
  return n[0] = C * fe - E * Re + T * Oe, n[1] = h * Re - p * fe - y * Oe, n[2] = U * pe - j * re + X * q, n[3] = D * re - R * pe - O * q, n[4] = E * le - v * fe - T * he, n[5] = s * fe - h * le + y * he, n[6] = j * ee - L * pe - X * B, n[7] = b * pe - D * ee + O * B, n[8] = v * Re - C * le + T * ze, n[9] = p * le - s * Re - y * ze, n[10] = L * re - U * ee + X * J, n[11] = R * ee - b * re - O * J, n[12] = C * he - v * Oe - E * ze, n[13] = s * Oe - p * he + h * ze, n[14] = U * B - L * q - j * J, n[15] = b * q - R * B + D * J, n;
}
function mD(n) {
  var l = n[0], s = n[1], p = n[2], h = n[3], y = n[4], v = n[5], C = n[6], E = n[7], T = n[8], b = n[9], R = n[10], D = n[11], O = n[12], L = n[13], U = n[14], j = n[15], X = l * v - s * y, J = l * C - p * y, B = s * C - p * v, ee = T * L - b * O, q = T * U - R * O, re = b * U - R * L, pe = l * re - s * q + p * ee, ze = y * re - v * q + C * ee, he = T * B - b * J + R * X, le = O * B - L * J + U * X;
  return E * pe - h * ze + j * he - D * le;
}
function OE(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = l[4], E = l[5], T = l[6], b = l[7], R = l[8], D = l[9], O = l[10], L = l[11], U = l[12], j = l[13], X = l[14], J = l[15], B = s[0], ee = s[1], q = s[2], re = s[3];
  return n[0] = B * p + ee * C + q * R + re * U, n[1] = B * h + ee * E + q * D + re * j, n[2] = B * y + ee * T + q * O + re * X, n[3] = B * v + ee * b + q * L + re * J, B = s[4], ee = s[5], q = s[6], re = s[7], n[4] = B * p + ee * C + q * R + re * U, n[5] = B * h + ee * E + q * D + re * j, n[6] = B * y + ee * T + q * O + re * X, n[7] = B * v + ee * b + q * L + re * J, B = s[8], ee = s[9], q = s[10], re = s[11], n[8] = B * p + ee * C + q * R + re * U, n[9] = B * h + ee * E + q * D + re * j, n[10] = B * y + ee * T + q * O + re * X, n[11] = B * v + ee * b + q * L + re * J, B = s[12], ee = s[13], q = s[14], re = s[15], n[12] = B * p + ee * C + q * R + re * U, n[13] = B * h + ee * E + q * D + re * j, n[14] = B * y + ee * T + q * O + re * X, n[15] = B * v + ee * b + q * L + re * J, n;
}
function nS(n, l, s) {
  var p = s[0], h = s[1], y = s[2], v, C, E, T, b, R, D, O, L, U, j, X;
  return l === n ? (n[12] = l[0] * p + l[4] * h + l[8] * y + l[12], n[13] = l[1] * p + l[5] * h + l[9] * y + l[13], n[14] = l[2] * p + l[6] * h + l[10] * y + l[14], n[15] = l[3] * p + l[7] * h + l[11] * y + l[15]) : (v = l[0], C = l[1], E = l[2], T = l[3], b = l[4], R = l[5], D = l[6], O = l[7], L = l[8], U = l[9], j = l[10], X = l[11], n[0] = v, n[1] = C, n[2] = E, n[3] = T, n[4] = b, n[5] = R, n[6] = D, n[7] = O, n[8] = L, n[9] = U, n[10] = j, n[11] = X, n[12] = v * p + b * h + L * y + l[12], n[13] = C * p + R * h + U * y + l[13], n[14] = E * p + D * h + j * y + l[14], n[15] = T * p + O * h + X * y + l[15]), n;
}
function zE(n, l, s) {
  var p = s[0], h = s[1], y = s[2];
  return n[0] = l[0] * p, n[1] = l[1] * p, n[2] = l[2] * p, n[3] = l[3] * p, n[4] = l[4] * h, n[5] = l[5] * h, n[6] = l[6] * h, n[7] = l[7] * h, n[8] = l[8] * y, n[9] = l[9] * y, n[10] = l[10] * y, n[11] = l[11] * y, n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15], n;
}
function yD(n, l, s, p) {
  var h = p[0], y = p[1], v = p[2], C = Math.sqrt(h * h + y * y + v * v), E, T, b, R, D, O, L, U, j, X, J, B, ee, q, re, pe, ze, he, le, Oe, Re, fe, ye, Fe;
  return C < ct ? null : (C = 1 / C, h *= C, y *= C, v *= C, E = Math.sin(s), T = Math.cos(s), b = 1 - T, R = l[0], D = l[1], O = l[2], L = l[3], U = l[4], j = l[5], X = l[6], J = l[7], B = l[8], ee = l[9], q = l[10], re = l[11], pe = h * h * b + T, ze = y * h * b + v * E, he = v * h * b - y * E, le = h * y * b - v * E, Oe = y * y * b + T, Re = v * y * b + h * E, fe = h * v * b + y * E, ye = y * v * b - h * E, Fe = v * v * b + T, n[0] = R * pe + U * ze + B * he, n[1] = D * pe + j * ze + ee * he, n[2] = O * pe + X * ze + q * he, n[3] = L * pe + J * ze + re * he, n[4] = R * le + U * Oe + B * Re, n[5] = D * le + j * Oe + ee * Re, n[6] = O * le + X * Oe + q * Re, n[7] = L * le + J * Oe + re * Re, n[8] = R * fe + U * ye + B * Fe, n[9] = D * fe + j * ye + ee * Fe, n[10] = O * fe + X * ye + q * Fe, n[11] = L * fe + J * ye + re * Fe, l !== n && (n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n);
}
function gD(n, l, s) {
  var p = Math.sin(s), h = Math.cos(s), y = l[4], v = l[5], C = l[6], E = l[7], T = l[8], b = l[9], R = l[10], D = l[11];
  return l !== n && (n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n[4] = y * h + T * p, n[5] = v * h + b * p, n[6] = C * h + R * p, n[7] = E * h + D * p, n[8] = T * h - y * p, n[9] = b * h - v * p, n[10] = R * h - C * p, n[11] = D * h - E * p, n;
}
function SD(n, l, s) {
  var p = Math.sin(s), h = Math.cos(s), y = l[0], v = l[1], C = l[2], E = l[3], T = l[8], b = l[9], R = l[10], D = l[11];
  return l !== n && (n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n[0] = y * h - T * p, n[1] = v * h - b * p, n[2] = C * h - R * p, n[3] = E * h - D * p, n[8] = y * p + T * h, n[9] = v * p + b * h, n[10] = C * p + R * h, n[11] = E * p + D * h, n;
}
function xD(n, l, s) {
  var p = Math.sin(s), h = Math.cos(s), y = l[0], v = l[1], C = l[2], E = l[3], T = l[4], b = l[5], R = l[6], D = l[7];
  return l !== n && (n[8] = l[8], n[9] = l[9], n[10] = l[10], n[11] = l[11], n[12] = l[12], n[13] = l[13], n[14] = l[14], n[15] = l[15]), n[0] = y * h + T * p, n[1] = v * h + b * p, n[2] = C * h + R * p, n[3] = E * h + D * p, n[4] = T * h - y * p, n[5] = b * h - v * p, n[6] = R * h - C * p, n[7] = D * h - E * p, n;
}
function ED(n, l) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = l[0], n[13] = l[1], n[14] = l[2], n[15] = 1, n;
}
function CD(n, l) {
  return n[0] = l[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = l[1], n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = l[2], n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function TD(n, l, s) {
  var p = s[0], h = s[1], y = s[2], v = Math.sqrt(p * p + h * h + y * y), C, E, T;
  return v < ct ? null : (v = 1 / v, p *= v, h *= v, y *= v, C = Math.sin(l), E = Math.cos(l), T = 1 - E, n[0] = p * p * T + E, n[1] = h * p * T + y * C, n[2] = y * p * T - h * C, n[3] = 0, n[4] = p * h * T - y * C, n[5] = h * h * T + E, n[6] = y * h * T + p * C, n[7] = 0, n[8] = p * y * T + h * C, n[9] = h * y * T - p * C, n[10] = y * y * T + E, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n);
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
  var p = l[0], h = l[1], y = l[2], v = l[3], C = p + p, E = h + h, T = y + y, b = p * C, R = p * E, D = p * T, O = h * E, L = h * T, U = y * T, j = v * C, X = v * E, J = v * T;
  return n[0] = 1 - (O + U), n[1] = R + J, n[2] = D - X, n[3] = 0, n[4] = R - J, n[5] = 1 - (b + U), n[6] = L + j, n[7] = 0, n[8] = D + X, n[9] = L - j, n[10] = 1 - (b + O), n[11] = 0, n[12] = s[0], n[13] = s[1], n[14] = s[2], n[15] = 1, n;
}
function MD(n, l) {
  var s = new xn(3), p = -l[0], h = -l[1], y = -l[2], v = l[3], C = l[4], E = l[5], T = l[6], b = l[7], R = p * p + h * h + y * y + v * v;
  return R > 0 ? (s[0] = (C * v + b * p + E * y - T * h) * 2 / R, s[1] = (E * v + b * h + T * p - C * y) * 2 / R, s[2] = (T * v + b * y + C * h - E * p) * 2 / R) : (s[0] = (C * v + b * p + E * y - T * h) * 2, s[1] = (E * v + b * h + T * p - C * y) * 2, s[2] = (T * v + b * y + C * h - E * p) * 2), LE(n, l, s), n;
}
function AE(n, l) {
  return n[0] = l[12], n[1] = l[13], n[2] = l[14], n;
}
function NE(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[4], v = l[5], C = l[6], E = l[8], T = l[9], b = l[10];
  return n[0] = Math.sqrt(s * s + p * p + h * h), n[1] = Math.sqrt(y * y + v * v + C * C), n[2] = Math.sqrt(E * E + T * T + b * b), n;
}
function UE(n, l) {
  var s = new xn(3);
  NE(s, l);
  var p = 1 / s[0], h = 1 / s[1], y = 1 / s[2], v = l[0] * p, C = l[1] * h, E = l[2] * y, T = l[4] * p, b = l[5] * h, R = l[6] * y, D = l[8] * p, O = l[9] * h, L = l[10] * y, U = v + b + L, j = 0;
  return U > 0 ? (j = Math.sqrt(U + 1) * 2, n[3] = 0.25 * j, n[0] = (R - O) / j, n[1] = (D - E) / j, n[2] = (C - T) / j) : v > b && v > L ? (j = Math.sqrt(1 + v - b - L) * 2, n[3] = (R - O) / j, n[0] = 0.25 * j, n[1] = (C + T) / j, n[2] = (D + E) / j) : b > L ? (j = Math.sqrt(1 + b - v - L) * 2, n[3] = (D - E) / j, n[0] = (C + T) / j, n[1] = 0.25 * j, n[2] = (R + O) / j) : (j = Math.sqrt(1 + L - v - b) * 2, n[3] = (C - T) / j, n[0] = (D + E) / j, n[1] = (R + O) / j, n[2] = 0.25 * j), n;
}
function _D(n, l, s, p) {
  l[0] = p[12], l[1] = p[13], l[2] = p[14];
  var h = p[0], y = p[1], v = p[2], C = p[4], E = p[5], T = p[6], b = p[8], R = p[9], D = p[10];
  s[0] = Math.sqrt(h * h + y * y + v * v), s[1] = Math.sqrt(C * C + E * E + T * T), s[2] = Math.sqrt(b * b + R * R + D * D);
  var O = 1 / s[0], L = 1 / s[1], U = 1 / s[2], j = h * O, X = y * L, J = v * U, B = C * O, ee = E * L, q = T * U, re = b * O, pe = R * L, ze = D * U, he = j + ee + ze, le = 0;
  return he > 0 ? (le = Math.sqrt(he + 1) * 2, n[3] = 0.25 * le, n[0] = (q - pe) / le, n[1] = (re - J) / le, n[2] = (X - B) / le) : j > ee && j > ze ? (le = Math.sqrt(1 + j - ee - ze) * 2, n[3] = (q - pe) / le, n[0] = 0.25 * le, n[1] = (X + B) / le, n[2] = (re + J) / le) : ee > ze ? (le = Math.sqrt(1 + ee - j - ze) * 2, n[3] = (re - J) / le, n[0] = (X + B) / le, n[1] = 0.25 * le, n[2] = (q + pe) / le) : (le = Math.sqrt(1 + ze - j - ee) * 2, n[3] = (X - B) / le, n[0] = (re + J) / le, n[1] = (q + pe) / le, n[2] = 0.25 * le), n;
}
function kD(n, l, s, p) {
  var h = l[0], y = l[1], v = l[2], C = l[3], E = h + h, T = y + y, b = v + v, R = h * E, D = h * T, O = h * b, L = y * T, U = y * b, j = v * b, X = C * E, J = C * T, B = C * b, ee = p[0], q = p[1], re = p[2];
  return n[0] = (1 - (L + j)) * ee, n[1] = (D + B) * ee, n[2] = (O - J) * ee, n[3] = 0, n[4] = (D - B) * q, n[5] = (1 - (R + j)) * q, n[6] = (U + X) * q, n[7] = 0, n[8] = (O + J) * re, n[9] = (U - X) * re, n[10] = (1 - (R + L)) * re, n[11] = 0, n[12] = s[0], n[13] = s[1], n[14] = s[2], n[15] = 1, n;
}
function DD(n, l, s, p, h) {
  var y = l[0], v = l[1], C = l[2], E = l[3], T = y + y, b = v + v, R = C + C, D = y * T, O = y * b, L = y * R, U = v * b, j = v * R, X = C * R, J = E * T, B = E * b, ee = E * R, q = p[0], re = p[1], pe = p[2], ze = h[0], he = h[1], le = h[2], Oe = (1 - (U + X)) * q, Re = (O + ee) * q, fe = (L - B) * q, ye = (O - ee) * re, Fe = (1 - (D + X)) * re, Ue = (j + J) * re, ge = (L + B) * pe, de = (j - J) * pe, Le = (1 - (D + U)) * pe;
  return n[0] = Oe, n[1] = Re, n[2] = fe, n[3] = 0, n[4] = ye, n[5] = Fe, n[6] = Ue, n[7] = 0, n[8] = ge, n[9] = de, n[10] = Le, n[11] = 0, n[12] = s[0] + ze - (Oe * ze + ye * he + ge * le), n[13] = s[1] + he - (Re * ze + Fe * he + de * le), n[14] = s[2] + le - (fe * ze + Ue * he + Le * le), n[15] = 1, n;
}
function OD(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = s + s, C = p + p, E = h + h, T = s * v, b = p * v, R = p * C, D = h * v, O = h * C, L = h * E, U = y * v, j = y * C, X = y * E;
  return n[0] = 1 - R - L, n[1] = b + X, n[2] = D - j, n[3] = 0, n[4] = b - X, n[5] = 1 - T - L, n[6] = O + U, n[7] = 0, n[8] = D + j, n[9] = O - U, n[10] = 1 - T - R, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function zD(n, l, s, p, h, y, v) {
  var C = 1 / (s - l), E = 1 / (h - p), T = 1 / (y - v);
  return n[0] = y * 2 * C, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = y * 2 * E, n[6] = 0, n[7] = 0, n[8] = (s + l) * C, n[9] = (h + p) * E, n[10] = (v + y) * T, n[11] = -1, n[12] = 0, n[13] = 0, n[14] = v * y * 2 * T, n[15] = 0, n;
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
  var h = Math.tan(l.upDegrees * Math.PI / 180), y = Math.tan(l.downDegrees * Math.PI / 180), v = Math.tan(l.leftDegrees * Math.PI / 180), C = Math.tan(l.rightDegrees * Math.PI / 180), E = 2 / (v + C), T = 2 / (h + y);
  return n[0] = E, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = T, n[6] = 0, n[7] = 0, n[8] = -((v - C) * E * 0.5), n[9] = (h - y) * T * 0.5, n[10] = p / (s - p), n[11] = -1, n[12] = 0, n[13] = 0, n[14] = p * s / (s - p), n[15] = 0, n;
}
function FE(n, l, s, p, h, y, v) {
  var C = 1 / (l - s), E = 1 / (p - h), T = 1 / (y - v);
  return n[0] = -2 * C, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * E, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 2 * T, n[11] = 0, n[12] = (l + s) * C, n[13] = (h + p) * E, n[14] = (v + y) * T, n[15] = 1, n;
}
var PE = FE;
function UD(n, l, s, p, h, y, v) {
  var C = 1 / (l - s), E = 1 / (p - h), T = 1 / (y - v);
  return n[0] = -2 * C, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * E, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = T, n[11] = 0, n[12] = (l + s) * C, n[13] = (h + p) * E, n[14] = y * T, n[15] = 1, n;
}
function jD(n, l, s, p) {
  var h, y, v, C, E, T, b, R, D, O, L = l[0], U = l[1], j = l[2], X = p[0], J = p[1], B = p[2], ee = s[0], q = s[1], re = s[2];
  return Math.abs(L - ee) < ct && Math.abs(U - q) < ct && Math.abs(j - re) < ct ? iS(n) : (b = L - ee, R = U - q, D = j - re, O = 1 / Math.sqrt(b * b + R * R + D * D), b *= O, R *= O, D *= O, h = J * D - B * R, y = B * b - X * D, v = X * R - J * b, O = Math.sqrt(h * h + y * y + v * v), O ? (O = 1 / O, h *= O, y *= O, v *= O) : (h = 0, y = 0, v = 0), C = R * v - D * y, E = D * h - b * v, T = b * y - R * h, O = Math.sqrt(C * C + E * E + T * T), O ? (O = 1 / O, C *= O, E *= O, T *= O) : (C = 0, E = 0, T = 0), n[0] = h, n[1] = C, n[2] = b, n[3] = 0, n[4] = y, n[5] = E, n[6] = R, n[7] = 0, n[8] = v, n[9] = T, n[10] = D, n[11] = 0, n[12] = -(h * L + y * U + v * j), n[13] = -(C * L + E * U + T * j), n[14] = -(b * L + R * U + D * j), n[15] = 1, n);
}
function FD(n, l, s, p) {
  var h = l[0], y = l[1], v = l[2], C = p[0], E = p[1], T = p[2], b = h - s[0], R = y - s[1], D = v - s[2], O = b * b + R * R + D * D;
  O > 0 && (O = 1 / Math.sqrt(O), b *= O, R *= O, D *= O);
  var L = E * D - T * R, U = T * b - C * D, j = C * R - E * b;
  return O = L * L + U * U + j * j, O > 0 && (O = 1 / Math.sqrt(O), L *= O, U *= O, j *= O), n[0] = L, n[1] = U, n[2] = j, n[3] = 0, n[4] = R * j - D * U, n[5] = D * L - b * j, n[6] = b * U - R * L, n[7] = 0, n[8] = b, n[9] = R, n[10] = D, n[11] = 0, n[12] = h, n[13] = y, n[14] = v, n[15] = 1, n;
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
  var s = n[0], p = n[1], h = n[2], y = n[3], v = n[4], C = n[5], E = n[6], T = n[7], b = n[8], R = n[9], D = n[10], O = n[11], L = n[12], U = n[13], j = n[14], X = n[15], J = l[0], B = l[1], ee = l[2], q = l[3], re = l[4], pe = l[5], ze = l[6], he = l[7], le = l[8], Oe = l[9], Re = l[10], fe = l[11], ye = l[12], Fe = l[13], Ue = l[14], ge = l[15];
  return Math.abs(s - J) <= ct * Math.max(1, Math.abs(s), Math.abs(J)) && Math.abs(p - B) <= ct * Math.max(1, Math.abs(p), Math.abs(B)) && Math.abs(h - ee) <= ct * Math.max(1, Math.abs(h), Math.abs(ee)) && Math.abs(y - q) <= ct * Math.max(1, Math.abs(y), Math.abs(q)) && Math.abs(v - re) <= ct * Math.max(1, Math.abs(v), Math.abs(re)) && Math.abs(C - pe) <= ct * Math.max(1, Math.abs(C), Math.abs(pe)) && Math.abs(E - ze) <= ct * Math.max(1, Math.abs(E), Math.abs(ze)) && Math.abs(T - he) <= ct * Math.max(1, Math.abs(T), Math.abs(he)) && Math.abs(b - le) <= ct * Math.max(1, Math.abs(b), Math.abs(le)) && Math.abs(R - Oe) <= ct * Math.max(1, Math.abs(R), Math.abs(Oe)) && Math.abs(D - Re) <= ct * Math.max(1, Math.abs(D), Math.abs(Re)) && Math.abs(O - fe) <= ct * Math.max(1, Math.abs(O), Math.abs(fe)) && Math.abs(L - ye) <= ct * Math.max(1, Math.abs(L), Math.abs(ye)) && Math.abs(U - Fe) <= ct * Math.max(1, Math.abs(U), Math.abs(Fe)) && Math.abs(j - Ue) <= ct * Math.max(1, Math.abs(j), Math.abs(Ue)) && Math.abs(X - ge) <= ct * Math.max(1, Math.abs(X), Math.abs(ge));
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
  var n = new xn(3);
  return xn != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n;
}
function QD(n) {
  var l = new xn(3);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l;
}
function VE(n) {
  var l = n[0], s = n[1], p = n[2];
  return Math.sqrt(l * l + s * s + p * p);
}
function rS(n, l, s) {
  var p = new xn(3);
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
  return n[0] = qo(l[0]), n[1] = qo(l[1]), n[2] = qo(l[2]), n;
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
function Ry(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = s[0], C = s[1], E = s[2];
  return n[0] = h * E - y * C, n[1] = y * v - p * E, n[2] = p * C - h * v, n;
}
function o5(n, l, s, p) {
  var h = l[0], y = l[1], v = l[2];
  return n[0] = h + p * (s[0] - h), n[1] = y + p * (s[1] - y), n[2] = v + p * (s[2] - v), n;
}
function u5(n, l, s, p) {
  var h = Math.acos(Math.min(Math.max(zy(l, s), -1), 1)), y = Math.sin(h), v = Math.sin((1 - p) * h) / y, C = Math.sin(p * h) / y;
  return n[0] = v * l[0] + C * s[0], n[1] = v * l[1] + C * s[1], n[2] = v * l[2] + C * s[2], n;
}
function s5(n, l, s, p, h, y) {
  var v = y * y, C = v * (2 * y - 3) + 1, E = v * (y - 2) + y, T = v * (y - 1), b = v * (3 - 2 * y);
  return n[0] = l[0] * C + s[0] * E + p[0] * T + h[0] * b, n[1] = l[1] * C + s[1] * E + p[1] * T + h[1] * b, n[2] = l[2] * C + s[2] * E + p[2] * T + h[2] * b, n;
}
function c5(n, l, s, p, h, y) {
  var v = 1 - y, C = v * v, E = y * y, T = C * v, b = 3 * y * C, R = 3 * E * v, D = E * y;
  return n[0] = l[0] * T + s[0] * b + p[0] * R + h[0] * D, n[1] = l[1] * T + s[1] * b + p[1] * R + h[1] * D, n[2] = l[2] * T + s[2] * b + p[2] * R + h[2] * D, n;
}
function f5(n, l) {
  l = l === void 0 ? 1 : l;
  var s = uo() * 2 * Math.PI, p = uo() * 2 - 1, h = Math.sqrt(1 - p * p) * l;
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
  var p = s[0], h = s[1], y = s[2], v = s[3], C = l[0], E = l[1], T = l[2], b = h * T - y * E, R = y * C - p * T, D = p * E - h * C;
  return b = b + b, R = R + R, D = D + D, n[0] = C + v * b + h * D - y * R, n[1] = E + v * R + y * b - p * D, n[2] = T + v * D + p * R - h * b, n;
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
  var s = n[0], p = n[1], h = n[2], y = l[0], v = l[1], C = l[2], E = Math.sqrt((s * s + p * p + h * h) * (y * y + v * v + C * C)), T = E && zy(n, l) / E;
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
  var s = n[0], p = n[1], h = n[2], y = l[0], v = l[1], C = l[2];
  return Math.abs(s - y) <= ct * Math.max(1, Math.abs(s), Math.abs(y)) && Math.abs(p - v) <= ct * Math.max(1, Math.abs(p), Math.abs(v)) && Math.abs(h - C) <= ct * Math.max(1, Math.abs(h), Math.abs(C));
}
var C5 = IE, T5 = BE, w5 = qE, R5 = YE, b5 = WE, KE = VE, M5 = QE, _5 = (function() {
  var n = lS();
  return function(l, s, p, h, y, v) {
    var C, E;
    for (s || (s = 3), p || (p = 0), h ? E = Math.min(h * s + p, l.length) : E = l.length, C = p; C < E; C += s)
      n[0] = l[C], n[1] = l[C + 1], n[2] = l[C + 2], y(n, n, v), l[C] = n[0], l[C + 1] = n[1], l[C + 2] = n[2];
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
  cross: Ry,
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
  var n = new xn(4);
  return xn != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0), n;
}
function JE(n) {
  var l = new xn(4);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l;
}
function eC(n, l, s, p) {
  var h = new xn(4);
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
  return n[0] = qo(l[0]), n[1] = qo(l[1]), n[2] = qo(l[2]), n[3] = qo(l[3]), n;
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
  var h = s[0] * p[1] - s[1] * p[0], y = s[0] * p[2] - s[2] * p[0], v = s[0] * p[3] - s[3] * p[0], C = s[1] * p[2] - s[2] * p[1], E = s[1] * p[3] - s[3] * p[1], T = s[2] * p[3] - s[3] * p[2], b = l[0], R = l[1], D = l[2], O = l[3];
  return n[0] = R * T - D * E + O * C, n[1] = -(b * T) + D * v - O * y, n[2] = b * E - R * v + O * h, n[3] = -(b * C) + R * y - D * h, n;
}
function fC(n, l, s, p) {
  var h = l[0], y = l[1], v = l[2], C = l[3];
  return n[0] = h + p * (s[0] - h), n[1] = y + p * (s[1] - y), n[2] = v + p * (s[2] - v), n[3] = C + p * (s[3] - C), n;
}
function P5(n, l) {
  l = l === void 0 ? 1 : l;
  var s, p, h, y, v, C, E;
  E = uo(), s = E * 2 - 1, p = (4 * uo() - 2) * Math.sqrt(E * -E + E), v = s * s + p * p, E = uo(), h = E * 2 - 1, y = (4 * uo() - 2) * Math.sqrt(E * -E + E), C = h * h + y * y;
  var T = Math.sqrt((1 - v) / C);
  return n[0] = l * s, n[1] = l * p, n[2] = l * h * T, n[3] = l * y * T, n;
}
function H5(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3];
  return n[0] = s[0] * p + s[4] * h + s[8] * y + s[12] * v, n[1] = s[1] * p + s[5] * h + s[9] * y + s[13] * v, n[2] = s[2] * p + s[6] * h + s[10] * y + s[14] * v, n[3] = s[3] * p + s[7] * h + s[11] * y + s[15] * v, n;
}
function $5(n, l, s) {
  var p = s[0], h = s[1], y = s[2], v = s[3], C = l[0], E = l[1], T = l[2], b = h * T - y * E, R = y * C - p * T, D = p * E - h * C;
  return b = b + b, R = R + R, D = D + D, n[0] = C + v * b + h * D - y * R, n[1] = E + v * R + y * b - p * D, n[2] = T + v * D + p * R - h * b, n[3] = l[3], n;
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
  var s = n[0], p = n[1], h = n[2], y = n[3], v = l[0], C = l[1], E = l[2], T = l[3];
  return Math.abs(s - v) <= ct * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(p - C) <= ct * Math.max(1, Math.abs(p), Math.abs(C)) && Math.abs(h - E) <= ct * Math.max(1, Math.abs(h), Math.abs(E)) && Math.abs(y - T) <= ct * Math.max(1, Math.abs(y), Math.abs(T));
}
var q5 = aC, Y5 = iC, W5 = lC, Q5 = uC, G5 = sC, X5 = oS, K5 = uS, Z5 = (function() {
  var n = ZE();
  return function(l, s, p, h, y, v) {
    var C, E;
    for (s || (s = 4), p || (p = 0), h ? E = Math.min(h * s + p, l.length) : E = l.length, C = p; C < E; C += s)
      n[0] = l[C], n[1] = l[C + 1], n[2] = l[C + 2], n[3] = l[C + 3], y(n, n, v), l[C] = n[0], l[C + 1] = n[1], l[C + 2] = n[2], l[C + 3] = n[3];
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
function My() {
  var n = new xn(4);
  return xn != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n[3] = 1, n;
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
  var p = l[0], h = l[1], y = l[2], v = l[3], C = s[0], E = s[1], T = s[2], b = s[3];
  return n[0] = p * b + v * C + h * T - y * E, n[1] = h * b + v * E + y * C - p * T, n[2] = y * b + v * T + p * E - h * C, n[3] = v * b - p * C - h * E - y * T, n;
}
function hC(n, l, s) {
  s *= 0.5;
  var p = l[0], h = l[1], y = l[2], v = l[3], C = Math.sin(s), E = Math.cos(s);
  return n[0] = p * E + v * C, n[1] = h * E + y * C, n[2] = y * E - h * C, n[3] = v * E - p * C, n;
}
function mC(n, l, s) {
  s *= 0.5;
  var p = l[0], h = l[1], y = l[2], v = l[3], C = Math.sin(s), E = Math.cos(s);
  return n[0] = p * E - y * C, n[1] = h * E + v * C, n[2] = y * E + p * C, n[3] = v * E - h * C, n;
}
function yC(n, l, s) {
  s *= 0.5;
  var p = l[0], h = l[1], y = l[2], v = l[3], C = Math.sin(s), E = Math.cos(s);
  return n[0] = p * E + h * C, n[1] = h * E - p * C, n[2] = y * E + v * C, n[3] = v * E - y * C, n;
}
function rO(n, l) {
  var s = l[0], p = l[1], h = l[2];
  return n[0] = s, n[1] = p, n[2] = h, n[3] = Math.sqrt(Math.abs(1 - s * s - p * p - h * h)), n;
}
function gC(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = Math.sqrt(s * s + p * p + h * h), C = Math.exp(y), E = v > 0 ? C * Math.sin(v) / v : 0;
  return n[0] = s * E, n[1] = p * E, n[2] = h * E, n[3] = C * Math.cos(v), n;
}
function SC(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = Math.sqrt(s * s + p * p + h * h), C = v > 0 ? Math.atan2(v, y) / v : 0;
  return n[0] = s * C, n[1] = p * C, n[2] = h * C, n[3] = 0.5 * Math.log(s * s + p * p + h * h + y * y), n;
}
function aO(n, l, s) {
  return SC(n, l), EC(n, n, s), gC(n, n), n;
}
function by(n, l, s, p) {
  var h = l[0], y = l[1], v = l[2], C = l[3], E = s[0], T = s[1], b = s[2], R = s[3], D, O, L, U, j;
  return O = h * E + y * T + v * b + C * R, O < 0 && (O = -O, E = -E, T = -T, b = -b, R = -R), 1 - O > ct ? (D = Math.acos(O), L = Math.sin(D), U = Math.sin((1 - p) * D) / L, j = Math.sin(p * D) / L) : (U = 1 - p, j = p), n[0] = U * h + j * E, n[1] = U * y + j * T, n[2] = U * v + j * b, n[3] = U * C + j * R, n;
}
function iO(n) {
  var l = uo(), s = uo(), p = uo(), h = Math.sqrt(1 - l), y = Math.sqrt(l);
  return n[0] = h * Math.sin(2 * Math.PI * s), n[1] = h * Math.cos(2 * Math.PI * s), n[2] = y * Math.sin(2 * Math.PI * p), n[3] = y * Math.cos(2 * Math.PI * p), n;
}
function lO(n, l) {
  var s = l[0], p = l[1], h = l[2], y = l[3], v = s * s + p * p + h * h + y * y, C = v ? 1 / v : 0;
  return n[0] = -s * C, n[1] = -p * C, n[2] = -h * C, n[3] = y * C, n;
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
  var v = Math.sin(l), C = Math.cos(l), E = Math.sin(s), T = Math.cos(s), b = Math.sin(p), R = Math.cos(p);
  switch (h) {
    case "xyz":
      n[0] = v * T * R + C * E * b, n[1] = C * E * R - v * T * b, n[2] = C * T * b + v * E * R, n[3] = C * T * R - v * E * b;
      break;
    case "xzy":
      n[0] = v * T * R - C * E * b, n[1] = C * E * R - v * T * b, n[2] = C * T * b + v * E * R, n[3] = C * T * R + v * E * b;
      break;
    case "yxz":
      n[0] = v * T * R + C * E * b, n[1] = C * E * R - v * T * b, n[2] = C * T * b - v * E * R, n[3] = C * T * R + v * E * b;
      break;
    case "yzx":
      n[0] = v * T * R + C * E * b, n[1] = C * E * R + v * T * b, n[2] = C * T * b - v * E * R, n[3] = C * T * R - v * E * b;
      break;
    case "zxy":
      n[0] = v * T * R - C * E * b, n[1] = C * E * R + v * T * b, n[2] = C * T * b + v * E * R, n[3] = C * T * R - v * E * b;
      break;
    case "zyx":
      n[0] = v * T * R - C * E * b, n[1] = C * E * R + v * T * b, n[2] = C * T * b - v * E * R, n[3] = C * T * R + v * E * b;
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
    return v < -0.999999 ? (Ry(n, l, h), KE(n) < 1e-6 && Ry(n, s, h), GE(n, n), pC(p, n, Math.PI), p) : v > 0.999999 ? (p[0] = 0, p[1] = 0, p[2] = 0, p[3] = 1, p) : (Ry(n, h, y), p[0] = n[0], p[1] = n[1], p[2] = n[2], p[3] = 1 + v, vS(p, p));
  };
})(), EO = (function() {
  var n = My(), l = My();
  return function(s, p, h, y, v, C) {
    return by(n, p, v, C), by(l, h, y, C), by(s, n, l, 2 * C * (1 - C)), s;
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
  create: My,
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
  slerp: by,
  sqlerp: EO,
  sqrLen: yO,
  squaredLength: pS,
  str: sO
}, Symbol.toStringTag, { value: "Module" }));
function wO() {
  var n = new xn(8);
  return xn != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[3] = 1, n;
}
function RO(n) {
  var l = new xn(8);
  return l[0] = n[0], l[1] = n[1], l[2] = n[2], l[3] = n[3], l[4] = n[4], l[5] = n[5], l[6] = n[6], l[7] = n[7], l;
}
function bO(n, l, s, p, h, y, v, C) {
  var E = new xn(8);
  return E[0] = n, E[1] = l, E[2] = s, E[3] = p, E[4] = h, E[5] = y, E[6] = v, E[7] = C, E;
}
function MO(n, l, s, p, h, y, v) {
  var C = new xn(8);
  C[0] = n, C[1] = l, C[2] = s, C[3] = p;
  var E = h * 0.5, T = y * 0.5, b = v * 0.5;
  return C[4] = E * p + T * s - b * l, C[5] = T * p + b * n - E * s, C[6] = b * p + E * l - T * n, C[7] = -E * n - T * l - b * s, C;
}
function CC(n, l, s) {
  var p = s[0] * 0.5, h = s[1] * 0.5, y = s[2] * 0.5, v = l[0], C = l[1], E = l[2], T = l[3];
  return n[0] = v, n[1] = C, n[2] = E, n[3] = T, n[4] = p * T + h * E - y * C, n[5] = h * T + y * v - p * E, n[6] = y * T + p * C - h * v, n[7] = -p * v - h * C - y * E, n;
}
function _O(n, l) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = l[0] * 0.5, n[5] = l[1] * 0.5, n[6] = l[2] * 0.5, n[7] = 0, n;
}
function kO(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function DO(n, l) {
  var s = My();
  UE(s, l);
  var p = new xn(3);
  return AE(p, l), CC(n, s, p), n;
}
function TC(n, l) {
  return n[0] = l[0], n[1] = l[1], n[2] = l[2], n[3] = l[3], n[4] = l[4], n[5] = l[5], n[6] = l[6], n[7] = l[7], n;
}
function OO(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function zO(n, l, s, p, h, y, v, C, E) {
  return n[0] = l, n[1] = s, n[2] = p, n[3] = h, n[4] = y, n[5] = v, n[6] = C, n[7] = E, n;
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
  var s = l[4], p = l[5], h = l[6], y = l[7], v = -l[0], C = -l[1], E = -l[2], T = l[3];
  return n[0] = (s * T + y * v + p * E - h * C) * 2, n[1] = (p * T + y * C + h * v - s * E) * 2, n[2] = (h * T + y * E + s * C - p * v) * 2, n;
}
function FO(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = s[0] * 0.5, E = s[1] * 0.5, T = s[2] * 0.5, b = l[4], R = l[5], D = l[6], O = l[7];
  return n[0] = p, n[1] = h, n[2] = y, n[3] = v, n[4] = v * C + h * T - y * E + b, n[5] = v * E + y * C - p * T + R, n[6] = v * T + p * E - h * C + D, n[7] = -p * C - h * E - y * T + O, n;
}
function PO(n, l, s) {
  var p = -l[0], h = -l[1], y = -l[2], v = l[3], C = l[4], E = l[5], T = l[6], b = l[7], R = C * v + b * p + E * y - T * h, D = E * v + b * h + T * p - C * y, O = T * v + b * y + C * h - E * p, L = b * v - C * p - E * h - T * y;
  return hC(n, l, s), p = n[0], h = n[1], y = n[2], v = n[3], n[4] = R * v + L * p + D * y - O * h, n[5] = D * v + L * h + O * p - R * y, n[6] = O * v + L * y + R * h - D * p, n[7] = L * v - R * p - D * h - O * y, n;
}
function HO(n, l, s) {
  var p = -l[0], h = -l[1], y = -l[2], v = l[3], C = l[4], E = l[5], T = l[6], b = l[7], R = C * v + b * p + E * y - T * h, D = E * v + b * h + T * p - C * y, O = T * v + b * y + C * h - E * p, L = b * v - C * p - E * h - T * y;
  return mC(n, l, s), p = n[0], h = n[1], y = n[2], v = n[3], n[4] = R * v + L * p + D * y - O * h, n[5] = D * v + L * h + O * p - R * y, n[6] = O * v + L * y + R * h - D * p, n[7] = L * v - R * p - D * h - O * y, n;
}
function $O(n, l, s) {
  var p = -l[0], h = -l[1], y = -l[2], v = l[3], C = l[4], E = l[5], T = l[6], b = l[7], R = C * v + b * p + E * y - T * h, D = E * v + b * h + T * p - C * y, O = T * v + b * y + C * h - E * p, L = b * v - C * p - E * h - T * y;
  return yC(n, l, s), p = n[0], h = n[1], y = n[2], v = n[3], n[4] = R * v + L * p + D * y - O * h, n[5] = D * v + L * h + O * p - R * y, n[6] = O * v + L * y + R * h - D * p, n[7] = L * v - R * p - D * h - O * y, n;
}
function VO(n, l, s) {
  var p = s[0], h = s[1], y = s[2], v = s[3], C = l[0], E = l[1], T = l[2], b = l[3];
  return n[0] = C * v + b * p + E * y - T * h, n[1] = E * v + b * h + T * p - C * y, n[2] = T * v + b * y + C * h - E * p, n[3] = b * v - C * p - E * h - T * y, C = l[4], E = l[5], T = l[6], b = l[7], n[4] = C * v + b * p + E * y - T * h, n[5] = E * v + b * h + T * p - C * y, n[6] = T * v + b * y + C * h - E * p, n[7] = b * v - C * p - E * h - T * y, n;
}
function IO(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = s[0], E = s[1], T = s[2], b = s[3];
  return n[0] = p * b + v * C + h * T - y * E, n[1] = h * b + v * E + y * C - p * T, n[2] = y * b + v * T + p * E - h * C, n[3] = v * b - p * C - h * E - y * T, C = s[4], E = s[5], T = s[6], b = s[7], n[4] = p * b + v * C + h * T - y * E, n[5] = h * b + v * E + y * C - p * T, n[6] = y * b + v * T + p * E - h * C, n[7] = v * b - p * C - h * E - y * T, n;
}
function BO(n, l, s, p) {
  if (Math.abs(p) < ct)
    return TC(n, l);
  var h = Math.sqrt(s[0] * s[0] + s[1] * s[1] + s[2] * s[2]);
  p = p * 0.5;
  var y = Math.sin(p), v = y * s[0] / h, C = y * s[1] / h, E = y * s[2] / h, T = Math.cos(p), b = l[0], R = l[1], D = l[2], O = l[3];
  n[0] = b * T + O * v + R * E - D * C, n[1] = R * T + O * C + D * v - b * E, n[2] = D * T + O * E + b * C - R * v, n[3] = O * T - b * v - R * C - D * E;
  var L = l[4], U = l[5], j = l[6], X = l[7];
  return n[4] = L * T + X * v + U * E - j * C, n[5] = U * T + X * C + j * v - L * E, n[6] = j * T + X * E + L * C - U * v, n[7] = X * T - L * v - U * C - j * E, n;
}
function qO(n, l, s) {
  return n[0] = l[0] + s[0], n[1] = l[1] + s[1], n[2] = l[2] + s[2], n[3] = l[3] + s[3], n[4] = l[4] + s[4], n[5] = l[5] + s[5], n[6] = l[6] + s[6], n[7] = l[7] + s[7], n;
}
function wC(n, l, s) {
  var p = l[0], h = l[1], y = l[2], v = l[3], C = s[4], E = s[5], T = s[6], b = s[7], R = l[4], D = l[5], O = l[6], L = l[7], U = s[0], j = s[1], X = s[2], J = s[3];
  return n[0] = p * J + v * U + h * X - y * j, n[1] = h * J + v * j + y * U - p * X, n[2] = y * J + v * X + p * j - h * U, n[3] = v * J - p * U - h * j - y * X, n[4] = p * b + v * C + h * T - y * E + R * J + L * U + D * X - O * j, n[5] = h * b + v * E + y * C - p * T + D * J + L * j + O * U - R * X, n[6] = y * b + v * T + p * E - h * C + O * J + L * X + R * j - D * U, n[7] = v * b - p * C - h * E - y * T + L * J - R * U - D * j - O * X, n;
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
    var p = l[0] / s, h = l[1] / s, y = l[2] / s, v = l[3] / s, C = l[4], E = l[5], T = l[6], b = l[7], R = p * C + h * E + y * T + v * b;
    n[0] = p, n[1] = h, n[2] = y, n[3] = v, n[4] = (C - p * R) / s, n[5] = (E - h * R) / s, n[6] = (T - y * R) / s, n[7] = (b - v * R) / s;
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
  var s = n[0], p = n[1], h = n[2], y = n[3], v = n[4], C = n[5], E = n[6], T = n[7], b = l[0], R = l[1], D = l[2], O = l[3], L = l[4], U = l[5], j = l[6], X = l[7];
  return Math.abs(s - b) <= ct * Math.max(1, Math.abs(s), Math.abs(b)) && Math.abs(p - R) <= ct * Math.max(1, Math.abs(p), Math.abs(R)) && Math.abs(h - D) <= ct * Math.max(1, Math.abs(h), Math.abs(D)) && Math.abs(y - O) <= ct * Math.max(1, Math.abs(y), Math.abs(O)) && Math.abs(v - L) <= ct * Math.max(1, Math.abs(v), Math.abs(L)) && Math.abs(C - U) <= ct * Math.max(1, Math.abs(C), Math.abs(U)) && Math.abs(E - j) <= ct * Math.max(1, Math.abs(E), Math.abs(j)) && Math.abs(T - X) <= ct * Math.max(1, Math.abs(T), Math.abs(X));
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
  var n = new xn(2);
  return xn != Float32Array && (n[0] = 0, n[1] = 0), n;
}
function az(n) {
  var l = new xn(2);
  return l[0] = n[0], l[1] = n[1], l;
}
function iz(n, l) {
  var s = new xn(2);
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
  return n[0] = qo(l[0]), n[1] = qo(l[1]), n;
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
  var s = uo() * 2 * Math.PI;
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
  var h = l[0] - s[0], y = l[1] - s[1], v = Math.sin(p), C = Math.cos(p);
  return n[0] = h * C - y * v + s[0], n[1] = h * v + y * C + s[1], n;
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
    var C, E;
    for (s || (s = 2), p || (p = 0), h ? E = Math.min(h * s + p, l.length) : E = l.length, C = p; C < E; C += s)
      n[0] = l[C], n[1] = l[C + 1], y(n, n, v), l[C] = n[0], l[C + 1] = n[1];
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
  cr.call(this), this.events = {
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
var pr = Ny.prototype = Object.create(cr.prototype), al = new Float32Array([0, 0, 0]), Ol = new Float32Array(16);
pr.constructor = Ny;
pr.local = null;
pr.worldMatrix = null;
pr.worldToLocal = null;
pr.children = null;
pr.parent = null;
pr.dirtyW = !0;
pr.dirtyL = !0;
pr.onParentUpdate = null;
pr.addChild = function(n) {
  this.children[this.children.length] = n, n.setParent(this);
};
pr.removeChild = function(n) {
  this.children.splice(this.children.indexOf(n), 1), n.removeParent();
};
pr.setParent = function(n) {
  this.parent = n, n.gameObject.world !== null && n.gameObject.world.addGameObject(this.gameObject);
};
pr.setGameObject = function(n) {
  cr.prototype.setGameObject.call(this, n), n.transform = this;
};
pr.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
pr.removeParent = function() {
  this.parent = null;
};
pr.translate = function(n, l, s, p) {
  al[0] = n, al[1] = l, al[2] = s, p === "world" ? (iS(Ol), nS(Ol, Ol, al), Ay(this.local, Ol, this.local)) : nS(this.local, this.local, al);
};
pr.rotate = function(n, l, s, p) {
  var h = Math.PI / 180, y = $E;
  p === "world" ? (y.identity(Ol), y.rotateZ(Ol, Ol, s * h), y.rotateY(Ol, Ol, l * h), y.rotateX(Ol, Ol, n * h), Ay(this.local, Ol, this.local)) : (y.rotateZ(this.local, this.local, s * h), y.rotateY(this.local, this.local, l * h), y.rotateX(this.local, this.local, n * h));
};
pr.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : Ay(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
pr.getWorldToLocal = function() {
  return this.dirtyW === !0 && DE(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
};
pr.getPosition = function(n) {
  n === void 0 && (n = []);
  var l = this.getLocalToWorld();
  return n[0] = l[12], n[1] = l[13], n[2] = l[14], n;
};
pr.getLocalPosition = function(n) {
  n === void 0 && (n = []);
  var l = this.local;
  return n[0] = l[12], n[1] = l[13], n[2] = l[14], n;
};
pr.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
pr.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
pr.setPosition = function(n, l, s) {
  al[0] = n, al[1] = l, al[2] = s, this.parent !== null && XE(al, al, this.parent.getWorldToLocal()), this.local[12] = al[0], this.local[13] = al[1], this.local[14] = al[2];
};
pr.setLocalPosition = function(n, l, s) {
  this.local[12] = n, this.local[13] = l, this.local[14] = s;
};
pr.scale = function(n, l, s) {
  zE(this.local, this.local, [n, l, s]);
};
pr.updateWorldMatrix = function(n = !1) {
  this.parent === null ? this.worldMatrix.set(this.local) : (n && this.parent.updateWorldMatrix(n), Ay(this.worldMatrix, this.parent.worldMatrix, this.local));
};
function ki(n) {
  this.instanceId = ki.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new Ny()), this.name = n || "gameObject";
}
var zl = ki.prototype;
zl.instanceId = 0;
zl.name = null;
zl.layer = 0;
zl.scene = null;
zl.world = null;
zl.transform = null;
zl.components = null;
zl.componentsCount = 0;
zl.setScene = function(n) {
  this.scene = n;
};
zl.addComponent = function(n) {
  return this.components[this.componentsCount++] = n, n.setGameObject(this), n;
};
zl.removeComponent = function(n) {
  n.unsetGameObject();
};
zl.getComponent = function(n) {
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
function Yn(n) {
  cr.call(this), this.transform = n, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ], this.zoom = 1;
}
Yn.prototype = Object.create(cr.prototype);
Yn.prototype.constructor = Yn;
Yn.prototype.frustumSize = null;
Yn.prototype.projectionMatrix = null;
Yn.prototype.clipSpaceMatrix = null;
Yn.prototype.nearClippingPane = 0;
Yn.prototype.farClippingPane = 1e3;
Yn.prototype.fogType = NC.LINEAR;
Yn.prototype.fogNearPane = 250;
Yn.prototype.fogFarPane = 750;
Yn.prototype.fogColor = 9868950;
Yn.prototype.bgColor = -1;
Yn.prototype.ambientLight = 8421504;
Yn.prototype.setup = function(n, l) {
  const s = n / this.zoom, p = l / this.zoom;
  this.frustumSize = [
    [-s / 2, -p / 2, 0],
    [s / 2, p / 2, this.farClippingPane]
  ], PE(this.projectionMatrix, -s / 2, s / 2, -p / 2, p / 2, this.nearClippingPane, this.farClippingPane);
};
Yn.prototype.setGameObject = function(n) {
  cr.prototype.setGameObject.call(this, n), n.camera = this;
};
Yn.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, cr.prototype.unsetGameObject.call(this);
};
Yn.prototype.getClipSpaceMatrix = function() {
  const n = this.transform.getWorldToLocal();
  return Oy(this.clipSpaceMatrix, this.projectionMatrix, n), this.clipSpaceMatrix;
};
Yn.FogType = NC;
function UC(n) {
  ki.call(this, n || "camera"), this.addComponent(new Yn(this.transform));
}
UC.prototype = Object.create(ki.prototype);
function oa() {
  cr.call(this), this.depthBias = 0;
}
var wa = oa.prototype = Object.create(cr.prototype);
wa.constructor = oa;
wa.depthBias = 0;
wa.layer = 0;
wa.vertices = null;
wa.faces = null;
wa.pivot = [0, 0, 0];
wa.color = null;
wa.colors = null;
wa.uvs = null;
wa._texture = null;
wa.textureImage = null;
wa.shaderType = 0;
Object.defineProperty(wa, "texture", {
  get: function() {
    return this._texture;
  },
  set: function(n) {
    this._texture !== n && (this._texture = n, n ? (this.textureImage || (this.textureImage = new Image()), this.textureImage.src = n) : this.textureImage = null);
  }
});
wa.faceNormals = null;
wa.vertexNormals = null;
wa.bounds = null;
wa.updateNormals = function(n = 1) {
  const l = this.faces, s = this.vertices, p = l.length;
  (!this.faceNormals || this.faceNormals.length !== p) && (this.faceNormals = new Float32Array(p)), !this.vertexNormals || this.vertexNormals.length !== s.length ? this.vertexNormals = new Float32Array(s.length) : this.vertexNormals.fill(0);
  for (let h = 0; h < p; h += 3) {
    const y = l[h] * 3, v = l[h + 1] * 3, C = l[h + 2] * 3, E = s[v] - s[y], T = s[v + 1] - s[y + 1], b = s[v + 2] - s[y + 2], R = s[C] - s[y], D = s[C + 1] - s[y + 1], O = s[C + 2] - s[y + 2];
    let L = (T * O - b * D) * n, U = (b * R - E * O) * n, j = (E * D - T * R) * n;
    const X = Math.sqrt(L * L + U * U + j * j);
    if (X > 1e-10) {
      const J = 1 / X;
      this.faceNormals[h] = L * J, this.faceNormals[h + 1] = U * J, this.faceNormals[h + 2] = j * J, this.vertexNormals[y] += L, this.vertexNormals[y + 1] += U, this.vertexNormals[y + 2] += j, this.vertexNormals[v] += L, this.vertexNormals[v + 1] += U, this.vertexNormals[v + 2] += j, this.vertexNormals[C] += L, this.vertexNormals[C + 1] += U, this.vertexNormals[C + 2] += j;
    }
  }
  for (let h = 0; h < this.vertexNormals.length; h += 3) {
    const y = this.vertexNormals[h], v = this.vertexNormals[h + 1], C = this.vertexNormals[h + 2], E = Math.sqrt(y * y + v * v + C * C);
    if (E > 1e-10) {
      const T = 1 / E;
      this.vertexNormals[h] *= T, this.vertexNormals[h + 1] *= T, this.vertexNormals[h + 2] *= T;
    } else
      this.vertexNormals[h + 1] = 1;
  }
};
wa.setGameObject = function(n) {
  cr.prototype.setGameObject.call(this, n), n.meshRenderer = this;
};
wa.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, cr.prototype.unsetGameObject.call(this);
};
oa.computeNormalMatrix = function(n, l) {
  const s = l[0], p = l[1], h = l[2], y = l[4], v = l[5], C = l[6], E = l[8], T = l[9], b = l[10], R = v * b - C * T, D = -(y * b - C * E), O = y * T - v * E, L = s * R + p * D + h * O;
  if (Math.abs(L) < 1e-6) return null;
  const U = 1 / L;
  n[0] = R * U, n[1] = D * U, n[2] = O * U, n[3] = -(p * b - h * T) * U, n[4] = (s * b - h * E) * U, n[5] = -(s * T - p * E) * U, n[6] = (p * C - h * v) * U, n[7] = -(s * C - h * y) * U, n[8] = (s * v - p * y) * U;
};
oa.computeBoundsFlatArray = function(n, l, s) {
  if (s.length !== 0) {
    for (var p = s[0], h = p, y = s[1], v = y, C = s[2], E = C, T = 3; T < s.length; T += 3) {
      var b = s[T], R = s[T + 1], D = s[T + 2];
      b < p ? p = b : b > h && (h = b), R < y ? y = R : R > v && (v = R), D < C ? C = D : D > E && (E = D);
    }
    return n[l] = p, n[l + 1] = y, n[l + 2] = C, n[l + 3] = h, n[l + 4] = y, n[l + 5] = C, n[l + 6] = p, n[l + 7] = v, n[l + 8] = C, n[l + 9] = h, n[l + 10] = v, n[l + 11] = C, n[l + 12] = p, n[l + 13] = y, n[l + 14] = E, n[l + 15] = h, n[l + 16] = y, n[l + 17] = E, n[l + 18] = p, n[l + 19] = v, n[l + 20] = E, n[l + 21] = h, n[l + 22] = v, n[l + 23] = E, n;
  }
};
oa.computeBoundingSphere = function(n, l, s) {
  let p = 1 / 0, h = 1 / 0, y = 1 / 0, v = -1 / 0, C = -1 / 0, E = -1 / 0;
  for (let j = 0; j < s.length; j += 3) {
    const X = s[j], J = s[j + 1], B = s[j + 2];
    X < p && (p = X), X > v && (v = X), J < h && (h = J), J > C && (C = J), B < y && (y = B), B > E && (E = B);
  }
  const T = (p + v) * 0.5, b = (h + C) * 0.5, R = (y + E) * 0.5, D = v - T, O = C - b, L = E - R, U = Math.sqrt(D * D + O * O + L * L);
  n[l] = T, n[l + 1] = b, n[l + 2] = R, n[l + 3] = U;
};
function hS(n) {
  cr.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var zu = hS.prototype = Object.create(cr.prototype);
zu.constructor = hS;
zu.sprite = null;
zu.pivotX = 0;
zu.pivotY = 0;
zu.layer = 0;
zu.setGameObject = function(n) {
  cr.prototype.setGameObject.call(this, n), n.spriteRenderer = this;
};
zu.setSprite = function(n) {
  return this.sprite = n, this.enabled = !0, this;
};
zu.setPivot = function(n, l) {
  return this.pivotX = n, this.pivotY = l, this;
};
zu.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, cr.prototype.unsetGameObject.call(this);
};
function mS() {
  cr.call(this), this.points = [];
}
var Uc = mS.prototype = Object.create(cr.prototype);
Uc.constructor = mS;
Uc.points = null;
Uc.color = "white";
Uc.width = 1;
Uc.layer = 0;
Uc.setGameObject = function(n) {
  cr.prototype.setGameObject.call(this, n), n.pathRenderer = this;
};
Uc.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, cr.prototype.unsetGameObject.call(this);
};
function yS() {
  cr.call(this);
}
var Lu = yS.prototype = Object.create(cr.prototype);
Lu.constructor = yS;
Lu.text = "sample text";
Lu.color = "white";
Lu.style = "normal 12px arial";
Lu.layer = 0;
Lu.align = "center";
Lu.valign = "middle";
Lu.setGameObject = function(n) {
  cr.prototype.setGameObject.call(this, n), n.textRenderer = this;
};
Lu.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, cr.prototype.unsetGameObject.call(this);
};
function Bz(n, l, s) {
  const p = [], h = [], y = n / 2, v = l / 2, C = n / s, E = l / s;
  for (let b = 0; b <= s; b++) {
    const R = b * E - v;
    for (let D = 0; D <= s; D++) {
      const O = D * C - y;
      p.push(O, 0, R);
    }
  }
  const T = s + 1;
  for (let b = 0; b < s; b++)
    for (let R = 0; R < s; R++) {
      const D = b * T + R, O = b * T + (R + 1), L = (b + 1) * T + R, U = (b + 1) * T + (R + 1);
      h.push(D, L, O), h.push(U, O, L);
    }
  return {
    vertices: new Float32Array(p),
    faces: new Uint16Array(h),
    colors: new Uint32Array(p.length / 3).fill(255)
  };
}
const Dv = Bz(1, 1, 1), gS = new Float32Array(32);
oa.computeBoundsFlatArray(gS, 0, Dv.vertices);
oa.computeBoundingSphere(gS, 28, Dv.vertices);
function jC() {
  ki.call(this);
  const n = new oa();
  n.faces = Dv.faces, n.vertices = Dv.vertices, n.colors = Dv.colors, n.bounds = gS, n.updateNormals(), this.addComponent(n);
}
jC.prototype = Object.create(ki.prototype);
function qz(n, l, s, p) {
  const h = [], y = [], v = [];
  function C(T, b, R, D, O, L) {
    const U = `${T.toFixed(5)},${b.toFixed(5)},${R.toFixed(5)}`;
    if (L[U] !== void 0) return L[U];
    const j = h.length / 3;
    return h.push(T, b, R), y.push(D, O), L[U] = j, j;
  }
  function E(T, b, R, D, O, L, U, j, X, J) {
    const B = {}, ee = U / J, q = j / J, re = U / 2, pe = j / 2, ze = X / 2 * L, he = [];
    for (let le = 0; le <= J; le++) {
      const Oe = [], Re = le * q - pe;
      for (let fe = 0; fe <= J; fe++) {
        const ye = fe * ee - re, Fe = [0, 0, 0];
        Fe[T] = ye * D, Fe[b] = Re * O, Fe[R] = ze;
        const Ue = fe / J, ge = 1 - le / J;
        Oe.push(C(Fe[0], Fe[1], Fe[2], Ue, ge, B));
      }
      he.push(Oe);
    }
    for (let le = 0; le < J; le++)
      for (let Oe = 0; Oe < J; Oe++) {
        const Re = he[le][Oe], fe = he[le + 1][Oe], ye = he[le + 1][Oe + 1], Fe = he[le][Oe + 1];
        v.push(Re, Fe, fe), v.push(fe, Fe, ye);
      }
  }
  return E(0, 1, 2, 1, 1, 1, n, l, s, p), E(0, 1, 2, -1, 1, -1, n, l, s, p), E(2, 1, 0, -1, 1, 1, s, l, n, p), E(2, 1, 0, 1, 1, -1, s, l, n, p), E(0, 2, 1, 1, -1, 1, n, s, l, p), E(0, 2, 1, 1, 1, -1, n, s, l, p), {
    vertices: new Float32Array(h),
    uvs: new Float32Array(y),
    faces: new Uint16Array(v),
    colors: new Uint32Array(h.length / 3).fill(255)
  };
}
const Td = qz(1, 1, 1, 1), SS = new Float32Array(32);
oa.computeBoundsFlatArray(SS, 0, Td.vertices);
oa.computeBoundingSphere(SS, 28, Td.vertices);
function FC() {
  ki.call(this);
  const n = new oa();
  n.vertices = Td.vertices, n.uvs = Td.uvs, n.faces = Td.faces, n.colors = Td.colors, n.bounds = SS, n.updateNormals(), this.addComponent(n);
}
FC.prototype = Object.create(ki.prototype);
function Yz(n, l, s) {
  const p = [], h = [];
  p.push(0, s, 0), p.push(0, 0, 0);
  for (let y = 0; y < n; y++) {
    const v = y / n * Math.PI * 2, C = Math.cos(v) * l, E = Math.sin(v) * l;
    p.push(C, 0, E);
  }
  for (let y = 0; y < n; y++) {
    const v = y + 2, C = y === n - 1 ? 2 : y + 3;
    h.push(0, C, v), h.push(1, v, C);
  }
  return {
    vertices: new Float32Array(p),
    faces: new Uint16Array(h),
    colors: new Uint32Array(p.length / 3).fill(255)
  };
}
const Ov = Yz(7, 0.5, 1), xS = new Float32Array(32);
oa.computeBoundsFlatArray(xS, 0, Ov.vertices);
oa.computeBoundingSphere(xS, 28, Ov.vertices);
function PC() {
  ki.call(this);
  const n = new oa();
  n.vertices = Ov.vertices, n.faces = Ov.faces, n.colors = Ov.colors, n.bounds = xS, n.updateNormals(), this.addComponent(n);
}
PC.prototype = Object.create(ki.prototype);
function Wz(n, l, s) {
  const p = [], h = [], y = [], v = {};
  function C(T, b, R, D, O) {
    const L = `${T.toFixed(5)},${b.toFixed(5)},${R.toFixed(5)}`;
    if (v[L] !== void 0) return v[L];
    const U = p.length / 3;
    return p.push(T, b, R), h.push(D, O), v[L] = U, U;
  }
  const E = [];
  for (let T = 0; T <= n; T++) {
    const b = [], R = T * Math.PI / n, D = Math.sin(R), O = Math.cos(R);
    for (let L = 0; L <= l; L++) {
      const U = L * 2 * Math.PI / l, j = Math.cos(U) * D * s, X = O * s, J = Math.sin(U) * D * s, B = L / l, ee = T / n;
      b.push(C(j, X, J, B, ee));
    }
    E.push(b);
  }
  for (let T = 0; T < n; T++)
    for (let b = 0; b < l; b++) {
      const R = E[T][b], D = E[T][b + 1], O = E[T + 1][b], L = E[T + 1][b + 1];
      T !== 0 && y.push(R, D, O), T !== n - 1 && y.push(O, D, L);
    }
  return {
    vertices: new Float32Array(p),
    uvs: new Float32Array(h),
    faces: new Uint16Array(y),
    colors: new Uint32Array(p.length / 3).fill(255)
  };
}
function Qz(n = 8, l = 8, s = 8) {
  const p = Wz(n, l, s), h = new Float32Array(32);
  return oa.computeBoundsFlatArray(h, 0, p.vertices), oa.computeBoundingSphere(h, 28, p.vertices), [
    p.vertices,
    p.faces,
    p.uvs,
    h,
    p.colors
  ];
}
function ES(n, l, s, p, h) {
  ki.call(this);
  const y = new oa();
  y.vertices = n, y.faces = l, y.uvs = s, y.colors = h || new Uint32Array(n.length / 3).fill(255), y.bounds = p, y.updateNormals(), this.addComponent(y);
}
ES.prototype = Object.create(ki.prototype);
ES.generate = Qz;
function Gz() {
  const n = new Array(65536);
  for (let l = 0; l < 65536; l++) {
    const s = l >> 11 & 31, p = l >> 5 & 63, h = l & 31, y = s << 3 | s >> 2, v = p << 2 | p >> 4, C = h << 3 | h >> 2;
    n[l] = "#" + (y < 16 ? "0" : "") + y.toString(16) + (v < 16 ? "0" : "") + v.toString(16) + (C < 16 ? "0" : "") + C.toString(16);
  }
  return n;
}
const nE = D_;
function Xz(n, l, s, p) {
  var h = n.transform.getLocalToWorld(), y = h[12], v = h[13], C = h[14];
  nE(
    p,
    0,
    y,
    v,
    C,
    s
  );
  for (var E = p[0], T = p[1], b = 50, R = [
    { x: h[0], y: h[1], z: h[2], col: "#ff0000" },
    // X
    { x: h[4], y: h[5], z: h[6], col: "#00ff00" },
    // Y
    { x: h[8], y: h[9], z: h[10], col: "#0000ff" }
    // Z
  ], D = 0; D < 3; D++) {
    var O = R[D], L = Math.sqrt(O.x * O.x + O.y * O.y + O.z * O.z);
    L < 1e-4 && (D === 0 ? O.x = 1 : D === 1 ? O.y = 1 : O.z = 1, L = 1);
    var U = O.x / L, j = O.y / L, X = O.z / L;
    nE(
      p,
      0,
      y + U * b,
      v + j * b,
      C + X * b,
      s
    ), l.beginPath(), l.lineWidth = 2, l.strokeStyle = O.col, l.moveTo(E, T), l.lineTo(p[0], p[1]), l.stroke();
  }
}
function Kz(n, l, s, p, h, y, v, C, E) {
  if (v <= 1) return;
  const T = E - C > 1e-4 ? 65535 / (E - C) : 0;
  y.fill(0);
  for (let R = 0; R < v; R++) {
    const D = n[R], O = h[D] & 255;
    y[O]++;
  }
  let b = 0;
  for (let R = 0; R < 256; R++) {
    const D = y[R];
    y[R] = b, b += D;
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
  b = 0;
  for (let R = 0; R < 256; R++) {
    const D = y[R];
    y[R] = b, b += D;
  }
  for (let R = 0; R < v; R++) {
    const D = l[R], O = p[D] & 255;
    n[y[O]++] = D;
  }
  y.fill(0);
  for (let R = 0; R < v; R++) {
    const D = n[R];
    let L = (s[D] - C) * T;
    L < 0 ? L = 0 : L > 65535 && (L = 65535);
    const U = 65535 - (L | 0) & 255;
    y[U]++;
  }
  b = 0;
  for (let R = 0; R < 256; R++) {
    const D = y[R];
    y[R] = b, b += D;
  }
  for (let R = 0; R < v; R++) {
    const D = n[R];
    let L = (s[D] - C) * T;
    L < 0 ? L = 0 : L > 65535 && (L = 65535);
    const U = 65535 - (L | 0) & 255;
    l[y[U]++] = D;
  }
  y.fill(0);
  for (let R = 0; R < v; R++) {
    const D = l[R];
    let L = (s[D] - C) * T;
    L < 0 ? L = 0 : L > 65535 && (L = 65535);
    const U = 65535 - (L | 0) >> 8 & 255;
    y[U]++;
  }
  b = 0;
  for (let R = 0; R < 256; R++) {
    const D = y[R];
    y[R] = b, b += D;
  }
  for (let R = 0; R < v; R++) {
    const D = l[R];
    let L = (s[D] - C) * T;
    L < 0 ? L = 0 : L > 65535 && (L = 65535);
    const U = 65535 - (L | 0) >> 8 & 255;
    n[y[U]++] = D;
  }
}
const Zz = oa.computeNormalMatrix, Zg = k_, rE = Oy, Jz = Xz, Qr = Gz(), Jg = 0.6;
function e4(n, l, s, p, h) {
  if (p === 1)
    return n;
  const y = n[0] + 1;
  s.fill(0);
  for (let C = 1; C < y; C++) {
    const E = n[C], T = l[E];
    T.meshRenderer && s[T.meshRenderer.layer]++;
  }
  let v = 0;
  for (let C = 0; C < p; C++) {
    const E = s[C];
    s[C] = v, h[v] = 0, v += 1 + E;
  }
  for (let C = 1; C < y; C++) {
    const E = n[C], T = l[E];
    if (T.meshRenderer) {
      const b = T.meshRenderer.layer, R = s[b], D = h[R];
      h[R + 1 + D] = E, h[R] = D + 1;
    }
  }
  return h;
}
function HC() {
  this.layerBuffers = new Uint32Array(0), this.layerBuffersOffsets = new Uint32Array(wd.layersCount), this.drawCalls = 0, this.faces = 0, this.lightDirection = new Float32Array([0, 0, 0]), this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.colorBuffer = new Uint32Array(0), this.shaderTypeBuffer = new Uint8Array(0), this.shaderPassBuffer = new Uint8Array(0), this.faceNormalsBuffer = new Float32Array(0), this.vertexNormalsBuffer = new Float32Array(0), this.meshIndexBuffer = new Uint32Array(0), this.meshFaceIndexBuffer = new Uint32Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.lightsIndexBuffer = new Uint32Array(10), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0), this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0), this.tempIndexBuffer = new Uint32Array(0), this.counters = new Uint32Array(256);
}
var jc = HC.prototype;
jc.vec3Cache1 = new Float32Array([0, 0, 0]);
jc.vec3Cache2 = new Float32Array([0, 0, 0]);
jc.vec4Cache = new Float32Array([0, 0, 0]);
jc.mat4Scratchpad1 = new Float32Array(16);
jc.mat4Scratchpad2 = new Float32Array(16);
jc.mat3Scratchpad1 = new Float32Array(9);
jc.render = function(n, l, s) {
  let p = performance.now();
  const h = performance.now();
  let y = n.scene.retrieve();
  const v = performance.now() - h;
  let C = wd.layersCount, E = l.width, T = l.height, b, R, D, O = this.vec3Cache1, L = this.vec3Cache2, U = this.vec4Cache, j = this.depthBuffer, X = this.indexBuffer, J = this.vertexIndexBuffer, B = this.vertexBuffer, ee = this.clipGeometryBuffer, q = this.colorBuffer, re = this.shaderTypeBuffer, pe = this.shaderPassBuffer, ze = this.faceNormalsBuffer, he = this.vertexNormalsBuffer, le = this.meshIndexBuffer, Oe = this.meshFaceIndexBuffer, Re = this.visibleObjectsBuffer, fe = this.lightsIndexBuffer, ye = this.layerBuffersOffsets, Fe = this.mat4Scratchpad1, Ue = this.mat4Scratchpad2, ge = l.getWorldToScreen(), de = n.transform.getWorldToLocal(), Le = n.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let ie = this.tempIndexBuffer, H = this.counters, ue = 0, Ve = 0;
  const be = n.camera, Pe = n.camera.fogType !== Yn.FogType.NONE ? be.fogColor : be.bgColor;
  if (be.bgColor !== -1) {
    const Lt = Pe >>> 16, bt = Pe >>> 8 & 255, Ht = Pe & 255, on = Lt & 248, $t = bt & 252, En = Ht & 248, Qn = on << 8 | $t << 3 | En >> 3;
    l.context.fillStyle = Qr[Qn], l.context.fillRect(0, 0, l.width, l.height);
  } else
    l.context.clearRect(0, 0, l.width, l.height);
  if (Re.length < y.length) {
    const Lt = Re;
    this.visibleObjectsBuffer = Re = new Uint32Array(
      y.length
    ), Re.set(Lt);
  }
  if (fe.length < y.length) {
    const Lt = fe;
    this.lightsIndexBuffer = fe = new Uint32Array(
      y.length
    ), fe.set(Lt);
  }
  const Ge = performance.now();
  t4(
    y,
    Le,
    Re,
    fe
  ), n4(Re, y, Le);
  const He = performance.now() - Ge, Ie = Re[0] + 1, Be = Re[0];
  C > 1 && this.layerBuffers.length < Be + C && (this.layerBuffers = new Uint32Array((Be + C) * 2));
  const Zt = performance.now();
  let kn = e4(
    Re,
    y,
    ye,
    C,
    this.layerBuffers
  );
  const Wn = performance.now() - Zt;
  let ln = 0, _e = 0, nn = 0, et = 0;
  for (b = 0; b < C; b++) {
    const Lt = kn[et];
    if (Lt === 0) {
      et += 1;
      continue;
    }
    D = l.layers[b];
    let bt = 0, Ht = 0;
    for (let $e = 0; $e < Lt; $e++) {
      const un = y[kn[et + 1 + $e]].meshRenderer;
      bt += un.faces.length;
      const Gn = un.vertices.length;
      Gn > Ht && (Ht = Gn);
    }
    bt = bt / 3 | 0;
    const on = Ht / 3 | 0;
    if (this.vMapping.length < on && (this.vMapping = new Int32Array(on), this.vTags = new Uint32Array(on)), O.length < Ht && (this.vec3Cache1 = O = new Float32Array(Ht), this.vec3Cache2 = L = new Float32Array(Ht), this.vec4Cache = U = new Float32Array(Ht * 4 / 3)), j.length < bt) {
      let $e = new Float32Array(bt);
      $e.set(j), this.depthBuffer = j = $e, $e = new Uint32Array(bt), $e.set(X), this.indexBuffer = X = $e, $e = new Uint32Array(bt), $e.set(ie), this.tempIndexBuffer = ie = $e, $e = new Uint32Array(bt * 3), $e.set(q), this.colorBuffer = q = $e, $e = new Uint8Array(bt), $e.set(re), this.shaderTypeBuffer = re = $e, $e = new Uint8Array(bt), $e.set(pe), this.shaderPassBuffer = pe = $e, $e = new Float32Array(bt * 9), $e.set(ee), this.clipGeometryBuffer = ee = $e, $e = new Float32Array(bt * 3), $e.set(ze), this.faceNormalsBuffer = ze = $e, $e = new Float32Array(bt * 9), $e.set(he), this.vertexNormalsBuffer = he = $e, $e = new Uint32Array(bt), $e.set(le), this.meshIndexBuffer = le = $e, $e = new Uint32Array(bt), $e.set(Oe), this.meshFaceIndexBuffer = Oe = $e;
      let un = new Float32Array(bt * 6);
      un.set(B), this.vertexBuffer = B = un;
      let Gn = new Uint32Array(bt * 3);
      Gn.set(J), this.vertexIndexBuffer = J = Gn;
    }
    const $t = performance.now(), En = r4(
      kn,
      et + 1,
      y,
      Lt,
      L,
      U,
      X,
      j,
      q,
      re,
      pe,
      ee,
      de,
      Le,
      Ue,
      Fe,
      this.mat3Scratchpad1,
      ze,
      he,
      B,
      J,
      le,
      Oe,
      this.vMapping,
      this.vTags
    );
    if (_e += performance.now() - $t, (wd.depthSortingMask & b + 1) === b + 1) {
      const $e = performance.now();
      Kz(X, ie, j, le, pe, H, En, be.nearClippingPane, be.farClippingPane), ln += performance.now() - $e;
    }
    const Qn = (wd.layerClearMask & b + 1) === b + 1, gr = performance.now();
    for (a4(
      D,
      B,
      J,
      X,
      q,
      re,
      En,
      0,
      Qn,
      E,
      T,
      ee,
      j,
      n.camera.fogType,
      n.camera.fogColor,
      n.camera.fogNearPane,
      n.camera.fogFarPane,
      n.scene,
      this.lightDirection,
      n.camera.ambientLight,
      ze,
      he,
      le,
      Oe,
      kn,
      et + 1,
      this.wireframe,
      fe,
      y
    ), R = 0; R < Lt; R++) {
      const $e = kn[et + 1 + R], un = y[$e];
      un && un.debug && Jz(un, D, ge, O);
    }
    l.context.drawImage(D.canvas, 0, 0), nn += performance.now() - gr, ue += En, Ve += En, et += 1 + Lt;
  }
  s.totalObjects = y.length, s.visibleObjects = Ie, s.drawCalls = ue, s.faces = Ve, s.sortTime = ln, s.cullTime = He, s.groupTime = Wn, s.processTime = _e, s.drawTime = nn, s.updateTime = n.scene && n.scene.world ? n.scene.world.lastTickTime : 0, s.retrieveTime = v, s.dt = performance.now() - p;
};
function t4(n, l, s, p) {
  let h = 0, y = 0;
  const v = l[0], C = l[1], E = l[2], T = l[3], b = l[4], R = l[5], D = l[6], O = l[7], L = l[8], U = l[9], j = l[10], X = l[11], J = l[12], B = l[13], ee = l[14], q = l[15];
  let re = T + v, pe = O + b, ze = X + L, he = q + J, le = 1 / Math.sqrt(re * re + pe * pe + ze * ze);
  re *= le, pe *= le, ze *= le, he *= le;
  let Oe = T - v, Re = O - b, fe = X - L, ye = q - J;
  le = 1 / Math.sqrt(Oe * Oe + Re * Re + fe * fe), Oe *= le, Re *= le, fe *= le, ye *= le;
  let Fe = T + C, Ue = O + R, ge = X + U, de = q + B;
  le = 1 / Math.sqrt(Fe * Fe + Ue * Ue + ge * ge), Fe *= le, Ue *= le, ge *= le, de *= le;
  let Le = T - C, ie = O - R, H = X - U, ue = q - B;
  le = 1 / Math.sqrt(Le * Le + ie * ie + H * H), Le *= le, ie *= le, H *= le, ue *= le;
  let Ve = T + E, be = O + D, Pe = X + j, Ge = q + ee;
  le = 1 / Math.sqrt(Ve * Ve + be * be + Pe * Pe), Ve *= le, be *= le, Pe *= le, Ge *= le;
  let He = T - E, Ie = O - D, Be = X - j, Zt = q - ee;
  le = 1 / Math.sqrt(He * He + Ie * Ie + Be * Be), He *= le, Ie *= le, Be *= le, Zt *= le;
  const kn = n.length;
  for (let Wn = 0; Wn < kn; Wn++) {
    const ln = n[Wn];
    if (ln.meshRenderer && ln.meshRenderer.enabled) {
      const _e = ln.transform.worldMatrix, nn = ln.meshRenderer.bounds, et = nn[28], Lt = nn[29], bt = nn[30], Ht = _e[0] * et + _e[4] * Lt + _e[8] * bt + _e[12], on = _e[1] * et + _e[5] * Lt + _e[9] * bt + _e[13], $t = _e[2] * et + _e[6] * Lt + _e[10] * bt + _e[14], En = _e[0] * _e[0] + _e[1] * _e[1] + _e[2] * _e[2], Qn = _e[4] * _e[4] + _e[5] * _e[5] + _e[6] * _e[6], gr = _e[8] * _e[8] + _e[9] * _e[9] + _e[10] * _e[10], $e = nn[31] * Math.sqrt(Math.max(En, Qn, gr));
      if (re * Ht + pe * on + ze * $t + he < -$e || Oe * Ht + Re * on + fe * $t + ye < -$e || Fe * Ht + Ue * on + ge * $t + de < -$e || Le * Ht + ie * on + H * $t + ue < -$e || Ve * Ht + be * on + Pe * $t + Ge < -$e || He * Ht + Ie * on + Be * $t + Zt < -$e) continue;
      s[++h] = Wn;
    }
    if (ln.light)
      if (ln.light.type === 1) {
        const _e = ln.transform.worldMatrix, nn = _e[12], et = _e[13], Lt = _e[14], bt = _e[0] * _e[0] + _e[1] * _e[1] + _e[2] * _e[2], Ht = _e[4] * _e[4] + _e[5] * _e[5] + _e[6] * _e[6], on = _e[8] * _e[8] + _e[9] * _e[9] + _e[10] * _e[10], $t = ln.light.range * Math.sqrt(Math.max(bt, Ht, on));
        if (re * nn + pe * et + ze * Lt + he < -$t || Oe * nn + Re * et + fe * Lt + ye < -$t || Fe * nn + Ue * et + ge * Lt + de < -$t || Le * nn + ie * et + H * Lt + ue < -$t || Ve * nn + be * et + Pe * Lt + Ge < -$t || He * nn + Ie * et + Be * Lt + Zt < -$t) continue;
        p[++y] = Wn;
      } else
        p[++y] = Wn;
  }
  s[0] = h, p[0] = y;
}
function n4(n, l, s) {
  const p = s, h = p[0], y = p[1], v = p[2], C = p[3], E = p[4], T = p[5], b = p[6], R = p[7], D = p[8], O = p[9], L = p[10], U = p[11], j = p[12], X = p[13], J = p[14], B = p[15];
  let ee = 0;
  const q = n[0] + 1;
  for (let re = 1; re < q; re++) {
    const pe = n[re], ze = l[pe], he = ze.transform.worldMatrix, le = ze.meshRenderer;
    if (le && le.enabled && le.bounds) {
      const Oe = le.bounds;
      let Re = 63;
      for (let fe = 0; fe < 24; fe += 3) {
        const ye = Oe[fe], Fe = Oe[fe + 1], Ue = Oe[fe + 2], ge = he[0] * ye + he[4] * Fe + he[8] * Ue + he[12], de = he[1] * ye + he[5] * Fe + he[9] * Ue + he[13], Le = he[2] * ye + he[6] * Fe + he[10] * Ue + he[14], ie = h * ge + E * de + D * Le + j, H = y * ge + T * de + O * Le + X, ue = v * ge + b * de + L * Le + J, Ve = C * ge + R * de + U * Le + B;
        let be = 0;
        ie < -Ve && (be |= 1), ie > Ve && (be |= 2), H < -Ve && (be |= 4), H > Ve && (be |= 8), ue < -Ve && (be |= 16), ue > Ve && (be |= 32), Re &= be;
      }
      Re === 0 && (n[++ee] = pe);
    } else {
      const Oe = he[12], Re = he[13], fe = he[14], ye = h * Oe + E * Re + D * fe + j, Fe = y * Oe + T * Re + O * fe + X, Ue = v * Oe + b * Re + L * fe + J, ge = C * Oe + R * Re + U * fe + B;
      ye >= -ge && ye <= ge && Fe >= -ge && Fe <= ge && Ue >= -ge && Ue <= ge && (n[++ee] = pe);
    }
  }
  n[0] = ee;
}
let Nc = 0;
function r4(n, l, s, p, h, y, v, C, E, T, b, R, D, O, L, U, j, X, J, B, ee, q, re, pe, ze) {
  let he = 0, le = 0;
  for (let Oe = 0; Oe < p; Oe++) {
    const Re = n[l + Oe], fe = s[Re], ye = fe.meshRenderer;
    if (ye.constructor !== oa) continue;
    ++Nc;
    const Fe = fe.transform.worldMatrix, Ue = ye.depthBias || 0;
    rE(U, O, Fe), rE(L, D, Fe);
    const ge = U[0], de = U[1], Le = U[2], ie = U[3], H = U[4], ue = U[5], Ve = U[6], be = U[7], Pe = U[8], Ge = U[9], He = U[10], Ie = U[11], Be = U[12], Zt = U[13], kn = U[14], Wn = U[15], ln = ye.faces, _e = ye.vertices, nn = ye.faceNormals, et = ye.vertexNormals;
    Zz(j, Fe);
    const Lt = j, bt = Lt[0], Ht = Lt[1], on = Lt[2], $t = Lt[3], En = Lt[4], Qn = Lt[5], gr = Lt[6], $e = Lt[7], un = Lt[8], Gn = ln.length;
    for (let vr = 0; vr < Gn; vr += 3) {
      const fr = ln[vr], Me = ln[vr + 1], qe = ln[vr + 2], xt = fr << 2, Jt = Me << 2, Bt = qe << 2;
      if (ze[fr] !== Nc) {
        const kt = fr * 3, tt = _e[kt], dn = _e[kt + 1], Vt = _e[kt + 2];
        y[xt] = ge * tt + H * dn + Pe * Vt + Be, y[xt + 1] = de * tt + ue * dn + Ge * Vt + Zt, y[xt + 2] = Le * tt + Ve * dn + He * Vt + kn, y[xt + 3] = ie * tt + be * dn + Ie * Vt + Wn, ze[fr] = Nc, pe[fr] = -1;
      }
      if (ze[Me] !== Nc) {
        const kt = Me * 3, tt = _e[kt], dn = _e[kt + 1], Vt = _e[kt + 2];
        y[Jt] = ge * tt + H * dn + Pe * Vt + Be, y[Jt + 1] = de * tt + ue * dn + Ge * Vt + Zt, y[Jt + 2] = Le * tt + Ve * dn + He * Vt + kn, y[Jt + 3] = ie * tt + be * dn + Ie * Vt + Wn, ze[Me] = Nc, pe[Me] = -1;
      }
      if (ze[qe] !== Nc) {
        const kt = qe * 3, tt = _e[kt], dn = _e[kt + 1], Vt = _e[kt + 2];
        y[Bt] = ge * tt + H * dn + Pe * Vt + Be, y[Bt + 1] = de * tt + ue * dn + Ge * Vt + Zt, y[Bt + 2] = Le * tt + Ve * dn + He * Vt + kn, y[Bt + 3] = ie * tt + be * dn + Ie * Vt + Wn, ze[qe] = Nc, pe[qe] = -1;
      }
      const Cn = y[xt], qt = y[xt + 1], fn = y[xt + 2], Et = y[xt + 3], Mt = y[Jt], Gt = y[Jt + 1], Dn = y[Jt + 2], Xt = y[Jt + 3], jn = y[Bt], Mr = y[Bt + 1], Sr = y[Bt + 2], Fn = y[Bt + 3];
      if (Cn < -Et && Mt < -Xt && jn < -Fn || Cn > Et && Mt > Xt && jn > Fn || qt < -Et && Gt < -Xt && Mr < -Fn || qt > Et && Gt > Xt && Mr > Fn || fn < -Et && Dn < -Xt && Sr < -Fn || fn > Et && Dn > Xt && Sr > Fn) continue;
      const _r = 1 / Et, Tn = 1 / Xt, kr = 1 / Fn, wn = Cn * _r, Yt = qt * _r, At = Mt * Tn, yn = Gt * Tn, gn = jn * kr, en = Mr * kr;
      if ((At - wn) * (en - Yt) - (yn - Yt) * (gn - wn) > 0) continue;
      const ft = fr * 3, A = Me * 3, ae = qe * 3;
      v[he] = he, q[he] = Oe, re[he] = vr;
      const me = nn[vr], xe = nn[vr + 1], Ae = nn[vr + 2], Ye = me * bt + xe * $t + Ae * gr, Ke = me * Ht + xe * En + Ae * $e, at = me * on + xe * Qn + Ae * un, Ft = Math.sqrt(Ye * Ye + Ke * Ke + at * at), _t = Ft > 0 ? 1 / Ft : 0, sn = he * 3;
      if (E[sn] = ye.colors[fr], E[sn + 1] = ye.colors[Me], E[sn + 2] = ye.colors[qe], T[he] = ye.shaderType, b[he] = 0, pe[fr] === -1) {
        const kt = le * 3;
        Zg(
          h,
          ft,
          _e[ft],
          _e[ft + 1],
          _e[ft + 2],
          L
        ), B[kt] = wn, B[kt + 1] = -Yt, pe[fr] = kt, le++;
        const tt = fr * 3, dn = et[tt] * bt + et[tt + 1] * $t + et[tt + 2] * gr, Vt = et[tt] * Ht + et[tt + 1] * En + et[tt + 2] * $e, ir = et[tt] * on + et[tt + 1] * Qn + et[tt + 2] * un, Xn = Math.sqrt(dn * dn + Vt * Vt + ir * ir), On = Xn > 0 ? 1 / Xn : 0;
        J[kt] = dn * On, J[kt + 1] = Vt * On, J[kt + 2] = ir * On;
      }
      if (ee[he * 3] = pe[fr], pe[Me] === -1) {
        const kt = le * 3;
        Zg(
          h,
          A,
          _e[A],
          _e[A + 1],
          _e[A + 2],
          L
        ), B[kt] = At, B[kt + 1] = -yn, pe[Me] = kt, le++;
        const tt = Me * 3, dn = et[tt] * bt + et[tt + 1] * $t + et[tt + 2] * gr, Vt = et[tt] * Ht + et[tt + 1] * En + et[tt + 2] * $e, ir = et[tt] * on + et[tt + 1] * Qn + et[tt + 2] * un, Xn = Math.sqrt(dn * dn + Vt * Vt + ir * ir), On = Xn > 0 ? 1 / Xn : 0;
        J[kt] = dn * On, J[kt + 1] = Vt * On, J[kt + 2] = ir * On;
      }
      if (ee[he * 3 + 1] = pe[Me], pe[qe] === -1) {
        const kt = le * 3;
        Zg(
          h,
          ae,
          _e[ae],
          _e[ae + 1],
          _e[ae + 2],
          L
        ), B[kt] = gn, B[kt + 1] = -en, pe[qe] = kt, le++;
        const tt = qe * 3, dn = et[tt] * bt + et[tt + 1] * $t + et[tt + 2] * gr, Vt = et[tt] * Ht + et[tt + 1] * En + et[tt + 2] * $e, ir = et[tt] * on + et[tt + 1] * Qn + et[tt + 2] * un, Xn = Math.sqrt(dn * dn + Vt * Vt + ir * ir), On = Xn > 0 ? 1 / Xn : 0;
        J[kt] = dn * On, J[kt + 1] = Vt * On, J[kt + 2] = ir * On;
      }
      ee[he * 3 + 2] = pe[qe];
      const rn = he * 9;
      R[rn] = h[ft], R[rn + 1] = h[ft + 1];
      const Fr = R[rn + 2] = h[ft + 2];
      R[rn + 3] = h[A], R[rn + 4] = h[A + 1];
      const Dr = R[rn + 5] = h[A + 2];
      R[rn + 6] = h[ae], R[rn + 7] = h[ae + 1];
      const gt = R[rn + 8] = h[ae + 2];
      C[he] = (Fr + Dr + gt) * 0.33333 + Ue;
      const Ct = he * 3;
      X[Ct] = Ye * _t, X[Ct + 1] = Ke * _t, X[Ct + 2] = at * _t, he++;
    }
  }
  return he;
}
function a4(n, l, s, p, h, y, v, C, E, T, b, R, D, O, L, U, j, X, J, B, ee, q, re, pe, ze, he, le, Oe, Re) {
  const fe = T * 0.5, ye = b * 0.5, Fe = C + v;
  E && n.clearRect(0, 0, n.canvas.width, n.canvas.height);
  let Ue = -1, ge = -1, de = -1;
  for (let Le = C; Le < Fe; Le++) {
    const ie = p[Le], H = s[ie * 3], ue = s[ie * 3 + 1], Ve = s[ie * 3 + 2], be = l[H] * fe + fe, Pe = l[H + 1] * ye + ye, Ge = l[ue] * fe + fe, He = l[ue + 1] * ye + ye, Ie = l[Ve] * fe + fe, Be = l[Ve + 1] * ye + ye, Zt = (be + Ge + Ie) * 0.33333, kn = (Pe + He + Be) * 0.33333, Wn = be - Zt, ln = Pe - kn, _e = Math.abs(Wn), nn = Math.abs(ln), et = _e > nn ? _e + 0.4 * nn : nn + 0.4 * _e, Lt = et > 0 ? Jg / et : 0, bt = be + Wn * Lt, Ht = Pe + ln * Lt, on = Ge - Zt, $t = He - kn, En = Math.abs(on), Qn = Math.abs($t), gr = En > Qn ? En + 0.4 * Qn : Qn + 0.4 * En, $e = gr > 0 ? Jg / gr : 0, un = Ge + on * $e, Gn = He + $t * $e, vr = Ie - Zt, fr = Be - kn, Me = Math.abs(vr), qe = Math.abs(fr), xt = Me > qe ? Me + 0.4 * qe : qe + 0.4 * Me, Jt = xt > 0 ? Jg / xt : 0, Bt = Ie + vr * Jt, Cn = Be + fr * Jt;
    switch (le ? 3 : y[ie]) {
      case 0: {
        const qt = h[ie * 3];
        let fn = qt >>> 16, Et = qt >>> 8 & 255, Mt = qt & 255, Gt = B >>> 16 & 255, Dn = B >>> 8 & 255, Xt = B & 255;
        const jn = ee[ie * 3], Mr = ee[ie * 3 + 1], Sr = ee[ie * 3 + 2], Fn = Oe[0] + 1;
        for (let ft = 1; ft < Fn; ft++) {
          const A = Re[Oe[ft]];
          if (A.light.type === 0) {
            const ae = -A.transform.worldMatrix[8], me = -A.transform.worldMatrix[9], xe = -A.transform.worldMatrix[10], Ae = jn * ae + Mr * me + Sr * xe;
            Ae > 0 && (Gt += (A.light.color >>> 16 & 255) * Ae, Dn += (A.light.color >>> 8 & 255) * Ae, Xt += (A.light.color & 255) * Ae);
          }
        }
        Gt *= 39215e-7, Dn *= 39215e-7, Xt *= 39215e-7, fn = fn * Gt | 0, Et = Et * Dn | 0, Mt = Mt * Xt | 0, fn = fn > 255 ? 255 : fn, Et = Et > 255 ? 255 : Et, Mt = Mt > 255 ? 255 : Mt;
        const _r = D[ie];
        let Tn = 0;
        if (O === Yn.FogType.RADIAL_FAST || O === Yn.FogType.RADIAL) {
          const ft = R[ie * 9], A = R[ie * 9 + 1], ae = R[ie * 9 + 2], me = R[ie * 9 + 3], xe = R[ie * 9 + 4], Ae = R[ie * 9 + 5], Ye = R[ie * 9 + 6], Ke = R[ie * 9 + 7], at = R[ie * 9 + 8], Ft = (ft + me + Ye) * 0.33333, _t = (A + xe + Ke) * 0.33333, sn = (ae + Ae + at) * 0.33333;
          if (O === Yn.FogType.RADIAL_FAST) {
            const rn = U * U, Dr = 1 / (j * j - rn);
            Tn = (Ft * Ft + _t * _t + sn * sn - rn) * Dr;
          } else
            Tn = (Math.sqrt(Ft * Ft + _t * _t + sn * sn) - U) / (j - U);
        } else O === Yn.FogType.LINEAR && (Tn = (_r - U) / (j - U));
        if (Tn > 1 && (Tn = 1), Tn > 0) {
          const ft = L >>> 16, A = L >>> 8 & 255, ae = L & 255;
          fn = fn * (1 - Tn) + ft * Tn | 0, Et = Et * (1 - Tn) + A * Tn | 0, Mt = Mt * (1 - Tn) + ae * Tn | 0;
        }
        const kr = re[ie], wn = Re[ze[he + kr]].meshRenderer, Yt = wn.textureImage;
        if (Yt && Yt.complete && Yt.naturalWidth > 0 && wn.uvs) {
          const ft = pe[ie], A = wn.uvs, ae = wn.faces[ft] * 2, me = wn.faces[ft + 1] * 2, xe = wn.faces[ft + 2] * 2, Ae = A[ae] * Yt.width, Ye = A[ae + 1] * Yt.height, Ke = A[me] * Yt.width, at = A[me + 1] * Yt.height, Ft = A[xe] * Yt.width, _t = A[xe + 1] * Yt.height, sn = Ae * (at - _t) - Ye * (Ke - Ft) + (Ke * _t - Ft * at);
          if (Math.abs(sn) > 1e-5) {
            const rn = 1 / sn, Fr = (be * (at - _t) + Ge * (_t - Ye) + Ie * (Ye - at)) * rn, Dr = (be * (Ft - Ke) + Ge * (Ae - Ft) + Ie * (Ke - Ae)) * rn, gt = (be * (Ke * _t - Ft * at) + Ge * (Ft * Ye - Ae * _t) + Ie * (Ae * at - Ke * Ye)) * rn, Ct = (Pe * (at - _t) + He * (_t - Ye) + Be * (Ye - at)) * rn, kt = (Pe * (Ft - Ke) + He * (Ae - Ft) + Be * (Ke - Ae)) * rn, tt = (Pe * (Ke * _t - Ft * at) + He * (Ft * Ye - Ae * _t) + Be * (Ae * at - Ke * Ye)) * rn;
            n.save(), n.beginPath(), n.moveTo(bt, Ht), n.lineTo(un, Gn), n.lineTo(Bt, Cn), n.closePath(), n.clip(), n.setTransform(Fr, Ct, Dr, kt, gt, tt), n.drawImage(Yt, 0, 0), n.restore();
            const dn = Gt >= 1 ? 255 : Gt * 255 | 0, Vt = Dn >= 1 ? 255 : Dn * 255 | 0, ir = Xt >= 1 ? 255 : Xt * 255 | 0, Xn = dn & 248, On = Vt & 252, La = ir & 248, lr = Xn << 8 | On << 3 | La >> 3;
            if (n.globalCompositeOperation = "multiply", Ue !== lr && (n.fillStyle = Qr[lr], Ue = lr), n.fill(), n.globalCompositeOperation = "source-over", Tn > 0) {
              const Qa = L >>> 16, Ga = L >>> 8 & 255, Ra = L & 255, ea = Qa & 248, xr = Ga & 252, Or = Ra & 248, or = ea << 8 | xr << 3 | Or >> 3;
              n.globalAlpha = Tn, ge !== or && (n.strokeStyle = Qr[or], ge = or), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), Ue !== or && (n.fillStyle = Qr[or], Ue = or), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(be, Pe), n.lineTo(Ge, He), n.lineTo(Ie, Be), n.closePath();
        const At = fn & 248, yn = Et & 252, gn = Mt & 248, en = At << 8 | yn << 3 | gn >> 3;
        ge !== en && (n.strokeStyle = Qr[en], ge = en), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), Ue !== en && (n.fillStyle = Qr[en], Ue = en), n.fill();
        break;
      }
      case 1: {
        const qt = h[ie * 3];
        let fn = qt >>> 16, Et = qt >>> 8 & 255, Mt = qt & 255;
        const Gt = D[ie];
        let Dn = 0;
        if (O === Yn.FogType.RADIAL_FAST || O === Yn.FogType.RADIAL) {
          const Yt = R[ie * 9], At = R[ie * 9 + 1], yn = R[ie * 9 + 2], gn = R[ie * 9 + 3], en = R[ie * 9 + 4], ft = R[ie * 9 + 5], A = R[ie * 9 + 6], ae = R[ie * 9 + 7], me = R[ie * 9 + 8], xe = (Yt + gn + A) * 0.33333, Ae = (At + en + ae) * 0.33333, Ye = (yn + ft + me) * 0.33333;
          if (O === Yn.FogType.RADIAL_FAST) {
            const Ke = U * U, Ft = 1 / (j * j - Ke);
            Dn = (xe * xe + Ae * Ae + Ye * Ye - Ke) * Ft;
          } else
            Dn = (Math.sqrt(xe * xe + Ae * Ae + Ye * Ye) - U) / (j - U);
        } else O === Yn.FogType.LINEAR && (Dn = (Gt - U) / (j - U));
        let jn = Math.max(0, Dn - 0);
        if (jn > 1 && (jn = 1), jn > 0) {
          const Yt = L >>> 16, At = L >>> 8 & 255, yn = L & 255;
          fn = fn * (1 - jn) + Yt * jn | 0, Et = Et * (1 - jn) + At * jn | 0, Mt = Mt * (1 - jn) + yn * jn | 0;
        }
        const Mr = re[ie], Sr = Re[ze[he + Mr]].meshRenderer, Fn = Sr.textureImage;
        if (Fn && Fn.complete && Fn.naturalWidth > 0 && Sr.uvs) {
          const Yt = pe[ie], At = Sr.uvs, yn = Sr.faces[Yt] * 2, gn = Sr.faces[Yt + 1] * 2, en = Sr.faces[Yt + 2] * 2, ft = At[yn] * Fn.width, A = At[yn + 1] * Fn.height, ae = At[gn] * Fn.width, me = At[gn + 1] * Fn.height, xe = At[en] * Fn.width, Ae = At[en + 1] * Fn.height, Ye = ft * (me - Ae) - A * (ae - xe) + (ae * Ae - xe * me);
          if (Math.abs(Ye) > 1e-5) {
            const Ke = 1 / Ye, at = (be * (me - Ae) + Ge * (Ae - A) + Ie * (A - me)) * Ke, Ft = (be * (xe - ae) + Ge * (ft - xe) + Ie * (ae - ft)) * Ke, _t = (be * (ae * Ae - xe * me) + Ge * (xe * A - ft * Ae) + Ie * (ft * me - ae * A)) * Ke, sn = (Pe * (me - Ae) + He * (Ae - A) + Be * (A - me)) * Ke, rn = (Pe * (xe - ae) + He * (ft - xe) + Be * (ae - ft)) * Ke, Fr = (Pe * (ae * Ae - xe * me) + He * (xe * A - ft * Ae) + Be * (ft * me - ae * A)) * Ke;
            if (n.save(), n.beginPath(), n.moveTo(bt, Ht), n.lineTo(un, Gn), n.lineTo(Bt, Cn), n.closePath(), n.clip(), n.setTransform(at, sn, Ft, rn, _t, Fr), n.drawImage(Fn, 0, 0), n.restore(), jn > 0) {
              const Dr = L >>> 16, gt = L >>> 8 & 255, Ct = L & 255, kt = Dr & 248, tt = gt & 252, dn = Ct & 248, Vt = kt << 8 | tt << 3 | dn >> 3;
              n.globalAlpha = jn, ge !== Vt && (n.strokeStyle = Qr[Vt], ge = Vt), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), Ue !== Vt && (n.fillStyle = Qr[Vt], Ue = Vt), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        n.beginPath(), n.moveTo(bt, Ht), n.lineTo(un, Gn), n.lineTo(Bt, Cn), n.closePath();
        const _r = fn & 248, Tn = Et & 252, kr = Mt & 248, wn = _r << 8 | Tn << 3 | kr >> 3;
        Ue !== wn && (n.fillStyle = Qr[wn], Ue = wn), n.fill();
        break;
      }
      case 2: {
        const qt = h[ie * 3];
        let fn = qt >>> 16, Et = qt >>> 8 & 255, Mt = qt & 255;
        const Gt = re[ie], Dn = Re[ze[he + Gt]].meshRenderer, Xt = Dn.textureImage;
        if (Xt && Xt.complete && Xt.naturalWidth > 0 && Dn.uvs) {
          const _r = pe[ie], Tn = Dn.uvs, kr = Dn.faces[_r] * 2, wn = Dn.faces[_r + 1] * 2, Yt = Dn.faces[_r + 2] * 2, At = Tn[kr] * Xt.width, yn = Tn[kr + 1] * Xt.height, gn = Tn[wn] * Xt.width, en = Tn[wn + 1] * Xt.height, ft = Tn[Yt] * Xt.width, A = Tn[Yt + 1] * Xt.height, ae = At * (en - A) - yn * (gn - ft) + (gn * A - ft * en);
          if (Math.abs(ae) > 1e-5) {
            const me = 1 / ae, xe = (be * (en - A) + Ge * (A - yn) + Ie * (yn - en)) * me, Ae = (be * (ft - gn) + Ge * (At - ft) + Ie * (gn - At)) * me, Ye = (be * (gn * A - ft * en) + Ge * (ft * yn - At * A) + Ie * (At * en - gn * yn)) * me, Ke = (Pe * (en - A) + He * (A - yn) + Be * (yn - en)) * me, at = (Pe * (ft - gn) + He * (At - ft) + Be * (gn - At)) * me, Ft = (Pe * (gn * A - ft * en) + He * (ft * yn - At * A) + Be * (At * en - gn * yn)) * me;
            n.save(), n.beginPath(), n.moveTo(bt, Ht), n.lineTo(un, Gn), n.lineTo(Bt, Cn), n.closePath(), n.clip(), n.setTransform(xe, Ke, Ae, at, Ye, Ft), n.drawImage(Xt, 0, 0), n.restore();
            break;
          }
        }
        n.beginPath(), n.moveTo(bt, Ht), n.lineTo(un, Gn), n.lineTo(Bt, Cn), n.closePath();
        const jn = fn & 248, Mr = Et & 252, Sr = Mt & 248, Fn = jn << 8 | Mr << 3 | Sr >> 3;
        Ue !== Fn && (n.fillStyle = Qr[Fn], Ue = Fn), n.fill();
        break;
      }
      case 3: {
        n.beginPath(), n.moveTo(be, Pe), n.lineTo(Ge, He), n.lineTo(Ie, Be), n.closePath(), ge !== 31 && (n.strokeStyle = Qr[31], ge = 31), de !== 5 && (n.lineWidth = 0.5, n.lineJoin = "miter", de = 5), n.stroke();
        break;
      }
      case 4: {
        const qt = ie * 3, fn = h[qt], Et = h[qt + 1], Mt = h[qt + 2], Gt = fn >>> 16, Dn = fn >>> 8 & 255, Xt = fn & 255, jn = Et >>> 16, Mr = Et >>> 8 & 255, Sr = Et & 255, Fn = Mt >>> 16, _r = Mt >>> 8 & 255, Tn = Mt & 255;
        let kr = B >>> 16, wn = B >>> 8 & 255, Yt = B & 255, At = kr, yn = wn, gn = Yt, en = kr, ft = wn, A = Yt, ae = kr, me = wn, xe = Yt, Ae = q[H], Ye = q[H + 1], Ke = q[H + 2], at = q[ue], Ft = q[ue + 1], _t = q[ue + 2], sn = q[Ve], rn = q[Ve + 1], Fr = q[Ve + 2];
        const Dr = Oe[0] + 1;
        for (let ht = 1; ht < Dr; ht++) {
          const Sn = Re[Oe[ht]];
          if (Sn.light.type === 0) {
            const Er = Sn.light.color >>> 16, Jn = Sn.light.color >>> 8 & 255, hr = Sn.light.color & 255, Nt = -Sn.transform.worldMatrix[8], Tt = -Sn.transform.worldMatrix[9], er = -Sn.transform.worldMatrix[10];
            let cn = Ae * Nt + Ye * Tt + Ke * er, vn = at * Nt + Ft * Tt + _t * er, Rn = sn * Nt + rn * Tt + Fr * er;
            cn > 0 && (At += Er * cn, yn += Jn * cn, gn += hr * cn), vn > 0 && (en += Er * vn, ft += Jn * vn, A += hr * vn), Rn > 0 && (ae += Er * Rn, me += Jn * Rn, xe += hr * Rn);
          }
        }
        At *= 39215e-7, yn *= 39215e-7, gn *= 39215e-7, en *= 39215e-7, ft *= 39215e-7, A *= 39215e-7, ae *= 39215e-7, me *= 39215e-7, xe *= 39215e-7;
        let gt = Math.min(Math.max(At, yn, gn), 1), Ct = Math.min(Math.max(en, ft, A), 1), kt = Math.min(Math.max(ae, me, xe), 1), tt = 0;
        const dn = D[ie];
        if (O === Yn.FogType.RADIAL_FAST || O === Yn.FogType.RADIAL) {
          const ht = R[ie * 9], Sn = R[ie * 9 + 1], Er = R[ie * 9 + 2], Jn = R[ie * 9 + 3], hr = R[ie * 9 + 4], Nt = R[ie * 9 + 5], Tt = R[ie * 9 + 6], er = R[ie * 9 + 7], cn = R[ie * 9 + 8], vn = (ht + Jn + Tt) * 0.33333, Rn = (Sn + hr + er) * 0.33333, Ma = (Er + Nt + cn) * 0.33333;
          if (O === Yn.FogType.RADIAL_FAST) {
            const Gr = U * U, Di = 1 / (j * j - Gr);
            tt = (vn * vn + Rn * Rn + Ma * Ma - Gr) * Di;
          } else
            tt = (Math.sqrt(vn * vn + Rn * Rn + Ma * Ma) - U) / (j - U);
        } else O === Yn.FogType.LINEAR && (tt = (dn - U) / (j - U));
        tt > 1 && (tt = 1);
        const Vt = re[ie], ir = Re[ze[he + Vt]].meshRenderer, Xn = ir.textureImage;
        if (Xn && Xn.complete && Xn.naturalWidth > 0 && ir.uvs) {
          const ht = pe[ie], Sn = ir.uvs, Er = ir.faces[ht] * 2, Jn = ir.faces[ht + 1] * 2, hr = ir.faces[ht + 2] * 2, Nt = Sn[Er] * Xn.width, Tt = Sn[Er + 1] * Xn.height, er = Sn[Jn] * Xn.width, cn = Sn[Jn + 1] * Xn.height, vn = Sn[hr] * Xn.width, Rn = Sn[hr + 1] * Xn.height, Ma = Nt * (cn - Rn) - Tt * (er - vn) + (er * Rn - vn * cn);
          if (Math.abs(Ma) > 1e-5) {
            const Gr = 1 / Ma, so = (be * (cn - Rn) + Ge * (Rn - Tt) + Ie * (Tt - cn)) * Gr, Di = (be * (vn - er) + Ge * (Nt - vn) + Ie * (er - Nt)) * Gr, ol = (be * (er * Rn - vn * cn) + Ge * (vn * Tt - Nt * Rn) + Ie * (Nt * cn - er * Tt)) * Gr, ws = (Pe * (cn - Rn) + He * (Rn - Tt) + Be * (Tt - cn)) * Gr, Ka = (Pe * (vn - er) + He * (Nt - vn) + Be * (er - Nt)) * Gr, hi = (Pe * (er * Rn - vn * cn) + He * (vn * Tt - Nt * Rn) + Be * (Nt * cn - er * Tt)) * Gr;
            n.save(), n.beginPath(), n.moveTo(bt, Ht), n.lineTo(un, Gn), n.lineTo(Bt, Cn), n.closePath(), n.clip(), n.setTransform(so, ws, Di, Ka, ol, hi), n.drawImage(Xn, 0, 0), n.restore();
            const Oi = At >= 1 ? 255 : At * 255 | 0, Za = yn >= 1 ? 255 : yn * 255 | 0, co = gn >= 1 ? 255 : gn * 255 | 0, fo = en >= 1 ? 255 : en * 255 | 0, ul = ft >= 1 ? 255 : ft * 255 | 0, Nl = A >= 1 ? 255 : A * 255 | 0, po = ae >= 1 ? 255 : ae * 255 | 0, vo = me >= 1 ? 255 : me * 255 | 0, mi = xe >= 1 ? 255 : xe * 255 | 0, M = (Oi & 248) << 8 | (Za & 252) << 3 | (co & 248) >> 3, F = (fo & 248) << 8 | (ul & 252) << 3 | (Nl & 248) >> 3, K = (po & 248) << 8 | (vo & 252) << 3 | (mi & 248) >> 3;
            let oe = be, we = Pe, ut = Ge, Ne = He, pt = Ie, Wt = Be, Kt = gt, bn = Ct, Pn = kt, Ot = M, Mn = F, tr = K;
            if (Kt > bn) {
              let hn;
              hn = oe, oe = ut, ut = hn, hn = we, we = Ne, Ne = hn, hn = Kt, Kt = bn, bn = hn, hn = Ot, Ot = Mn, Mn = hn;
            }
            if (bn > Pn) {
              let hn;
              hn = ut, ut = pt, pt = hn, hn = Ne, Ne = Wt, Wt = hn, hn = bn, bn = Pn, Pn = hn, hn = Mn, Mn = tr, tr = hn;
            }
            if (Kt > bn) {
              let hn;
              hn = oe, oe = ut, ut = hn, hn = we, we = Ne, Ne = hn, hn = Kt, Kt = bn, bn = hn, hn = Ot, Ot = Mn, Mn = hn;
            }
            if (n.globalCompositeOperation = "multiply", Pn - Kt < 0.01 || Ot === Mn && Mn === tr)
              Ue !== Ot && (n.fillStyle = Qr[Ot], Ue = Ot), n.beginPath(), n.moveTo(bt, Ht), n.lineTo(un, Gn), n.lineTo(Bt, Cn), n.closePath(), n.fill();
            else {
              const hn = (bn - Kt) / (Pn - Kt), Ul = oe + hn * (pt - oe), yi = we + hn * (Wt - we), jl = ut - Ul, cl = -(Ne - yi), _a = jl, Au = cl * cl + _a * _a;
              let Nu, Yo;
              if (Au < 1e-6)
                Nu = pt, Yo = Wt;
              else {
                const Rs = ((pt - oe) * cl + (Wt - we) * _a) / Au;
                Nu = oe + Rs * cl, Yo = we + Rs * _a;
              }
              const Wo = n.createLinearGradient(oe, we, Nu, Yo);
              Wo.addColorStop(0, Qr[Ot]), Wo.addColorStop(1, Qr[tr]), Ue = -1, n.fillStyle = Wo, n.beginPath(), n.moveTo(bt, Ht), n.lineTo(un, Gn), n.lineTo(Bt, Cn), n.closePath(), n.fill();
            }
            if (n.globalCompositeOperation = "source-over", tt > 0) {
              const hn = L >>> 16, Ul = L >>> 8 & 255, yi = L & 255, jl = hn & 248, sl = Ul & 252, cl = yi & 248, _a = jl << 8 | sl << 3 | cl >> 3;
              n.globalAlpha = tt, ge !== _a && (n.strokeStyle = Qr[_a], ge = _a), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), Ue !== _a && (n.fillStyle = Qr[_a], Ue = _a), n.fill(), n.globalAlpha = 1;
            }
            break;
          }
        }
        let On = Gt * At, La = Dn * yn, lr = Xt * gn, Qa = jn * en, Ga = Mr * ft, Ra = Sr * A, ea = Fn * ae, xr = _r * me, Or = Tn * xe;
        if (On = On > 255 ? 255 : On, La = La > 255 ? 255 : La, lr = lr > 255 ? 255 : lr, Qa = Qa > 255 ? 255 : Qa, Ga = Ga > 255 ? 255 : Ga, Ra = Ra > 255 ? 255 : Ra, ea = ea > 255 ? 255 : ea, xr = xr > 255 ? 255 : xr, Or = Or > 255 ? 255 : Or, tt > 0) {
          const ht = 1 - tt, Sn = L >>> 16, Er = L >>> 8 & 255, Jn = L & 255, hr = Sn * tt, Nt = Er * tt, Tt = Jn * tt;
          On = On * ht + hr | 0, La = La * ht + Nt | 0, lr = lr * ht + Tt | 0, Qa = Qa * ht + hr | 0, Ga = Ga * ht + Nt | 0, Ra = Ra * ht + Tt | 0, ea = ea * ht + hr | 0, xr = xr * ht + Nt | 0, Or = Or * ht + Tt | 0;
        } else
          On |= 0, La |= 0, lr |= 0, Qa |= 0, Ga |= 0, Ra |= 0, ea |= 0, xr |= 0, Or |= 0;
        const or = (On & 248) << 8 | (La & 252) << 3 | (lr & 248) >> 3, il = (Qa & 248) << 8 | (Ga & 252) << 3 | (Ra & 248) >> 3, ll = (ea & 248) << 8 | (xr & 252) << 3 | (Or & 248) >> 3;
        if (or === il && il === ll) {
          n.beginPath(), n.moveTo(be, Pe), n.lineTo(Ge, He), n.lineTo(Ie, Be), n.closePath(), Ue !== or && (n.fillStyle = Qr[or], Ue = or), ge !== or && (n.strokeStyle = Qr[or], ge = or), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), n.fill();
          break;
        }
        let ta = be, ba = Pe, Xa = Ge, ua = He, Al = Ie, Aa = Be, an = gt, sa = Ct, pn = kt, ca = or, fa = il, Dt = ll;
        if (an > sa) {
          let ht;
          ht = ta, ta = Xa, Xa = ht, ht = ba, ba = ua, ua = ht, ht = an, an = sa, sa = ht, ht = ca, ca = fa, fa = ht;
        }
        if (sa > pn) {
          let ht;
          ht = Xa, Xa = Al, Al = ht, ht = ua, ua = Aa, Aa = ht, ht = sa, sa = pn, pn = ht, ht = fa, fa = Dt, Dt = ht;
        }
        if (an > sa) {
          let ht;
          ht = ta, ta = Xa, Xa = ht, ht = ba, ba = ua, ua = ht, ht = an, an = sa, sa = ht, ht = ca, ca = fa, fa = ht;
        }
        if (pn - an < 0.01)
          n.beginPath(), n.moveTo(be, Pe), n.lineTo(Ge, He), n.lineTo(Ie, Be), n.closePath(), Ue !== ca && (n.fillStyle = Qr[ca], Ue = ca), ge !== ca && (n.strokeStyle = Qr[ca], ge = ca), de !== 10 && (n.lineWidth = 1, n.lineJoin = "miter", de = 10), n.stroke(), n.fill();
        else {
          const ht = (sa - an) / (pn - an), Sn = ta + ht * (Al - ta), Er = ba + ht * (Aa - ba), Jn = Xa - Sn, Nt = -(ua - Er), Tt = Jn, er = Nt * Nt + Tt * Tt;
          let cn, vn;
          if (er < 1e-6)
            cn = Al, vn = Aa;
          else {
            const Gr = ((Al - ta) * Nt + (Aa - ba) * Tt) / er;
            cn = ta + Gr * Nt, vn = ba + Gr * Tt;
          }
          const Rn = n.createLinearGradient(ta, ba, cn, vn);
          Rn.addColorStop(0, Qr[ca]), Rn.addColorStop(1, Qr[Dt]), Ue = -1, n.fillStyle = Rn, n.beginPath(), n.moveTo(bt, Ht), n.lineTo(un, Gn), n.lineTo(Bt, Cn), n.closePath(), n.fill();
        }
        break;
      }
    }
  }
}
const aE = Oy;
function $C(n, l) {
  this.canvas = l || document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new HC(), this.camera = n, this.scale = 1, this.layers = [];
  for (var s = 0; s < wd.layersCount; s++) {
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
  let y = performance.now(), v = 0, C = performance.now();
  const E = this;
  this.startRenderLoop = function T() {
    requestAnimationFrame(() => {
      const b = performance.now(), R = b - y;
      y = b, v++, b - C >= 500 && (E.lastRenderStats.fps = Math.round(v * 1e3 / (b - C)), v = 0, C = b), E.lastRenderStats.frameTime = R, E.render(), requestAnimationFrame(T);
    });
  };
}
var Ll = $C.prototype;
Ll.size = null;
Ll.scale = 1;
Ll.width = null;
Ll.height = null;
Ll.viewportMatrix = null;
Ll.camera = null;
Ll.canvas = null;
Ll.context = null;
Ll.start = function() {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight), this.startRenderLoop();
};
Ll.render = function() {
  this.camera !== null && this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};
Ll.setSize = function(n, l) {
  const s = n * this.scale, p = l * this.scale;
  this.width = s, this.height = p, this.canvas.width = s, this.canvas.height = p, this.viewportMatrix[0] = s / 2, this.viewportMatrix[5] = -p / 2, this.viewportMatrix[12] = s / 2, this.viewportMatrix[13] = p / 2;
  for (var h = 0; h < this.layers.length; h++) {
    var y = this.layers[h];
    y.canvas.width = s, y.canvas.height = p;
  }
  this.camera.setup(n, l);
};
Ll.getWorldToScreen = function() {
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
Rd.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2
};
function Ts() {
  cr.call(this);
}
Ts.prototype = Object.create(cr.prototype);
Ts.prototype.constructor = Ts;
Ts.prototype.color = 16777215;
Ts.prototype.range = 10;
Ts.prototype.type = Rd.Type.DIRECTIONAL;
Ts.prototype.setGameObject = function(n) {
  cr.prototype.setGameObject.call(this, n), n.light = this;
};
function Rd(n) {
  ki.call(this, n || "light"), this.addComponent(this.light = new Ts());
}
Rd.prototype = Object.create(ki.prototype);
Rd.prototype.constructor = Rd;
var Ey = { exports: {} }, Mv = {}, Cy = { exports: {} }, zn = {};
var iE;
function i4() {
  if (iE) return zn;
  iE = 1;
  var n = /* @__PURE__ */ Symbol.for("react.element"), l = /* @__PURE__ */ Symbol.for("react.portal"), s = /* @__PURE__ */ Symbol.for("react.fragment"), p = /* @__PURE__ */ Symbol.for("react.strict_mode"), h = /* @__PURE__ */ Symbol.for("react.profiler"), y = /* @__PURE__ */ Symbol.for("react.provider"), v = /* @__PURE__ */ Symbol.for("react.context"), C = /* @__PURE__ */ Symbol.for("react.forward_ref"), E = /* @__PURE__ */ Symbol.for("react.suspense"), T = /* @__PURE__ */ Symbol.for("react.memo"), b = /* @__PURE__ */ Symbol.for("react.lazy"), R = Symbol.iterator;
  function D(H) {
    return H === null || typeof H != "object" ? null : (H = R && H[R] || H["@@iterator"], typeof H == "function" ? H : null);
  }
  var O = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, L = Object.assign, U = {};
  function j(H, ue, Ve) {
    this.props = H, this.context = ue, this.refs = U, this.updater = Ve || O;
  }
  j.prototype.isReactComponent = {}, j.prototype.setState = function(H, ue) {
    if (typeof H != "object" && typeof H != "function" && H != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, H, ue, "setState");
  }, j.prototype.forceUpdate = function(H) {
    this.updater.enqueueForceUpdate(this, H, "forceUpdate");
  };
  function X() {
  }
  X.prototype = j.prototype;
  function J(H, ue, Ve) {
    this.props = H, this.context = ue, this.refs = U, this.updater = Ve || O;
  }
  var B = J.prototype = new X();
  B.constructor = J, L(B, j.prototype), B.isPureReactComponent = !0;
  var ee = Array.isArray, q = Object.prototype.hasOwnProperty, re = { current: null }, pe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function ze(H, ue, Ve) {
    var be, Pe = {}, Ge = null, He = null;
    if (ue != null) for (be in ue.ref !== void 0 && (He = ue.ref), ue.key !== void 0 && (Ge = "" + ue.key), ue) q.call(ue, be) && !pe.hasOwnProperty(be) && (Pe[be] = ue[be]);
    var Ie = arguments.length - 2;
    if (Ie === 1) Pe.children = Ve;
    else if (1 < Ie) {
      for (var Be = Array(Ie), Zt = 0; Zt < Ie; Zt++) Be[Zt] = arguments[Zt + 2];
      Pe.children = Be;
    }
    if (H && H.defaultProps) for (be in Ie = H.defaultProps, Ie) Pe[be] === void 0 && (Pe[be] = Ie[be]);
    return { $$typeof: n, type: H, key: Ge, ref: He, props: Pe, _owner: re.current };
  }
  function he(H, ue) {
    return { $$typeof: n, type: H.type, key: ue, ref: H.ref, props: H.props, _owner: H._owner };
  }
  function le(H) {
    return typeof H == "object" && H !== null && H.$$typeof === n;
  }
  function Oe(H) {
    var ue = { "=": "=0", ":": "=2" };
    return "$" + H.replace(/[=:]/g, function(Ve) {
      return ue[Ve];
    });
  }
  var Re = /\/+/g;
  function fe(H, ue) {
    return typeof H == "object" && H !== null && H.key != null ? Oe("" + H.key) : ue.toString(36);
  }
  function ye(H, ue, Ve, be, Pe) {
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
    if (He) return He = H, Pe = Pe(He), H = be === "" ? "." + fe(He, 0) : be, ee(Pe) ? (Ve = "", H != null && (Ve = H.replace(Re, "$&/") + "/"), ye(Pe, ue, Ve, "", function(Zt) {
      return Zt;
    })) : Pe != null && (le(Pe) && (Pe = he(Pe, Ve + (!Pe.key || He && He.key === Pe.key ? "" : ("" + Pe.key).replace(Re, "$&/") + "/") + H)), ue.push(Pe)), 1;
    if (He = 0, be = be === "" ? "." : be + ":", ee(H)) for (var Ie = 0; Ie < H.length; Ie++) {
      Ge = H[Ie];
      var Be = be + fe(Ge, Ie);
      He += ye(Ge, ue, Ve, Be, Pe);
    }
    else if (Be = D(H), typeof Be == "function") for (H = Be.call(H), Ie = 0; !(Ge = H.next()).done; ) Ge = Ge.value, Be = be + fe(Ge, Ie++), He += ye(Ge, ue, Ve, Be, Pe);
    else if (Ge === "object") throw ue = String(H), Error("Objects are not valid as a React child (found: " + (ue === "[object Object]" ? "object with keys {" + Object.keys(H).join(", ") + "}" : ue) + "). If you meant to render a collection of children, use an array instead.");
    return He;
  }
  function Fe(H, ue, Ve) {
    if (H == null) return H;
    var be = [], Pe = 0;
    return ye(H, be, "", "", function(Ge) {
      return ue.call(Ve, Ge, Pe++);
    }), be;
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
  var ge = { current: null }, de = { transition: null }, Le = { ReactCurrentDispatcher: ge, ReactCurrentBatchConfig: de, ReactCurrentOwner: re };
  function ie() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return zn.Children = { map: Fe, forEach: function(H, ue, Ve) {
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
    if (!le(H)) throw Error("React.Children.only expected to receive a single React element child.");
    return H;
  } }, zn.Component = j, zn.Fragment = s, zn.Profiler = h, zn.PureComponent = J, zn.StrictMode = p, zn.Suspense = E, zn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Le, zn.act = ie, zn.cloneElement = function(H, ue, Ve) {
    if (H == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + H + ".");
    var be = L({}, H.props), Pe = H.key, Ge = H.ref, He = H._owner;
    if (ue != null) {
      if (ue.ref !== void 0 && (Ge = ue.ref, He = re.current), ue.key !== void 0 && (Pe = "" + ue.key), H.type && H.type.defaultProps) var Ie = H.type.defaultProps;
      for (Be in ue) q.call(ue, Be) && !pe.hasOwnProperty(Be) && (be[Be] = ue[Be] === void 0 && Ie !== void 0 ? Ie[Be] : ue[Be]);
    }
    var Be = arguments.length - 2;
    if (Be === 1) be.children = Ve;
    else if (1 < Be) {
      Ie = Array(Be);
      for (var Zt = 0; Zt < Be; Zt++) Ie[Zt] = arguments[Zt + 2];
      be.children = Ie;
    }
    return { $$typeof: n, type: H.type, key: Pe, ref: Ge, props: be, _owner: He };
  }, zn.createContext = function(H) {
    return H = { $$typeof: v, _currentValue: H, _currentValue2: H, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, H.Provider = { $$typeof: y, _context: H }, H.Consumer = H;
  }, zn.createElement = ze, zn.createFactory = function(H) {
    var ue = ze.bind(null, H);
    return ue.type = H, ue;
  }, zn.createRef = function() {
    return { current: null };
  }, zn.forwardRef = function(H) {
    return { $$typeof: C, render: H };
  }, zn.isValidElement = le, zn.lazy = function(H) {
    return { $$typeof: b, _payload: { _status: -1, _result: H }, _init: Ue };
  }, zn.memo = function(H, ue) {
    return { $$typeof: T, type: H, compare: ue === void 0 ? null : ue };
  }, zn.startTransition = function(H) {
    var ue = de.transition;
    de.transition = {};
    try {
      H();
    } finally {
      de.transition = ue;
    }
  }, zn.unstable_act = ie, zn.useCallback = function(H, ue) {
    return ge.current.useCallback(H, ue);
  }, zn.useContext = function(H) {
    return ge.current.useContext(H);
  }, zn.useDebugValue = function() {
  }, zn.useDeferredValue = function(H) {
    return ge.current.useDeferredValue(H);
  }, zn.useEffect = function(H, ue) {
    return ge.current.useEffect(H, ue);
  }, zn.useId = function() {
    return ge.current.useId();
  }, zn.useImperativeHandle = function(H, ue, Ve) {
    return ge.current.useImperativeHandle(H, ue, Ve);
  }, zn.useInsertionEffect = function(H, ue) {
    return ge.current.useInsertionEffect(H, ue);
  }, zn.useLayoutEffect = function(H, ue) {
    return ge.current.useLayoutEffect(H, ue);
  }, zn.useMemo = function(H, ue) {
    return ge.current.useMemo(H, ue);
  }, zn.useReducer = function(H, ue, Ve) {
    return ge.current.useReducer(H, ue, Ve);
  }, zn.useRef = function(H) {
    return ge.current.useRef(H);
  }, zn.useState = function(H) {
    return ge.current.useState(H);
  }, zn.useSyncExternalStore = function(H, ue, Ve) {
    return ge.current.useSyncExternalStore(H, ue, Ve);
  }, zn.useTransition = function() {
    return ge.current.useTransition();
  }, zn.version = "18.3.1", zn;
}
var kv = { exports: {} };
kv.exports;
var lE;
function l4() {
  return lE || (lE = 1, (function(n, l) {
    process.env.NODE_ENV !== "production" && (function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var s = "18.3.1", p = /* @__PURE__ */ Symbol.for("react.element"), h = /* @__PURE__ */ Symbol.for("react.portal"), y = /* @__PURE__ */ Symbol.for("react.fragment"), v = /* @__PURE__ */ Symbol.for("react.strict_mode"), C = /* @__PURE__ */ Symbol.for("react.profiler"), E = /* @__PURE__ */ Symbol.for("react.provider"), T = /* @__PURE__ */ Symbol.for("react.context"), b = /* @__PURE__ */ Symbol.for("react.forward_ref"), R = /* @__PURE__ */ Symbol.for("react.suspense"), D = /* @__PURE__ */ Symbol.for("react.suspense_list"), O = /* @__PURE__ */ Symbol.for("react.memo"), L = /* @__PURE__ */ Symbol.for("react.lazy"), U = /* @__PURE__ */ Symbol.for("react.offscreen"), j = Symbol.iterator, X = "@@iterator";
      function J(M) {
        if (M === null || typeof M != "object")
          return null;
        var F = j && M[j] || M[X];
        return typeof F == "function" ? F : null;
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
      }, pe = {}, ze = null;
      function he(M) {
        ze = M;
      }
      pe.setExtraStackFrame = function(M) {
        ze = M;
      }, pe.getCurrentStack = null, pe.getStackAddendum = function() {
        var M = "";
        ze && (M += ze);
        var F = pe.getCurrentStack;
        return F && (M += F() || ""), M;
      };
      var le = !1, Oe = !1, Re = !1, fe = !1, ye = !1, Fe = {
        ReactCurrentDispatcher: B,
        ReactCurrentBatchConfig: ee,
        ReactCurrentOwner: re
      };
      Fe.ReactDebugCurrentFrame = pe, Fe.ReactCurrentActQueue = q;
      function Ue(M) {
        {
          for (var F = arguments.length, K = new Array(F > 1 ? F - 1 : 0), oe = 1; oe < F; oe++)
            K[oe - 1] = arguments[oe];
          de("warn", M, K);
        }
      }
      function ge(M) {
        {
          for (var F = arguments.length, K = new Array(F > 1 ? F - 1 : 0), oe = 1; oe < F; oe++)
            K[oe - 1] = arguments[oe];
          de("error", M, K);
        }
      }
      function de(M, F, K) {
        {
          var oe = Fe.ReactDebugCurrentFrame, we = oe.getStackAddendum();
          we !== "" && (F += "%s", K = K.concat([we]));
          var ut = K.map(function(Ne) {
            return String(Ne);
          });
          ut.unshift("Warning: " + F), Function.prototype.apply.call(console[M], console, ut);
        }
      }
      var Le = {};
      function ie(M, F) {
        {
          var K = M.constructor, oe = K && (K.displayName || K.name) || "ReactClass", we = oe + "." + F;
          if (Le[we])
            return;
          ge("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", F, oe), Le[we] = !0;
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
        enqueueForceUpdate: function(M, F, K) {
          ie(M, "forceUpdate");
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
        enqueueReplaceState: function(M, F, K, oe) {
          ie(M, "replaceState");
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
        enqueueSetState: function(M, F, K, oe) {
          ie(M, "setState");
        }
      }, ue = Object.assign, Ve = {};
      Object.freeze(Ve);
      function be(M, F, K) {
        this.props = M, this.context = F, this.refs = Ve, this.updater = K || H;
      }
      be.prototype.isReactComponent = {}, be.prototype.setState = function(M, F) {
        if (typeof M != "object" && typeof M != "function" && M != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, M, F, "setState");
      }, be.prototype.forceUpdate = function(M) {
        this.updater.enqueueForceUpdate(this, M, "forceUpdate");
      };
      {
        var Pe = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, Ge = function(M, F) {
          Object.defineProperty(be.prototype, M, {
            get: function() {
              Ue("%s(...) is deprecated in plain JavaScript React classes. %s", F[0], F[1]);
            }
          });
        };
        for (var He in Pe)
          Pe.hasOwnProperty(He) && Ge(He, Pe[He]);
      }
      function Ie() {
      }
      Ie.prototype = be.prototype;
      function Be(M, F, K) {
        this.props = M, this.context = F, this.refs = Ve, this.updater = K || H;
      }
      var Zt = Be.prototype = new Ie();
      Zt.constructor = Be, ue(Zt, be.prototype), Zt.isPureReactComponent = !0;
      function kn() {
        var M = {
          current: null
        };
        return Object.seal(M), M;
      }
      var Wn = Array.isArray;
      function ln(M) {
        return Wn(M);
      }
      function _e(M) {
        {
          var F = typeof Symbol == "function" && Symbol.toStringTag, K = F && M[Symbol.toStringTag] || M.constructor.name || "Object";
          return K;
        }
      }
      function nn(M) {
        try {
          return et(M), !1;
        } catch {
          return !0;
        }
      }
      function et(M) {
        return "" + M;
      }
      function Lt(M) {
        if (nn(M))
          return ge("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", _e(M)), et(M);
      }
      function bt(M, F, K) {
        var oe = M.displayName;
        if (oe)
          return oe;
        var we = F.displayName || F.name || "";
        return we !== "" ? K + "(" + we + ")" : K;
      }
      function Ht(M) {
        return M.displayName || "Context";
      }
      function on(M) {
        if (M == null)
          return null;
        if (typeof M.tag == "number" && ge("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof M == "function")
          return M.displayName || M.name || null;
        if (typeof M == "string")
          return M;
        switch (M) {
          case y:
            return "Fragment";
          case h:
            return "Portal";
          case C:
            return "Profiler";
          case v:
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
              return Ht(F) + ".Consumer";
            case E:
              var K = M;
              return Ht(K._context) + ".Provider";
            case b:
              return bt(M, M.render, "ForwardRef");
            case O:
              var oe = M.displayName || null;
              return oe !== null ? oe : on(M.type) || "Memo";
            case L: {
              var we = M, ut = we._payload, Ne = we._init;
              try {
                return on(Ne(ut));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var $t = Object.prototype.hasOwnProperty, En = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Qn, gr, $e;
      $e = {};
      function un(M) {
        if ($t.call(M, "ref")) {
          var F = Object.getOwnPropertyDescriptor(M, "ref").get;
          if (F && F.isReactWarning)
            return !1;
        }
        return M.ref !== void 0;
      }
      function Gn(M) {
        if ($t.call(M, "key")) {
          var F = Object.getOwnPropertyDescriptor(M, "key").get;
          if (F && F.isReactWarning)
            return !1;
        }
        return M.key !== void 0;
      }
      function vr(M, F) {
        var K = function() {
          Qn || (Qn = !0, ge("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", F));
        };
        K.isReactWarning = !0, Object.defineProperty(M, "key", {
          get: K,
          configurable: !0
        });
      }
      function fr(M, F) {
        var K = function() {
          gr || (gr = !0, ge("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", F));
        };
        K.isReactWarning = !0, Object.defineProperty(M, "ref", {
          get: K,
          configurable: !0
        });
      }
      function Me(M) {
        if (typeof M.ref == "string" && re.current && M.__self && re.current.stateNode !== M.__self) {
          var F = on(re.current.type);
          $e[F] || (ge('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', F, M.ref), $e[F] = !0);
        }
      }
      var qe = function(M, F, K, oe, we, ut, Ne) {
        var pt = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: p,
          // Built-in properties that belong on the element
          type: M,
          key: F,
          ref: K,
          props: Ne,
          // Record the component responsible for creating this element.
          _owner: ut
        };
        return pt._store = {}, Object.defineProperty(pt._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(pt, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: oe
        }), Object.defineProperty(pt, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: we
        }), Object.freeze && (Object.freeze(pt.props), Object.freeze(pt)), pt;
      };
      function xt(M, F, K) {
        var oe, we = {}, ut = null, Ne = null, pt = null, Wt = null;
        if (F != null) {
          un(F) && (Ne = F.ref, Me(F)), Gn(F) && (Lt(F.key), ut = "" + F.key), pt = F.__self === void 0 ? null : F.__self, Wt = F.__source === void 0 ? null : F.__source;
          for (oe in F)
            $t.call(F, oe) && !En.hasOwnProperty(oe) && (we[oe] = F[oe]);
        }
        var Kt = arguments.length - 2;
        if (Kt === 1)
          we.children = K;
        else if (Kt > 1) {
          for (var bn = Array(Kt), Pn = 0; Pn < Kt; Pn++)
            bn[Pn] = arguments[Pn + 2];
          Object.freeze && Object.freeze(bn), we.children = bn;
        }
        if (M && M.defaultProps) {
          var Ot = M.defaultProps;
          for (oe in Ot)
            we[oe] === void 0 && (we[oe] = Ot[oe]);
        }
        if (ut || Ne) {
          var Mn = typeof M == "function" ? M.displayName || M.name || "Unknown" : M;
          ut && vr(we, Mn), Ne && fr(we, Mn);
        }
        return qe(M, ut, Ne, pt, Wt, re.current, we);
      }
      function Jt(M, F) {
        var K = qe(M.type, F, M.ref, M._self, M._source, M._owner, M.props);
        return K;
      }
      function Bt(M, F, K) {
        if (M == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + M + ".");
        var oe, we = ue({}, M.props), ut = M.key, Ne = M.ref, pt = M._self, Wt = M._source, Kt = M._owner;
        if (F != null) {
          un(F) && (Ne = F.ref, Kt = re.current), Gn(F) && (Lt(F.key), ut = "" + F.key);
          var bn;
          M.type && M.type.defaultProps && (bn = M.type.defaultProps);
          for (oe in F)
            $t.call(F, oe) && !En.hasOwnProperty(oe) && (F[oe] === void 0 && bn !== void 0 ? we[oe] = bn[oe] : we[oe] = F[oe]);
        }
        var Pn = arguments.length - 2;
        if (Pn === 1)
          we.children = K;
        else if (Pn > 1) {
          for (var Ot = Array(Pn), Mn = 0; Mn < Pn; Mn++)
            Ot[Mn] = arguments[Mn + 2];
          we.children = Ot;
        }
        return qe(M.type, ut, Ne, pt, Wt, Kt, we);
      }
      function Cn(M) {
        return typeof M == "object" && M !== null && M.$$typeof === p;
      }
      var qt = ".", fn = ":";
      function Et(M) {
        var F = /[=:]/g, K = {
          "=": "=0",
          ":": "=2"
        }, oe = M.replace(F, function(we) {
          return K[we];
        });
        return "$" + oe;
      }
      var Mt = !1, Gt = /\/+/g;
      function Dn(M) {
        return M.replace(Gt, "$&/");
      }
      function Xt(M, F) {
        return typeof M == "object" && M !== null && M.key != null ? (Lt(M.key), Et("" + M.key)) : F.toString(36);
      }
      function jn(M, F, K, oe, we) {
        var ut = typeof M;
        (ut === "undefined" || ut === "boolean") && (M = null);
        var Ne = !1;
        if (M === null)
          Ne = !0;
        else
          switch (ut) {
            case "string":
            case "number":
              Ne = !0;
              break;
            case "object":
              switch (M.$$typeof) {
                case p:
                case h:
                  Ne = !0;
              }
          }
        if (Ne) {
          var pt = M, Wt = we(pt), Kt = oe === "" ? qt + Xt(pt, 0) : oe;
          if (ln(Wt)) {
            var bn = "";
            Kt != null && (bn = Dn(Kt) + "/"), jn(Wt, F, bn, "", function(Au) {
              return Au;
            });
          } else Wt != null && (Cn(Wt) && (Wt.key && (!pt || pt.key !== Wt.key) && Lt(Wt.key), Wt = Jt(
            Wt,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            K + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (Wt.key && (!pt || pt.key !== Wt.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              Dn("" + Wt.key) + "/"
            ) : "") + Kt
          )), F.push(Wt));
          return 1;
        }
        var Pn, Ot, Mn = 0, tr = oe === "" ? qt : oe + fn;
        if (ln(M))
          for (var hn = 0; hn < M.length; hn++)
            Pn = M[hn], Ot = tr + Xt(Pn, hn), Mn += jn(Pn, F, K, Ot, we);
        else {
          var Ul = J(M);
          if (typeof Ul == "function") {
            var yi = M;
            Ul === yi.entries && (Mt || Ue("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Mt = !0);
            for (var jl = Ul.call(yi), sl, cl = 0; !(sl = jl.next()).done; )
              Pn = sl.value, Ot = tr + Xt(Pn, cl++), Mn += jn(Pn, F, K, Ot, we);
          } else if (ut === "object") {
            var _a = String(M);
            throw new Error("Objects are not valid as a React child (found: " + (_a === "[object Object]" ? "object with keys {" + Object.keys(M).join(", ") + "}" : _a) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Mn;
      }
      function Mr(M, F, K) {
        if (M == null)
          return M;
        var oe = [], we = 0;
        return jn(M, oe, "", "", function(ut) {
          return F.call(K, ut, we++);
        }), oe;
      }
      function Sr(M) {
        var F = 0;
        return Mr(M, function() {
          F++;
        }), F;
      }
      function Fn(M, F, K) {
        Mr(M, function() {
          F.apply(this, arguments);
        }, K);
      }
      function _r(M) {
        return Mr(M, function(F) {
          return F;
        }) || [];
      }
      function Tn(M) {
        if (!Cn(M))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return M;
      }
      function kr(M) {
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
          $$typeof: E,
          _context: F
        };
        var K = !1, oe = !1, we = !1;
        {
          var ut = {
            $$typeof: T,
            _context: F
          };
          Object.defineProperties(ut, {
            Provider: {
              get: function() {
                return oe || (oe = !0, ge("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), F.Provider;
              },
              set: function(Ne) {
                F.Provider = Ne;
              }
            },
            _currentValue: {
              get: function() {
                return F._currentValue;
              },
              set: function(Ne) {
                F._currentValue = Ne;
              }
            },
            _currentValue2: {
              get: function() {
                return F._currentValue2;
              },
              set: function(Ne) {
                F._currentValue2 = Ne;
              }
            },
            _threadCount: {
              get: function() {
                return F._threadCount;
              },
              set: function(Ne) {
                F._threadCount = Ne;
              }
            },
            Consumer: {
              get: function() {
                return K || (K = !0, ge("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), F.Consumer;
              }
            },
            displayName: {
              get: function() {
                return F.displayName;
              },
              set: function(Ne) {
                we || (Ue("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", Ne), we = !0);
              }
            }
          }), F.Consumer = ut;
        }
        return F._currentRenderer = null, F._currentRenderer2 = null, F;
      }
      var wn = -1, Yt = 0, At = 1, yn = 2;
      function gn(M) {
        if (M._status === wn) {
          var F = M._result, K = F();
          if (K.then(function(ut) {
            if (M._status === Yt || M._status === wn) {
              var Ne = M;
              Ne._status = At, Ne._result = ut;
            }
          }, function(ut) {
            if (M._status === Yt || M._status === wn) {
              var Ne = M;
              Ne._status = yn, Ne._result = ut;
            }
          }), M._status === wn) {
            var oe = M;
            oe._status = Yt, oe._result = K;
          }
        }
        if (M._status === At) {
          var we = M._result;
          return we === void 0 && ge(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, we), "default" in we || ge(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, we), we.default;
        } else
          throw M._result;
      }
      function en(M) {
        var F = {
          // We use these fields to store the result.
          _status: wn,
          _result: M
        }, K = {
          $$typeof: L,
          _payload: F,
          _init: gn
        };
        {
          var oe, we;
          Object.defineProperties(K, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return oe;
              },
              set: function(ut) {
                ge("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), oe = ut, Object.defineProperty(K, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return we;
              },
              set: function(ut) {
                ge("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), we = ut, Object.defineProperty(K, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return K;
      }
      function ft(M) {
        M != null && M.$$typeof === O ? ge("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof M != "function" ? ge("forwardRef requires a render function but was given %s.", M === null ? "null" : typeof M) : M.length !== 0 && M.length !== 2 && ge("forwardRef render functions accept exactly two parameters: props and ref. %s", M.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), M != null && (M.defaultProps != null || M.propTypes != null) && ge("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var F = {
          $$typeof: b,
          render: M
        };
        {
          var K;
          Object.defineProperty(F, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return K;
            },
            set: function(oe) {
              K = oe, !M.name && !M.displayName && (M.displayName = oe);
            }
          });
        }
        return F;
      }
      var A;
      A = /* @__PURE__ */ Symbol.for("react.module.reference");
      function ae(M) {
        return !!(typeof M == "string" || typeof M == "function" || M === y || M === C || ye || M === v || M === R || M === D || fe || M === U || le || Oe || Re || typeof M == "object" && M !== null && (M.$$typeof === L || M.$$typeof === O || M.$$typeof === E || M.$$typeof === T || M.$$typeof === b || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        M.$$typeof === A || M.getModuleId !== void 0));
      }
      function me(M, F) {
        ae(M) || ge("memo: The first argument must be a component. Instead received: %s", M === null ? "null" : typeof M);
        var K = {
          $$typeof: O,
          type: M,
          compare: F === void 0 ? null : F
        };
        {
          var oe;
          Object.defineProperty(K, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return oe;
            },
            set: function(we) {
              oe = we, !M.name && !M.displayName && (M.displayName = we);
            }
          });
        }
        return K;
      }
      function xe() {
        var M = B.current;
        return M === null && ge(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), M;
      }
      function Ae(M) {
        var F = xe();
        if (M._context !== void 0) {
          var K = M._context;
          K.Consumer === M ? ge("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : K.Provider === M && ge("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return F.useContext(M);
      }
      function Ye(M) {
        var F = xe();
        return F.useState(M);
      }
      function Ke(M, F, K) {
        var oe = xe();
        return oe.useReducer(M, F, K);
      }
      function at(M) {
        var F = xe();
        return F.useRef(M);
      }
      function Ft(M, F) {
        var K = xe();
        return K.useEffect(M, F);
      }
      function _t(M, F) {
        var K = xe();
        return K.useInsertionEffect(M, F);
      }
      function sn(M, F) {
        var K = xe();
        return K.useLayoutEffect(M, F);
      }
      function rn(M, F) {
        var K = xe();
        return K.useCallback(M, F);
      }
      function Fr(M, F) {
        var K = xe();
        return K.useMemo(M, F);
      }
      function Dr(M, F, K) {
        var oe = xe();
        return oe.useImperativeHandle(M, F, K);
      }
      function gt(M, F) {
        {
          var K = xe();
          return K.useDebugValue(M, F);
        }
      }
      function Ct() {
        var M = xe();
        return M.useTransition();
      }
      function kt(M) {
        var F = xe();
        return F.useDeferredValue(M);
      }
      function tt() {
        var M = xe();
        return M.useId();
      }
      function dn(M, F, K) {
        var oe = xe();
        return oe.useSyncExternalStore(M, F, K);
      }
      var Vt = 0, ir, Xn, On, La, lr, Qa, Ga;
      function Ra() {
      }
      Ra.__reactDisabledLog = !0;
      function ea() {
        {
          if (Vt === 0) {
            ir = console.log, Xn = console.info, On = console.warn, La = console.error, lr = console.group, Qa = console.groupCollapsed, Ga = console.groupEnd;
            var M = {
              configurable: !0,
              enumerable: !0,
              value: Ra,
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
          Vt++;
        }
      }
      function xr() {
        {
          if (Vt--, Vt === 0) {
            var M = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: ue({}, M, {
                value: ir
              }),
              info: ue({}, M, {
                value: Xn
              }),
              warn: ue({}, M, {
                value: On
              }),
              error: ue({}, M, {
                value: La
              }),
              group: ue({}, M, {
                value: lr
              }),
              groupCollapsed: ue({}, M, {
                value: Qa
              }),
              groupEnd: ue({}, M, {
                value: Ga
              })
            });
          }
          Vt < 0 && ge("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Or = Fe.ReactCurrentDispatcher, or;
      function il(M, F, K) {
        {
          if (or === void 0)
            try {
              throw Error();
            } catch (we) {
              var oe = we.stack.trim().match(/\n( *(at )?)/);
              or = oe && oe[1] || "";
            }
          return `
` + or + M;
        }
      }
      var ll = !1, ta;
      {
        var ba = typeof WeakMap == "function" ? WeakMap : Map;
        ta = new ba();
      }
      function Xa(M, F) {
        if (!M || ll)
          return "";
        {
          var K = ta.get(M);
          if (K !== void 0)
            return K;
        }
        var oe;
        ll = !0;
        var we = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var ut;
        ut = Or.current, Or.current = null, ea();
        try {
          if (F) {
            var Ne = function() {
              throw Error();
            };
            if (Object.defineProperty(Ne.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Ne, []);
              } catch (tr) {
                oe = tr;
              }
              Reflect.construct(M, [], Ne);
            } else {
              try {
                Ne.call();
              } catch (tr) {
                oe = tr;
              }
              M.call(Ne.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (tr) {
              oe = tr;
            }
            M();
          }
        } catch (tr) {
          if (tr && oe && typeof tr.stack == "string") {
            for (var pt = tr.stack.split(`
`), Wt = oe.stack.split(`
`), Kt = pt.length - 1, bn = Wt.length - 1; Kt >= 1 && bn >= 0 && pt[Kt] !== Wt[bn]; )
              bn--;
            for (; Kt >= 1 && bn >= 0; Kt--, bn--)
              if (pt[Kt] !== Wt[bn]) {
                if (Kt !== 1 || bn !== 1)
                  do
                    if (Kt--, bn--, bn < 0 || pt[Kt] !== Wt[bn]) {
                      var Pn = `
` + pt[Kt].replace(" at new ", " at ");
                      return M.displayName && Pn.includes("<anonymous>") && (Pn = Pn.replace("<anonymous>", M.displayName)), typeof M == "function" && ta.set(M, Pn), Pn;
                    }
                  while (Kt >= 1 && bn >= 0);
                break;
              }
          }
        } finally {
          ll = !1, Or.current = ut, xr(), Error.prepareStackTrace = we;
        }
        var Ot = M ? M.displayName || M.name : "", Mn = Ot ? il(Ot) : "";
        return typeof M == "function" && ta.set(M, Mn), Mn;
      }
      function ua(M, F, K) {
        return Xa(M, !1);
      }
      function Al(M) {
        var F = M.prototype;
        return !!(F && F.isReactComponent);
      }
      function Aa(M, F, K) {
        if (M == null)
          return "";
        if (typeof M == "function")
          return Xa(M, Al(M));
        if (typeof M == "string")
          return il(M);
        switch (M) {
          case R:
            return il("Suspense");
          case D:
            return il("SuspenseList");
        }
        if (typeof M == "object")
          switch (M.$$typeof) {
            case b:
              return ua(M.render);
            case O:
              return Aa(M.type, F, K);
            case L: {
              var oe = M, we = oe._payload, ut = oe._init;
              try {
                return Aa(ut(we), F, K);
              } catch {
              }
            }
          }
        return "";
      }
      var an = {}, sa = Fe.ReactDebugCurrentFrame;
      function pn(M) {
        if (M) {
          var F = M._owner, K = Aa(M.type, M._source, F ? F.type : null);
          sa.setExtraStackFrame(K);
        } else
          sa.setExtraStackFrame(null);
      }
      function ca(M, F, K, oe, we) {
        {
          var ut = Function.call.bind($t);
          for (var Ne in M)
            if (ut(M, Ne)) {
              var pt = void 0;
              try {
                if (typeof M[Ne] != "function") {
                  var Wt = Error((oe || "React class") + ": " + K + " type `" + Ne + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof M[Ne] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw Wt.name = "Invariant Violation", Wt;
                }
                pt = M[Ne](F, Ne, oe, K, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Kt) {
                pt = Kt;
              }
              pt && !(pt instanceof Error) && (pn(we), ge("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", oe || "React class", K, Ne, typeof pt), pn(null)), pt instanceof Error && !(pt.message in an) && (an[pt.message] = !0, pn(we), ge("Failed %s type: %s", K, pt.message), pn(null));
            }
        }
      }
      function fa(M) {
        if (M) {
          var F = M._owner, K = Aa(M.type, M._source, F ? F.type : null);
          he(K);
        } else
          he(null);
      }
      var Dt;
      Dt = !1;
      function ht() {
        if (re.current) {
          var M = on(re.current.type);
          if (M)
            return `

Check the render method of \`` + M + "`.";
        }
        return "";
      }
      function Sn(M) {
        if (M !== void 0) {
          var F = M.fileName.replace(/^.*[\\\/]/, ""), K = M.lineNumber;
          return `

Check your code at ` + F + ":" + K + ".";
        }
        return "";
      }
      function Er(M) {
        return M != null ? Sn(M.__source) : "";
      }
      var Jn = {};
      function hr(M) {
        var F = ht();
        if (!F) {
          var K = typeof M == "string" ? M : M.displayName || M.name;
          K && (F = `

Check the top-level render call using <` + K + ">.");
        }
        return F;
      }
      function Nt(M, F) {
        if (!(!M._store || M._store.validated || M.key != null)) {
          M._store.validated = !0;
          var K = hr(F);
          if (!Jn[K]) {
            Jn[K] = !0;
            var oe = "";
            M && M._owner && M._owner !== re.current && (oe = " It was passed a child from " + on(M._owner.type) + "."), fa(M), ge('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', K, oe), fa(null);
          }
        }
      }
      function Tt(M, F) {
        if (typeof M == "object") {
          if (ln(M))
            for (var K = 0; K < M.length; K++) {
              var oe = M[K];
              Cn(oe) && Nt(oe, F);
            }
          else if (Cn(M))
            M._store && (M._store.validated = !0);
          else if (M) {
            var we = J(M);
            if (typeof we == "function" && we !== M.entries)
              for (var ut = we.call(M), Ne; !(Ne = ut.next()).done; )
                Cn(Ne.value) && Nt(Ne.value, F);
          }
        }
      }
      function er(M) {
        {
          var F = M.type;
          if (F == null || typeof F == "string")
            return;
          var K;
          if (typeof F == "function")
            K = F.propTypes;
          else if (typeof F == "object" && (F.$$typeof === b || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          F.$$typeof === O))
            K = F.propTypes;
          else
            return;
          if (K) {
            var oe = on(F);
            ca(K, M.props, "prop", oe, M);
          } else if (F.PropTypes !== void 0 && !Dt) {
            Dt = !0;
            var we = on(F);
            ge("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", we || "Unknown");
          }
          typeof F.getDefaultProps == "function" && !F.getDefaultProps.isReactClassApproved && ge("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function cn(M) {
        {
          for (var F = Object.keys(M.props), K = 0; K < F.length; K++) {
            var oe = F[K];
            if (oe !== "children" && oe !== "key") {
              fa(M), ge("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", oe), fa(null);
              break;
            }
          }
          M.ref !== null && (fa(M), ge("Invalid attribute `ref` supplied to `React.Fragment`."), fa(null));
        }
      }
      function vn(M, F, K) {
        var oe = ae(M);
        if (!oe) {
          var we = "";
          (M === void 0 || typeof M == "object" && M !== null && Object.keys(M).length === 0) && (we += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ut = Er(F);
          ut ? we += ut : we += ht();
          var Ne;
          M === null ? Ne = "null" : ln(M) ? Ne = "array" : M !== void 0 && M.$$typeof === p ? (Ne = "<" + (on(M.type) || "Unknown") + " />", we = " Did you accidentally export a JSX literal instead of a component?") : Ne = typeof M, ge("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Ne, we);
        }
        var pt = xt.apply(this, arguments);
        if (pt == null)
          return pt;
        if (oe)
          for (var Wt = 2; Wt < arguments.length; Wt++)
            Tt(arguments[Wt], M);
        return M === y ? cn(pt) : er(pt), pt;
      }
      var Rn = !1;
      function Ma(M) {
        var F = vn.bind(null, M);
        return F.type = M, Rn || (Rn = !0, Ue("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(F, "type", {
          enumerable: !1,
          get: function() {
            return Ue("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: M
            }), M;
          }
        }), F;
      }
      function Gr(M, F, K) {
        for (var oe = Bt.apply(this, arguments), we = 2; we < arguments.length; we++)
          Tt(arguments[we], oe.type);
        return er(oe), oe;
      }
      function so(M, F) {
        var K = ee.transition;
        ee.transition = {};
        var oe = ee.transition;
        ee.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          M();
        } finally {
          if (ee.transition = K, K === null && oe._updatedFibers) {
            var we = oe._updatedFibers.size;
            we > 10 && Ue("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), oe._updatedFibers.clear();
          }
        }
      }
      var Di = !1, ol = null;
      function ws(M) {
        if (ol === null)
          try {
            var F = ("require" + Math.random()).slice(0, 7), K = n && n[F];
            ol = K.call(n, "timers").setImmediate;
          } catch {
            ol = function(we) {
              Di === !1 && (Di = !0, typeof MessageChannel > "u" && ge("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var ut = new MessageChannel();
              ut.port1.onmessage = we, ut.port2.postMessage(void 0);
            };
          }
        return ol(M);
      }
      var Ka = 0, hi = !1;
      function Oi(M) {
        {
          var F = Ka;
          Ka++, q.current === null && (q.current = []);
          var K = q.isBatchingLegacy, oe;
          try {
            if (q.isBatchingLegacy = !0, oe = M(), !K && q.didScheduleLegacyUpdate) {
              var we = q.current;
              we !== null && (q.didScheduleLegacyUpdate = !1, ul(we));
            }
          } catch (Ot) {
            throw Za(F), Ot;
          } finally {
            q.isBatchingLegacy = K;
          }
          if (oe !== null && typeof oe == "object" && typeof oe.then == "function") {
            var ut = oe, Ne = !1, pt = {
              then: function(Ot, Mn) {
                Ne = !0, ut.then(function(tr) {
                  Za(F), Ka === 0 ? co(tr, Ot, Mn) : Ot(tr);
                }, function(tr) {
                  Za(F), Mn(tr);
                });
              }
            };
            return !hi && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              Ne || (hi = !0, ge("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), pt;
          } else {
            var Wt = oe;
            if (Za(F), Ka === 0) {
              var Kt = q.current;
              Kt !== null && (ul(Kt), q.current = null);
              var bn = {
                then: function(Ot, Mn) {
                  q.current === null ? (q.current = [], co(Wt, Ot, Mn)) : Ot(Wt);
                }
              };
              return bn;
            } else {
              var Pn = {
                then: function(Ot, Mn) {
                  Ot(Wt);
                }
              };
              return Pn;
            }
          }
        }
      }
      function Za(M) {
        M !== Ka - 1 && ge("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ka = M;
      }
      function co(M, F, K) {
        {
          var oe = q.current;
          if (oe !== null)
            try {
              ul(oe), ws(function() {
                oe.length === 0 ? (q.current = null, F(M)) : co(M, F, K);
              });
            } catch (we) {
              K(we);
            }
          else
            F(M);
        }
      }
      var fo = !1;
      function ul(M) {
        if (!fo) {
          fo = !0;
          var F = 0;
          try {
            for (; F < M.length; F++) {
              var K = M[F];
              do
                K = K(!0);
              while (K !== null);
            }
            M.length = 0;
          } catch (oe) {
            throw M = M.slice(F + 1), oe;
          } finally {
            fo = !1;
          }
        }
      }
      var Nl = vn, po = Gr, vo = Ma, mi = {
        map: Mr,
        forEach: Fn,
        count: Sr,
        toArray: _r,
        only: Tn
      };
      l.Children = mi, l.Component = be, l.Fragment = y, l.Profiler = C, l.PureComponent = Be, l.StrictMode = v, l.Suspense = R, l.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Fe, l.act = Oi, l.cloneElement = po, l.createContext = kr, l.createElement = Nl, l.createFactory = vo, l.createRef = kn, l.forwardRef = ft, l.isValidElement = Cn, l.lazy = en, l.memo = me, l.startTransition = so, l.unstable_act = Oi, l.useCallback = rn, l.useContext = Ae, l.useDebugValue = gt, l.useDeferredValue = kt, l.useEffect = Ft, l.useId = tt, l.useImperativeHandle = Dr, l.useInsertionEffect = _t, l.useLayoutEffect = sn, l.useMemo = Fr, l.useReducer = Ke, l.useRef = at, l.useState = Ye, l.useSyncExternalStore = dn, l.useTransition = Ct, l.version = s, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(kv, kv.exports)), kv.exports;
}
var oE;
function zv() {
  return oE || (oE = 1, process.env.NODE_ENV === "production" ? Cy.exports = i4() : Cy.exports = l4()), Cy.exports;
}
var uE;
function o4() {
  if (uE) return Mv;
  uE = 1;
  var n = zv(), l = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.fragment"), p = Object.prototype.hasOwnProperty, h = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function v(C, E, T) {
    var b, R = {}, D = null, O = null;
    T !== void 0 && (D = "" + T), E.key !== void 0 && (D = "" + E.key), E.ref !== void 0 && (O = E.ref);
    for (b in E) p.call(E, b) && !y.hasOwnProperty(b) && (R[b] = E[b]);
    if (C && C.defaultProps) for (b in E = C.defaultProps, E) R[b] === void 0 && (R[b] = E[b]);
    return { $$typeof: l, type: C, key: D, ref: O, props: R, _owner: h.current };
  }
  return Mv.Fragment = s, Mv.jsx = v, Mv.jsxs = v, Mv;
}
var _v = {};
var sE;
function u4() {
  return sE || (sE = 1, process.env.NODE_ENV !== "production" && (function() {
    var n = zv(), l = /* @__PURE__ */ Symbol.for("react.element"), s = /* @__PURE__ */ Symbol.for("react.portal"), p = /* @__PURE__ */ Symbol.for("react.fragment"), h = /* @__PURE__ */ Symbol.for("react.strict_mode"), y = /* @__PURE__ */ Symbol.for("react.profiler"), v = /* @__PURE__ */ Symbol.for("react.provider"), C = /* @__PURE__ */ Symbol.for("react.context"), E = /* @__PURE__ */ Symbol.for("react.forward_ref"), T = /* @__PURE__ */ Symbol.for("react.suspense"), b = /* @__PURE__ */ Symbol.for("react.suspense_list"), R = /* @__PURE__ */ Symbol.for("react.memo"), D = /* @__PURE__ */ Symbol.for("react.lazy"), O = /* @__PURE__ */ Symbol.for("react.offscreen"), L = Symbol.iterator, U = "@@iterator";
    function j(A) {
      if (A === null || typeof A != "object")
        return null;
      var ae = L && A[L] || A[U];
      return typeof ae == "function" ? ae : null;
    }
    var X = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function J(A) {
      {
        for (var ae = arguments.length, me = new Array(ae > 1 ? ae - 1 : 0), xe = 1; xe < ae; xe++)
          me[xe - 1] = arguments[xe];
        B("error", A, me);
      }
    }
    function B(A, ae, me) {
      {
        var xe = X.ReactDebugCurrentFrame, Ae = xe.getStackAddendum();
        Ae !== "" && (ae += "%s", me = me.concat([Ae]));
        var Ye = me.map(function(Ke) {
          return String(Ke);
        });
        Ye.unshift("Warning: " + ae), Function.prototype.apply.call(console[A], console, Ye);
      }
    }
    var ee = !1, q = !1, re = !1, pe = !1, ze = !1, he;
    he = /* @__PURE__ */ Symbol.for("react.module.reference");
    function le(A) {
      return !!(typeof A == "string" || typeof A == "function" || A === p || A === y || ze || A === h || A === T || A === b || pe || A === O || ee || q || re || typeof A == "object" && A !== null && (A.$$typeof === D || A.$$typeof === R || A.$$typeof === v || A.$$typeof === C || A.$$typeof === E || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      A.$$typeof === he || A.getModuleId !== void 0));
    }
    function Oe(A, ae, me) {
      var xe = A.displayName;
      if (xe)
        return xe;
      var Ae = ae.displayName || ae.name || "";
      return Ae !== "" ? me + "(" + Ae + ")" : me;
    }
    function Re(A) {
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
        case b:
          return "SuspenseList";
      }
      if (typeof A == "object")
        switch (A.$$typeof) {
          case C:
            var ae = A;
            return Re(ae) + ".Consumer";
          case v:
            var me = A;
            return Re(me._context) + ".Provider";
          case E:
            return Oe(A, A.render, "ForwardRef");
          case R:
            var xe = A.displayName || null;
            return xe !== null ? xe : fe(A.type) || "Memo";
          case D: {
            var Ae = A, Ye = Ae._payload, Ke = Ae._init;
            try {
              return fe(Ke(Ye));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ye = Object.assign, Fe = 0, Ue, ge, de, Le, ie, H, ue;
    function Ve() {
    }
    Ve.__reactDisabledLog = !0;
    function be() {
      {
        if (Fe === 0) {
          Ue = console.log, ge = console.info, de = console.warn, Le = console.error, ie = console.group, H = console.groupCollapsed, ue = console.groupEnd;
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
            log: ye({}, A, {
              value: Ue
            }),
            info: ye({}, A, {
              value: ge
            }),
            warn: ye({}, A, {
              value: de
            }),
            error: ye({}, A, {
              value: Le
            }),
            group: ye({}, A, {
              value: ie
            }),
            groupCollapsed: ye({}, A, {
              value: H
            }),
            groupEnd: ye({}, A, {
              value: ue
            })
          });
        }
        Fe < 0 && J("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ge = X.ReactCurrentDispatcher, He;
    function Ie(A, ae, me) {
      {
        if (He === void 0)
          try {
            throw Error();
          } catch (Ae) {
            var xe = Ae.stack.trim().match(/\n( *(at )?)/);
            He = xe && xe[1] || "";
          }
        return `
` + He + A;
      }
    }
    var Be = !1, Zt;
    {
      var kn = typeof WeakMap == "function" ? WeakMap : Map;
      Zt = new kn();
    }
    function Wn(A, ae) {
      if (!A || Be)
        return "";
      {
        var me = Zt.get(A);
        if (me !== void 0)
          return me;
      }
      var xe;
      Be = !0;
      var Ae = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Ye;
      Ye = Ge.current, Ge.current = null, be();
      try {
        if (ae) {
          var Ke = function() {
            throw Error();
          };
          if (Object.defineProperty(Ke.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Ke, []);
            } catch (gt) {
              xe = gt;
            }
            Reflect.construct(A, [], Ke);
          } else {
            try {
              Ke.call();
            } catch (gt) {
              xe = gt;
            }
            A.call(Ke.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (gt) {
            xe = gt;
          }
          A();
        }
      } catch (gt) {
        if (gt && xe && typeof gt.stack == "string") {
          for (var at = gt.stack.split(`
`), Ft = xe.stack.split(`
`), _t = at.length - 1, sn = Ft.length - 1; _t >= 1 && sn >= 0 && at[_t] !== Ft[sn]; )
            sn--;
          for (; _t >= 1 && sn >= 0; _t--, sn--)
            if (at[_t] !== Ft[sn]) {
              if (_t !== 1 || sn !== 1)
                do
                  if (_t--, sn--, sn < 0 || at[_t] !== Ft[sn]) {
                    var rn = `
` + at[_t].replace(" at new ", " at ");
                    return A.displayName && rn.includes("<anonymous>") && (rn = rn.replace("<anonymous>", A.displayName)), typeof A == "function" && Zt.set(A, rn), rn;
                  }
                while (_t >= 1 && sn >= 0);
              break;
            }
        }
      } finally {
        Be = !1, Ge.current = Ye, Pe(), Error.prepareStackTrace = Ae;
      }
      var Fr = A ? A.displayName || A.name : "", Dr = Fr ? Ie(Fr) : "";
      return typeof A == "function" && Zt.set(A, Dr), Dr;
    }
    function ln(A, ae, me) {
      return Wn(A, !1);
    }
    function _e(A) {
      var ae = A.prototype;
      return !!(ae && ae.isReactComponent);
    }
    function nn(A, ae, me) {
      if (A == null)
        return "";
      if (typeof A == "function")
        return Wn(A, _e(A));
      if (typeof A == "string")
        return Ie(A);
      switch (A) {
        case T:
          return Ie("Suspense");
        case b:
          return Ie("SuspenseList");
      }
      if (typeof A == "object")
        switch (A.$$typeof) {
          case E:
            return ln(A.render);
          case R:
            return nn(A.type, ae, me);
          case D: {
            var xe = A, Ae = xe._payload, Ye = xe._init;
            try {
              return nn(Ye(Ae), ae, me);
            } catch {
            }
          }
        }
      return "";
    }
    var et = Object.prototype.hasOwnProperty, Lt = {}, bt = X.ReactDebugCurrentFrame;
    function Ht(A) {
      if (A) {
        var ae = A._owner, me = nn(A.type, A._source, ae ? ae.type : null);
        bt.setExtraStackFrame(me);
      } else
        bt.setExtraStackFrame(null);
    }
    function on(A, ae, me, xe, Ae) {
      {
        var Ye = Function.call.bind(et);
        for (var Ke in A)
          if (Ye(A, Ke)) {
            var at = void 0;
            try {
              if (typeof A[Ke] != "function") {
                var Ft = Error((xe || "React class") + ": " + me + " type `" + Ke + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof A[Ke] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ft.name = "Invariant Violation", Ft;
              }
              at = A[Ke](ae, Ke, xe, me, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_t) {
              at = _t;
            }
            at && !(at instanceof Error) && (Ht(Ae), J("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", xe || "React class", me, Ke, typeof at), Ht(null)), at instanceof Error && !(at.message in Lt) && (Lt[at.message] = !0, Ht(Ae), J("Failed %s type: %s", me, at.message), Ht(null));
          }
      }
    }
    var $t = Array.isArray;
    function En(A) {
      return $t(A);
    }
    function Qn(A) {
      {
        var ae = typeof Symbol == "function" && Symbol.toStringTag, me = ae && A[Symbol.toStringTag] || A.constructor.name || "Object";
        return me;
      }
    }
    function gr(A) {
      try {
        return $e(A), !1;
      } catch {
        return !0;
      }
    }
    function $e(A) {
      return "" + A;
    }
    function un(A) {
      if (gr(A))
        return J("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qn(A)), $e(A);
    }
    var Gn = X.ReactCurrentOwner, vr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, fr, Me;
    function qe(A) {
      if (et.call(A, "ref")) {
        var ae = Object.getOwnPropertyDescriptor(A, "ref").get;
        if (ae && ae.isReactWarning)
          return !1;
      }
      return A.ref !== void 0;
    }
    function xt(A) {
      if (et.call(A, "key")) {
        var ae = Object.getOwnPropertyDescriptor(A, "key").get;
        if (ae && ae.isReactWarning)
          return !1;
      }
      return A.key !== void 0;
    }
    function Jt(A, ae) {
      typeof A.ref == "string" && Gn.current;
    }
    function Bt(A, ae) {
      {
        var me = function() {
          fr || (fr = !0, J("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ae));
        };
        me.isReactWarning = !0, Object.defineProperty(A, "key", {
          get: me,
          configurable: !0
        });
      }
    }
    function Cn(A, ae) {
      {
        var me = function() {
          Me || (Me = !0, J("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ae));
        };
        me.isReactWarning = !0, Object.defineProperty(A, "ref", {
          get: me,
          configurable: !0
        });
      }
    }
    var qt = function(A, ae, me, xe, Ae, Ye, Ke) {
      var at = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: l,
        // Built-in properties that belong on the element
        type: A,
        key: ae,
        ref: me,
        props: Ke,
        // Record the component responsible for creating this element.
        _owner: Ye
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
        value: xe
      }), Object.defineProperty(at, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Ae
      }), Object.freeze && (Object.freeze(at.props), Object.freeze(at)), at;
    };
    function fn(A, ae, me, xe, Ae) {
      {
        var Ye, Ke = {}, at = null, Ft = null;
        me !== void 0 && (un(me), at = "" + me), xt(ae) && (un(ae.key), at = "" + ae.key), qe(ae) && (Ft = ae.ref, Jt(ae, Ae));
        for (Ye in ae)
          et.call(ae, Ye) && !vr.hasOwnProperty(Ye) && (Ke[Ye] = ae[Ye]);
        if (A && A.defaultProps) {
          var _t = A.defaultProps;
          for (Ye in _t)
            Ke[Ye] === void 0 && (Ke[Ye] = _t[Ye]);
        }
        if (at || Ft) {
          var sn = typeof A == "function" ? A.displayName || A.name || "Unknown" : A;
          at && Bt(Ke, sn), Ft && Cn(Ke, sn);
        }
        return qt(A, at, Ft, Ae, xe, Gn.current, Ke);
      }
    }
    var Et = X.ReactCurrentOwner, Mt = X.ReactDebugCurrentFrame;
    function Gt(A) {
      if (A) {
        var ae = A._owner, me = nn(A.type, A._source, ae ? ae.type : null);
        Mt.setExtraStackFrame(me);
      } else
        Mt.setExtraStackFrame(null);
    }
    var Dn;
    Dn = !1;
    function Xt(A) {
      return typeof A == "object" && A !== null && A.$$typeof === l;
    }
    function jn() {
      {
        if (Et.current) {
          var A = fe(Et.current.type);
          if (A)
            return `

Check the render method of \`` + A + "`.";
        }
        return "";
      }
    }
    function Mr(A) {
      return "";
    }
    var Sr = {};
    function Fn(A) {
      {
        var ae = jn();
        if (!ae) {
          var me = typeof A == "string" ? A : A.displayName || A.name;
          me && (ae = `

Check the top-level render call using <` + me + ">.");
        }
        return ae;
      }
    }
    function _r(A, ae) {
      {
        if (!A._store || A._store.validated || A.key != null)
          return;
        A._store.validated = !0;
        var me = Fn(ae);
        if (Sr[me])
          return;
        Sr[me] = !0;
        var xe = "";
        A && A._owner && A._owner !== Et.current && (xe = " It was passed a child from " + fe(A._owner.type) + "."), Gt(A), J('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', me, xe), Gt(null);
      }
    }
    function Tn(A, ae) {
      {
        if (typeof A != "object")
          return;
        if (En(A))
          for (var me = 0; me < A.length; me++) {
            var xe = A[me];
            Xt(xe) && _r(xe, ae);
          }
        else if (Xt(A))
          A._store && (A._store.validated = !0);
        else if (A) {
          var Ae = j(A);
          if (typeof Ae == "function" && Ae !== A.entries)
            for (var Ye = Ae.call(A), Ke; !(Ke = Ye.next()).done; )
              Xt(Ke.value) && _r(Ke.value, ae);
        }
      }
    }
    function kr(A) {
      {
        var ae = A.type;
        if (ae == null || typeof ae == "string")
          return;
        var me;
        if (typeof ae == "function")
          me = ae.propTypes;
        else if (typeof ae == "object" && (ae.$$typeof === E || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        ae.$$typeof === R))
          me = ae.propTypes;
        else
          return;
        if (me) {
          var xe = fe(ae);
          on(me, A.props, "prop", xe, A);
        } else if (ae.PropTypes !== void 0 && !Dn) {
          Dn = !0;
          var Ae = fe(ae);
          J("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ae || "Unknown");
        }
        typeof ae.getDefaultProps == "function" && !ae.getDefaultProps.isReactClassApproved && J("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function wn(A) {
      {
        for (var ae = Object.keys(A.props), me = 0; me < ae.length; me++) {
          var xe = ae[me];
          if (xe !== "children" && xe !== "key") {
            Gt(A), J("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", xe), Gt(null);
            break;
          }
        }
        A.ref !== null && (Gt(A), J("Invalid attribute `ref` supplied to `React.Fragment`."), Gt(null));
      }
    }
    var Yt = {};
    function At(A, ae, me, xe, Ae, Ye) {
      {
        var Ke = le(A);
        if (!Ke) {
          var at = "";
          (A === void 0 || typeof A == "object" && A !== null && Object.keys(A).length === 0) && (at += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Ft = Mr();
          Ft ? at += Ft : at += jn();
          var _t;
          A === null ? _t = "null" : En(A) ? _t = "array" : A !== void 0 && A.$$typeof === l ? (_t = "<" + (fe(A.type) || "Unknown") + " />", at = " Did you accidentally export a JSX literal instead of a component?") : _t = typeof A, J("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _t, at);
        }
        var sn = fn(A, ae, me, Ae, Ye);
        if (sn == null)
          return sn;
        if (Ke) {
          var rn = ae.children;
          if (rn !== void 0)
            if (xe)
              if (En(rn)) {
                for (var Fr = 0; Fr < rn.length; Fr++)
                  Tn(rn[Fr], A);
                Object.freeze && Object.freeze(rn);
              } else
                J("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Tn(rn, A);
        }
        if (et.call(ae, "key")) {
          var Dr = fe(A), gt = Object.keys(ae).filter(function(tt) {
            return tt !== "key";
          }), Ct = gt.length > 0 ? "{key: someKey, " + gt.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Yt[Dr + Ct]) {
            var kt = gt.length > 0 ? "{" + gt.join(": ..., ") + ": ...}" : "{}";
            J(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Ct, Dr, kt, Dr), Yt[Dr + Ct] = !0;
          }
        }
        return A === p ? wn(sn) : kr(sn), sn;
      }
    }
    function yn(A, ae, me) {
      return At(A, ae, me, !0);
    }
    function gn(A, ae, me) {
      return At(A, ae, me, !1);
    }
    var en = gn, ft = yn;
    _v.Fragment = p, _v.jsx = en, _v.jsxs = ft;
  })()), _v;
}
var cE;
function s4() {
  return cE || (cE = 1, process.env.NODE_ENV === "production" ? Ey.exports = o4() : Ey.exports = u4()), Ey.exports;
}
var zt = s4(), Ed = zv(), Cd = {}, Ty = { exports: {} }, Wi = {}, wy = { exports: {} }, eS = {};
var fE;
function c4() {
  return fE || (fE = 1, (function(n) {
    function l(de, Le) {
      var ie = de.length;
      de.push(Le);
      e: for (; 0 < ie; ) {
        var H = ie - 1 >>> 1, ue = de[H];
        if (0 < h(ue, Le)) de[H] = Le, de[ie] = ue, ie = H;
        else break e;
      }
    }
    function s(de) {
      return de.length === 0 ? null : de[0];
    }
    function p(de) {
      if (de.length === 0) return null;
      var Le = de[0], ie = de.pop();
      if (ie !== Le) {
        de[0] = ie;
        e: for (var H = 0, ue = de.length, Ve = ue >>> 1; H < Ve; ) {
          var be = 2 * (H + 1) - 1, Pe = de[be], Ge = be + 1, He = de[Ge];
          if (0 > h(Pe, ie)) Ge < ue && 0 > h(He, Pe) ? (de[H] = He, de[Ge] = ie, H = Ge) : (de[H] = Pe, de[be] = ie, H = be);
          else if (Ge < ue && 0 > h(He, ie)) de[H] = He, de[Ge] = ie, H = Ge;
          else break e;
        }
      }
      return Le;
    }
    function h(de, Le) {
      var ie = de.sortIndex - Le.sortIndex;
      return ie !== 0 ? ie : de.id - Le.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var y = performance;
      n.unstable_now = function() {
        return y.now();
      };
    } else {
      var v = Date, C = v.now();
      n.unstable_now = function() {
        return v.now() - C;
      };
    }
    var E = [], T = [], b = 1, R = null, D = 3, O = !1, L = !1, U = !1, j = typeof setTimeout == "function" ? setTimeout : null, X = typeof clearTimeout == "function" ? clearTimeout : null, J = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function B(de) {
      for (var Le = s(T); Le !== null; ) {
        if (Le.callback === null) p(T);
        else if (Le.startTime <= de) p(T), Le.sortIndex = Le.expirationTime, l(E, Le);
        else break;
        Le = s(T);
      }
    }
    function ee(de) {
      if (U = !1, B(de), !L) if (s(E) !== null) L = !0, Ue(q);
      else {
        var Le = s(T);
        Le !== null && ge(ee, Le.startTime - de);
      }
    }
    function q(de, Le) {
      L = !1, U && (U = !1, X(ze), ze = -1), O = !0;
      var ie = D;
      try {
        for (B(Le), R = s(E); R !== null && (!(R.expirationTime > Le) || de && !Oe()); ) {
          var H = R.callback;
          if (typeof H == "function") {
            R.callback = null, D = R.priorityLevel;
            var ue = H(R.expirationTime <= Le);
            Le = n.unstable_now(), typeof ue == "function" ? R.callback = ue : R === s(E) && p(E), B(Le);
          } else p(E);
          R = s(E);
        }
        if (R !== null) var Ve = !0;
        else {
          var be = s(T);
          be !== null && ge(ee, be.startTime - Le), Ve = !1;
        }
        return Ve;
      } finally {
        R = null, D = ie, O = !1;
      }
    }
    var re = !1, pe = null, ze = -1, he = 5, le = -1;
    function Oe() {
      return !(n.unstable_now() - le < he);
    }
    function Re() {
      if (pe !== null) {
        var de = n.unstable_now();
        le = de;
        var Le = !0;
        try {
          Le = pe(!0, de);
        } finally {
          Le ? fe() : (re = !1, pe = null);
        }
      } else re = !1;
    }
    var fe;
    if (typeof J == "function") fe = function() {
      J(Re);
    };
    else if (typeof MessageChannel < "u") {
      var ye = new MessageChannel(), Fe = ye.port2;
      ye.port1.onmessage = Re, fe = function() {
        Fe.postMessage(null);
      };
    } else fe = function() {
      j(Re, 0);
    };
    function Ue(de) {
      pe = de, re || (re = !0, fe());
    }
    function ge(de, Le) {
      ze = j(function() {
        de(n.unstable_now());
      }, Le);
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
      return s(E);
    }, n.unstable_next = function(de) {
      switch (D) {
        case 1:
        case 2:
        case 3:
          var Le = 3;
          break;
        default:
          Le = D;
      }
      var ie = D;
      D = Le;
      try {
        return de();
      } finally {
        D = ie;
      }
    }, n.unstable_pauseExecution = function() {
    }, n.unstable_requestPaint = function() {
    }, n.unstable_runWithPriority = function(de, Le) {
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
      var ie = D;
      D = de;
      try {
        return Le();
      } finally {
        D = ie;
      }
    }, n.unstable_scheduleCallback = function(de, Le, ie) {
      var H = n.unstable_now();
      switch (typeof ie == "object" && ie !== null ? (ie = ie.delay, ie = typeof ie == "number" && 0 < ie ? H + ie : H) : ie = H, de) {
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
      return ue = ie + ue, de = { id: b++, callback: Le, priorityLevel: de, startTime: ie, expirationTime: ue, sortIndex: -1 }, ie > H ? (de.sortIndex = ie, l(T, de), s(E) === null && de === s(T) && (U ? (X(ze), ze = -1) : U = !0, ge(ee, ie - H))) : (de.sortIndex = ue, l(E, de), L || O || (L = !0, Ue(q))), de;
    }, n.unstable_shouldYield = Oe, n.unstable_wrapCallback = function(de) {
      var Le = D;
      return function() {
        var ie = D;
        D = Le;
        try {
          return de.apply(this, arguments);
        } finally {
          D = ie;
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
      function p(Me, qe) {
        var xt = Me.length;
        Me.push(qe), v(Me, qe, xt);
      }
      function h(Me) {
        return Me.length === 0 ? null : Me[0];
      }
      function y(Me) {
        if (Me.length === 0)
          return null;
        var qe = Me[0], xt = Me.pop();
        return xt !== qe && (Me[0] = xt, C(Me, xt, 0)), qe;
      }
      function v(Me, qe, xt) {
        for (var Jt = xt; Jt > 0; ) {
          var Bt = Jt - 1 >>> 1, Cn = Me[Bt];
          if (E(Cn, qe) > 0)
            Me[Bt] = qe, Me[Jt] = Cn, Jt = Bt;
          else
            return;
        }
      }
      function C(Me, qe, xt) {
        for (var Jt = xt, Bt = Me.length, Cn = Bt >>> 1; Jt < Cn; ) {
          var qt = (Jt + 1) * 2 - 1, fn = Me[qt], Et = qt + 1, Mt = Me[Et];
          if (E(fn, qe) < 0)
            Et < Bt && E(Mt, fn) < 0 ? (Me[Jt] = Mt, Me[Et] = qe, Jt = Et) : (Me[Jt] = fn, Me[qt] = qe, Jt = qt);
          else if (Et < Bt && E(Mt, qe) < 0)
            Me[Jt] = Mt, Me[Et] = qe, Jt = Et;
          else
            return;
        }
      }
      function E(Me, qe) {
        var xt = Me.sortIndex - qe.sortIndex;
        return xt !== 0 ? xt : Me.id - qe.id;
      }
      var T = 1, b = 2, R = 3, D = 4, O = 5;
      function L(Me, qe) {
      }
      var U = typeof performance == "object" && typeof performance.now == "function";
      if (U) {
        var j = performance;
        n.unstable_now = function() {
          return j.now();
        };
      } else {
        var X = Date, J = X.now();
        n.unstable_now = function() {
          return X.now() - J;
        };
      }
      var B = 1073741823, ee = -1, q = 250, re = 5e3, pe = 1e4, ze = B, he = [], le = [], Oe = 1, Re = null, fe = R, ye = !1, Fe = !1, Ue = !1, ge = typeof setTimeout == "function" ? setTimeout : null, de = typeof clearTimeout == "function" ? clearTimeout : null, Le = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ie(Me) {
        for (var qe = h(le); qe !== null; ) {
          if (qe.callback === null)
            y(le);
          else if (qe.startTime <= Me)
            y(le), qe.sortIndex = qe.expirationTime, p(he, qe);
          else
            return;
          qe = h(le);
        }
      }
      function H(Me) {
        if (Ue = !1, ie(Me), !Fe)
          if (h(he) !== null)
            Fe = !0, $e(ue);
          else {
            var qe = h(le);
            qe !== null && un(H, qe.startTime - Me);
          }
      }
      function ue(Me, qe) {
        Fe = !1, Ue && (Ue = !1, Gn()), ye = !0;
        var xt = fe;
        try {
          var Jt;
          if (!l) return Ve(Me, qe);
        } finally {
          Re = null, fe = xt, ye = !1;
        }
      }
      function Ve(Me, qe) {
        var xt = qe;
        for (ie(xt), Re = h(he); Re !== null && !(Re.expirationTime > xt && (!Me || bt())); ) {
          var Jt = Re.callback;
          if (typeof Jt == "function") {
            Re.callback = null, fe = Re.priorityLevel;
            var Bt = Re.expirationTime <= xt, Cn = Jt(Bt);
            xt = n.unstable_now(), typeof Cn == "function" ? Re.callback = Cn : Re === h(he) && y(he), ie(xt);
          } else
            y(he);
          Re = h(he);
        }
        if (Re !== null)
          return !0;
        var qt = h(le);
        return qt !== null && un(H, qt.startTime - xt), !1;
      }
      function be(Me, qe) {
        switch (Me) {
          case T:
          case b:
          case R:
          case D:
          case O:
            break;
          default:
            Me = R;
        }
        var xt = fe;
        fe = Me;
        try {
          return qe();
        } finally {
          fe = xt;
        }
      }
      function Pe(Me) {
        var qe;
        switch (fe) {
          case T:
          case b:
          case R:
            qe = R;
            break;
          default:
            qe = fe;
            break;
        }
        var xt = fe;
        fe = qe;
        try {
          return Me();
        } finally {
          fe = xt;
        }
      }
      function Ge(Me) {
        var qe = fe;
        return function() {
          var xt = fe;
          fe = qe;
          try {
            return Me.apply(this, arguments);
          } finally {
            fe = xt;
          }
        };
      }
      function He(Me, qe, xt) {
        var Jt = n.unstable_now(), Bt;
        if (typeof xt == "object" && xt !== null) {
          var Cn = xt.delay;
          typeof Cn == "number" && Cn > 0 ? Bt = Jt + Cn : Bt = Jt;
        } else
          Bt = Jt;
        var qt;
        switch (Me) {
          case T:
            qt = ee;
            break;
          case b:
            qt = q;
            break;
          case O:
            qt = ze;
            break;
          case D:
            qt = pe;
            break;
          case R:
          default:
            qt = re;
            break;
        }
        var fn = Bt + qt, Et = {
          id: Oe++,
          callback: qe,
          priorityLevel: Me,
          startTime: Bt,
          expirationTime: fn,
          sortIndex: -1
        };
        return Bt > Jt ? (Et.sortIndex = Bt, p(le, Et), h(he) === null && Et === h(le) && (Ue ? Gn() : Ue = !0, un(H, Bt - Jt))) : (Et.sortIndex = fn, p(he, Et), !Fe && !ye && (Fe = !0, $e(ue))), Et;
      }
      function Ie() {
      }
      function Be() {
        !Fe && !ye && (Fe = !0, $e(ue));
      }
      function Zt() {
        return h(he);
      }
      function kn(Me) {
        Me.callback = null;
      }
      function Wn() {
        return fe;
      }
      var ln = !1, _e = null, nn = -1, et = s, Lt = -1;
      function bt() {
        var Me = n.unstable_now() - Lt;
        return !(Me < et);
      }
      function Ht() {
      }
      function on(Me) {
        if (Me < 0 || Me > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        Me > 0 ? et = Math.floor(1e3 / Me) : et = s;
      }
      var $t = function() {
        if (_e !== null) {
          var Me = n.unstable_now();
          Lt = Me;
          var qe = !0, xt = !0;
          try {
            xt = _e(qe, Me);
          } finally {
            xt ? En() : (ln = !1, _e = null);
          }
        } else
          ln = !1;
      }, En;
      if (typeof Le == "function")
        En = function() {
          Le($t);
        };
      else if (typeof MessageChannel < "u") {
        var Qn = new MessageChannel(), gr = Qn.port2;
        Qn.port1.onmessage = $t, En = function() {
          gr.postMessage(null);
        };
      } else
        En = function() {
          ge($t, 0);
        };
      function $e(Me) {
        _e = Me, ln || (ln = !0, En());
      }
      function un(Me, qe) {
        nn = ge(function() {
          Me(n.unstable_now());
        }, qe);
      }
      function Gn() {
        de(nn), nn = -1;
      }
      var vr = Ht, fr = null;
      n.unstable_IdlePriority = O, n.unstable_ImmediatePriority = T, n.unstable_LowPriority = D, n.unstable_NormalPriority = R, n.unstable_Profiling = fr, n.unstable_UserBlockingPriority = b, n.unstable_cancelCallback = kn, n.unstable_continueExecution = Be, n.unstable_forceFrameRate = on, n.unstable_getCurrentPriorityLevel = Wn, n.unstable_getFirstCallbackNode = Zt, n.unstable_next = Pe, n.unstable_pauseExecution = Ie, n.unstable_requestPaint = vr, n.unstable_runWithPriority = be, n.unstable_scheduleCallback = He, n.unstable_shouldYield = bt, n.unstable_wrapCallback = Ge, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    })();
  })(tS)), tS;
}
var pE;
function VC() {
  return pE || (pE = 1, process.env.NODE_ENV === "production" ? wy.exports = c4() : wy.exports = f4()), wy.exports;
}
var vE;
function d4() {
  if (vE) return Wi;
  vE = 1;
  var n = zv(), l = VC();
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
  var C = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), E = Object.prototype.hasOwnProperty, T = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, b = {}, R = {};
  function D(r) {
    return E.call(R, r) ? !0 : E.call(b, r) ? !1 : T.test(r) ? R[r] = !0 : (b[r] = !0, !1);
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
  function U(r, a, u, f, m, S, _) {
    this.acceptsBooleans = a === 2 || a === 3 || a === 4, this.attributeName = f, this.attributeNamespace = m, this.mustUseProperty = u, this.propertyName = r, this.type = a, this.sanitizeURL = S, this.removeEmptyString = _;
  }
  var j = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(r) {
    j[r] = new U(r, 0, !1, r, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(r) {
    var a = r[0];
    j[a] = new U(a, 1, !1, r[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(r) {
    j[r] = new U(r, 2, !1, r.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(r) {
    j[r] = new U(r, 2, !1, r, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(r) {
    j[r] = new U(r, 3, !1, r.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(r) {
    j[r] = new U(r, 3, !0, r, null, !1, !1);
  }), ["capture", "download"].forEach(function(r) {
    j[r] = new U(r, 4, !1, r, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(r) {
    j[r] = new U(r, 6, !1, r, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(r) {
    j[r] = new U(r, 5, !1, r.toLowerCase(), null, !1, !1);
  });
  var X = /[\-:]([a-z])/g;
  function J(r) {
    return r[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(r) {
    var a = r.replace(
      X,
      J
    );
    j[a] = new U(a, 1, !1, r, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(r) {
    var a = r.replace(X, J);
    j[a] = new U(a, 1, !1, r, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(r) {
    var a = r.replace(X, J);
    j[a] = new U(a, 1, !1, r, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(r) {
    j[r] = new U(r, 1, !1, r.toLowerCase(), null, !1, !1);
  }), j.xlinkHref = new U("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(r) {
    j[r] = new U(r, 1, !1, r.toLowerCase(), null, !0, !0);
  });
  function B(r, a, u, f) {
    var m = j.hasOwnProperty(a) ? j[a] : null;
    (m !== null ? m.type !== 0 : f || !(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N") && (L(a, u, m, f) && (u = null), f || m === null ? D(a) && (u === null ? r.removeAttribute(a) : r.setAttribute(a, "" + u)) : m.mustUseProperty ? r[m.propertyName] = u === null ? m.type === 3 ? !1 : "" : u : (a = m.attributeName, f = m.attributeNamespace, u === null ? r.removeAttribute(a) : (m = m.type, u = m === 3 || m === 4 && u === !0 ? "" : "" + u, f ? r.setAttributeNS(f, a, u) : r.setAttribute(a, u))));
  }
  var ee = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, q = /* @__PURE__ */ Symbol.for("react.element"), re = /* @__PURE__ */ Symbol.for("react.portal"), pe = /* @__PURE__ */ Symbol.for("react.fragment"), ze = /* @__PURE__ */ Symbol.for("react.strict_mode"), he = /* @__PURE__ */ Symbol.for("react.profiler"), le = /* @__PURE__ */ Symbol.for("react.provider"), Oe = /* @__PURE__ */ Symbol.for("react.context"), Re = /* @__PURE__ */ Symbol.for("react.forward_ref"), fe = /* @__PURE__ */ Symbol.for("react.suspense"), ye = /* @__PURE__ */ Symbol.for("react.suspense_list"), Fe = /* @__PURE__ */ Symbol.for("react.memo"), Ue = /* @__PURE__ */ Symbol.for("react.lazy"), ge = /* @__PURE__ */ Symbol.for("react.offscreen"), de = Symbol.iterator;
  function Le(r) {
    return r === null || typeof r != "object" ? null : (r = de && r[de] || r["@@iterator"], typeof r == "function" ? r : null);
  }
  var ie = Object.assign, H;
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
  function be(r, a) {
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
        return r = be(r.type, !1), r;
      case 11:
        return r = be(r.type.render, !1), r;
      case 1:
        return r = be(r.type, !0), r;
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
      case ze:
        return "StrictMode";
      case fe:
        return "Suspense";
      case ye:
        return "SuspenseList";
    }
    if (typeof r == "object") switch (r.$$typeof) {
      case Oe:
        return (r.displayName || "Context") + ".Consumer";
      case le:
        return (r._context.displayName || "Context") + ".Provider";
      case Re:
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
        return a === ze ? "StrictMode" : "Mode";
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
  function Zt(r) {
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
  function kn(r) {
    r._valueTracker || (r._valueTracker = Zt(r));
  }
  function Wn(r) {
    if (!r) return !1;
    var a = r._valueTracker;
    if (!a) return !0;
    var u = a.getValue(), f = "";
    return r && (f = Be(r) ? r.checked ? "true" : "false" : r.value), r = f, r !== u ? (a.setValue(r), !0) : !1;
  }
  function ln(r) {
    if (r = r || (typeof document < "u" ? document : void 0), typeof r > "u") return null;
    try {
      return r.activeElement || r.body;
    } catch {
      return r.body;
    }
  }
  function _e(r, a) {
    var u = a.checked;
    return ie({}, a, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: u ?? r._wrapperState.initialChecked });
  }
  function nn(r, a) {
    var u = a.defaultValue == null ? "" : a.defaultValue, f = a.checked != null ? a.checked : a.defaultChecked;
    u = Ie(a.value != null ? a.value : u), r._wrapperState = { initialChecked: f, initialValue: u, controlled: a.type === "checkbox" || a.type === "radio" ? a.checked != null : a.value != null };
  }
  function et(r, a) {
    a = a.checked, a != null && B(r, "checked", a, !1);
  }
  function Lt(r, a) {
    et(r, a);
    var u = Ie(a.value), f = a.type;
    if (u != null) f === "number" ? (u === 0 && r.value === "" || r.value != u) && (r.value = "" + u) : r.value !== "" + u && (r.value = "" + u);
    else if (f === "submit" || f === "reset") {
      r.removeAttribute("value");
      return;
    }
    a.hasOwnProperty("value") ? Ht(r, a.type, u) : a.hasOwnProperty("defaultValue") && Ht(r, a.type, Ie(a.defaultValue)), a.checked == null && a.defaultChecked != null && (r.defaultChecked = !!a.defaultChecked);
  }
  function bt(r, a, u) {
    if (a.hasOwnProperty("value") || a.hasOwnProperty("defaultValue")) {
      var f = a.type;
      if (!(f !== "submit" && f !== "reset" || a.value !== void 0 && a.value !== null)) return;
      a = "" + r._wrapperState.initialValue, u || a === r.value || (r.value = a), r.defaultValue = a;
    }
    u = r.name, u !== "" && (r.name = ""), r.defaultChecked = !!r._wrapperState.initialChecked, u !== "" && (r.name = u);
  }
  function Ht(r, a, u) {
    (a !== "number" || ln(r.ownerDocument) !== r) && (u == null ? r.defaultValue = "" + r._wrapperState.initialValue : r.defaultValue !== "" + u && (r.defaultValue = "" + u));
  }
  var on = Array.isArray;
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
  function En(r, a) {
    if (a.dangerouslySetInnerHTML != null) throw Error(s(91));
    return ie({}, a, { value: void 0, defaultValue: void 0, children: "" + r._wrapperState.initialValue });
  }
  function Qn(r, a) {
    var u = a.value;
    if (u == null) {
      if (u = a.children, a = a.defaultValue, u != null) {
        if (a != null) throw Error(s(92));
        if (on(u)) {
          if (1 < u.length) throw Error(s(93));
          u = u[0];
        }
        a = u;
      }
      a == null && (a = ""), u = a;
    }
    r._wrapperState = { initialValue: Ie(u) };
  }
  function gr(r, a) {
    var u = Ie(a.value), f = Ie(a.defaultValue);
    u != null && (u = "" + u, u !== r.value && (r.value = u), a.defaultValue == null && r.defaultValue !== u && (r.defaultValue = u)), f != null && (r.defaultValue = "" + f);
  }
  function $e(r) {
    var a = r.textContent;
    a === r._wrapperState.initialValue && a !== "" && a !== null && (r.value = a);
  }
  function un(r) {
    switch (r) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Gn(r, a) {
    return r == null || r === "http://www.w3.org/1999/xhtml" ? un(a) : r === "http://www.w3.org/2000/svg" && a === "foreignObject" ? "http://www.w3.org/1999/xhtml" : r;
  }
  var vr, fr = (function(r) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(a, u, f, m) {
      MSApp.execUnsafeLocalFunction(function() {
        return r(a, u, f, m);
      });
    } : r;
  })(function(r, a) {
    if (r.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in r) r.innerHTML = a;
    else {
      for (vr = vr || document.createElement("div"), vr.innerHTML = "<svg>" + a.valueOf().toString() + "</svg>", a = vr.firstChild; r.firstChild; ) r.removeChild(r.firstChild);
      for (; a.firstChild; ) r.appendChild(a.firstChild);
    }
  });
  function Me(r, a) {
    if (a) {
      var u = r.firstChild;
      if (u && u === r.lastChild && u.nodeType === 3) {
        u.nodeValue = a;
        return;
      }
    }
    r.textContent = a;
  }
  var qe = {
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
  }, xt = ["Webkit", "ms", "Moz", "O"];
  Object.keys(qe).forEach(function(r) {
    xt.forEach(function(a) {
      a = a + r.charAt(0).toUpperCase() + r.substring(1), qe[a] = qe[r];
    });
  });
  function Jt(r, a, u) {
    return a == null || typeof a == "boolean" || a === "" ? "" : u || typeof a != "number" || a === 0 || qe.hasOwnProperty(r) && qe[r] ? ("" + a).trim() : a + "px";
  }
  function Bt(r, a) {
    r = r.style;
    for (var u in a) if (a.hasOwnProperty(u)) {
      var f = u.indexOf("--") === 0, m = Jt(u, a[u], f);
      u === "float" && (u = "cssFloat"), f ? r.setProperty(u, m) : r[u] = m;
    }
  }
  var Cn = ie({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function qt(r, a) {
    if (a) {
      if (Cn[r] && (a.children != null || a.dangerouslySetInnerHTML != null)) throw Error(s(137, r));
      if (a.dangerouslySetInnerHTML != null) {
        if (a.children != null) throw Error(s(60));
        if (typeof a.dangerouslySetInnerHTML != "object" || !("__html" in a.dangerouslySetInnerHTML)) throw Error(s(61));
      }
      if (a.style != null && typeof a.style != "object") throw Error(s(62));
    }
  }
  function fn(r, a) {
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
  var Et = null;
  function Mt(r) {
    return r = r.target || r.srcElement || window, r.correspondingUseElement && (r = r.correspondingUseElement), r.nodeType === 3 ? r.parentNode : r;
  }
  var Gt = null, Dn = null, Xt = null;
  function jn(r) {
    if (r = mt(r)) {
      if (typeof Gt != "function") throw Error(s(280));
      var a = r.stateNode;
      a && (a = Cr(a), Gt(r.stateNode, r.type, a));
    }
  }
  function Mr(r) {
    Dn ? Xt ? Xt.push(r) : Xt = [r] : Dn = r;
  }
  function Sr() {
    if (Dn) {
      var r = Dn, a = Xt;
      if (Xt = Dn = null, jn(r), a) for (r = 0; r < a.length; r++) jn(a[r]);
    }
  }
  function Fn(r, a) {
    return r(a);
  }
  function _r() {
  }
  var Tn = !1;
  function kr(r, a, u) {
    if (Tn) return r(a, u);
    Tn = !0;
    try {
      return Fn(r, a, u);
    } finally {
      Tn = !1, (Dn !== null || Xt !== null) && (_r(), Sr());
    }
  }
  function wn(r, a) {
    var u = r.stateNode;
    if (u === null) return null;
    var f = Cr(u);
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
  var Yt = !1;
  if (C) try {
    var At = {};
    Object.defineProperty(At, "passive", { get: function() {
      Yt = !0;
    } }), window.addEventListener("test", At, At), window.removeEventListener("test", At, At);
  } catch {
    Yt = !1;
  }
  function yn(r, a, u, f, m, S, _, N, P) {
    var te = Array.prototype.slice.call(arguments, 3);
    try {
      a.apply(u, te);
    } catch (Ce) {
      this.onError(Ce);
    }
  }
  var gn = !1, en = null, ft = !1, A = null, ae = { onError: function(r) {
    gn = !0, en = r;
  } };
  function me(r, a, u, f, m, S, _, N, P) {
    gn = !1, en = null, yn.apply(ae, arguments);
  }
  function xe(r, a, u, f, m, S, _, N, P) {
    if (me.apply(this, arguments), gn) {
      if (gn) {
        var te = en;
        gn = !1, en = null;
      } else throw Error(s(198));
      ft || (ft = !0, A = te);
    }
  }
  function Ae(r) {
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
  function Ye(r) {
    if (r.tag === 13) {
      var a = r.memoizedState;
      if (a === null && (r = r.alternate, r !== null && (a = r.memoizedState)), a !== null) return a.dehydrated;
    }
    return null;
  }
  function Ke(r) {
    if (Ae(r) !== r) throw Error(s(188));
  }
  function at(r) {
    var a = r.alternate;
    if (!a) {
      if (a = Ae(r), a === null) throw Error(s(188));
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
          if (S === u) return Ke(m), r;
          if (S === f) return Ke(m), a;
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
  function Ft(r) {
    return r = at(r), r !== null ? _t(r) : null;
  }
  function _t(r) {
    if (r.tag === 5 || r.tag === 6) return r;
    for (r = r.child; r !== null; ) {
      var a = _t(r);
      if (a !== null) return a;
      r = r.sibling;
    }
    return null;
  }
  var sn = l.unstable_scheduleCallback, rn = l.unstable_cancelCallback, Fr = l.unstable_shouldYield, Dr = l.unstable_requestPaint, gt = l.unstable_now, Ct = l.unstable_getCurrentPriorityLevel, kt = l.unstable_ImmediatePriority, tt = l.unstable_UserBlockingPriority, dn = l.unstable_NormalPriority, Vt = l.unstable_LowPriority, ir = l.unstable_IdlePriority, Xn = null, On = null;
  function La(r) {
    if (On && typeof On.onCommitFiberRoot == "function") try {
      On.onCommitFiberRoot(Xn, r, void 0, (r.current.flags & 128) === 128);
    } catch {
    }
  }
  var lr = Math.clz32 ? Math.clz32 : Ra, Qa = Math.log, Ga = Math.LN2;
  function Ra(r) {
    return r >>>= 0, r === 0 ? 32 : 31 - (Qa(r) / Ga | 0) | 0;
  }
  var ea = 64, xr = 4194304;
  function Or(r) {
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
  function or(r, a) {
    var u = r.pendingLanes;
    if (u === 0) return 0;
    var f = 0, m = r.suspendedLanes, S = r.pingedLanes, _ = u & 268435455;
    if (_ !== 0) {
      var N = _ & ~m;
      N !== 0 ? f = Or(N) : (S &= _, S !== 0 && (f = Or(S)));
    } else _ = u & ~m, _ !== 0 ? f = Or(_) : S !== 0 && (f = Or(S));
    if (f === 0) return 0;
    if (a !== 0 && a !== f && (a & m) === 0 && (m = f & -f, S = a & -a, m >= S || m === 16 && (S & 4194240) !== 0)) return a;
    if ((f & 4) !== 0 && (f |= u & 16), a = r.entangledLanes, a !== 0) for (r = r.entanglements, a &= f; 0 < a; ) u = 31 - lr(a), m = 1 << u, f |= r[u], a &= ~m;
    return f;
  }
  function il(r, a) {
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
  function ll(r, a) {
    for (var u = r.suspendedLanes, f = r.pingedLanes, m = r.expirationTimes, S = r.pendingLanes; 0 < S; ) {
      var _ = 31 - lr(S), N = 1 << _, P = m[_];
      P === -1 ? ((N & u) === 0 || (N & f) !== 0) && (m[_] = il(N, a)) : P <= a && (r.expiredLanes |= N), S &= ~N;
    }
  }
  function ta(r) {
    return r = r.pendingLanes & -1073741825, r !== 0 ? r : r & 1073741824 ? 1073741824 : 0;
  }
  function ba() {
    var r = ea;
    return ea <<= 1, (ea & 4194240) === 0 && (ea = 64), r;
  }
  function Xa(r) {
    for (var a = [], u = 0; 31 > u; u++) a.push(r);
    return a;
  }
  function ua(r, a, u) {
    r.pendingLanes |= a, a !== 536870912 && (r.suspendedLanes = 0, r.pingedLanes = 0), r = r.eventTimes, a = 31 - lr(a), r[a] = u;
  }
  function Al(r, a) {
    var u = r.pendingLanes & ~a;
    r.pendingLanes = a, r.suspendedLanes = 0, r.pingedLanes = 0, r.expiredLanes &= a, r.mutableReadLanes &= a, r.entangledLanes &= a, a = r.entanglements;
    var f = r.eventTimes;
    for (r = r.expirationTimes; 0 < u; ) {
      var m = 31 - lr(u), S = 1 << m;
      a[m] = 0, f[m] = -1, r[m] = -1, u &= ~S;
    }
  }
  function Aa(r, a) {
    var u = r.entangledLanes |= a;
    for (r = r.entanglements; u; ) {
      var f = 31 - lr(u), m = 1 << f;
      m & a | r[f] & a && (r[f] |= a), u &= ~m;
    }
  }
  var an = 0;
  function sa(r) {
    return r &= -r, 1 < r ? 4 < r ? (r & 268435455) !== 0 ? 16 : 536870912 : 4 : 1;
  }
  var pn, ca, fa, Dt, ht, Sn = !1, Er = [], Jn = null, hr = null, Nt = null, Tt = /* @__PURE__ */ new Map(), er = /* @__PURE__ */ new Map(), cn = [], vn = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Rn(r, a) {
    switch (r) {
      case "focusin":
      case "focusout":
        Jn = null;
        break;
      case "dragenter":
      case "dragleave":
        hr = null;
        break;
      case "mouseover":
      case "mouseout":
        Nt = null;
        break;
      case "pointerover":
      case "pointerout":
        Tt.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        er.delete(a.pointerId);
    }
  }
  function Ma(r, a, u, f, m, S) {
    return r === null || r.nativeEvent !== S ? (r = { blockedOn: a, domEventName: u, eventSystemFlags: f, nativeEvent: S, targetContainers: [m] }, a !== null && (a = mt(a), a !== null && ca(a)), r) : (r.eventSystemFlags |= f, a = r.targetContainers, m !== null && a.indexOf(m) === -1 && a.push(m), r);
  }
  function Gr(r, a, u, f, m) {
    switch (a) {
      case "focusin":
        return Jn = Ma(Jn, r, a, u, f, m), !0;
      case "dragenter":
        return hr = Ma(hr, r, a, u, f, m), !0;
      case "mouseover":
        return Nt = Ma(Nt, r, a, u, f, m), !0;
      case "pointerover":
        var S = m.pointerId;
        return Tt.set(S, Ma(Tt.get(S) || null, r, a, u, f, m)), !0;
      case "gotpointercapture":
        return S = m.pointerId, er.set(S, Ma(er.get(S) || null, r, a, u, f, m)), !0;
    }
    return !1;
  }
  function so(r) {
    var a = Jo(r.target);
    if (a !== null) {
      var u = Ae(a);
      if (u !== null) {
        if (a = u.tag, a === 13) {
          if (a = Ye(u), a !== null) {
            r.blockedOn = a, ht(r.priority, function() {
              fa(u);
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
  function Di(r) {
    if (r.blockedOn !== null) return !1;
    for (var a = r.targetContainers; 0 < a.length; ) {
      var u = po(r.domEventName, r.eventSystemFlags, a[0], r.nativeEvent);
      if (u === null) {
        u = r.nativeEvent;
        var f = new u.constructor(u.type, u);
        Et = f, u.target.dispatchEvent(f), Et = null;
      } else return a = mt(u), a !== null && ca(a), r.blockedOn = u, !1;
      a.shift();
    }
    return !0;
  }
  function ol(r, a, u) {
    Di(r) && u.delete(a);
  }
  function ws() {
    Sn = !1, Jn !== null && Di(Jn) && (Jn = null), hr !== null && Di(hr) && (hr = null), Nt !== null && Di(Nt) && (Nt = null), Tt.forEach(ol), er.forEach(ol);
  }
  function Ka(r, a) {
    r.blockedOn === a && (r.blockedOn = null, Sn || (Sn = !0, l.unstable_scheduleCallback(l.unstable_NormalPriority, ws)));
  }
  function hi(r) {
    function a(m) {
      return Ka(m, r);
    }
    if (0 < Er.length) {
      Ka(Er[0], r);
      for (var u = 1; u < Er.length; u++) {
        var f = Er[u];
        f.blockedOn === r && (f.blockedOn = null);
      }
    }
    for (Jn !== null && Ka(Jn, r), hr !== null && Ka(hr, r), Nt !== null && Ka(Nt, r), Tt.forEach(a), er.forEach(a), u = 0; u < cn.length; u++) f = cn[u], f.blockedOn === r && (f.blockedOn = null);
    for (; 0 < cn.length && (u = cn[0], u.blockedOn === null); ) so(u), u.blockedOn === null && cn.shift();
  }
  var Oi = ee.ReactCurrentBatchConfig, Za = !0;
  function co(r, a, u, f) {
    var m = an, S = Oi.transition;
    Oi.transition = null;
    try {
      an = 1, ul(r, a, u, f);
    } finally {
      an = m, Oi.transition = S;
    }
  }
  function fo(r, a, u, f) {
    var m = an, S = Oi.transition;
    Oi.transition = null;
    try {
      an = 4, ul(r, a, u, f);
    } finally {
      an = m, Oi.transition = S;
    }
  }
  function ul(r, a, u, f) {
    if (Za) {
      var m = po(r, a, u, f);
      if (m === null) Qc(r, a, f, Nl, u), Rn(r, f);
      else if (Gr(m, r, a, u, f)) f.stopPropagation();
      else if (Rn(r, f), a & 4 && -1 < vn.indexOf(r)) {
        for (; m !== null; ) {
          var S = mt(m);
          if (S !== null && pn(S), S = po(r, a, u, f), S === null && Qc(r, a, f, Nl, u), S === m) break;
          m = S;
        }
        m !== null && f.stopPropagation();
      } else Qc(r, a, f, null, u);
    }
  }
  var Nl = null;
  function po(r, a, u, f) {
    if (Nl = null, r = Mt(f), r = Jo(r), r !== null) if (a = Ae(r), a === null) r = null;
    else if (u = a.tag, u === 13) {
      if (r = Ye(a), r !== null) return r;
      r = null;
    } else if (u === 3) {
      if (a.stateNode.current.memoizedState.isDehydrated) return a.tag === 3 ? a.stateNode.containerInfo : null;
      r = null;
    } else a !== r && (r = null);
    return Nl = r, null;
  }
  function vo(r) {
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
        switch (Ct()) {
          case kt:
            return 1;
          case tt:
            return 4;
          case dn:
          case Vt:
            return 16;
          case ir:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var mi = null, M = null, F = null;
  function K() {
    if (F) return F;
    var r, a = M, u = a.length, f, m = "value" in mi ? mi.value : mi.textContent, S = m.length;
    for (r = 0; r < u && a[r] === m[r]; r++) ;
    var _ = u - r;
    for (f = 1; f <= _ && a[u - f] === m[S - f]; f++) ;
    return F = m.slice(r, 1 < f ? 1 - f : void 0);
  }
  function oe(r) {
    var a = r.keyCode;
    return "charCode" in r ? (r = r.charCode, r === 0 && a === 13 && (r = 13)) : r = a, r === 10 && (r = 13), 32 <= r || r === 13 ? r : 0;
  }
  function we() {
    return !0;
  }
  function ut() {
    return !1;
  }
  function Ne(r) {
    function a(u, f, m, S, _) {
      this._reactName = u, this._targetInst = m, this.type = f, this.nativeEvent = S, this.target = _, this.currentTarget = null;
      for (var N in r) r.hasOwnProperty(N) && (u = r[N], this[N] = u ? u(S) : S[N]);
      return this.isDefaultPrevented = (S.defaultPrevented != null ? S.defaultPrevented : S.returnValue === !1) ? we : ut, this.isPropagationStopped = ut, this;
    }
    return ie(a.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var u = this.nativeEvent;
      u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = we);
    }, stopPropagation: function() {
      var u = this.nativeEvent;
      u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = we);
    }, persist: function() {
    }, isPersistent: we }), a;
  }
  var pt = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(r) {
    return r.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Wt = Ne(pt), Kt = ie({}, pt, { view: 0, detail: 0 }), bn = Ne(Kt), Pn, Ot, Mn, tr = ie({}, Kt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: _d, button: 0, buttons: 0, relatedTarget: function(r) {
    return r.relatedTarget === void 0 ? r.fromElement === r.srcElement ? r.toElement : r.fromElement : r.relatedTarget;
  }, movementX: function(r) {
    return "movementX" in r ? r.movementX : (r !== Mn && (Mn && r.type === "mousemove" ? (Pn = r.screenX - Mn.screenX, Ot = r.screenY - Mn.screenY) : Ot = Pn = 0, Mn = r), Pn);
  }, movementY: function(r) {
    return "movementY" in r ? r.movementY : Ot;
  } }), hn = Ne(tr), Ul = ie({}, tr, { dataTransfer: 0 }), yi = Ne(Ul), jl = ie({}, Kt, { relatedTarget: 0 }), sl = Ne(jl), cl = ie({}, pt, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), _a = Ne(cl), Au = ie({}, pt, { clipboardData: function(r) {
    return "clipboardData" in r ? r.clipboardData : window.clipboardData;
  } }), Nu = Ne(Au), Yo = ie({}, pt, { data: 0 }), Wo = Ne(Yo), Md = {
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
  }, Rs = {
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
  function Fl(r) {
    var a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(r) : (r = Uy[r]) ? !!a[r] : !1;
  }
  function _d() {
    return Fl;
  }
  var kd = ie({}, Kt, { key: function(r) {
    if (r.key) {
      var a = Md[r.key] || r.key;
      if (a !== "Unidentified") return a;
    }
    return r.type === "keypress" ? (r = oe(r), r === 13 ? "Enter" : String.fromCharCode(r)) : r.type === "keydown" || r.type === "keyup" ? Rs[r.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: _d, charCode: function(r) {
    return r.type === "keypress" ? oe(r) : 0;
  }, keyCode: function(r) {
    return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  }, which: function(r) {
    return r.type === "keypress" ? oe(r) : r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
  } }), Dd = Ne(kd), Od = ie({}, tr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Lv = Ne(Od), Fc = ie({}, Kt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: _d }), Av = Ne(Fc), Ja = ie({}, pt, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Pl = Ne(Ja), Pr = ie({}, tr, {
    deltaX: function(r) {
      return "deltaX" in r ? r.deltaX : "wheelDeltaX" in r ? -r.wheelDeltaX : 0;
    },
    deltaY: function(r) {
      return "deltaY" in r ? r.deltaY : "wheelDeltaY" in r ? -r.wheelDeltaY : "wheelDelta" in r ? -r.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Hl = Ne(Pr), zd = [9, 13, 27, 32], Uu = C && "CompositionEvent" in window, bs = null;
  C && "documentMode" in document && (bs = document.documentMode);
  var Ms = C && "TextEvent" in window && !bs, Nv = C && (!Uu || bs && 8 < bs && 11 >= bs), Uv = " ", Pc = !1;
  function jv(r, a) {
    switch (r) {
      case "keyup":
        return zd.indexOf(a.keyCode) !== -1;
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
  function Fv(r) {
    return r = r.detail, typeof r == "object" && "data" in r ? r.data : null;
  }
  var ju = !1;
  function Pv(r, a) {
    switch (r) {
      case "compositionend":
        return Fv(a);
      case "keypress":
        return a.which !== 32 ? null : (Pc = !0, Uv);
      case "textInput":
        return r = a.data, r === Uv && Pc ? null : r;
      default:
        return null;
    }
  }
  function jy(r, a) {
    if (ju) return r === "compositionend" || !Uu && jv(r, a) ? (r = K(), F = M = mi = null, ju = !1, r) : null;
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
        return Nv && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var Fy = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Hv(r) {
    var a = r && r.nodeName && r.nodeName.toLowerCase();
    return a === "input" ? !!Fy[r.type] : a === "textarea";
  }
  function Ld(r, a, u, f) {
    Mr(f), a = Ls(a, "onChange"), 0 < a.length && (u = new Wt("onChange", "change", null, u, f), r.push({ event: u, listeners: a }));
  }
  var fl = null, Qo = null;
  function $v(r) {
    Ko(r, 0);
  }
  function _s(r) {
    var a = Xi(r);
    if (Wn(a)) return r;
  }
  function Py(r, a) {
    if (r === "change") return a;
  }
  var Vv = !1;
  if (C) {
    var Ad;
    if (C) {
      var Nd = "oninput" in document;
      if (!Nd) {
        var Iv = document.createElement("div");
        Iv.setAttribute("oninput", "return;"), Nd = typeof Iv.oninput == "function";
      }
      Ad = Nd;
    } else Ad = !1;
    Vv = Ad && (!document.documentMode || 9 < document.documentMode);
  }
  function Bv() {
    fl && (fl.detachEvent("onpropertychange", qv), Qo = fl = null);
  }
  function qv(r) {
    if (r.propertyName === "value" && _s(Qo)) {
      var a = [];
      Ld(a, Qo, r, Mt(r)), kr($v, a);
    }
  }
  function Hy(r, a, u) {
    r === "focusin" ? (Bv(), fl = a, Qo = u, fl.attachEvent("onpropertychange", qv)) : r === "focusout" && Bv();
  }
  function Yv(r) {
    if (r === "selectionchange" || r === "keyup" || r === "keydown") return _s(Qo);
  }
  function $y(r, a) {
    if (r === "click") return _s(a);
  }
  function Wv(r, a) {
    if (r === "input" || r === "change") return _s(a);
  }
  function Vy(r, a) {
    return r === a && (r !== 0 || 1 / r === 1 / a) || r !== r && a !== a;
  }
  var Gi = typeof Object.is == "function" ? Object.is : Vy;
  function ks(r, a) {
    if (Gi(r, a)) return !0;
    if (typeof r != "object" || r === null || typeof a != "object" || a === null) return !1;
    var u = Object.keys(r), f = Object.keys(a);
    if (u.length !== f.length) return !1;
    for (f = 0; f < u.length; f++) {
      var m = u[f];
      if (!E.call(a, m) || !Gi(r[m], a[m])) return !1;
    }
    return !0;
  }
  function Qv(r) {
    for (; r && r.firstChild; ) r = r.firstChild;
    return r;
  }
  function Hc(r, a) {
    var u = Qv(r);
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
      u = Qv(u);
    }
  }
  function ho(r, a) {
    return r && a ? r === a ? !0 : r && r.nodeType === 3 ? !1 : a && a.nodeType === 3 ? ho(r, a.parentNode) : "contains" in r ? r.contains(a) : r.compareDocumentPosition ? !!(r.compareDocumentPosition(a) & 16) : !1 : !1;
  }
  function Ds() {
    for (var r = window, a = ln(); a instanceof r.HTMLIFrameElement; ) {
      try {
        var u = typeof a.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) r = a.contentWindow;
      else break;
      a = ln(r.document);
    }
    return a;
  }
  function $c(r) {
    var a = r && r.nodeName && r.nodeName.toLowerCase();
    return a && (a === "input" && (r.type === "text" || r.type === "search" || r.type === "tel" || r.type === "url" || r.type === "password") || a === "textarea" || r.contentEditable === "true");
  }
  function Fu(r) {
    var a = Ds(), u = r.focusedElem, f = r.selectionRange;
    if (a !== u && u && u.ownerDocument && ho(u.ownerDocument.documentElement, u)) {
      if (f !== null && $c(u)) {
        if (a = f.start, r = f.end, r === void 0 && (r = a), "selectionStart" in u) u.selectionStart = a, u.selectionEnd = Math.min(r, u.value.length);
        else if (r = (a = u.ownerDocument || document) && a.defaultView || window, r.getSelection) {
          r = r.getSelection();
          var m = u.textContent.length, S = Math.min(f.start, m);
          f = f.end === void 0 ? S : Math.min(f.end, m), !r.extend && S > f && (m = f, f = S, S = m), m = Hc(u, S);
          var _ = Hc(
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
  var Iy = C && "documentMode" in document && 11 >= document.documentMode, Pu = null, Ud = null, Os = null, jd = !1;
  function Fd(r, a, u) {
    var f = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    jd || Pu == null || Pu !== ln(f) || (f = Pu, "selectionStart" in f && $c(f) ? f = { start: f.selectionStart, end: f.selectionEnd } : (f = (f.ownerDocument && f.ownerDocument.defaultView || window).getSelection(), f = { anchorNode: f.anchorNode, anchorOffset: f.anchorOffset, focusNode: f.focusNode, focusOffset: f.focusOffset }), Os && ks(Os, f) || (Os = f, f = Ls(Ud, "onSelect"), 0 < f.length && (a = new Wt("onSelect", "select", null, a, u), r.push({ event: a, listeners: f }), a.target = Pu)));
  }
  function Vc(r, a) {
    var u = {};
    return u[r.toLowerCase()] = a.toLowerCase(), u["Webkit" + r] = "webkit" + a, u["Moz" + r] = "moz" + a, u;
  }
  var Go = { animationend: Vc("Animation", "AnimationEnd"), animationiteration: Vc("Animation", "AnimationIteration"), animationstart: Vc("Animation", "AnimationStart"), transitionend: Vc("Transition", "TransitionEnd") }, da = {}, Pd = {};
  C && (Pd = document.createElement("div").style, "AnimationEvent" in window || (delete Go.animationend.animation, delete Go.animationiteration.animation, delete Go.animationstart.animation), "TransitionEvent" in window || delete Go.transitionend.transition);
  function Ic(r) {
    if (da[r]) return da[r];
    if (!Go[r]) return r;
    var a = Go[r], u;
    for (u in a) if (a.hasOwnProperty(u) && u in Pd) return da[r] = a[u];
    return r;
  }
  var Gv = Ic("animationend"), Xv = Ic("animationiteration"), Kv = Ic("animationstart"), Zv = Ic("transitionend"), Hd = /* @__PURE__ */ new Map(), Bc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function zi(r, a) {
    Hd.set(r, a), y(a, [r]);
  }
  for (var $d = 0; $d < Bc.length; $d++) {
    var Xo = Bc[$d], By = Xo.toLowerCase(), qy = Xo[0].toUpperCase() + Xo.slice(1);
    zi(By, "on" + qy);
  }
  zi(Gv, "onAnimationEnd"), zi(Xv, "onAnimationIteration"), zi(Kv, "onAnimationStart"), zi("dblclick", "onDoubleClick"), zi("focusin", "onFocus"), zi("focusout", "onBlur"), zi(Zv, "onTransitionEnd"), v("onMouseEnter", ["mouseout", "mouseover"]), v("onMouseLeave", ["mouseout", "mouseover"]), v("onPointerEnter", ["pointerout", "pointerover"]), v("onPointerLeave", ["pointerout", "pointerover"]), y("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), y("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), y("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), y("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), y("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), y("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var zs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Vd = new Set("cancel close invalid load scroll toggle".split(" ").concat(zs));
  function qc(r, a, u) {
    var f = r.type || "unknown-event";
    r.currentTarget = u, xe(f, a, void 0, r), r.currentTarget = null;
  }
  function Ko(r, a) {
    a = (a & 4) !== 0;
    for (var u = 0; u < r.length; u++) {
      var f = r[u], m = f.event;
      f = f.listeners;
      e: {
        var S = void 0;
        if (a) for (var _ = f.length - 1; 0 <= _; _--) {
          var N = f[_], P = N.instance, te = N.currentTarget;
          if (N = N.listener, P !== S && m.isPropagationStopped()) break e;
          qc(m, N, te), S = P;
        }
        else for (_ = 0; _ < f.length; _++) {
          if (N = f[_], P = N.instance, te = N.currentTarget, N = N.listener, P !== S && m.isPropagationStopped()) break e;
          qc(m, N, te), S = P;
        }
      }
    }
    if (ft) throw r = A, ft = !1, A = null, r;
  }
  function Kn(r, a) {
    var u = a[Us];
    u === void 0 && (u = a[Us] = /* @__PURE__ */ new Set());
    var f = r + "__bubble";
    u.has(f) || (Jv(a, r, 2, !1), u.add(f));
  }
  function Yc(r, a, u) {
    var f = 0;
    a && (f |= 4), Jv(u, r, f, a);
  }
  var Wc = "_reactListening" + Math.random().toString(36).slice(2);
  function Hu(r) {
    if (!r[Wc]) {
      r[Wc] = !0, p.forEach(function(u) {
        u !== "selectionchange" && (Vd.has(u) || Yc(u, !1, r), Yc(u, !0, r));
      });
      var a = r.nodeType === 9 ? r : r.ownerDocument;
      a === null || a[Wc] || (a[Wc] = !0, Yc("selectionchange", !1, a));
    }
  }
  function Jv(r, a, u, f) {
    switch (vo(a)) {
      case 1:
        var m = co;
        break;
      case 4:
        m = fo;
        break;
      default:
        m = ul;
    }
    u = m.bind(null, a, u, r), m = void 0, !Yt || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (m = !0), f ? m !== void 0 ? r.addEventListener(a, u, { capture: !0, passive: m }) : r.addEventListener(a, u, !0) : m !== void 0 ? r.addEventListener(a, u, { passive: m }) : r.addEventListener(a, u, !1);
  }
  function Qc(r, a, u, f, m) {
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
          if (_ = Jo(N), _ === null) return;
          if (P = _.tag, P === 5 || P === 6) {
            f = S = _;
            continue e;
          }
          N = N.parentNode;
        }
      }
      f = f.return;
    }
    kr(function() {
      var te = S, Ce = Mt(u), ke = [];
      e: {
        var Ee = Hd.get(r);
        if (Ee !== void 0) {
          var Ze = Wt, it = r;
          switch (r) {
            case "keypress":
              if (oe(u) === 0) break e;
            case "keydown":
            case "keyup":
              Ze = Dd;
              break;
            case "focusin":
              it = "focus", Ze = sl;
              break;
            case "focusout":
              it = "blur", Ze = sl;
              break;
            case "beforeblur":
            case "afterblur":
              Ze = sl;
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
              Ze = hn;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Ze = yi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Ze = Av;
              break;
            case Gv:
            case Xv:
            case Kv:
              Ze = _a;
              break;
            case Zv:
              Ze = Pl;
              break;
            case "scroll":
              Ze = bn;
              break;
            case "wheel":
              Ze = Hl;
              break;
            case "copy":
            case "cut":
            case "paste":
              Ze = Nu;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Ze = Lv;
          }
          var st = (a & 4) !== 0, Ur = !st && r === "scroll", Y = st ? Ee !== null ? Ee + "Capture" : null : Ee;
          st = [];
          for (var V = te, G; V !== null; ) {
            G = V;
            var Te = G.stateNode;
            if (G.tag === 5 && Te !== null && (G = Te, Y !== null && (Te = wn(V, Y), Te != null && st.push($u(V, Te, G)))), Ur) break;
            V = V.return;
          }
          0 < st.length && (Ee = new Ze(Ee, it, null, u, Ce), ke.push({ event: Ee, listeners: st }));
        }
      }
      if ((a & 7) === 0) {
        e: {
          if (Ee = r === "mouseover" || r === "pointerover", Ze = r === "mouseout" || r === "pointerout", Ee && u !== Et && (it = u.relatedTarget || u.fromElement) && (Jo(it) || it[$l])) break e;
          if ((Ze || Ee) && (Ee = Ce.window === Ce ? Ce : (Ee = Ce.ownerDocument) ? Ee.defaultView || Ee.parentWindow : window, Ze ? (it = u.relatedTarget || u.toElement, Ze = te, it = it ? Jo(it) : null, it !== null && (Ur = Ae(it), it !== Ur || it.tag !== 5 && it.tag !== 6) && (it = null)) : (Ze = null, it = te), Ze !== it)) {
            if (st = hn, Te = "onMouseLeave", Y = "onMouseEnter", V = "mouse", (r === "pointerout" || r === "pointerover") && (st = Lv, Te = "onPointerLeave", Y = "onPointerEnter", V = "pointer"), Ur = Ze == null ? Ee : Xi(Ze), G = it == null ? Ee : Xi(it), Ee = new st(Te, V + "leave", Ze, u, Ce), Ee.target = Ur, Ee.relatedTarget = G, Te = null, Jo(Ce) === te && (st = new st(Y, V + "enter", it, u, Ce), st.target = G, st.relatedTarget = Ur, Te = st), Ur = Te, Ze && it) t: {
              for (st = Ze, Y = it, V = 0, G = st; G; G = mo(G)) V++;
              for (G = 0, Te = Y; Te; Te = mo(Te)) G++;
              for (; 0 < V - G; ) st = mo(st), V--;
              for (; 0 < G - V; ) Y = mo(Y), G--;
              for (; V--; ) {
                if (st === Y || Y !== null && st === Y.alternate) break t;
                st = mo(st), Y = mo(Y);
              }
              st = null;
            }
            else st = null;
            Ze !== null && eh(ke, Ee, Ze, st, !1), it !== null && Ur !== null && eh(ke, Ur, it, st, !0);
          }
        }
        e: {
          if (Ee = te ? Xi(te) : window, Ze = Ee.nodeName && Ee.nodeName.toLowerCase(), Ze === "select" || Ze === "input" && Ee.type === "file") var lt = Py;
          else if (Hv(Ee)) if (Vv) lt = Wv;
          else {
            lt = Yv;
            var wt = Hy;
          }
          else (Ze = Ee.nodeName) && Ze.toLowerCase() === "input" && (Ee.type === "checkbox" || Ee.type === "radio") && (lt = $y);
          if (lt && (lt = lt(r, te))) {
            Ld(ke, lt, u, Ce);
            break e;
          }
          wt && wt(r, Ee, te), r === "focusout" && (wt = Ee._wrapperState) && wt.controlled && Ee.type === "number" && Ht(Ee, "number", Ee.value);
        }
        switch (wt = te ? Xi(te) : window, r) {
          case "focusin":
            (Hv(wt) || wt.contentEditable === "true") && (Pu = wt, Ud = te, Os = null);
            break;
          case "focusout":
            Os = Ud = Pu = null;
            break;
          case "mousedown":
            jd = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            jd = !1, Fd(ke, u, Ce);
            break;
          case "selectionchange":
            if (Iy) break;
          case "keydown":
          case "keyup":
            Fd(ke, u, Ce);
        }
        var Rt;
        if (Uu) e: {
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
        else ju ? jv(r, u) && (Pt = "onCompositionEnd") : r === "keydown" && u.keyCode === 229 && (Pt = "onCompositionStart");
        Pt && (Nv && u.locale !== "ko" && (ju || Pt !== "onCompositionStart" ? Pt === "onCompositionEnd" && ju && (Rt = K()) : (mi = Ce, M = "value" in mi ? mi.value : mi.textContent, ju = !0)), wt = Ls(te, Pt), 0 < wt.length && (Pt = new Wo(Pt, r, null, u, Ce), ke.push({ event: Pt, listeners: wt }), Rt ? Pt.data = Rt : (Rt = Fv(u), Rt !== null && (Pt.data = Rt)))), (Rt = Ms ? Pv(r, u) : jy(r, u)) && (te = Ls(te, "onBeforeInput"), 0 < te.length && (Ce = new Wo("onBeforeInput", "beforeinput", null, u, Ce), ke.push({ event: Ce, listeners: te }), Ce.data = Rt));
      }
      Ko(ke, a);
    });
  }
  function $u(r, a, u) {
    return { instance: r, listener: a, currentTarget: u };
  }
  function Ls(r, a) {
    for (var u = a + "Capture", f = []; r !== null; ) {
      var m = r, S = m.stateNode;
      m.tag === 5 && S !== null && (m = S, S = wn(r, u), S != null && f.unshift($u(r, S, m)), S = wn(r, a), S != null && f.push($u(r, S, m))), r = r.return;
    }
    return f;
  }
  function mo(r) {
    if (r === null) return null;
    do
      r = r.return;
    while (r && r.tag !== 5);
    return r || null;
  }
  function eh(r, a, u, f, m) {
    for (var S = a._reactName, _ = []; u !== null && u !== f; ) {
      var N = u, P = N.alternate, te = N.stateNode;
      if (P !== null && P === f) break;
      N.tag === 5 && te !== null && (N = te, m ? (P = wn(u, S), P != null && _.unshift($u(u, P, N))) : m || (P = wn(u, S), P != null && _.push($u(u, P, N)))), u = u.return;
    }
    _.length !== 0 && r.push({ event: a, listeners: _ });
  }
  var th = /\r\n?/g, Yy = /\u0000|\uFFFD/g;
  function nh(r) {
    return (typeof r == "string" ? r : "" + r).replace(th, `
`).replace(Yy, "");
  }
  function Gc(r, a, u) {
    if (a = nh(a), nh(r) !== a && u) throw Error(s(425));
  }
  function yo() {
  }
  var As = null, Zo = null;
  function Xc(r, a) {
    return r === "textarea" || r === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
  }
  var Kc = typeof setTimeout == "function" ? setTimeout : void 0, Id = typeof clearTimeout == "function" ? clearTimeout : void 0, rh = typeof Promise == "function" ? Promise : void 0, Vu = typeof queueMicrotask == "function" ? queueMicrotask : typeof rh < "u" ? function(r) {
    return rh.resolve(null).then(r).catch(Zc);
  } : Kc;
  function Zc(r) {
    setTimeout(function() {
      throw r;
    });
  }
  function Iu(r, a) {
    var u = a, f = 0;
    do {
      var m = u.nextSibling;
      if (r.removeChild(u), m && m.nodeType === 8) if (u = m.data, u === "/$") {
        if (f === 0) {
          r.removeChild(m), hi(a);
          return;
        }
        f--;
      } else u !== "$" && u !== "$?" && u !== "$!" || f++;
      u = m;
    } while (u);
    hi(a);
  }
  function dl(r) {
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
  var go = Math.random().toString(36).slice(2), pl = "__reactFiber$" + go, Ns = "__reactProps$" + go, $l = "__reactContainer$" + go, Us = "__reactEvents$" + go, Bu = "__reactListeners$" + go, Wy = "__reactHandles$" + go;
  function Jo(r) {
    var a = r[pl];
    if (a) return a;
    for (var u = r.parentNode; u; ) {
      if (a = u[$l] || u[pl]) {
        if (u = a.alternate, a.child !== null || u !== null && u.child !== null) for (r = ah(r); r !== null; ) {
          if (u = r[pl]) return u;
          r = ah(r);
        }
        return a;
      }
      r = u, u = r.parentNode;
    }
    return null;
  }
  function mt(r) {
    return r = r[pl] || r[$l], !r || r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3 ? null : r;
  }
  function Xi(r) {
    if (r.tag === 5 || r.tag === 6) return r.stateNode;
    throw Error(s(33));
  }
  function Cr(r) {
    return r[Ns] || null;
  }
  var Ln = [], Li = -1;
  function Ai(r) {
    return { current: r };
  }
  function sr(r) {
    0 > Li || (r.current = Ln[Li], Ln[Li] = null, Li--);
  }
  function vt(r, a) {
    Li++, Ln[Li] = r.current, r.current = a;
  }
  var ka = {}, br = Ai(ka), Xr = Ai(!1), ei = ka;
  function ti(r, a) {
    var u = r.type.contextTypes;
    if (!u) return ka;
    var f = r.stateNode;
    if (f && f.__reactInternalMemoizedUnmaskedChildContext === a) return f.__reactInternalMemoizedMaskedChildContext;
    var m = {}, S;
    for (S in u) m[S] = a[S];
    return f && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = a, r.__reactInternalMemoizedMaskedChildContext = m), m;
  }
  function Hr(r) {
    return r = r.childContextTypes, r != null;
  }
  function qu() {
    sr(Xr), sr(br);
  }
  function ih(r, a, u) {
    if (br.current !== ka) throw Error(s(168));
    vt(br, a), vt(Xr, u);
  }
  function js(r, a, u) {
    var f = r.stateNode;
    if (a = a.childContextTypes, typeof f.getChildContext != "function") return u;
    f = f.getChildContext();
    for (var m in f) if (!(m in a)) throw Error(s(108, He(r) || "Unknown", m));
    return ie({}, u, f);
  }
  function na(r) {
    return r = (r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext || ka, ei = br.current, vt(br, r), vt(Xr, Xr.current), !0;
  }
  function Jc(r, a, u) {
    var f = r.stateNode;
    if (!f) throw Error(s(169));
    u ? (r = js(r, a, ei), f.__reactInternalMemoizedMergedChildContext = r, sr(Xr), sr(br), vt(br, r)) : sr(Xr), vt(Xr, u);
  }
  var vl = null, Yu = !1, Vl = !1;
  function ef(r) {
    vl === null ? vl = [r] : vl.push(r);
  }
  function So(r) {
    Yu = !0, ef(r);
  }
  function hl() {
    if (!Vl && vl !== null) {
      Vl = !0;
      var r = 0, a = an;
      try {
        var u = vl;
        for (an = 1; r < u.length; r++) {
          var f = u[r];
          do
            f = f(!0);
          while (f !== null);
        }
        vl = null, Yu = !1;
      } catch (m) {
        throw vl !== null && (vl = vl.slice(r + 1)), sn(kt, hl), m;
      } finally {
        an = a, Vl = !1;
      }
    }
    return null;
  }
  var xo = [], Eo = 0, Co = null, Il = 0, $r = [], Ni = 0, gi = null, ml = 1, yl = "";
  function eu(r, a) {
    xo[Eo++] = Il, xo[Eo++] = Co, Co = r, Il = a;
  }
  function lh(r, a, u) {
    $r[Ni++] = ml, $r[Ni++] = yl, $r[Ni++] = gi, gi = r;
    var f = ml;
    r = yl;
    var m = 32 - lr(f) - 1;
    f &= ~(1 << m), u += 1;
    var S = 32 - lr(a) + m;
    if (30 < S) {
      var _ = m - m % 5;
      S = (f & (1 << _) - 1).toString(32), f >>= _, m -= _, ml = 1 << 32 - lr(a) + m | u << m | f, yl = S + r;
    } else ml = 1 << S | u << m | f, yl = r;
  }
  function tf(r) {
    r.return !== null && (eu(r, 1), lh(r, 1, 0));
  }
  function nf(r) {
    for (; r === Co; ) Co = xo[--Eo], xo[Eo] = null, Il = xo[--Eo], xo[Eo] = null;
    for (; r === gi; ) gi = $r[--Ni], $r[Ni] = null, yl = $r[--Ni], $r[Ni] = null, ml = $r[--Ni], $r[Ni] = null;
  }
  var ni = null, ri = null, mr = !1, Ui = null;
  function Bd(r, a) {
    var u = $i(5, null, null, 0);
    u.elementType = "DELETED", u.stateNode = a, u.return = r, a = r.deletions, a === null ? (r.deletions = [u], r.flags |= 16) : a.push(u);
  }
  function oh(r, a) {
    switch (r.tag) {
      case 5:
        var u = r.type;
        return a = a.nodeType !== 1 || u.toLowerCase() !== a.nodeName.toLowerCase() ? null : a, a !== null ? (r.stateNode = a, ni = r, ri = dl(a.firstChild), !0) : !1;
      case 6:
        return a = r.pendingProps === "" || a.nodeType !== 3 ? null : a, a !== null ? (r.stateNode = a, ni = r, ri = null, !0) : !1;
      case 13:
        return a = a.nodeType !== 8 ? null : a, a !== null ? (u = gi !== null ? { id: ml, overflow: yl } : null, r.memoizedState = { dehydrated: a, treeContext: u, retryLane: 1073741824 }, u = $i(18, null, null, 0), u.stateNode = a, u.return = r, r.child = u, ni = r, ri = null, !0) : !1;
      default:
        return !1;
    }
  }
  function qd(r) {
    return (r.mode & 1) !== 0 && (r.flags & 128) === 0;
  }
  function Yd(r) {
    if (mr) {
      var a = ri;
      if (a) {
        var u = a;
        if (!oh(r, a)) {
          if (qd(r)) throw Error(s(418));
          a = dl(u.nextSibling);
          var f = ni;
          a && oh(r, a) ? Bd(f, u) : (r.flags = r.flags & -4097 | 2, mr = !1, ni = r);
        }
      } else {
        if (qd(r)) throw Error(s(418));
        r.flags = r.flags & -4097 | 2, mr = !1, ni = r;
      }
    }
  }
  function Kr(r) {
    for (r = r.return; r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13; ) r = r.return;
    ni = r;
  }
  function rf(r) {
    if (r !== ni) return !1;
    if (!mr) return Kr(r), mr = !0, !1;
    var a;
    if ((a = r.tag !== 3) && !(a = r.tag !== 5) && (a = r.type, a = a !== "head" && a !== "body" && !Xc(r.type, r.memoizedProps)), a && (a = ri)) {
      if (qd(r)) throw Fs(), Error(s(418));
      for (; a; ) Bd(r, a), a = dl(a.nextSibling);
    }
    if (Kr(r), r.tag === 13) {
      if (r = r.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(s(317));
      e: {
        for (r = r.nextSibling, a = 0; r; ) {
          if (r.nodeType === 8) {
            var u = r.data;
            if (u === "/$") {
              if (a === 0) {
                ri = dl(r.nextSibling);
                break e;
              }
              a--;
            } else u !== "$" && u !== "$!" && u !== "$?" || a++;
          }
          r = r.nextSibling;
        }
        ri = null;
      }
    } else ri = ni ? dl(r.stateNode.nextSibling) : null;
    return !0;
  }
  function Fs() {
    for (var r = ri; r; ) r = dl(r.nextSibling);
  }
  function To() {
    ri = ni = null, mr = !1;
  }
  function Bl(r) {
    Ui === null ? Ui = [r] : Ui.push(r);
  }
  var Qy = ee.ReactCurrentBatchConfig;
  function tu(r, a, u) {
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
  function af(r, a) {
    throw r = Object.prototype.toString.call(a), Error(s(31, r === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : r));
  }
  function uh(r) {
    var a = r._init;
    return a(r._payload);
  }
  function nu(r) {
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
      return Y = Oo(Y, V), Y.index = 0, Y.sibling = null, Y;
    }
    function S(Y, V, G) {
      return Y.index = G, r ? (G = Y.alternate, G !== null ? (G = G.index, G < V ? (Y.flags |= 2, V) : G) : (Y.flags |= 2, V)) : (Y.flags |= 1048576, V);
    }
    function _(Y) {
      return r && Y.alternate === null && (Y.flags |= 2), Y;
    }
    function N(Y, V, G, Te) {
      return V === null || V.tag !== 6 ? (V = Tp(G, Y.mode, Te), V.return = Y, V) : (V = m(V, G), V.return = Y, V);
    }
    function P(Y, V, G, Te) {
      var lt = G.type;
      return lt === pe ? Ce(Y, V, G.props.children, Te, G.key) : V !== null && (V.elementType === lt || typeof lt == "object" && lt !== null && lt.$$typeof === Ue && uh(lt) === V.type) ? (Te = m(V, G.props), Te.ref = tu(Y, V, G), Te.return = Y, Te) : (Te = vc(G.type, G.key, G.props, null, Y.mode, Te), Te.ref = tu(Y, V, G), Te.return = Y, Te);
    }
    function te(Y, V, G, Te) {
      return V === null || V.tag !== 4 || V.stateNode.containerInfo !== G.containerInfo || V.stateNode.implementation !== G.implementation ? (V = Ff(G, Y.mode, Te), V.return = Y, V) : (V = m(V, G.children || []), V.return = Y, V);
    }
    function Ce(Y, V, G, Te, lt) {
      return V === null || V.tag !== 7 ? (V = Xl(G, Y.mode, Te, lt), V.return = Y, V) : (V = m(V, G), V.return = Y, V);
    }
    function ke(Y, V, G) {
      if (typeof V == "string" && V !== "" || typeof V == "number") return V = Tp("" + V, Y.mode, G), V.return = Y, V;
      if (typeof V == "object" && V !== null) {
        switch (V.$$typeof) {
          case q:
            return G = vc(V.type, V.key, V.props, null, Y.mode, G), G.ref = tu(Y, null, V), G.return = Y, G;
          case re:
            return V = Ff(V, Y.mode, G), V.return = Y, V;
          case Ue:
            var Te = V._init;
            return ke(Y, Te(V._payload), G);
        }
        if (on(V) || Le(V)) return V = Xl(V, Y.mode, G, null), V.return = Y, V;
        af(Y, V);
      }
      return null;
    }
    function Ee(Y, V, G, Te) {
      var lt = V !== null ? V.key : null;
      if (typeof G == "string" && G !== "" || typeof G == "number") return lt !== null ? null : N(Y, V, "" + G, Te);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case q:
            return G.key === lt ? P(Y, V, G, Te) : null;
          case re:
            return G.key === lt ? te(Y, V, G, Te) : null;
          case Ue:
            return lt = G._init, Ee(
              Y,
              V,
              lt(G._payload),
              Te
            );
        }
        if (on(G) || Le(G)) return lt !== null ? null : Ce(Y, V, G, Te, null);
        af(Y, G);
      }
      return null;
    }
    function Ze(Y, V, G, Te, lt) {
      if (typeof Te == "string" && Te !== "" || typeof Te == "number") return Y = Y.get(G) || null, N(V, Y, "" + Te, lt);
      if (typeof Te == "object" && Te !== null) {
        switch (Te.$$typeof) {
          case q:
            return Y = Y.get(Te.key === null ? G : Te.key) || null, P(V, Y, Te, lt);
          case re:
            return Y = Y.get(Te.key === null ? G : Te.key) || null, te(V, Y, Te, lt);
          case Ue:
            var wt = Te._init;
            return Ze(Y, V, G, wt(Te._payload), lt);
        }
        if (on(Te) || Le(Te)) return Y = Y.get(G) || null, Ce(V, Y, Te, lt, null);
        af(V, Te);
      }
      return null;
    }
    function it(Y, V, G, Te) {
      for (var lt = null, wt = null, Rt = V, Pt = V = 0, ia = null; Rt !== null && Pt < G.length; Pt++) {
        Rt.index > Pt ? (ia = Rt, Rt = null) : ia = Rt.sibling;
        var In = Ee(Y, Rt, G[Pt], Te);
        if (In === null) {
          Rt === null && (Rt = ia);
          break;
        }
        r && Rt && In.alternate === null && a(Y, Rt), V = S(In, V, Pt), wt === null ? lt = In : wt.sibling = In, wt = In, Rt = ia;
      }
      if (Pt === G.length) return u(Y, Rt), mr && eu(Y, Pt), lt;
      if (Rt === null) {
        for (; Pt < G.length; Pt++) Rt = ke(Y, G[Pt], Te), Rt !== null && (V = S(Rt, V, Pt), wt === null ? lt = Rt : wt.sibling = Rt, wt = Rt);
        return mr && eu(Y, Pt), lt;
      }
      for (Rt = f(Y, Rt); Pt < G.length; Pt++) ia = Ze(Rt, Y, Pt, G[Pt], Te), ia !== null && (r && ia.alternate !== null && Rt.delete(ia.key === null ? Pt : ia.key), V = S(ia, V, Pt), wt === null ? lt = ia : wt.sibling = ia, wt = ia);
      return r && Rt.forEach(function(Ao) {
        return a(Y, Ao);
      }), mr && eu(Y, Pt), lt;
    }
    function st(Y, V, G, Te) {
      var lt = Le(G);
      if (typeof lt != "function") throw Error(s(150));
      if (G = lt.call(G), G == null) throw Error(s(151));
      for (var wt = lt = null, Rt = V, Pt = V = 0, ia = null, In = G.next(); Rt !== null && !In.done; Pt++, In = G.next()) {
        Rt.index > Pt ? (ia = Rt, Rt = null) : ia = Rt.sibling;
        var Ao = Ee(Y, Rt, In.value, Te);
        if (Ao === null) {
          Rt === null && (Rt = ia);
          break;
        }
        r && Rt && Ao.alternate === null && a(Y, Rt), V = S(Ao, V, Pt), wt === null ? lt = Ao : wt.sibling = Ao, wt = Ao, Rt = ia;
      }
      if (In.done) return u(
        Y,
        Rt
      ), mr && eu(Y, Pt), lt;
      if (Rt === null) {
        for (; !In.done; Pt++, In = G.next()) In = ke(Y, In.value, Te), In !== null && (V = S(In, V, Pt), wt === null ? lt = In : wt.sibling = In, wt = In);
        return mr && eu(Y, Pt), lt;
      }
      for (Rt = f(Y, Rt); !In.done; Pt++, In = G.next()) In = Ze(Rt, Y, Pt, In.value, Te), In !== null && (r && In.alternate !== null && Rt.delete(In.key === null ? Pt : In.key), V = S(In, V, Pt), wt === null ? lt = In : wt.sibling = In, wt = In);
      return r && Rt.forEach(function(Bh) {
        return a(Y, Bh);
      }), mr && eu(Y, Pt), lt;
    }
    function Ur(Y, V, G, Te) {
      if (typeof G == "object" && G !== null && G.type === pe && G.key === null && (G = G.props.children), typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case q:
            e: {
              for (var lt = G.key, wt = V; wt !== null; ) {
                if (wt.key === lt) {
                  if (lt = G.type, lt === pe) {
                    if (wt.tag === 7) {
                      u(Y, wt.sibling), V = m(wt, G.props.children), V.return = Y, Y = V;
                      break e;
                    }
                  } else if (wt.elementType === lt || typeof lt == "object" && lt !== null && lt.$$typeof === Ue && uh(lt) === wt.type) {
                    u(Y, wt.sibling), V = m(wt, G.props), V.ref = tu(Y, wt, G), V.return = Y, Y = V;
                    break e;
                  }
                  u(Y, wt);
                  break;
                } else a(Y, wt);
                wt = wt.sibling;
              }
              G.type === pe ? (V = Xl(G.props.children, Y.mode, Te, G.key), V.return = Y, Y = V) : (Te = vc(G.type, G.key, G.props, null, Y.mode, Te), Te.ref = tu(Y, V, G), Te.return = Y, Y = Te);
            }
            return _(Y);
          case re:
            e: {
              for (wt = G.key; V !== null; ) {
                if (V.key === wt) if (V.tag === 4 && V.stateNode.containerInfo === G.containerInfo && V.stateNode.implementation === G.implementation) {
                  u(Y, V.sibling), V = m(V, G.children || []), V.return = Y, Y = V;
                  break e;
                } else {
                  u(Y, V);
                  break;
                }
                else a(Y, V);
                V = V.sibling;
              }
              V = Ff(G, Y.mode, Te), V.return = Y, Y = V;
            }
            return _(Y);
          case Ue:
            return wt = G._init, Ur(Y, V, wt(G._payload), Te);
        }
        if (on(G)) return it(Y, V, G, Te);
        if (Le(G)) return st(Y, V, G, Te);
        af(Y, G);
      }
      return typeof G == "string" && G !== "" || typeof G == "number" ? (G = "" + G, V !== null && V.tag === 6 ? (u(Y, V.sibling), V = m(V, G), V.return = Y, Y = V) : (u(Y, V), V = Tp(G, Y.mode, Te), V.return = Y, Y = V), _(Y)) : u(Y, V);
    }
    return Ur;
  }
  var zr = nu(!0), We = nu(!1), Si = Ai(null), ai = null, Wu = null, Wd = null;
  function Qd() {
    Wd = Wu = ai = null;
  }
  function Gd(r) {
    var a = Si.current;
    sr(Si), r._currentValue = a;
  }
  function Xd(r, a, u) {
    for (; r !== null; ) {
      var f = r.alternate;
      if ((r.childLanes & a) !== a ? (r.childLanes |= a, f !== null && (f.childLanes |= a)) : f !== null && (f.childLanes & a) !== a && (f.childLanes |= a), r === u) break;
      r = r.return;
    }
  }
  function Tr(r, a) {
    ai = r, Wd = Wu = null, r = r.dependencies, r !== null && r.firstContext !== null && ((r.lanes & a) !== 0 && (Ir = !0), r.firstContext = null);
  }
  function ji(r) {
    var a = r._currentValue;
    if (Wd !== r) if (r = { context: r, memoizedValue: a, next: null }, Wu === null) {
      if (ai === null) throw Error(s(308));
      Wu = r, ai.dependencies = { lanes: 0, firstContext: r };
    } else Wu = Wu.next = r;
    return a;
  }
  var ru = null;
  function Kd(r) {
    ru === null ? ru = [r] : ru.push(r);
  }
  function Zd(r, a, u, f) {
    var m = a.interleaved;
    return m === null ? (u.next = u, Kd(a)) : (u.next = m.next, m.next = u), a.interleaved = u, xi(r, f);
  }
  function xi(r, a) {
    r.lanes |= a;
    var u = r.alternate;
    for (u !== null && (u.lanes |= a), u = r, r = r.return; r !== null; ) r.childLanes |= a, u = r.alternate, u !== null && (u.childLanes |= a), u = r, r = r.return;
    return u.tag === 3 ? u.stateNode : null;
  }
  var Ei = !1;
  function Jd(r) {
    r.updateQueue = { baseState: r.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function sh(r, a) {
    r = r.updateQueue, a.updateQueue === r && (a.updateQueue = { baseState: r.baseState, firstBaseUpdate: r.firstBaseUpdate, lastBaseUpdate: r.lastBaseUpdate, shared: r.shared, effects: r.effects });
  }
  function ql(r, a) {
    return { eventTime: r, lane: a, tag: 0, payload: null, callback: null, next: null };
  }
  function wo(r, a, u) {
    var f = r.updateQueue;
    if (f === null) return null;
    if (f = f.shared, (An & 2) !== 0) {
      var m = f.pending;
      return m === null ? a.next = a : (a.next = m.next, m.next = a), f.pending = a, xi(r, u);
    }
    return m = f.interleaved, m === null ? (a.next = a, Kd(f)) : (a.next = m.next, m.next = a), f.interleaved = a, xi(r, u);
  }
  function lf(r, a, u) {
    if (a = a.updateQueue, a !== null && (a = a.shared, (u & 4194240) !== 0)) {
      var f = a.lanes;
      f &= r.pendingLanes, u |= f, a.lanes = u, Aa(r, u);
    }
  }
  function ch(r, a) {
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
  function Ps(r, a, u, f) {
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
      var ke = m.baseState;
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
            var it = r, st = N;
            switch (Ee = a, Ze = u, st.tag) {
              case 1:
                if (it = st.payload, typeof it == "function") {
                  ke = it.call(Ze, ke, Ee);
                  break e;
                }
                ke = it;
                break e;
              case 3:
                it.flags = it.flags & -65537 | 128;
              case 0:
                if (it = st.payload, Ee = typeof it == "function" ? it.call(Ze, ke, Ee) : it, Ee == null) break e;
                ke = ie({}, ke, Ee);
                break e;
              case 2:
                Ei = !0;
            }
          }
          N.callback !== null && N.lane !== 0 && (r.flags |= 64, Ee = m.effects, Ee === null ? m.effects = [N] : Ee.push(N));
        } else Ze = { eventTime: Ze, lane: Ee, tag: N.tag, payload: N.payload, callback: N.callback, next: null }, Ce === null ? (te = Ce = Ze, P = ke) : Ce = Ce.next = Ze, _ |= Ee;
        if (N = N.next, N === null) {
          if (N = m.shared.pending, N === null) break;
          Ee = N, N = Ee.next, Ee.next = null, m.lastBaseUpdate = Ee, m.shared.pending = null;
        }
      } while (!0);
      if (Ce === null && (P = ke), m.baseState = P, m.firstBaseUpdate = te, m.lastBaseUpdate = Ce, a = m.shared.interleaved, a !== null) {
        m = a;
        do
          _ |= m.lane, m = m.next;
        while (m !== a);
      } else S === null && (m.shared.lanes = 0);
      Cl |= _, r.lanes = _, r.memoizedState = ke;
    }
  }
  function ep(r, a, u) {
    if (r = a.effects, a.effects = null, r !== null) for (a = 0; a < r.length; a++) {
      var f = r[a], m = f.callback;
      if (m !== null) {
        if (f.callback = null, f = u, typeof m != "function") throw Error(s(191, m));
        m.call(f);
      }
    }
  }
  var Hs = {}, gl = Ai(Hs), $s = Ai(Hs), Vs = Ai(Hs);
  function au(r) {
    if (r === Hs) throw Error(s(174));
    return r;
  }
  function tp(r, a) {
    switch (vt(Vs, a), vt($s, r), vt(gl, Hs), r = a.nodeType, r) {
      case 9:
      case 11:
        a = (a = a.documentElement) ? a.namespaceURI : Gn(null, "");
        break;
      default:
        r = r === 8 ? a.parentNode : a, a = r.namespaceURI || null, r = r.tagName, a = Gn(a, r);
    }
    sr(gl), vt(gl, a);
  }
  function iu() {
    sr(gl), sr($s), sr(Vs);
  }
  function fh(r) {
    au(Vs.current);
    var a = au(gl.current), u = Gn(a, r.type);
    a !== u && (vt($s, r), vt(gl, u));
  }
  function of(r) {
    $s.current === r && (sr(gl), sr($s));
  }
  var wr = Ai(0);
  function uf(r) {
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
  var Is = [];
  function yt() {
    for (var r = 0; r < Is.length; r++) Is[r]._workInProgressVersionPrimary = null;
    Is.length = 0;
  }
  var mn = ee.ReactCurrentDispatcher, $n = ee.ReactCurrentBatchConfig, nr = 0, Vn = null, Vr = null, ra = null, sf = !1, Bs = !1, lu = 0, Se = 0;
  function Hn() {
    throw Error(s(321));
  }
  function Ut(r, a) {
    if (a === null) return !1;
    for (var u = 0; u < a.length && u < r.length; u++) if (!Gi(r[u], a[u])) return !1;
    return !0;
  }
  function Ro(r, a, u, f, m, S) {
    if (nr = S, Vn = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, mn.current = r === null || r.memoizedState === null ? wf : Xs, r = u(f, m), Bs) {
      S = 0;
      do {
        if (Bs = !1, lu = 0, 25 <= S) throw Error(s(301));
        S += 1, ra = Vr = null, a.updateQueue = null, mn.current = Rf, r = u(f, m);
      } while (Bs);
    }
    if (mn.current = fu, a = Vr !== null && Vr.next !== null, nr = 0, ra = Vr = Vn = null, sf = !1, a) throw Error(s(300));
    return r;
  }
  function Ki() {
    var r = lu !== 0;
    return lu = 0, r;
  }
  function Da() {
    var r = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ra === null ? Vn.memoizedState = ra = r : ra = ra.next = r, ra;
  }
  function Lr() {
    if (Vr === null) {
      var r = Vn.alternate;
      r = r !== null ? r.memoizedState : null;
    } else r = Vr.next;
    var a = ra === null ? Vn.memoizedState : ra.next;
    if (a !== null) ra = a, Vr = r;
    else {
      if (r === null) throw Error(s(310));
      Vr = r, r = { memoizedState: Vr.memoizedState, baseState: Vr.baseState, baseQueue: Vr.baseQueue, queue: Vr.queue, next: null }, ra === null ? Vn.memoizedState = ra = r : ra = ra.next = r;
    }
    return ra;
  }
  function Yl(r, a) {
    return typeof a == "function" ? a(r) : a;
  }
  function bo(r) {
    var a = Lr(), u = a.queue;
    if (u === null) throw Error(s(311));
    u.lastRenderedReducer = r;
    var f = Vr, m = f.baseQueue, S = u.pending;
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
          var ke = {
            lane: Ce,
            action: te.action,
            hasEagerState: te.hasEagerState,
            eagerState: te.eagerState,
            next: null
          };
          P === null ? (N = P = ke, _ = f) : P = P.next = ke, Vn.lanes |= Ce, Cl |= Ce;
        }
        te = te.next;
      } while (te !== null && te !== S);
      P === null ? _ = f : P.next = N, Gi(f, a.memoizedState) || (Ir = !0), a.memoizedState = f, a.baseState = _, a.baseQueue = P, u.lastRenderedState = f;
    }
    if (r = u.interleaved, r !== null) {
      m = r;
      do
        S = m.lane, Vn.lanes |= S, Cl |= S, m = m.next;
      while (m !== r);
    } else m === null && (u.lanes = 0);
    return [a.memoizedState, u.dispatch];
  }
  function ou(r) {
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
      Gi(S, a.memoizedState) || (Ir = !0), a.memoizedState = S, a.baseQueue === null && (a.baseState = S), u.lastRenderedState = S;
    }
    return [S, f];
  }
  function cf() {
  }
  function ff(r, a) {
    var u = Vn, f = Lr(), m = a(), S = !Gi(f.memoizedState, m);
    if (S && (f.memoizedState = m, Ir = !0), f = f.queue, qs(vf.bind(null, u, f, r), [r]), f.getSnapshot !== a || S || ra !== null && ra.memoizedState.tag & 1) {
      if (u.flags |= 2048, uu(9, pf.bind(null, u, f, m, a), void 0, null), Zr === null) throw Error(s(349));
      (nr & 30) !== 0 || df(u, a, m);
    }
    return m;
  }
  function df(r, a, u) {
    r.flags |= 16384, r = { getSnapshot: a, value: u }, a = Vn.updateQueue, a === null ? (a = { lastEffect: null, stores: null }, Vn.updateQueue = a, a.stores = [r]) : (u = a.stores, u === null ? a.stores = [r] : u.push(r));
  }
  function pf(r, a, u, f) {
    a.value = u, a.getSnapshot = f, hf(a) && mf(r);
  }
  function vf(r, a, u) {
    return u(function() {
      hf(a) && mf(r);
    });
  }
  function hf(r) {
    var a = r.getSnapshot;
    r = r.value;
    try {
      var u = a();
      return !Gi(r, u);
    } catch {
      return !0;
    }
  }
  function mf(r) {
    var a = xi(r, 1);
    a !== null && Fa(a, r, 1, -1);
  }
  function yf(r) {
    var a = Da();
    return typeof r == "function" && (r = r()), a.memoizedState = a.baseState = r, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Yl, lastRenderedState: r }, a.queue = r, r = r.dispatch = cu.bind(null, Vn, r), [a.memoizedState, r];
  }
  function uu(r, a, u, f) {
    return r = { tag: r, create: a, destroy: u, deps: f, next: null }, a = Vn.updateQueue, a === null ? (a = { lastEffect: null, stores: null }, Vn.updateQueue = a, a.lastEffect = r.next = r) : (u = a.lastEffect, u === null ? a.lastEffect = r.next = r : (f = u.next, u.next = r, r.next = f, a.lastEffect = r)), r;
  }
  function gf() {
    return Lr().memoizedState;
  }
  function Qu(r, a, u, f) {
    var m = Da();
    Vn.flags |= r, m.memoizedState = uu(1 | a, u, void 0, f === void 0 ? null : f);
  }
  function Gu(r, a, u, f) {
    var m = Lr();
    f = f === void 0 ? null : f;
    var S = void 0;
    if (Vr !== null) {
      var _ = Vr.memoizedState;
      if (S = _.destroy, f !== null && Ut(f, _.deps)) {
        m.memoizedState = uu(a, u, S, f);
        return;
      }
    }
    Vn.flags |= r, m.memoizedState = uu(1 | a, u, S, f);
  }
  function Sf(r, a) {
    return Qu(8390656, 8, r, a);
  }
  function qs(r, a) {
    return Gu(2048, 8, r, a);
  }
  function xf(r, a) {
    return Gu(4, 2, r, a);
  }
  function Ys(r, a) {
    return Gu(4, 4, r, a);
  }
  function su(r, a) {
    if (typeof a == "function") return r = r(), a(r), function() {
      a(null);
    };
    if (a != null) return r = r(), a.current = r, function() {
      a.current = null;
    };
  }
  function Ef(r, a, u) {
    return u = u != null ? u.concat([r]) : null, Gu(4, 4, su.bind(null, a, r), u);
  }
  function Ws() {
  }
  function Cf(r, a) {
    var u = Lr();
    a = a === void 0 ? null : a;
    var f = u.memoizedState;
    return f !== null && a !== null && Ut(a, f[1]) ? f[0] : (u.memoizedState = [r, a], r);
  }
  function Tf(r, a) {
    var u = Lr();
    a = a === void 0 ? null : a;
    var f = u.memoizedState;
    return f !== null && a !== null && Ut(a, f[1]) ? f[0] : (r = r(), u.memoizedState = [r, a], r);
  }
  function np(r, a, u) {
    return (nr & 21) === 0 ? (r.baseState && (r.baseState = !1, Ir = !0), r.memoizedState = u) : (Gi(u, a) || (u = ba(), Vn.lanes |= u, Cl |= u, r.baseState = !0), a);
  }
  function Qs(r, a) {
    var u = an;
    an = u !== 0 && 4 > u ? u : 4, r(!0);
    var f = $n.transition;
    $n.transition = {};
    try {
      r(!1), a();
    } finally {
      an = u, $n.transition = f;
    }
  }
  function rp() {
    return Lr().memoizedState;
  }
  function Gs(r, a, u) {
    var f = Tl(r);
    if (u = { lane: f, action: u, hasEagerState: !1, eagerState: null, next: null }, ii(r)) dh(a, u);
    else if (u = Zd(r, a, u, f), u !== null) {
      var m = Yr();
      Fa(u, r, f, m), ur(u, a, f);
    }
  }
  function cu(r, a, u) {
    var f = Tl(r), m = { lane: f, action: u, hasEagerState: !1, eagerState: null, next: null };
    if (ii(r)) dh(a, m);
    else {
      var S = r.alternate;
      if (r.lanes === 0 && (S === null || S.lanes === 0) && (S = a.lastRenderedReducer, S !== null)) try {
        var _ = a.lastRenderedState, N = S(_, u);
        if (m.hasEagerState = !0, m.eagerState = N, Gi(N, _)) {
          var P = a.interleaved;
          P === null ? (m.next = m, Kd(a)) : (m.next = P.next, P.next = m), a.interleaved = m;
          return;
        }
      } catch {
      }
      u = Zd(r, a, m, f), u !== null && (m = Yr(), Fa(u, r, f, m), ur(u, a, f));
    }
  }
  function ii(r) {
    var a = r.alternate;
    return r === Vn || a !== null && a === Vn;
  }
  function dh(r, a) {
    Bs = sf = !0;
    var u = r.pending;
    u === null ? a.next = a : (a.next = u.next, u.next = a), r.pending = a;
  }
  function ur(r, a, u) {
    if ((u & 4194240) !== 0) {
      var f = a.lanes;
      f &= r.pendingLanes, u |= f, a.lanes = u, Aa(r, u);
    }
  }
  var fu = { readContext: ji, useCallback: Hn, useContext: Hn, useEffect: Hn, useImperativeHandle: Hn, useInsertionEffect: Hn, useLayoutEffect: Hn, useMemo: Hn, useReducer: Hn, useRef: Hn, useState: Hn, useDebugValue: Hn, useDeferredValue: Hn, useTransition: Hn, useMutableSource: Hn, useSyncExternalStore: Hn, useId: Hn, unstable_isNewReconciler: !1 }, wf = { readContext: ji, useCallback: function(r, a) {
    return Da().memoizedState = [r, a === void 0 ? null : a], r;
  }, useContext: ji, useEffect: Sf, useImperativeHandle: function(r, a, u) {
    return u = u != null ? u.concat([r]) : null, Qu(
      4194308,
      4,
      su.bind(null, a, r),
      u
    );
  }, useLayoutEffect: function(r, a) {
    return Qu(4194308, 4, r, a);
  }, useInsertionEffect: function(r, a) {
    return Qu(4, 2, r, a);
  }, useMemo: function(r, a) {
    var u = Da();
    return a = a === void 0 ? null : a, r = r(), u.memoizedState = [r, a], r;
  }, useReducer: function(r, a, u) {
    var f = Da();
    return a = u !== void 0 ? u(a) : a, f.memoizedState = f.baseState = a, r = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: r, lastRenderedState: a }, f.queue = r, r = r.dispatch = Gs.bind(null, Vn, r), [f.memoizedState, r];
  }, useRef: function(r) {
    var a = Da();
    return r = { current: r }, a.memoizedState = r;
  }, useState: yf, useDebugValue: Ws, useDeferredValue: function(r) {
    return Da().memoizedState = r;
  }, useTransition: function() {
    var r = yf(!1), a = r[0];
    return r = Qs.bind(null, r[1]), Da().memoizedState = r, [a, r];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(r, a, u) {
    var f = Vn, m = Da();
    if (mr) {
      if (u === void 0) throw Error(s(407));
      u = u();
    } else {
      if (u = a(), Zr === null) throw Error(s(349));
      (nr & 30) !== 0 || df(f, a, u);
    }
    m.memoizedState = u;
    var S = { value: u, getSnapshot: a };
    return m.queue = S, Sf(vf.bind(
      null,
      f,
      S,
      r
    ), [r]), f.flags |= 2048, uu(9, pf.bind(null, f, S, u, a), void 0, null), u;
  }, useId: function() {
    var r = Da(), a = Zr.identifierPrefix;
    if (mr) {
      var u = yl, f = ml;
      u = (f & ~(1 << 32 - lr(f) - 1)).toString(32) + u, a = ":" + a + "R" + u, u = lu++, 0 < u && (a += "H" + u.toString(32)), a += ":";
    } else u = Se++, a = ":" + a + "r" + u.toString(32) + ":";
    return r.memoizedState = a;
  }, unstable_isNewReconciler: !1 }, Xs = {
    readContext: ji,
    useCallback: Cf,
    useContext: ji,
    useEffect: qs,
    useImperativeHandle: Ef,
    useInsertionEffect: xf,
    useLayoutEffect: Ys,
    useMemo: Tf,
    useReducer: bo,
    useRef: gf,
    useState: function() {
      return bo(Yl);
    },
    useDebugValue: Ws,
    useDeferredValue: function(r) {
      var a = Lr();
      return np(a, Vr.memoizedState, r);
    },
    useTransition: function() {
      var r = bo(Yl)[0], a = Lr().memoizedState;
      return [r, a];
    },
    useMutableSource: cf,
    useSyncExternalStore: ff,
    useId: rp,
    unstable_isNewReconciler: !1
  }, Rf = { readContext: ji, useCallback: Cf, useContext: ji, useEffect: qs, useImperativeHandle: Ef, useInsertionEffect: xf, useLayoutEffect: Ys, useMemo: Tf, useReducer: ou, useRef: gf, useState: function() {
    return ou(Yl);
  }, useDebugValue: Ws, useDeferredValue: function(r) {
    var a = Lr();
    return Vr === null ? a.memoizedState = r : np(a, Vr.memoizedState, r);
  }, useTransition: function() {
    var r = ou(Yl)[0], a = Lr().memoizedState;
    return [r, a];
  }, useMutableSource: cf, useSyncExternalStore: ff, useId: rp, unstable_isNewReconciler: !1 };
  function Zi(r, a) {
    if (r && r.defaultProps) {
      a = ie({}, a), r = r.defaultProps;
      for (var u in r) a[u] === void 0 && (a[u] = r[u]);
      return a;
    }
    return a;
  }
  function ap(r, a, u, f) {
    a = r.memoizedState, u = u(f, a), u = u == null ? a : ie({}, a, u), r.memoizedState = u, r.lanes === 0 && (r.updateQueue.baseState = u);
  }
  var bf = { isMounted: function(r) {
    return (r = r._reactInternals) ? Ae(r) === r : !1;
  }, enqueueSetState: function(r, a, u) {
    r = r._reactInternals;
    var f = Yr(), m = Tl(r), S = ql(f, m);
    S.payload = a, u != null && (S.callback = u), a = wo(r, S, m), a !== null && (Fa(a, r, m, f), lf(a, r, m));
  }, enqueueReplaceState: function(r, a, u) {
    r = r._reactInternals;
    var f = Yr(), m = Tl(r), S = ql(f, m);
    S.tag = 1, S.payload = a, u != null && (S.callback = u), a = wo(r, S, m), a !== null && (Fa(a, r, m, f), lf(a, r, m));
  }, enqueueForceUpdate: function(r, a) {
    r = r._reactInternals;
    var u = Yr(), f = Tl(r), m = ql(u, f);
    m.tag = 2, a != null && (m.callback = a), a = wo(r, m, f), a !== null && (Fa(a, r, f, u), lf(a, r, f));
  } };
  function ph(r, a, u, f, m, S, _) {
    return r = r.stateNode, typeof r.shouldComponentUpdate == "function" ? r.shouldComponentUpdate(f, S, _) : a.prototype && a.prototype.isPureReactComponent ? !ks(u, f) || !ks(m, S) : !0;
  }
  function Mf(r, a, u) {
    var f = !1, m = ka, S = a.contextType;
    return typeof S == "object" && S !== null ? S = ji(S) : (m = Hr(a) ? ei : br.current, f = a.contextTypes, S = (f = f != null) ? ti(r, m) : ka), a = new a(u, S), r.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = bf, r.stateNode = a, a._reactInternals = r, f && (r = r.stateNode, r.__reactInternalMemoizedUnmaskedChildContext = m, r.__reactInternalMemoizedMaskedChildContext = S), a;
  }
  function vh(r, a, u, f) {
    r = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(u, f), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(u, f), a.state !== r && bf.enqueueReplaceState(a, a.state, null);
  }
  function Ks(r, a, u, f) {
    var m = r.stateNode;
    m.props = u, m.state = r.memoizedState, m.refs = {}, Jd(r);
    var S = a.contextType;
    typeof S == "object" && S !== null ? m.context = ji(S) : (S = Hr(a) ? ei : br.current, m.context = ti(r, S)), m.state = r.memoizedState, S = a.getDerivedStateFromProps, typeof S == "function" && (ap(r, a, S, u), m.state = r.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof m.getSnapshotBeforeUpdate == "function" || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (a = m.state, typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount(), a !== m.state && bf.enqueueReplaceState(m, m.state, null), Ps(r, u, m, f), m.state = r.memoizedState), typeof m.componentDidMount == "function" && (r.flags |= 4194308);
  }
  function du(r, a) {
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
  function ip(r, a, u) {
    return { value: r, source: null, stack: u ?? null, digest: a ?? null };
  }
  function lp(r, a) {
    try {
      console.error(a.value);
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  var _f = typeof WeakMap == "function" ? WeakMap : Map;
  function hh(r, a, u) {
    u = ql(-1, u), u.tag = 3, u.payload = { element: null };
    var f = a.value;
    return u.callback = function() {
      ts || (ts = !0, hu = f), lp(r, a);
    }, u;
  }
  function op(r, a, u) {
    u = ql(-1, u), u.tag = 3;
    var f = r.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var m = a.value;
      u.payload = function() {
        return f(m);
      }, u.callback = function() {
        lp(r, a);
      };
    }
    var S = r.stateNode;
    return S !== null && typeof S.componentDidCatch == "function" && (u.callback = function() {
      lp(r, a), typeof f != "function" && (ko === null ? ko = /* @__PURE__ */ new Set([this]) : ko.add(this));
      var _ = a.stack;
      this.componentDidCatch(a.value, { componentStack: _ !== null ? _ : "" });
    }), u;
  }
  function up(r, a, u) {
    var f = r.pingCache;
    if (f === null) {
      f = r.pingCache = new _f();
      var m = /* @__PURE__ */ new Set();
      f.set(a, m);
    } else m = f.get(a), m === void 0 && (m = /* @__PURE__ */ new Set(), f.set(a, m));
    m.has(u) || (m.add(u), r = t0.bind(null, r, a, u), a.then(r, r));
  }
  function mh(r) {
    do {
      var a;
      if ((a = r.tag === 13) && (a = r.memoizedState, a = a !== null ? a.dehydrated !== null : !0), a) return r;
      r = r.return;
    } while (r !== null);
    return null;
  }
  function Mo(r, a, u, f, m) {
    return (r.mode & 1) === 0 ? (r === a ? r.flags |= 65536 : (r.flags |= 128, u.flags |= 131072, u.flags &= -52805, u.tag === 1 && (u.alternate === null ? u.tag = 17 : (a = ql(-1, 1), a.tag = 2, wo(u, a, 1))), u.lanes |= 1), r) : (r.flags |= 65536, r.lanes = m, r);
  }
  var Zs = ee.ReactCurrentOwner, Ir = !1;
  function pa(r, a, u, f) {
    a.child = r === null ? We(a, null, u, f) : zr(a, r.child, u, f);
  }
  function li(r, a, u, f, m) {
    u = u.render;
    var S = a.ref;
    return Tr(a, m), f = Ro(r, a, u, f, S, m), u = Ki(), r !== null && !Ir ? (a.updateQueue = r.updateQueue, a.flags &= -2053, r.lanes &= ~m, Pi(r, a, m)) : (mr && u && tf(a), a.flags |= 1, pa(r, a, f, m), a.child);
  }
  function pu(r, a, u, f, m) {
    if (r === null) {
      var S = u.type;
      return typeof S == "function" && !Cp(S) && S.defaultProps === void 0 && u.compare === null && u.defaultProps === void 0 ? (a.tag = 15, a.type = S, tn(r, a, S, f, m)) : (r = vc(u.type, null, f, a, a.mode, m), r.ref = a.ref, r.return = a, a.child = r);
    }
    if (S = r.child, (r.lanes & m) === 0) {
      var _ = S.memoizedProps;
      if (u = u.compare, u = u !== null ? u : ks, u(_, f) && r.ref === a.ref) return Pi(r, a, m);
    }
    return a.flags |= 1, r = Oo(S, f), r.ref = a.ref, r.return = a, a.child = r;
  }
  function tn(r, a, u, f, m) {
    if (r !== null) {
      var S = r.memoizedProps;
      if (ks(S, f) && r.ref === a.ref) if (Ir = !1, a.pendingProps = f = S, (r.lanes & m) !== 0) (r.flags & 131072) !== 0 && (Ir = !0);
      else return a.lanes = r.lanes, Pi(r, a, m);
    }
    return yh(r, a, u, f, m);
  }
  function Js(r, a, u) {
    var f = a.pendingProps, m = f.children, S = r !== null ? r.memoizedState : null;
    if (f.mode === "hidden") if ((a.mode & 1) === 0) a.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, vt(Zu, Ci), Ci |= u;
    else {
      if ((u & 1073741824) === 0) return r = S !== null ? S.baseLanes | u : u, a.lanes = a.childLanes = 1073741824, a.memoizedState = { baseLanes: r, cachePool: null, transitions: null }, a.updateQueue = null, vt(Zu, Ci), Ci |= r, null;
      a.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, f = S !== null ? S.baseLanes : u, vt(Zu, Ci), Ci |= f;
    }
    else S !== null ? (f = S.baseLanes | u, a.memoizedState = null) : f = u, vt(Zu, Ci), Ci |= f;
    return pa(r, a, m, u), a.child;
  }
  function sp(r, a) {
    var u = a.ref;
    (r === null && u !== null || r !== null && r.ref !== u) && (a.flags |= 512, a.flags |= 2097152);
  }
  function yh(r, a, u, f, m) {
    var S = Hr(u) ? ei : br.current;
    return S = ti(a, S), Tr(a, m), u = Ro(r, a, u, f, S, m), f = Ki(), r !== null && !Ir ? (a.updateQueue = r.updateQueue, a.flags &= -2053, r.lanes &= ~m, Pi(r, a, m)) : (mr && f && tf(a), a.flags |= 1, pa(r, a, u, m), a.child);
  }
  function gh(r, a, u, f, m) {
    if (Hr(u)) {
      var S = !0;
      na(a);
    } else S = !1;
    if (Tr(a, m), a.stateNode === null) Fi(r, a), Mf(a, u, f), Ks(a, u, f, m), f = !0;
    else if (r === null) {
      var _ = a.stateNode, N = a.memoizedProps;
      _.props = N;
      var P = _.context, te = u.contextType;
      typeof te == "object" && te !== null ? te = ji(te) : (te = Hr(u) ? ei : br.current, te = ti(a, te));
      var Ce = u.getDerivedStateFromProps, ke = typeof Ce == "function" || typeof _.getSnapshotBeforeUpdate == "function";
      ke || typeof _.UNSAFE_componentWillReceiveProps != "function" && typeof _.componentWillReceiveProps != "function" || (N !== f || P !== te) && vh(a, _, f, te), Ei = !1;
      var Ee = a.memoizedState;
      _.state = Ee, Ps(a, f, _, m), P = a.memoizedState, N !== f || Ee !== P || Xr.current || Ei ? (typeof Ce == "function" && (ap(a, u, Ce, f), P = a.memoizedState), (N = Ei || ph(a, u, N, f, Ee, P, te)) ? (ke || typeof _.UNSAFE_componentWillMount != "function" && typeof _.componentWillMount != "function" || (typeof _.componentWillMount == "function" && _.componentWillMount(), typeof _.UNSAFE_componentWillMount == "function" && _.UNSAFE_componentWillMount()), typeof _.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof _.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = f, a.memoizedState = P), _.props = f, _.state = P, _.context = te, f = N) : (typeof _.componentDidMount == "function" && (a.flags |= 4194308), f = !1);
    } else {
      _ = a.stateNode, sh(r, a), N = a.memoizedProps, te = a.type === a.elementType ? N : Zi(a.type, N), _.props = te, ke = a.pendingProps, Ee = _.context, P = u.contextType, typeof P == "object" && P !== null ? P = ji(P) : (P = Hr(u) ? ei : br.current, P = ti(a, P));
      var Ze = u.getDerivedStateFromProps;
      (Ce = typeof Ze == "function" || typeof _.getSnapshotBeforeUpdate == "function") || typeof _.UNSAFE_componentWillReceiveProps != "function" && typeof _.componentWillReceiveProps != "function" || (N !== ke || Ee !== P) && vh(a, _, f, P), Ei = !1, Ee = a.memoizedState, _.state = Ee, Ps(a, f, _, m);
      var it = a.memoizedState;
      N !== ke || Ee !== it || Xr.current || Ei ? (typeof Ze == "function" && (ap(a, u, Ze, f), it = a.memoizedState), (te = Ei || ph(a, u, te, f, Ee, it, P) || !1) ? (Ce || typeof _.UNSAFE_componentWillUpdate != "function" && typeof _.componentWillUpdate != "function" || (typeof _.componentWillUpdate == "function" && _.componentWillUpdate(f, it, P), typeof _.UNSAFE_componentWillUpdate == "function" && _.UNSAFE_componentWillUpdate(f, it, P)), typeof _.componentDidUpdate == "function" && (a.flags |= 4), typeof _.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof _.componentDidUpdate != "function" || N === r.memoizedProps && Ee === r.memoizedState || (a.flags |= 4), typeof _.getSnapshotBeforeUpdate != "function" || N === r.memoizedProps && Ee === r.memoizedState || (a.flags |= 1024), a.memoizedProps = f, a.memoizedState = it), _.props = f, _.state = it, _.context = P, f = te) : (typeof _.componentDidUpdate != "function" || N === r.memoizedProps && Ee === r.memoizedState || (a.flags |= 4), typeof _.getSnapshotBeforeUpdate != "function" || N === r.memoizedProps && Ee === r.memoizedState || (a.flags |= 1024), f = !1);
    }
    return ec(r, a, u, f, S, m);
  }
  function ec(r, a, u, f, m, S) {
    sp(r, a);
    var _ = (a.flags & 128) !== 0;
    if (!f && !_) return m && Jc(a, u, !1), Pi(r, a, S);
    f = a.stateNode, Zs.current = a;
    var N = _ && typeof u.getDerivedStateFromError != "function" ? null : f.render();
    return a.flags |= 1, r !== null && _ ? (a.child = zr(a, r.child, null, S), a.child = zr(a, null, N, S)) : pa(r, a, N, S), a.memoizedState = f.state, m && Jc(a, u, !0), a.child;
  }
  function Xu(r) {
    var a = r.stateNode;
    a.pendingContext ? ih(r, a.pendingContext, a.pendingContext !== a.context) : a.context && ih(r, a.context, !1), tp(r, a.containerInfo);
  }
  function Sh(r, a, u, f, m) {
    return To(), Bl(m), a.flags |= 256, pa(r, a, u, f), a.child;
  }
  var kf = { dehydrated: null, treeContext: null, retryLane: 0 };
  function cp(r) {
    return { baseLanes: r, cachePool: null, transitions: null };
  }
  function Df(r, a, u) {
    var f = a.pendingProps, m = wr.current, S = !1, _ = (a.flags & 128) !== 0, N;
    if ((N = _) || (N = r !== null && r.memoizedState === null ? !1 : (m & 2) !== 0), N ? (S = !0, a.flags &= -129) : (r === null || r.memoizedState !== null) && (m |= 1), vt(wr, m & 1), r === null)
      return Yd(a), r = a.memoizedState, r !== null && (r = r.dehydrated, r !== null) ? ((a.mode & 1) === 0 ? a.lanes = 1 : r.data === "$!" ? a.lanes = 8 : a.lanes = 1073741824, null) : (_ = f.children, r = f.fallback, S ? (f = a.mode, S = a.child, _ = { mode: "hidden", children: _ }, (f & 1) === 0 && S !== null ? (S.childLanes = 0, S.pendingProps = _) : S = zo(_, f, 0, null), r = Xl(r, f, u, null), S.return = a, r.return = a, S.sibling = r, a.child = S, a.child.memoizedState = cp(u), a.memoizedState = kf, r) : fp(a, _));
    if (m = r.memoizedState, m !== null && (N = m.dehydrated, N !== null)) return xh(r, a, _, f, N, m, u);
    if (S) {
      S = f.fallback, _ = a.mode, m = r.child, N = m.sibling;
      var P = { mode: "hidden", children: f.children };
      return (_ & 1) === 0 && a.child !== m ? (f = a.child, f.childLanes = 0, f.pendingProps = P, a.deletions = null) : (f = Oo(m, P), f.subtreeFlags = m.subtreeFlags & 14680064), N !== null ? S = Oo(N, S) : (S = Xl(S, _, u, null), S.flags |= 2), S.return = a, f.return = a, f.sibling = S, a.child = f, f = S, S = a.child, _ = r.child.memoizedState, _ = _ === null ? cp(u) : { baseLanes: _.baseLanes | u, cachePool: null, transitions: _.transitions }, S.memoizedState = _, S.childLanes = r.childLanes & ~u, a.memoizedState = kf, f;
    }
    return S = r.child, r = S.sibling, f = Oo(S, { mode: "visible", children: f.children }), (a.mode & 1) === 0 && (f.lanes = u), f.return = a, f.sibling = null, r !== null && (u = a.deletions, u === null ? (a.deletions = [r], a.flags |= 16) : u.push(r)), a.child = f, a.memoizedState = null, f;
  }
  function fp(r, a) {
    return a = zo({ mode: "visible", children: a }, r.mode, 0, null), a.return = r, r.child = a;
  }
  function tc(r, a, u, f) {
    return f !== null && Bl(f), zr(a, r.child, null, u), r = fp(a, a.pendingProps.children), r.flags |= 2, a.memoizedState = null, r;
  }
  function xh(r, a, u, f, m, S, _) {
    if (u)
      return a.flags & 256 ? (a.flags &= -257, f = ip(Error(s(422))), tc(r, a, _, f)) : a.memoizedState !== null ? (a.child = r.child, a.flags |= 128, null) : (S = f.fallback, m = a.mode, f = zo({ mode: "visible", children: f.children }, m, 0, null), S = Xl(S, m, _, null), S.flags |= 2, f.return = a, S.return = a, f.sibling = S, a.child = f, (a.mode & 1) !== 0 && zr(a, r.child, null, _), a.child.memoizedState = cp(_), a.memoizedState = kf, S);
    if ((a.mode & 1) === 0) return tc(r, a, _, null);
    if (m.data === "$!") {
      if (f = m.nextSibling && m.nextSibling.dataset, f) var N = f.dgst;
      return f = N, S = Error(s(419)), f = ip(S, f, void 0), tc(r, a, _, f);
    }
    if (N = (_ & r.childLanes) !== 0, Ir || N) {
      if (f = Zr, f !== null) {
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
      return Ep(), f = ip(Error(s(421))), tc(r, a, _, f);
    }
    return m.data === "$?" ? (a.flags |= 128, a.child = r.child, a = n0.bind(null, r), m._reactRetry = a, null) : (r = S.treeContext, ri = dl(m.nextSibling), ni = a, mr = !0, Ui = null, r !== null && ($r[Ni++] = ml, $r[Ni++] = yl, $r[Ni++] = gi, ml = r.id, yl = r.overflow, gi = a), a = fp(a, f.children), a.flags |= 4096, a);
  }
  function dp(r, a, u) {
    r.lanes |= a;
    var f = r.alternate;
    f !== null && (f.lanes |= a), Xd(r.return, a, u);
  }
  function Na(r, a, u, f, m) {
    var S = r.memoizedState;
    S === null ? r.memoizedState = { isBackwards: a, rendering: null, renderingStartTime: 0, last: f, tail: u, tailMode: m } : (S.isBackwards = a, S.rendering = null, S.renderingStartTime = 0, S.last = f, S.tail = u, S.tailMode = m);
  }
  function Sl(r, a, u) {
    var f = a.pendingProps, m = f.revealOrder, S = f.tail;
    if (pa(r, a, f.children, u), f = wr.current, (f & 2) !== 0) f = f & 1 | 2, a.flags |= 128;
    else {
      if (r !== null && (r.flags & 128) !== 0) e: for (r = a.child; r !== null; ) {
        if (r.tag === 13) r.memoizedState !== null && dp(r, u, a);
        else if (r.tag === 19) dp(r, u, a);
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
    if (vt(wr, f), (a.mode & 1) === 0) a.memoizedState = null;
    else switch (m) {
      case "forwards":
        for (u = a.child, m = null; u !== null; ) r = u.alternate, r !== null && uf(r) === null && (m = u), u = u.sibling;
        u = m, u === null ? (m = a.child, a.child = null) : (m = u.sibling, u.sibling = null), Na(a, !1, m, u, S);
        break;
      case "backwards":
        for (u = null, m = a.child, a.child = null; m !== null; ) {
          if (r = m.alternate, r !== null && uf(r) === null) {
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
  function Fi(r, a) {
    (a.mode & 1) === 0 && r !== null && (r.alternate = null, a.alternate = null, a.flags |= 2);
  }
  function Pi(r, a, u) {
    if (r !== null && (a.dependencies = r.dependencies), Cl |= a.lanes, (u & a.childLanes) === 0) return null;
    if (r !== null && a.child !== r.child) throw Error(s(153));
    if (a.child !== null) {
      for (r = a.child, u = Oo(r, r.pendingProps), a.child = u, u.return = a; r.sibling !== null; ) r = r.sibling, u = u.sibling = Oo(r, r.pendingProps), u.return = a;
      u.sibling = null;
    }
    return a.child;
  }
  function nc(r, a, u) {
    switch (a.tag) {
      case 3:
        Xu(a), To();
        break;
      case 5:
        fh(a);
        break;
      case 1:
        Hr(a.type) && na(a);
        break;
      case 4:
        tp(a, a.stateNode.containerInfo);
        break;
      case 10:
        var f = a.type._context, m = a.memoizedProps.value;
        vt(Si, f._currentValue), f._currentValue = m;
        break;
      case 13:
        if (f = a.memoizedState, f !== null)
          return f.dehydrated !== null ? (vt(wr, wr.current & 1), a.flags |= 128, null) : (u & a.child.childLanes) !== 0 ? Df(r, a, u) : (vt(wr, wr.current & 1), r = Pi(r, a, u), r !== null ? r.sibling : null);
        vt(wr, wr.current & 1);
        break;
      case 19:
        if (f = (u & a.childLanes) !== 0, (r.flags & 128) !== 0) {
          if (f) return Sl(r, a, u);
          a.flags |= 128;
        }
        if (m = a.memoizedState, m !== null && (m.rendering = null, m.tail = null, m.lastEffect = null), vt(wr, wr.current), f) break;
        return null;
      case 22:
      case 23:
        return a.lanes = 0, Js(r, a, u);
    }
    return Pi(r, a, u);
  }
  var Hi, Br, Eh, Ch;
  Hi = function(r, a) {
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
  }, Br = function() {
  }, Eh = function(r, a, u, f) {
    var m = r.memoizedProps;
    if (m !== f) {
      r = a.stateNode, au(gl.current);
      var S = null;
      switch (u) {
        case "input":
          m = _e(r, m), f = _e(r, f), S = [];
          break;
        case "select":
          m = ie({}, m, { value: void 0 }), f = ie({}, f, { value: void 0 }), S = [];
          break;
        case "textarea":
          m = En(r, m), f = En(r, f), S = [];
          break;
        default:
          typeof m.onClick != "function" && typeof f.onClick == "function" && (r.onclick = yo);
      }
      qt(u, f);
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
        else te === "dangerouslySetInnerHTML" ? (P = P ? P.__html : void 0, N = N ? N.__html : void 0, P != null && N !== P && (S = S || []).push(te, P)) : te === "children" ? typeof P != "string" && typeof P != "number" || (S = S || []).push(te, "" + P) : te !== "suppressContentEditableWarning" && te !== "suppressHydrationWarning" && (h.hasOwnProperty(te) ? (P != null && te === "onScroll" && Kn("scroll", r), S || N === P || (S = [])) : (S = S || []).push(te, P));
      }
      u && (S = S || []).push("style", u);
      var te = S;
      (a.updateQueue = te) && (a.flags |= 4);
    }
  }, Ch = function(r, a, u, f) {
    u !== f && (a.flags |= 4);
  };
  function rc(r, a) {
    if (!mr) switch (r.tailMode) {
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
  function aa(r) {
    var a = r.alternate !== null && r.alternate.child === r.child, u = 0, f = 0;
    if (a) for (var m = r.child; m !== null; ) u |= m.lanes | m.childLanes, f |= m.subtreeFlags & 14680064, f |= m.flags & 14680064, m.return = r, m = m.sibling;
    else for (m = r.child; m !== null; ) u |= m.lanes | m.childLanes, f |= m.subtreeFlags, f |= m.flags, m.return = r, m = m.sibling;
    return r.subtreeFlags |= f, r.childLanes = u, a;
  }
  function Th(r, a, u) {
    var f = a.pendingProps;
    switch (nf(a), a.tag) {
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
        return aa(a), null;
      case 1:
        return Hr(a.type) && qu(), aa(a), null;
      case 3:
        return f = a.stateNode, iu(), sr(Xr), sr(br), yt(), f.pendingContext && (f.context = f.pendingContext, f.pendingContext = null), (r === null || r.child === null) && (rf(a) ? a.flags |= 4 : r === null || r.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, Ui !== null && (mu(Ui), Ui = null))), Br(r, a), aa(a), null;
      case 5:
        of(a);
        var m = au(Vs.current);
        if (u = a.type, r !== null && a.stateNode != null) Eh(r, a, u, f, m), r.ref !== a.ref && (a.flags |= 512, a.flags |= 2097152);
        else {
          if (!f) {
            if (a.stateNode === null) throw Error(s(166));
            return aa(a), null;
          }
          if (r = au(gl.current), rf(a)) {
            f = a.stateNode, u = a.type;
            var S = a.memoizedProps;
            switch (f[pl] = a, f[Ns] = S, r = (a.mode & 1) !== 0, u) {
              case "dialog":
                Kn("cancel", f), Kn("close", f);
                break;
              case "iframe":
              case "object":
              case "embed":
                Kn("load", f);
                break;
              case "video":
              case "audio":
                for (m = 0; m < zs.length; m++) Kn(zs[m], f);
                break;
              case "source":
                Kn("error", f);
                break;
              case "img":
              case "image":
              case "link":
                Kn(
                  "error",
                  f
                ), Kn("load", f);
                break;
              case "details":
                Kn("toggle", f);
                break;
              case "input":
                nn(f, S), Kn("invalid", f);
                break;
              case "select":
                f._wrapperState = { wasMultiple: !!S.multiple }, Kn("invalid", f);
                break;
              case "textarea":
                Qn(f, S), Kn("invalid", f);
            }
            qt(u, S), m = null;
            for (var _ in S) if (S.hasOwnProperty(_)) {
              var N = S[_];
              _ === "children" ? typeof N == "string" ? f.textContent !== N && (S.suppressHydrationWarning !== !0 && Gc(f.textContent, N, r), m = ["children", N]) : typeof N == "number" && f.textContent !== "" + N && (S.suppressHydrationWarning !== !0 && Gc(
                f.textContent,
                N,
                r
              ), m = ["children", "" + N]) : h.hasOwnProperty(_) && N != null && _ === "onScroll" && Kn("scroll", f);
            }
            switch (u) {
              case "input":
                kn(f), bt(f, S, !0);
                break;
              case "textarea":
                kn(f), $e(f);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof S.onClick == "function" && (f.onclick = yo);
            }
            f = m, a.updateQueue = f, f !== null && (a.flags |= 4);
          } else {
            _ = m.nodeType === 9 ? m : m.ownerDocument, r === "http://www.w3.org/1999/xhtml" && (r = un(u)), r === "http://www.w3.org/1999/xhtml" ? u === "script" ? (r = _.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(r.firstChild)) : typeof f.is == "string" ? r = _.createElement(u, { is: f.is }) : (r = _.createElement(u), u === "select" && (_ = r, f.multiple ? _.multiple = !0 : f.size && (_.size = f.size))) : r = _.createElementNS(r, u), r[pl] = a, r[Ns] = f, Hi(r, a, !1, !1), a.stateNode = r;
            e: {
              switch (_ = fn(u, f), u) {
                case "dialog":
                  Kn("cancel", r), Kn("close", r), m = f;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Kn("load", r), m = f;
                  break;
                case "video":
                case "audio":
                  for (m = 0; m < zs.length; m++) Kn(zs[m], r);
                  m = f;
                  break;
                case "source":
                  Kn("error", r), m = f;
                  break;
                case "img":
                case "image":
                case "link":
                  Kn(
                    "error",
                    r
                  ), Kn("load", r), m = f;
                  break;
                case "details":
                  Kn("toggle", r), m = f;
                  break;
                case "input":
                  nn(r, f), m = _e(r, f), Kn("invalid", r);
                  break;
                case "option":
                  m = f;
                  break;
                case "select":
                  r._wrapperState = { wasMultiple: !!f.multiple }, m = ie({}, f, { value: void 0 }), Kn("invalid", r);
                  break;
                case "textarea":
                  Qn(r, f), m = En(r, f), Kn("invalid", r);
                  break;
                default:
                  m = f;
              }
              qt(u, m), N = m;
              for (S in N) if (N.hasOwnProperty(S)) {
                var P = N[S];
                S === "style" ? Bt(r, P) : S === "dangerouslySetInnerHTML" ? (P = P ? P.__html : void 0, P != null && fr(r, P)) : S === "children" ? typeof P == "string" ? (u !== "textarea" || P !== "") && Me(r, P) : typeof P == "number" && Me(r, "" + P) : S !== "suppressContentEditableWarning" && S !== "suppressHydrationWarning" && S !== "autoFocus" && (h.hasOwnProperty(S) ? P != null && S === "onScroll" && Kn("scroll", r) : P != null && B(r, S, P, _));
              }
              switch (u) {
                case "input":
                  kn(r), bt(r, f, !1);
                  break;
                case "textarea":
                  kn(r), $e(r);
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
                  typeof m.onClick == "function" && (r.onclick = yo);
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
        return aa(a), null;
      case 6:
        if (r && a.stateNode != null) Ch(r, a, r.memoizedProps, f);
        else {
          if (typeof f != "string" && a.stateNode === null) throw Error(s(166));
          if (u = au(Vs.current), au(gl.current), rf(a)) {
            if (f = a.stateNode, u = a.memoizedProps, f[pl] = a, (S = f.nodeValue !== u) && (r = ni, r !== null)) switch (r.tag) {
              case 3:
                Gc(f.nodeValue, u, (r.mode & 1) !== 0);
                break;
              case 5:
                r.memoizedProps.suppressHydrationWarning !== !0 && Gc(f.nodeValue, u, (r.mode & 1) !== 0);
            }
            S && (a.flags |= 4);
          } else f = (u.nodeType === 9 ? u : u.ownerDocument).createTextNode(f), f[pl] = a, a.stateNode = f;
        }
        return aa(a), null;
      case 13:
        if (sr(wr), f = a.memoizedState, r === null || r.memoizedState !== null && r.memoizedState.dehydrated !== null) {
          if (mr && ri !== null && (a.mode & 1) !== 0 && (a.flags & 128) === 0) Fs(), To(), a.flags |= 98560, S = !1;
          else if (S = rf(a), f !== null && f.dehydrated !== null) {
            if (r === null) {
              if (!S) throw Error(s(318));
              if (S = a.memoizedState, S = S !== null ? S.dehydrated : null, !S) throw Error(s(317));
              S[pl] = a;
            } else To(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            aa(a), S = !1;
          } else Ui !== null && (mu(Ui), Ui = null), S = !0;
          if (!S) return a.flags & 65536 ? a : null;
        }
        return (a.flags & 128) !== 0 ? (a.lanes = u, a) : (f = f !== null, f !== (r !== null && r.memoizedState !== null) && f && (a.child.flags |= 8192, (a.mode & 1) !== 0 && (r === null || (wr.current & 1) !== 0 ? Nr === 0 && (Nr = 3) : Ep())), a.updateQueue !== null && (a.flags |= 4), aa(a), null);
      case 4:
        return iu(), Br(r, a), r === null && Hu(a.stateNode.containerInfo), aa(a), null;
      case 10:
        return Gd(a.type._context), aa(a), null;
      case 17:
        return Hr(a.type) && qu(), aa(a), null;
      case 19:
        if (sr(wr), S = a.memoizedState, S === null) return aa(a), null;
        if (f = (a.flags & 128) !== 0, _ = S.rendering, _ === null) if (f) rc(S, !1);
        else {
          if (Nr !== 0 || r !== null && (r.flags & 128) !== 0) for (r = a.child; r !== null; ) {
            if (_ = uf(r), _ !== null) {
              for (a.flags |= 128, rc(S, !1), f = _.updateQueue, f !== null && (a.updateQueue = f, a.flags |= 4), a.subtreeFlags = 0, f = u, u = a.child; u !== null; ) S = u, r = f, S.flags &= 14680066, _ = S.alternate, _ === null ? (S.childLanes = 0, S.lanes = r, S.child = null, S.subtreeFlags = 0, S.memoizedProps = null, S.memoizedState = null, S.updateQueue = null, S.dependencies = null, S.stateNode = null) : (S.childLanes = _.childLanes, S.lanes = _.lanes, S.child = _.child, S.subtreeFlags = 0, S.deletions = null, S.memoizedProps = _.memoizedProps, S.memoizedState = _.memoizedState, S.updateQueue = _.updateQueue, S.type = _.type, r = _.dependencies, S.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }), u = u.sibling;
              return vt(wr, wr.current & 1 | 2), a.child;
            }
            r = r.sibling;
          }
          S.tail !== null && gt() > es && (a.flags |= 128, f = !0, rc(S, !1), a.lanes = 4194304);
        }
        else {
          if (!f) if (r = uf(_), r !== null) {
            if (a.flags |= 128, f = !0, u = r.updateQueue, u !== null && (a.updateQueue = u, a.flags |= 4), rc(S, !0), S.tail === null && S.tailMode === "hidden" && !_.alternate && !mr) return aa(a), null;
          } else 2 * gt() - S.renderingStartTime > es && u !== 1073741824 && (a.flags |= 128, f = !0, rc(S, !1), a.lanes = 4194304);
          S.isBackwards ? (_.sibling = a.child, a.child = _) : (u = S.last, u !== null ? u.sibling = _ : a.child = _, S.last = _);
        }
        return S.tail !== null ? (a = S.tail, S.rendering = a, S.tail = a.sibling, S.renderingStartTime = gt(), a.sibling = null, u = wr.current, vt(wr, f ? u & 1 | 2 : u & 1), a) : (aa(a), null);
      case 22:
      case 23:
        return xp(), f = a.memoizedState !== null, r !== null && r.memoizedState !== null !== f && (a.flags |= 8192), f && (a.mode & 1) !== 0 ? (Ci & 1073741824) !== 0 && (aa(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : aa(a), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(s(156, a.tag));
  }
  function Of(r, a) {
    switch (nf(a), a.tag) {
      case 1:
        return Hr(a.type) && qu(), r = a.flags, r & 65536 ? (a.flags = r & -65537 | 128, a) : null;
      case 3:
        return iu(), sr(Xr), sr(br), yt(), r = a.flags, (r & 65536) !== 0 && (r & 128) === 0 ? (a.flags = r & -65537 | 128, a) : null;
      case 5:
        return of(a), null;
      case 13:
        if (sr(wr), r = a.memoizedState, r !== null && r.dehydrated !== null) {
          if (a.alternate === null) throw Error(s(340));
          To();
        }
        return r = a.flags, r & 65536 ? (a.flags = r & -65537 | 128, a) : null;
      case 19:
        return sr(wr), null;
      case 4:
        return iu(), null;
      case 10:
        return Gd(a.type._context), null;
      case 22:
      case 23:
        return xp(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var ac = !1, Oa = !1, Gy = typeof WeakSet == "function" ? WeakSet : Set, rt = null;
  function Ku(r, a) {
    var u = r.ref;
    if (u !== null) if (typeof u == "function") try {
      u(null);
    } catch (f) {
      yr(r, a, f);
    }
    else u.current = null;
  }
  function zf(r, a, u) {
    try {
      u();
    } catch (f) {
      yr(r, a, f);
    }
  }
  var wh = !1;
  function Rh(r, a) {
    if (As = Za, r = Ds(), $c(r)) {
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
          var _ = 0, N = -1, P = -1, te = 0, Ce = 0, ke = r, Ee = null;
          t: for (; ; ) {
            for (var Ze; ke !== u || m !== 0 && ke.nodeType !== 3 || (N = _ + m), ke !== S || f !== 0 && ke.nodeType !== 3 || (P = _ + f), ke.nodeType === 3 && (_ += ke.nodeValue.length), (Ze = ke.firstChild) !== null; )
              Ee = ke, ke = Ze;
            for (; ; ) {
              if (ke === r) break t;
              if (Ee === u && ++te === m && (N = _), Ee === S && ++Ce === f && (P = _), (Ze = ke.nextSibling) !== null) break;
              ke = Ee, Ee = ke.parentNode;
            }
            ke = Ze;
          }
          u = N === -1 || P === -1 ? null : { start: N, end: P };
        } else u = null;
      }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (Zo = { focusedElem: r, selectionRange: u }, Za = !1, rt = a; rt !== null; ) if (a = rt, r = a.child, (a.subtreeFlags & 1028) !== 0 && r !== null) r.return = a, rt = r;
    else for (; rt !== null; ) {
      a = rt;
      try {
        var it = a.alternate;
        if ((a.flags & 1024) !== 0) switch (a.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (it !== null) {
              var st = it.memoizedProps, Ur = it.memoizedState, Y = a.stateNode, V = Y.getSnapshotBeforeUpdate(a.elementType === a.type ? st : Zi(a.type, st), Ur);
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
        yr(a, a.return, Te);
      }
      if (r = a.sibling, r !== null) {
        r.return = a.return, rt = r;
        break;
      }
      rt = a.return;
    }
    return it = wh, wh = !1, it;
  }
  function ic(r, a, u) {
    var f = a.updateQueue;
    if (f = f !== null ? f.lastEffect : null, f !== null) {
      var m = f = f.next;
      do {
        if ((m.tag & r) === r) {
          var S = m.destroy;
          m.destroy = void 0, S !== void 0 && zf(a, u, S);
        }
        m = m.next;
      } while (m !== f);
    }
  }
  function lc(r, a) {
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
  function pp(r) {
    var a = r.ref;
    if (a !== null) {
      var u = r.stateNode;
      r.tag, r = u, typeof a == "function" ? a(r) : a.current = r;
    }
  }
  function Lf(r) {
    var a = r.alternate;
    a !== null && (r.alternate = null, Lf(a)), r.child = null, r.deletions = null, r.sibling = null, r.tag === 5 && (a = r.stateNode, a !== null && (delete a[pl], delete a[Ns], delete a[Us], delete a[Bu], delete a[Wy])), r.stateNode = null, r.return = null, r.dependencies = null, r.memoizedProps = null, r.memoizedState = null, r.pendingProps = null, r.stateNode = null, r.updateQueue = null;
  }
  function oc(r) {
    return r.tag === 5 || r.tag === 3 || r.tag === 4;
  }
  function Wl(r) {
    e: for (; ; ) {
      for (; r.sibling === null; ) {
        if (r.return === null || oc(r.return)) return null;
        r = r.return;
      }
      for (r.sibling.return = r.return, r = r.sibling; r.tag !== 5 && r.tag !== 6 && r.tag !== 18; ) {
        if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
        r.child.return = r, r = r.child;
      }
      if (!(r.flags & 2)) return r.stateNode;
    }
  }
  function xl(r, a, u) {
    var f = r.tag;
    if (f === 5 || f === 6) r = r.stateNode, a ? u.nodeType === 8 ? u.parentNode.insertBefore(r, a) : u.insertBefore(r, a) : (u.nodeType === 8 ? (a = u.parentNode, a.insertBefore(r, u)) : (a = u, a.appendChild(r)), u = u._reactRootContainer, u != null || a.onclick !== null || (a.onclick = yo));
    else if (f !== 4 && (r = r.child, r !== null)) for (xl(r, a, u), r = r.sibling; r !== null; ) xl(r, a, u), r = r.sibling;
  }
  function El(r, a, u) {
    var f = r.tag;
    if (f === 5 || f === 6) r = r.stateNode, a ? u.insertBefore(r, a) : u.appendChild(r);
    else if (f !== 4 && (r = r.child, r !== null)) for (El(r, a, u), r = r.sibling; r !== null; ) El(r, a, u), r = r.sibling;
  }
  var Ar = null, Ua = !1;
  function ja(r, a, u) {
    for (u = u.child; u !== null; ) bh(r, a, u), u = u.sibling;
  }
  function bh(r, a, u) {
    if (On && typeof On.onCommitFiberUnmount == "function") try {
      On.onCommitFiberUnmount(Xn, u);
    } catch {
    }
    switch (u.tag) {
      case 5:
        Oa || Ku(u, a);
      case 6:
        var f = Ar, m = Ua;
        Ar = null, ja(r, a, u), Ar = f, Ua = m, Ar !== null && (Ua ? (r = Ar, u = u.stateNode, r.nodeType === 8 ? r.parentNode.removeChild(u) : r.removeChild(u)) : Ar.removeChild(u.stateNode));
        break;
      case 18:
        Ar !== null && (Ua ? (r = Ar, u = u.stateNode, r.nodeType === 8 ? Iu(r.parentNode, u) : r.nodeType === 1 && Iu(r, u), hi(r)) : Iu(Ar, u.stateNode));
        break;
      case 4:
        f = Ar, m = Ua, Ar = u.stateNode.containerInfo, Ua = !0, ja(r, a, u), Ar = f, Ua = m;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Oa && (f = u.updateQueue, f !== null && (f = f.lastEffect, f !== null))) {
          m = f = f.next;
          do {
            var S = m, _ = S.destroy;
            S = S.tag, _ !== void 0 && ((S & 2) !== 0 || (S & 4) !== 0) && zf(u, a, _), m = m.next;
          } while (m !== f);
        }
        ja(r, a, u);
        break;
      case 1:
        if (!Oa && (Ku(u, a), f = u.stateNode, typeof f.componentWillUnmount == "function")) try {
          f.props = u.memoizedProps, f.state = u.memoizedState, f.componentWillUnmount();
        } catch (N) {
          yr(u, a, N);
        }
        ja(r, a, u);
        break;
      case 21:
        ja(r, a, u);
        break;
      case 22:
        u.mode & 1 ? (Oa = (f = Oa) || u.memoizedState !== null, ja(r, a, u), Oa = f) : ja(r, a, u);
        break;
      default:
        ja(r, a, u);
    }
  }
  function Mh(r) {
    var a = r.updateQueue;
    if (a !== null) {
      r.updateQueue = null;
      var u = r.stateNode;
      u === null && (u = r.stateNode = new Gy()), a.forEach(function(f) {
        var m = Uh.bind(null, r, f);
        u.has(f) || (u.add(f), f.then(m, m));
      });
    }
  }
  function Ji(r, a) {
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
        bh(S, _, m), Ar = null, Ua = !1;
        var P = m.alternate;
        P !== null && (P.return = null), m.return = null;
      } catch (te) {
        yr(m, a, te);
      }
    }
    if (a.subtreeFlags & 12854) for (a = a.child; a !== null; ) vp(a, r), a = a.sibling;
  }
  function vp(r, a) {
    var u = r.alternate, f = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (Ji(a, r), oi(r), f & 4) {
          try {
            ic(3, r, r.return), lc(3, r);
          } catch (st) {
            yr(r, r.return, st);
          }
          try {
            ic(5, r, r.return);
          } catch (st) {
            yr(r, r.return, st);
          }
        }
        break;
      case 1:
        Ji(a, r), oi(r), f & 512 && u !== null && Ku(u, u.return);
        break;
      case 5:
        if (Ji(a, r), oi(r), f & 512 && u !== null && Ku(u, u.return), r.flags & 32) {
          var m = r.stateNode;
          try {
            Me(m, "");
          } catch (st) {
            yr(r, r.return, st);
          }
        }
        if (f & 4 && (m = r.stateNode, m != null)) {
          var S = r.memoizedProps, _ = u !== null ? u.memoizedProps : S, N = r.type, P = r.updateQueue;
          if (r.updateQueue = null, P !== null) try {
            N === "input" && S.type === "radio" && S.name != null && et(m, S), fn(N, _);
            var te = fn(N, S);
            for (_ = 0; _ < P.length; _ += 2) {
              var Ce = P[_], ke = P[_ + 1];
              Ce === "style" ? Bt(m, ke) : Ce === "dangerouslySetInnerHTML" ? fr(m, ke) : Ce === "children" ? Me(m, ke) : B(m, Ce, ke, te);
            }
            switch (N) {
              case "input":
                Lt(m, S);
                break;
              case "textarea":
                gr(m, S);
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
            m[Ns] = S;
          } catch (st) {
            yr(r, r.return, st);
          }
        }
        break;
      case 6:
        if (Ji(a, r), oi(r), f & 4) {
          if (r.stateNode === null) throw Error(s(162));
          m = r.stateNode, S = r.memoizedProps;
          try {
            m.nodeValue = S;
          } catch (st) {
            yr(r, r.return, st);
          }
        }
        break;
      case 3:
        if (Ji(a, r), oi(r), f & 4 && u !== null && u.memoizedState.isDehydrated) try {
          hi(a.containerInfo);
        } catch (st) {
          yr(r, r.return, st);
        }
        break;
      case 4:
        Ji(a, r), oi(r);
        break;
      case 13:
        Ji(a, r), oi(r), m = r.child, m.flags & 8192 && (S = m.memoizedState !== null, m.stateNode.isHidden = S, !S || m.alternate !== null && m.alternate.memoizedState !== null || (yp = gt())), f & 4 && Mh(r);
        break;
      case 22:
        if (Ce = u !== null && u.memoizedState !== null, r.mode & 1 ? (Oa = (te = Oa) || Ce, Ji(a, r), Oa = te) : Ji(a, r), oi(r), f & 8192) {
          if (te = r.memoizedState !== null, (r.stateNode.isHidden = te) && !Ce && (r.mode & 1) !== 0) for (rt = r, Ce = r.child; Ce !== null; ) {
            for (ke = rt = Ce; rt !== null; ) {
              switch (Ee = rt, Ze = Ee.child, Ee.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ic(4, Ee, Ee.return);
                  break;
                case 1:
                  Ku(Ee, Ee.return);
                  var it = Ee.stateNode;
                  if (typeof it.componentWillUnmount == "function") {
                    f = Ee, u = Ee.return;
                    try {
                      a = f, it.props = a.memoizedProps, it.state = a.memoizedState, it.componentWillUnmount();
                    } catch (st) {
                      yr(f, u, st);
                    }
                  }
                  break;
                case 5:
                  Ku(Ee, Ee.return);
                  break;
                case 22:
                  if (Ee.memoizedState !== null) {
                    uc(ke);
                    continue;
                  }
              }
              Ze !== null ? (Ze.return = Ee, rt = Ze) : uc(ke);
            }
            Ce = Ce.sibling;
          }
          e: for (Ce = null, ke = r; ; ) {
            if (ke.tag === 5) {
              if (Ce === null) {
                Ce = ke;
                try {
                  m = ke.stateNode, te ? (S = m.style, typeof S.setProperty == "function" ? S.setProperty("display", "none", "important") : S.display = "none") : (N = ke.stateNode, P = ke.memoizedProps.style, _ = P != null && P.hasOwnProperty("display") ? P.display : null, N.style.display = Jt("display", _));
                } catch (st) {
                  yr(r, r.return, st);
                }
              }
            } else if (ke.tag === 6) {
              if (Ce === null) try {
                ke.stateNode.nodeValue = te ? "" : ke.memoizedProps;
              } catch (st) {
                yr(r, r.return, st);
              }
            } else if ((ke.tag !== 22 && ke.tag !== 23 || ke.memoizedState === null || ke === r) && ke.child !== null) {
              ke.child.return = ke, ke = ke.child;
              continue;
            }
            if (ke === r) break e;
            for (; ke.sibling === null; ) {
              if (ke.return === null || ke.return === r) break e;
              Ce === ke && (Ce = null), ke = ke.return;
            }
            Ce === ke && (Ce = null), ke.sibling.return = ke.return, ke = ke.sibling;
          }
        }
        break;
      case 19:
        Ji(a, r), oi(r), f & 4 && Mh(r);
        break;
      case 21:
        break;
      default:
        Ji(
          a,
          r
        ), oi(r);
    }
  }
  function oi(r) {
    var a = r.flags;
    if (a & 2) {
      try {
        e: {
          for (var u = r.return; u !== null; ) {
            if (oc(u)) {
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
            f.flags & 32 && (Me(m, ""), f.flags &= -33);
            var S = Wl(r);
            El(r, S, m);
            break;
          case 3:
          case 4:
            var _ = f.stateNode.containerInfo, N = Wl(r);
            xl(r, N, _);
            break;
          default:
            throw Error(s(161));
        }
      } catch (P) {
        yr(r, r.return, P);
      }
      r.flags &= -3;
    }
    a & 4096 && (r.flags &= -4097);
  }
  function Xy(r, a, u) {
    rt = r, hp(r);
  }
  function hp(r, a, u) {
    for (var f = (r.mode & 1) !== 0; rt !== null; ) {
      var m = rt, S = m.child;
      if (m.tag === 22 && f) {
        var _ = m.memoizedState !== null || ac;
        if (!_) {
          var N = m.alternate, P = N !== null && N.memoizedState !== null || Oa;
          N = ac;
          var te = Oa;
          if (ac = _, (Oa = P) && !te) for (rt = m; rt !== null; ) _ = rt, P = _.child, _.tag === 22 && _.memoizedState !== null ? mp(m) : P !== null ? (P.return = _, rt = P) : mp(m);
          for (; S !== null; ) rt = S, hp(S), S = S.sibling;
          rt = m, ac = N, Oa = te;
        }
        _h(r);
      } else (m.subtreeFlags & 8772) !== 0 && S !== null ? (S.return = m, rt = S) : _h(r);
    }
  }
  function _h(r) {
    for (; rt !== null; ) {
      var a = rt;
      if ((a.flags & 8772) !== 0) {
        var u = a.alternate;
        try {
          if ((a.flags & 8772) !== 0) switch (a.tag) {
            case 0:
            case 11:
            case 15:
              Oa || lc(5, a);
              break;
            case 1:
              var f = a.stateNode;
              if (a.flags & 4 && !Oa) if (u === null) f.componentDidMount();
              else {
                var m = a.elementType === a.type ? u.memoizedProps : Zi(a.type, u.memoizedProps);
                f.componentDidUpdate(m, u.memoizedState, f.__reactInternalSnapshotBeforeUpdate);
              }
              var S = a.updateQueue;
              S !== null && ep(a, S, f);
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
                ep(a, _, u);
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
                    var ke = Ce.dehydrated;
                    ke !== null && hi(ke);
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
          Oa || a.flags & 512 && pp(a);
        } catch (Ee) {
          yr(a, a.return, Ee);
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
  function uc(r) {
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
  function mp(r) {
    for (; rt !== null; ) {
      var a = rt;
      try {
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            var u = a.return;
            try {
              lc(4, a);
            } catch (P) {
              yr(a, u, P);
            }
            break;
          case 1:
            var f = a.stateNode;
            if (typeof f.componentDidMount == "function") {
              var m = a.return;
              try {
                f.componentDidMount();
              } catch (P) {
                yr(a, m, P);
              }
            }
            var S = a.return;
            try {
              pp(a);
            } catch (P) {
              yr(a, S, P);
            }
            break;
          case 5:
            var _ = a.return;
            try {
              pp(a);
            } catch (P) {
              yr(a, _, P);
            }
        }
      } catch (P) {
        yr(a, a.return, P);
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
  var Ky = Math.ceil, _o = ee.ReactCurrentDispatcher, vu = ee.ReactCurrentOwner, va = ee.ReactCurrentBatchConfig, An = 0, Zr = null, qr = null, ha = 0, Ci = 0, Zu = Ai(0), Nr = 0, sc = null, Cl = 0, Ju = 0, Af = 0, cc = null, ui = null, yp = 0, es = 1 / 0, Ti = null, ts = !1, hu = null, ko = null, Nf = !1, Ql = null, fc = 0, Do = 0, ns = null, dc = -1, za = 0;
  function Yr() {
    return (An & 6) !== 0 ? gt() : dc !== -1 ? dc : dc = gt();
  }
  function Tl(r) {
    return (r.mode & 1) === 0 ? 1 : (An & 2) !== 0 && ha !== 0 ? ha & -ha : Qy.transition !== null ? (za === 0 && (za = ba()), za) : (r = an, r !== 0 || (r = window.event, r = r === void 0 ? 16 : vo(r.type)), r);
  }
  function Fa(r, a, u, f) {
    if (50 < Do) throw Do = 0, ns = null, Error(s(185));
    ua(r, u, f), ((An & 2) === 0 || r !== Zr) && (r === Zr && ((An & 2) === 0 && (Ju |= u), Nr === 4 && el(r, ha)), si(r, f), u === 1 && An === 0 && (a.mode & 1) === 0 && (es = gt() + 500, Yu && hl()));
  }
  function si(r, a) {
    var u = r.callbackNode;
    ll(r, a);
    var f = or(r, r === Zr ? ha : 0);
    if (f === 0) u !== null && rn(u), r.callbackNode = null, r.callbackPriority = 0;
    else if (a = f & -f, r.callbackPriority !== a) {
      if (u != null && rn(u), a === 1) r.tag === 0 ? So(gp.bind(null, r)) : ef(gp.bind(null, r)), Vu(function() {
        (An & 6) === 0 && hl();
      }), u = null;
      else {
        switch (sa(f)) {
          case 1:
            u = kt;
            break;
          case 4:
            u = tt;
            break;
          case 16:
            u = dn;
            break;
          case 536870912:
            u = ir;
            break;
          default:
            u = dn;
        }
        u = Fh(u, Uf.bind(null, r));
      }
      r.callbackPriority = a, r.callbackNode = u;
    }
  }
  function Uf(r, a) {
    if (dc = -1, za = 0, (An & 6) !== 0) throw Error(s(327));
    var u = r.callbackNode;
    if (rs() && r.callbackNode !== u) return null;
    var f = or(r, r === Zr ? ha : 0);
    if (f === 0) return null;
    if ((f & 30) !== 0 || (f & r.expiredLanes) !== 0 || a) a = jf(r, f);
    else {
      a = f;
      var m = An;
      An |= 2;
      var S = Dh();
      (Zr !== r || ha !== a) && (Ti = null, es = gt() + 500, Gl(r, a));
      do
        try {
          Oh();
          break;
        } catch (N) {
          kh(r, N);
        }
      while (!0);
      Qd(), _o.current = S, An = m, qr !== null ? a = 0 : (Zr = null, ha = 0, a = Nr);
    }
    if (a !== 0) {
      if (a === 2 && (m = ta(r), m !== 0 && (f = m, a = pc(r, m))), a === 1) throw u = sc, Gl(r, 0), el(r, f), si(r, gt()), u;
      if (a === 6) el(r, f);
      else {
        if (m = r.current.alternate, (f & 30) === 0 && !Zy(m) && (a = jf(r, f), a === 2 && (S = ta(r), S !== 0 && (f = S, a = pc(r, S))), a === 1)) throw u = sc, Gl(r, 0), el(r, f), si(r, gt()), u;
        switch (r.finishedWork = m, r.finishedLanes = f, a) {
          case 0:
          case 1:
            throw Error(s(345));
          case 2:
            gu(r, ui, Ti);
            break;
          case 3:
            if (el(r, f), (f & 130023424) === f && (a = yp + 500 - gt(), 10 < a)) {
              if (or(r, 0) !== 0) break;
              if (m = r.suspendedLanes, (m & f) !== f) {
                Yr(), r.pingedLanes |= r.suspendedLanes & m;
                break;
              }
              r.timeoutHandle = Kc(gu.bind(null, r, ui, Ti), a);
              break;
            }
            gu(r, ui, Ti);
            break;
          case 4:
            if (el(r, f), (f & 4194240) === f) break;
            for (a = r.eventTimes, m = -1; 0 < f; ) {
              var _ = 31 - lr(f);
              S = 1 << _, _ = a[_], _ > m && (m = _), f &= ~S;
            }
            if (f = m, f = gt() - f, f = (120 > f ? 120 : 480 > f ? 480 : 1080 > f ? 1080 : 1920 > f ? 1920 : 3e3 > f ? 3e3 : 4320 > f ? 4320 : 1960 * Ky(f / 1960)) - f, 10 < f) {
              r.timeoutHandle = Kc(gu.bind(null, r, ui, Ti), f);
              break;
            }
            gu(r, ui, Ti);
            break;
          case 5:
            gu(r, ui, Ti);
            break;
          default:
            throw Error(s(329));
        }
      }
    }
    return si(r, gt()), r.callbackNode === u ? Uf.bind(null, r) : null;
  }
  function pc(r, a) {
    var u = cc;
    return r.current.memoizedState.isDehydrated && (Gl(r, a).flags |= 256), r = jf(r, a), r !== 2 && (a = ui, ui = u, a !== null && mu(a)), r;
  }
  function mu(r) {
    ui === null ? ui = r : ui.push.apply(ui, r);
  }
  function Zy(r) {
    for (var a = r; ; ) {
      if (a.flags & 16384) {
        var u = a.updateQueue;
        if (u !== null && (u = u.stores, u !== null)) for (var f = 0; f < u.length; f++) {
          var m = u[f], S = m.getSnapshot;
          m = m.value;
          try {
            if (!Gi(S(), m)) return !1;
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
  function el(r, a) {
    for (a &= ~Af, a &= ~Ju, r.suspendedLanes |= a, r.pingedLanes &= ~a, r = r.expirationTimes; 0 < a; ) {
      var u = 31 - lr(a), f = 1 << u;
      r[u] = -1, a &= ~f;
    }
  }
  function gp(r) {
    if ((An & 6) !== 0) throw Error(s(327));
    rs();
    var a = or(r, 0);
    if ((a & 1) === 0) return si(r, gt()), null;
    var u = jf(r, a);
    if (r.tag !== 0 && u === 2) {
      var f = ta(r);
      f !== 0 && (a = f, u = pc(r, f));
    }
    if (u === 1) throw u = sc, Gl(r, 0), el(r, a), si(r, gt()), u;
    if (u === 6) throw Error(s(345));
    return r.finishedWork = r.current.alternate, r.finishedLanes = a, gu(r, ui, Ti), si(r, gt()), null;
  }
  function Sp(r, a) {
    var u = An;
    An |= 1;
    try {
      return r(a);
    } finally {
      An = u, An === 0 && (es = gt() + 500, Yu && hl());
    }
  }
  function yu(r) {
    Ql !== null && Ql.tag === 0 && (An & 6) === 0 && rs();
    var a = An;
    An |= 1;
    var u = va.transition, f = an;
    try {
      if (va.transition = null, an = 1, r) return r();
    } finally {
      an = f, va.transition = u, An = a, (An & 6) === 0 && hl();
    }
  }
  function xp() {
    Ci = Zu.current, sr(Zu);
  }
  function Gl(r, a) {
    r.finishedWork = null, r.finishedLanes = 0;
    var u = r.timeoutHandle;
    if (u !== -1 && (r.timeoutHandle = -1, Id(u)), qr !== null) for (u = qr.return; u !== null; ) {
      var f = u;
      switch (nf(f), f.tag) {
        case 1:
          f = f.type.childContextTypes, f != null && qu();
          break;
        case 3:
          iu(), sr(Xr), sr(br), yt();
          break;
        case 5:
          of(f);
          break;
        case 4:
          iu();
          break;
        case 13:
          sr(wr);
          break;
        case 19:
          sr(wr);
          break;
        case 10:
          Gd(f.type._context);
          break;
        case 22:
        case 23:
          xp();
      }
      u = u.return;
    }
    if (Zr = r, qr = r = Oo(r.current, null), ha = Ci = a, Nr = 0, sc = null, Af = Ju = Cl = 0, ui = cc = null, ru !== null) {
      for (a = 0; a < ru.length; a++) if (u = ru[a], f = u.interleaved, f !== null) {
        u.interleaved = null;
        var m = f.next, S = u.pending;
        if (S !== null) {
          var _ = S.next;
          S.next = m, f.next = _;
        }
        u.pending = f;
      }
      ru = null;
    }
    return r;
  }
  function kh(r, a) {
    do {
      var u = qr;
      try {
        if (Qd(), mn.current = fu, sf) {
          for (var f = Vn.memoizedState; f !== null; ) {
            var m = f.queue;
            m !== null && (m.pending = null), f = f.next;
          }
          sf = !1;
        }
        if (nr = 0, ra = Vr = Vn = null, Bs = !1, lu = 0, vu.current = null, u === null || u.return === null) {
          Nr = 1, sc = a, qr = null;
          break;
        }
        e: {
          var S = r, _ = u.return, N = u, P = a;
          if (a = ha, N.flags |= 32768, P !== null && typeof P == "object" && typeof P.then == "function") {
            var te = P, Ce = N, ke = Ce.tag;
            if ((Ce.mode & 1) === 0 && (ke === 0 || ke === 11 || ke === 15)) {
              var Ee = Ce.alternate;
              Ee ? (Ce.updateQueue = Ee.updateQueue, Ce.memoizedState = Ee.memoizedState, Ce.lanes = Ee.lanes) : (Ce.updateQueue = null, Ce.memoizedState = null);
            }
            var Ze = mh(_);
            if (Ze !== null) {
              Ze.flags &= -257, Mo(Ze, _, N, S, a), Ze.mode & 1 && up(S, te, a), a = Ze, P = te;
              var it = a.updateQueue;
              if (it === null) {
                var st = /* @__PURE__ */ new Set();
                st.add(P), a.updateQueue = st;
              } else it.add(P);
              break e;
            } else {
              if ((a & 1) === 0) {
                up(S, te, a), Ep();
                break e;
              }
              P = Error(s(426));
            }
          } else if (mr && N.mode & 1) {
            var Ur = mh(_);
            if (Ur !== null) {
              (Ur.flags & 65536) === 0 && (Ur.flags |= 256), Mo(Ur, _, N, S, a), Bl(du(P, N));
              break e;
            }
          }
          S = P = du(P, N), Nr !== 4 && (Nr = 2), cc === null ? cc = [S] : cc.push(S), S = _;
          do {
            switch (S.tag) {
              case 3:
                S.flags |= 65536, a &= -a, S.lanes |= a;
                var Y = hh(S, P, a);
                ch(S, Y);
                break e;
              case 1:
                N = P;
                var V = S.type, G = S.stateNode;
                if ((S.flags & 128) === 0 && (typeof V.getDerivedStateFromError == "function" || G !== null && typeof G.componentDidCatch == "function" && (ko === null || !ko.has(G)))) {
                  S.flags |= 65536, a &= -a, S.lanes |= a;
                  var Te = op(S, N, a);
                  ch(S, Te);
                  break e;
                }
            }
            S = S.return;
          } while (S !== null);
        }
        Lh(u);
      } catch (lt) {
        a = lt, qr === u && u !== null && (qr = u = u.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Dh() {
    var r = _o.current;
    return _o.current = fu, r === null ? fu : r;
  }
  function Ep() {
    (Nr === 0 || Nr === 3 || Nr === 2) && (Nr = 4), Zr === null || (Cl & 268435455) === 0 && (Ju & 268435455) === 0 || el(Zr, ha);
  }
  function jf(r, a) {
    var u = An;
    An |= 2;
    var f = Dh();
    (Zr !== r || ha !== a) && (Ti = null, Gl(r, a));
    do
      try {
        Jy();
        break;
      } catch (m) {
        kh(r, m);
      }
    while (!0);
    if (Qd(), An = u, _o.current = f, qr !== null) throw Error(s(261));
    return Zr = null, ha = 0, Nr;
  }
  function Jy() {
    for (; qr !== null; ) zh(qr);
  }
  function Oh() {
    for (; qr !== null && !Fr(); ) zh(qr);
  }
  function zh(r) {
    var a = jh(r.alternate, r, Ci);
    r.memoizedProps = r.pendingProps, a === null ? Lh(r) : qr = a, vu.current = null;
  }
  function Lh(r) {
    var a = r;
    do {
      var u = a.alternate;
      if (r = a.return, (a.flags & 32768) === 0) {
        if (u = Th(u, a, Ci), u !== null) {
          qr = u;
          return;
        }
      } else {
        if (u = Of(u, a), u !== null) {
          u.flags &= 32767, qr = u;
          return;
        }
        if (r !== null) r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null;
        else {
          Nr = 6, qr = null;
          return;
        }
      }
      if (a = a.sibling, a !== null) {
        qr = a;
        return;
      }
      qr = a = r;
    } while (a !== null);
    Nr === 0 && (Nr = 5);
  }
  function gu(r, a, u) {
    var f = an, m = va.transition;
    try {
      va.transition = null, an = 1, e0(r, a, u, f);
    } finally {
      va.transition = m, an = f;
    }
    return null;
  }
  function e0(r, a, u, f) {
    do
      rs();
    while (Ql !== null);
    if ((An & 6) !== 0) throw Error(s(327));
    u = r.finishedWork;
    var m = r.finishedLanes;
    if (u === null) return null;
    if (r.finishedWork = null, r.finishedLanes = 0, u === r.current) throw Error(s(177));
    r.callbackNode = null, r.callbackPriority = 0;
    var S = u.lanes | u.childLanes;
    if (Al(r, S), r === Zr && (qr = Zr = null, ha = 0), (u.subtreeFlags & 2064) === 0 && (u.flags & 2064) === 0 || Nf || (Nf = !0, Fh(dn, function() {
      return rs(), null;
    })), S = (u.flags & 15990) !== 0, (u.subtreeFlags & 15990) !== 0 || S) {
      S = va.transition, va.transition = null;
      var _ = an;
      an = 1;
      var N = An;
      An |= 4, vu.current = null, Rh(r, u), vp(u, r), Fu(Zo), Za = !!As, Zo = As = null, r.current = u, Xy(u), Dr(), An = N, an = _, va.transition = S;
    } else r.current = u;
    if (Nf && (Nf = !1, Ql = r, fc = m), S = r.pendingLanes, S === 0 && (ko = null), La(u.stateNode), si(r, gt()), a !== null) for (f = r.onRecoverableError, u = 0; u < a.length; u++) m = a[u], f(m.value, { componentStack: m.stack, digest: m.digest });
    if (ts) throw ts = !1, r = hu, hu = null, r;
    return (fc & 1) !== 0 && r.tag !== 0 && rs(), S = r.pendingLanes, (S & 1) !== 0 ? r === ns ? Do++ : (Do = 0, ns = r) : Do = 0, hl(), null;
  }
  function rs() {
    if (Ql !== null) {
      var r = sa(fc), a = va.transition, u = an;
      try {
        if (va.transition = null, an = 16 > r ? 16 : r, Ql === null) var f = !1;
        else {
          if (r = Ql, Ql = null, fc = 0, (An & 6) !== 0) throw Error(s(331));
          var m = An;
          for (An |= 4, rt = r.current; rt !== null; ) {
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
                        ic(8, Ce, S);
                    }
                    var ke = Ce.child;
                    if (ke !== null) ke.return = Ce, rt = ke;
                    else for (; rt !== null; ) {
                      Ce = rt;
                      var Ee = Ce.sibling, Ze = Ce.return;
                      if (Lf(Ce), Ce === te) {
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
                var it = S.alternate;
                if (it !== null) {
                  var st = it.child;
                  if (st !== null) {
                    it.child = null;
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
                  ic(9, S, S.return);
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
                    lc(9, N);
                }
              } catch (lt) {
                yr(N, N.return, lt);
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
          if (An = m, hl(), On && typeof On.onPostCommitFiberRoot == "function") try {
            On.onPostCommitFiberRoot(Xn, r);
          } catch {
          }
          f = !0;
        }
        return f;
      } finally {
        an = u, va.transition = a;
      }
    }
    return !1;
  }
  function Ah(r, a, u) {
    a = du(u, a), a = hh(r, a, 1), r = wo(r, a, 1), a = Yr(), r !== null && (ua(r, 1, a), si(r, a));
  }
  function yr(r, a, u) {
    if (r.tag === 3) Ah(r, r, u);
    else for (; a !== null; ) {
      if (a.tag === 3) {
        Ah(a, r, u);
        break;
      } else if (a.tag === 1) {
        var f = a.stateNode;
        if (typeof a.type.getDerivedStateFromError == "function" || typeof f.componentDidCatch == "function" && (ko === null || !ko.has(f))) {
          r = du(u, r), r = op(a, r, 1), a = wo(a, r, 1), r = Yr(), a !== null && (ua(a, 1, r), si(a, r));
          break;
        }
      }
      a = a.return;
    }
  }
  function t0(r, a, u) {
    var f = r.pingCache;
    f !== null && f.delete(a), a = Yr(), r.pingedLanes |= r.suspendedLanes & u, Zr === r && (ha & u) === u && (Nr === 4 || Nr === 3 && (ha & 130023424) === ha && 500 > gt() - yp ? Gl(r, 0) : Af |= u), si(r, a);
  }
  function Nh(r, a) {
    a === 0 && ((r.mode & 1) === 0 ? a = 1 : (a = xr, xr <<= 1, (xr & 130023424) === 0 && (xr = 4194304)));
    var u = Yr();
    r = xi(r, a), r !== null && (ua(r, a, u), si(r, u));
  }
  function n0(r) {
    var a = r.memoizedState, u = 0;
    a !== null && (u = a.retryLane), Nh(r, u);
  }
  function Uh(r, a) {
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
    f !== null && f.delete(a), Nh(r, u);
  }
  var jh;
  jh = function(r, a, u) {
    if (r !== null) if (r.memoizedProps !== a.pendingProps || Xr.current) Ir = !0;
    else {
      if ((r.lanes & u) === 0 && (a.flags & 128) === 0) return Ir = !1, nc(r, a, u);
      Ir = (r.flags & 131072) !== 0;
    }
    else Ir = !1, mr && (a.flags & 1048576) !== 0 && lh(a, Il, a.index);
    switch (a.lanes = 0, a.tag) {
      case 2:
        var f = a.type;
        Fi(r, a), r = a.pendingProps;
        var m = ti(a, br.current);
        Tr(a, u), m = Ro(null, a, f, r, m, u);
        var S = Ki();
        return a.flags |= 1, typeof m == "object" && m !== null && typeof m.render == "function" && m.$$typeof === void 0 ? (a.tag = 1, a.memoizedState = null, a.updateQueue = null, Hr(f) ? (S = !0, na(a)) : S = !1, a.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, Jd(a), m.updater = bf, a.stateNode = m, m._reactInternals = a, Ks(a, f, r, u), a = ec(null, a, f, !0, S, u)) : (a.tag = 0, mr && S && tf(a), pa(null, a, m, u), a = a.child), a;
      case 16:
        f = a.elementType;
        e: {
          switch (Fi(r, a), r = a.pendingProps, m = f._init, f = m(f._payload), a.type = f, m = a.tag = a0(f), r = Zi(f, r), m) {
            case 0:
              a = yh(null, a, f, r, u);
              break e;
            case 1:
              a = gh(null, a, f, r, u);
              break e;
            case 11:
              a = li(null, a, f, r, u);
              break e;
            case 14:
              a = pu(null, a, f, Zi(f.type, r), u);
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
        return f = a.type, m = a.pendingProps, m = a.elementType === f ? m : Zi(f, m), yh(r, a, f, m, u);
      case 1:
        return f = a.type, m = a.pendingProps, m = a.elementType === f ? m : Zi(f, m), gh(r, a, f, m, u);
      case 3:
        e: {
          if (Xu(a), r === null) throw Error(s(387));
          f = a.pendingProps, S = a.memoizedState, m = S.element, sh(r, a), Ps(a, f, null, u);
          var _ = a.memoizedState;
          if (f = _.element, S.isDehydrated) if (S = { element: f, isDehydrated: !1, cache: _.cache, pendingSuspenseBoundaries: _.pendingSuspenseBoundaries, transitions: _.transitions }, a.updateQueue.baseState = S, a.memoizedState = S, a.flags & 256) {
            m = du(Error(s(423)), a), a = Sh(r, a, f, u, m);
            break e;
          } else if (f !== m) {
            m = du(Error(s(424)), a), a = Sh(r, a, f, u, m);
            break e;
          } else for (ri = dl(a.stateNode.containerInfo.firstChild), ni = a, mr = !0, Ui = null, u = We(a, null, f, u), a.child = u; u; ) u.flags = u.flags & -3 | 4096, u = u.sibling;
          else {
            if (To(), f === m) {
              a = Pi(r, a, u);
              break e;
            }
            pa(r, a, f, u);
          }
          a = a.child;
        }
        return a;
      case 5:
        return fh(a), r === null && Yd(a), f = a.type, m = a.pendingProps, S = r !== null ? r.memoizedProps : null, _ = m.children, Xc(f, m) ? _ = null : S !== null && Xc(f, S) && (a.flags |= 32), sp(r, a), pa(r, a, _, u), a.child;
      case 6:
        return r === null && Yd(a), null;
      case 13:
        return Df(r, a, u);
      case 4:
        return tp(a, a.stateNode.containerInfo), f = a.pendingProps, r === null ? a.child = zr(a, null, f, u) : pa(r, a, f, u), a.child;
      case 11:
        return f = a.type, m = a.pendingProps, m = a.elementType === f ? m : Zi(f, m), li(r, a, f, m, u);
      case 7:
        return pa(r, a, a.pendingProps, u), a.child;
      case 8:
        return pa(r, a, a.pendingProps.children, u), a.child;
      case 12:
        return pa(r, a, a.pendingProps.children, u), a.child;
      case 10:
        e: {
          if (f = a.type._context, m = a.pendingProps, S = a.memoizedProps, _ = m.value, vt(Si, f._currentValue), f._currentValue = _, S !== null) if (Gi(S.value, _)) {
            if (S.children === m.children && !Xr.current) {
              a = Pi(r, a, u);
              break e;
            }
          } else for (S = a.child, S !== null && (S.return = a); S !== null; ) {
            var N = S.dependencies;
            if (N !== null) {
              _ = S.child;
              for (var P = N.firstContext; P !== null; ) {
                if (P.context === f) {
                  if (S.tag === 1) {
                    P = ql(-1, u & -u), P.tag = 2;
                    var te = S.updateQueue;
                    if (te !== null) {
                      te = te.shared;
                      var Ce = te.pending;
                      Ce === null ? P.next = P : (P.next = Ce.next, Ce.next = P), te.pending = P;
                    }
                  }
                  S.lanes |= u, P = S.alternate, P !== null && (P.lanes |= u), Xd(
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
              _.lanes |= u, N = _.alternate, N !== null && (N.lanes |= u), Xd(_, u, a), _ = S.sibling;
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
          pa(r, a, m.children, u), a = a.child;
        }
        return a;
      case 9:
        return m = a.type, f = a.pendingProps.children, Tr(a, u), m = ji(m), f = f(m), a.flags |= 1, pa(r, a, f, u), a.child;
      case 14:
        return f = a.type, m = Zi(f, a.pendingProps), m = Zi(f.type, m), pu(r, a, f, m, u);
      case 15:
        return tn(r, a, a.type, a.pendingProps, u);
      case 17:
        return f = a.type, m = a.pendingProps, m = a.elementType === f ? m : Zi(f, m), Fi(r, a), a.tag = 1, Hr(f) ? (r = !0, na(a)) : r = !1, Tr(a, u), Mf(a, f, m), Ks(a, f, m, u), ec(null, a, f, !0, r, u);
      case 19:
        return Sl(r, a, u);
      case 22:
        return Js(r, a, u);
    }
    throw Error(s(156, a.tag));
  };
  function Fh(r, a) {
    return sn(r, a);
  }
  function r0(r, a, u, f) {
    this.tag = r, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = f, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function $i(r, a, u, f) {
    return new r0(r, a, u, f);
  }
  function Cp(r) {
    return r = r.prototype, !(!r || !r.isReactComponent);
  }
  function a0(r) {
    if (typeof r == "function") return Cp(r) ? 1 : 0;
    if (r != null) {
      if (r = r.$$typeof, r === Re) return 11;
      if (r === Fe) return 14;
    }
    return 2;
  }
  function Oo(r, a) {
    var u = r.alternate;
    return u === null ? (u = $i(r.tag, a, r.key, r.mode), u.elementType = r.elementType, u.type = r.type, u.stateNode = r.stateNode, u.alternate = r, r.alternate = u) : (u.pendingProps = a, u.type = r.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = r.flags & 14680064, u.childLanes = r.childLanes, u.lanes = r.lanes, u.child = r.child, u.memoizedProps = r.memoizedProps, u.memoizedState = r.memoizedState, u.updateQueue = r.updateQueue, a = r.dependencies, u.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, u.sibling = r.sibling, u.index = r.index, u.ref = r.ref, u;
  }
  function vc(r, a, u, f, m, S) {
    var _ = 2;
    if (f = r, typeof r == "function") Cp(r) && (_ = 1);
    else if (typeof r == "string") _ = 5;
    else e: switch (r) {
      case pe:
        return Xl(u.children, m, S, a);
      case ze:
        _ = 8, m |= 8;
        break;
      case he:
        return r = $i(12, u, a, m | 2), r.elementType = he, r.lanes = S, r;
      case fe:
        return r = $i(13, u, a, m), r.elementType = fe, r.lanes = S, r;
      case ye:
        return r = $i(19, u, a, m), r.elementType = ye, r.lanes = S, r;
      case ge:
        return zo(u, m, S, a);
      default:
        if (typeof r == "object" && r !== null) switch (r.$$typeof) {
          case le:
            _ = 10;
            break e;
          case Oe:
            _ = 9;
            break e;
          case Re:
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
    return a = $i(_, u, a, m), a.elementType = r, a.type = f, a.lanes = S, a;
  }
  function Xl(r, a, u, f) {
    return r = $i(7, r, f, a), r.lanes = u, r;
  }
  function zo(r, a, u, f) {
    return r = $i(22, r, f, a), r.elementType = ge, r.lanes = u, r.stateNode = { isHidden: !1 }, r;
  }
  function Tp(r, a, u) {
    return r = $i(6, r, null, a), r.lanes = u, r;
  }
  function Ff(r, a, u) {
    return a = $i(4, r.children !== null ? r.children : [], r.key, a), a.lanes = u, a.stateNode = { containerInfo: r.containerInfo, pendingChildren: null, implementation: r.implementation }, a;
  }
  function Ph(r, a, u, f, m) {
    this.tag = a, this.containerInfo = r, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Xa(0), this.expirationTimes = Xa(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xa(0), this.identifierPrefix = f, this.onRecoverableError = m, this.mutableSourceEagerHydrationData = null;
  }
  function Pf(r, a, u, f, m, S, _, N, P) {
    return r = new Ph(r, a, u, N, P), a === 1 ? (a = 1, S === !0 && (a |= 8)) : a = 0, S = $i(3, null, null, a), r.current = S, S.stateNode = r, S.memoizedState = { element: f, isDehydrated: u, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Jd(S), r;
  }
  function i0(r, a, u) {
    var f = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: re, key: f == null ? null : "" + f, children: r, containerInfo: a, implementation: u };
  }
  function wp(r) {
    if (!r) return ka;
    r = r._reactInternals;
    e: {
      if (Ae(r) !== r || r.tag !== 1) throw Error(s(170));
      var a = r;
      do {
        switch (a.tag) {
          case 3:
            a = a.stateNode.context;
            break e;
          case 1:
            if (Hr(a.type)) {
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
      if (Hr(u)) return js(r, u, a);
    }
    return a;
  }
  function Hh(r, a, u, f, m, S, _, N, P) {
    return r = Pf(u, f, !0, r, m, S, _, N, P), r.context = wp(null), u = r.current, f = Yr(), m = Tl(u), S = ql(f, m), S.callback = a ?? null, wo(u, S, m), r.current.lanes = m, ua(r, m, f), si(r, f), r;
  }
  function Hf(r, a, u, f) {
    var m = a.current, S = Yr(), _ = Tl(m);
    return u = wp(u), a.context === null ? a.context = u : a.pendingContext = u, a = ql(S, _), a.payload = { element: r }, f = f === void 0 ? null : f, f !== null && (a.callback = f), r = wo(m, a, _), r !== null && (Fa(r, m, _, S), lf(r, m, _)), _;
  }
  function $f(r) {
    return r = r.current, r.child ? (r.child.tag === 5, r.child.stateNode) : null;
  }
  function Rp(r, a) {
    if (r = r.memoizedState, r !== null && r.dehydrated !== null) {
      var u = r.retryLane;
      r.retryLane = u !== 0 && u < a ? u : a;
    }
  }
  function Vf(r, a) {
    Rp(r, a), (r = r.alternate) && Rp(r, a);
  }
  function $h() {
    return null;
  }
  var Su = typeof reportError == "function" ? reportError : function(r) {
    console.error(r);
  };
  function bp(r) {
    this._internalRoot = r;
  }
  If.prototype.render = bp.prototype.render = function(r) {
    var a = this._internalRoot;
    if (a === null) throw Error(s(409));
    Hf(r, a, null, null);
  }, If.prototype.unmount = bp.prototype.unmount = function() {
    var r = this._internalRoot;
    if (r !== null) {
      this._internalRoot = null;
      var a = r.containerInfo;
      yu(function() {
        Hf(null, r, null, null);
      }), a[$l] = null;
    }
  };
  function If(r) {
    this._internalRoot = r;
  }
  If.prototype.unstable_scheduleHydration = function(r) {
    if (r) {
      var a = Dt();
      r = { blockedOn: null, target: r, priority: a };
      for (var u = 0; u < cn.length && a !== 0 && a < cn[u].priority; u++) ;
      cn.splice(u, 0, r), u === 0 && so(r);
    }
  };
  function Mp(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11);
  }
  function Bf(r) {
    return !(!r || r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11 && (r.nodeType !== 8 || r.nodeValue !== " react-mount-point-unstable "));
  }
  function Vh() {
  }
  function l0(r, a, u, f, m) {
    if (m) {
      if (typeof f == "function") {
        var S = f;
        f = function() {
          var te = $f(_);
          S.call(te);
        };
      }
      var _ = Hh(a, f, r, 0, null, !1, !1, "", Vh);
      return r._reactRootContainer = _, r[$l] = _.current, Hu(r.nodeType === 8 ? r.parentNode : r), yu(), _;
    }
    for (; m = r.lastChild; ) r.removeChild(m);
    if (typeof f == "function") {
      var N = f;
      f = function() {
        var te = $f(P);
        N.call(te);
      };
    }
    var P = Pf(r, 0, !1, null, null, !1, !1, "", Vh);
    return r._reactRootContainer = P, r[$l] = P.current, Hu(r.nodeType === 8 ? r.parentNode : r), yu(function() {
      Hf(a, P, u, f);
    }), P;
  }
  function hc(r, a, u, f, m) {
    var S = u._reactRootContainer;
    if (S) {
      var _ = S;
      if (typeof m == "function") {
        var N = m;
        m = function() {
          var P = $f(_);
          N.call(P);
        };
      }
      Hf(a, _, r, m);
    } else _ = l0(u, a, r, m, f);
    return $f(_);
  }
  pn = function(r) {
    switch (r.tag) {
      case 3:
        var a = r.stateNode;
        if (a.current.memoizedState.isDehydrated) {
          var u = Or(a.pendingLanes);
          u !== 0 && (Aa(a, u | 1), si(a, gt()), (An & 6) === 0 && (es = gt() + 500, hl()));
        }
        break;
      case 13:
        yu(function() {
          var f = xi(r, 1);
          if (f !== null) {
            var m = Yr();
            Fa(f, r, 1, m);
          }
        }), Vf(r, 1);
    }
  }, ca = function(r) {
    if (r.tag === 13) {
      var a = xi(r, 134217728);
      if (a !== null) {
        var u = Yr();
        Fa(a, r, 134217728, u);
      }
      Vf(r, 134217728);
    }
  }, fa = function(r) {
    if (r.tag === 13) {
      var a = Tl(r), u = xi(r, a);
      if (u !== null) {
        var f = Yr();
        Fa(u, r, a, f);
      }
      Vf(r, a);
    }
  }, Dt = function() {
    return an;
  }, ht = function(r, a) {
    var u = an;
    try {
      return an = r, a();
    } finally {
      an = u;
    }
  }, Gt = function(r, a, u) {
    switch (a) {
      case "input":
        if (Lt(r, u), a = u.name, u.type === "radio" && a != null) {
          for (u = r; u.parentNode; ) u = u.parentNode;
          for (u = u.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), a = 0; a < u.length; a++) {
            var f = u[a];
            if (f !== r && f.form === r.form) {
              var m = Cr(f);
              if (!m) throw Error(s(90));
              Wn(f), Lt(f, m);
            }
          }
        }
        break;
      case "textarea":
        gr(r, u);
        break;
      case "select":
        a = u.value, a != null && $t(r, !!u.multiple, a, !1);
    }
  }, Fn = Sp, _r = yu;
  var o0 = { usingClientEntryPoint: !1, Events: [mt, Xi, Cr, Mr, Sr, Sp] }, mc = { findFiberByHostInstance: Jo, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Ih = { bundleType: mc.bundleType, version: mc.version, rendererPackageName: mc.rendererPackageName, rendererConfig: mc.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ee.ReactCurrentDispatcher, findHostInstanceByFiber: function(r) {
    return r = Ft(r), r === null ? null : r.stateNode;
  }, findFiberByHostInstance: mc.findFiberByHostInstance || $h, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Lo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Lo.isDisabled && Lo.supportsFiber) try {
      Xn = Lo.inject(Ih), On = Lo;
    } catch {
    }
  }
  return Wi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = o0, Wi.createPortal = function(r, a) {
    var u = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Mp(a)) throw Error(s(200));
    return i0(r, a, null, u);
  }, Wi.createRoot = function(r, a) {
    if (!Mp(r)) throw Error(s(299));
    var u = !1, f = "", m = Su;
    return a != null && (a.unstable_strictMode === !0 && (u = !0), a.identifierPrefix !== void 0 && (f = a.identifierPrefix), a.onRecoverableError !== void 0 && (m = a.onRecoverableError)), a = Pf(r, 1, !1, null, null, u, !1, f, m), r[$l] = a.current, Hu(r.nodeType === 8 ? r.parentNode : r), new bp(a);
  }, Wi.findDOMNode = function(r) {
    if (r == null) return null;
    if (r.nodeType === 1) return r;
    var a = r._reactInternals;
    if (a === void 0)
      throw typeof r.render == "function" ? Error(s(188)) : (r = Object.keys(r).join(","), Error(s(268, r)));
    return r = Ft(a), r = r === null ? null : r.stateNode, r;
  }, Wi.flushSync = function(r) {
    return yu(r);
  }, Wi.hydrate = function(r, a, u) {
    if (!Bf(a)) throw Error(s(200));
    return hc(null, r, a, !0, u);
  }, Wi.hydrateRoot = function(r, a, u) {
    if (!Mp(r)) throw Error(s(405));
    var f = u != null && u.hydratedSources || null, m = !1, S = "", _ = Su;
    if (u != null && (u.unstable_strictMode === !0 && (m = !0), u.identifierPrefix !== void 0 && (S = u.identifierPrefix), u.onRecoverableError !== void 0 && (_ = u.onRecoverableError)), a = Hh(a, null, r, 1, u ?? null, m, !1, S, _), r[$l] = a.current, Hu(r), f) for (r = 0; r < f.length; r++) u = f[r], m = u._getVersion, m = m(u._source), a.mutableSourceEagerHydrationData == null ? a.mutableSourceEagerHydrationData = [u, m] : a.mutableSourceEagerHydrationData.push(
      u,
      m
    );
    return new If(a);
  }, Wi.render = function(r, a, u) {
    if (!Bf(a)) throw Error(s(200));
    return hc(null, r, a, !1, u);
  }, Wi.unmountComponentAtNode = function(r) {
    if (!Bf(r)) throw Error(s(40));
    return r._reactRootContainer ? (yu(function() {
      hc(null, null, r, !1, function() {
        r._reactRootContainer = null, r[$l] = null;
      });
    }), !0) : !1;
  }, Wi.unstable_batchedUpdates = Sp, Wi.unstable_renderSubtreeIntoContainer = function(r, a, u, f) {
    if (!Bf(u)) throw Error(s(200));
    if (r == null || r._reactInternals === void 0) throw Error(s(38));
    return hc(r, a, u, !1, f);
  }, Wi.version = "18.3.1-next-f1338f8080-20240426", Wi;
}
var Qi = {};
var hE;
function p4() {
  return hE || (hE = 1, process.env.NODE_ENV !== "production" && (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var n = zv(), l = VC(), s = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, p = !1;
    function h(e) {
      p = e;
    }
    function y(e) {
      if (!p) {
        for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          i[o - 1] = arguments[o];
        C("warn", e, i);
      }
    }
    function v(e) {
      if (!p) {
        for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          i[o - 1] = arguments[o];
        C("error", e, i);
      }
    }
    function C(e, t, i) {
      {
        var o = s.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (t += "%s", i = i.concat([c]));
        var d = i.map(function(g) {
          return String(g);
        });
        d.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, d);
      }
    }
    var E = 0, T = 1, b = 2, R = 3, D = 4, O = 5, L = 6, U = 7, j = 8, X = 9, J = 10, B = 11, ee = 12, q = 13, re = 14, pe = 15, ze = 16, he = 17, le = 18, Oe = 19, Re = 21, fe = 22, ye = 23, Fe = 24, Ue = 25, ge = !0, de = !1, Le = !1, ie = !1, H = !1, ue = !0, Ve = !0, be = !0, Pe = !0, Ge = /* @__PURE__ */ new Set(), He = {}, Ie = {};
    function Be(e, t) {
      Zt(e, t), Zt(e + "Capture", t);
    }
    function Zt(e, t) {
      He[e] && v("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), He[e] = t;
      {
        var i = e.toLowerCase();
        Ie[i] = e, e === "onDoubleClick" && (Ie.ondblclick = e);
      }
      for (var o = 0; o < t.length; o++)
        Ge.add(t[o]);
    }
    var kn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Wn = Object.prototype.hasOwnProperty;
    function ln(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, i = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return i;
      }
    }
    function _e(e) {
      try {
        return nn(e), !1;
      } catch {
        return !0;
      }
    }
    function nn(e) {
      return "" + e;
    }
    function et(e, t) {
      if (_e(e))
        return v("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, ln(e)), nn(e);
    }
    function Lt(e) {
      if (_e(e))
        return v("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ln(e)), nn(e);
    }
    function bt(e, t) {
      if (_e(e))
        return v("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, ln(e)), nn(e);
    }
    function Ht(e, t) {
      if (_e(e))
        return v("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, ln(e)), nn(e);
    }
    function on(e) {
      if (_e(e))
        return v("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", ln(e)), nn(e);
    }
    function $t(e) {
      if (_e(e))
        return v("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", ln(e)), nn(e);
    }
    var En = 0, Qn = 1, gr = 2, $e = 3, un = 4, Gn = 5, vr = 6, fr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Me = fr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", qe = new RegExp("^[" + fr + "][" + Me + "]*$"), xt = {}, Jt = {};
    function Bt(e) {
      return Wn.call(Jt, e) ? !0 : Wn.call(xt, e) ? !1 : qe.test(e) ? (Jt[e] = !0, !0) : (xt[e] = !0, v("Invalid attribute name: `%s`", e), !1);
    }
    function Cn(e, t, i) {
      return t !== null ? t.type === En : i ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function qt(e, t, i, o) {
      if (i !== null && i.type === En)
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
    function fn(e, t, i, o) {
      if (t === null || typeof t > "u" || qt(e, t, i, o))
        return !0;
      if (o)
        return !1;
      if (i !== null)
        switch (i.type) {
          case $e:
            return !t;
          case un:
            return t === !1;
          case Gn:
            return isNaN(t);
          case vr:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Et(e) {
      return Gt.hasOwnProperty(e) ? Gt[e] : null;
    }
    function Mt(e, t, i, o, c, d, g) {
      this.acceptsBooleans = t === gr || t === $e || t === un, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = i, this.propertyName = e, this.type = t, this.sanitizeURL = d, this.removeEmptyString = g;
    }
    var Gt = {}, Dn = [
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
    Dn.forEach(function(e) {
      Gt[e] = new Mt(
        e,
        En,
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
      Gt[t] = new Mt(
        t,
        Qn,
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
      Gt[e] = new Mt(
        e,
        gr,
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
      Gt[e] = new Mt(
        e,
        gr,
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
      Gt[e] = new Mt(
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
      Gt[e] = new Mt(
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
      Gt[e] = new Mt(
        e,
        un,
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
      Gt[e] = new Mt(
        e,
        vr,
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
      Gt[e] = new Mt(
        e,
        Gn,
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
    var Xt = /[\-\:]([a-z])/g, jn = function(e) {
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
      var t = e.replace(Xt, jn);
      Gt[t] = new Mt(
        t,
        Qn,
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
      var t = e.replace(Xt, jn);
      Gt[t] = new Mt(
        t,
        Qn,
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
      var t = e.replace(Xt, jn);
      Gt[t] = new Mt(
        t,
        Qn,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Gt[e] = new Mt(
        e,
        Qn,
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
    var Mr = "xlinkHref";
    Gt[Mr] = new Mt(
      "xlinkHref",
      Qn,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Gt[e] = new Mt(
        e,
        Qn,
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
    var Sr = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Fn = !1;
    function _r(e) {
      !Fn && Sr.test(e) && (Fn = !0, v("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function Tn(e, t, i, o) {
      if (o.mustUseProperty) {
        var c = o.propertyName;
        return e[c];
      } else {
        et(i, t), o.sanitizeURL && _r("" + i);
        var d = o.attributeName, g = null;
        if (o.type === un) {
          if (e.hasAttribute(d)) {
            var x = e.getAttribute(d);
            return x === "" ? !0 : fn(t, i, o, !1) ? x : x === "" + i ? i : x;
          }
        } else if (e.hasAttribute(d)) {
          if (fn(t, i, o, !1))
            return e.getAttribute(d);
          if (o.type === $e)
            return i;
          g = e.getAttribute(d);
        }
        return fn(t, i, o, !1) ? g === null ? i : g : g === "" + i ? i : g;
      }
    }
    function kr(e, t, i, o) {
      {
        if (!Bt(t))
          return;
        if (!e.hasAttribute(t))
          return i === void 0 ? void 0 : null;
        var c = e.getAttribute(t);
        return et(i, t), c === "" + i ? i : c;
      }
    }
    function wn(e, t, i, o) {
      var c = Et(t);
      if (!Cn(t, c, o)) {
        if (fn(t, i, c, o) && (i = null), o || c === null) {
          if (Bt(t)) {
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
          I === $e || I === un && i === !0 ? $ = "" : (et(i, k), $ = "" + i, c.sanitizeURL && _r($.toString())), z ? e.setAttributeNS(z, k, $) : e.setAttribute(k, $);
        }
      }
    }
    var Yt = /* @__PURE__ */ Symbol.for("react.element"), At = /* @__PURE__ */ Symbol.for("react.portal"), yn = /* @__PURE__ */ Symbol.for("react.fragment"), gn = /* @__PURE__ */ Symbol.for("react.strict_mode"), en = /* @__PURE__ */ Symbol.for("react.profiler"), ft = /* @__PURE__ */ Symbol.for("react.provider"), A = /* @__PURE__ */ Symbol.for("react.context"), ae = /* @__PURE__ */ Symbol.for("react.forward_ref"), me = /* @__PURE__ */ Symbol.for("react.suspense"), xe = /* @__PURE__ */ Symbol.for("react.suspense_list"), Ae = /* @__PURE__ */ Symbol.for("react.memo"), Ye = /* @__PURE__ */ Symbol.for("react.lazy"), Ke = /* @__PURE__ */ Symbol.for("react.scope"), at = /* @__PURE__ */ Symbol.for("react.debug_trace_mode"), Ft = /* @__PURE__ */ Symbol.for("react.offscreen"), _t = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), sn = /* @__PURE__ */ Symbol.for("react.cache"), rn = /* @__PURE__ */ Symbol.for("react.tracing_marker"), Fr = Symbol.iterator, Dr = "@@iterator";
    function gt(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Fr && e[Fr] || e[Dr];
      return typeof t == "function" ? t : null;
    }
    var Ct = Object.assign, kt = 0, tt, dn, Vt, ir, Xn, On, La;
    function lr() {
    }
    lr.__reactDisabledLog = !0;
    function Qa() {
      {
        if (kt === 0) {
          tt = console.log, dn = console.info, Vt = console.warn, ir = console.error, Xn = console.group, On = console.groupCollapsed, La = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: lr,
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
        kt++;
      }
    }
    function Ga() {
      {
        if (kt--, kt === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ct({}, e, {
              value: tt
            }),
            info: Ct({}, e, {
              value: dn
            }),
            warn: Ct({}, e, {
              value: Vt
            }),
            error: Ct({}, e, {
              value: ir
            }),
            group: Ct({}, e, {
              value: Xn
            }),
            groupCollapsed: Ct({}, e, {
              value: On
            }),
            groupEnd: Ct({}, e, {
              value: La
            })
          });
        }
        kt < 0 && v("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ra = s.ReactCurrentDispatcher, ea;
    function xr(e, t, i) {
      {
        if (ea === void 0)
          try {
            throw Error();
          } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            ea = o && o[1] || "";
          }
        return `
` + ea + e;
      }
    }
    var Or = !1, or;
    {
      var il = typeof WeakMap == "function" ? WeakMap : Map;
      or = new il();
    }
    function ll(e, t) {
      if (!e || Or)
        return "";
      {
        var i = or.get(e);
        if (i !== void 0)
          return i;
      }
      var o;
      Or = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var d;
      d = Ra.current, Ra.current = null, Qa();
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
                    return e.displayName && I.includes("<anonymous>") && (I = I.replace("<anonymous>", e.displayName)), typeof e == "function" && or.set(e, I), I;
                  }
                while (k >= 1 && z >= 0);
              break;
            }
        }
      } finally {
        Or = !1, Ra.current = d, Ga(), Error.prepareStackTrace = c;
      }
      var $ = e ? e.displayName || e.name : "", Z = $ ? xr($) : "";
      return typeof e == "function" && or.set(e, Z), Z;
    }
    function ta(e, t, i) {
      return ll(e, !0);
    }
    function ba(e, t, i) {
      return ll(e, !1);
    }
    function Xa(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function ua(e, t, i) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ll(e, Xa(e));
      if (typeof e == "string")
        return xr(e);
      switch (e) {
        case me:
          return xr("Suspense");
        case xe:
          return xr("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case ae:
            return ba(e.render);
          case Ae:
            return ua(e.type, t, i);
          case Ye: {
            var o = e, c = o._payload, d = o._init;
            try {
              return ua(d(c), t, i);
            } catch {
            }
          }
        }
      return "";
    }
    function Al(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case O:
          return xr(e.type);
        case ze:
          return xr("Lazy");
        case q:
          return xr("Suspense");
        case Oe:
          return xr("SuspenseList");
        case E:
        case b:
        case pe:
          return ba(e.type);
        case B:
          return ba(e.type.render);
        case T:
          return ta(e.type);
        default:
          return "";
      }
    }
    function Aa(e) {
      try {
        var t = "", i = e;
        do
          t += Al(i), i = i.return;
        while (i);
        return t;
      } catch (o) {
        return `
Error generating stack: ` + o.message + `
` + o.stack;
      }
    }
    function an(e, t, i) {
      var o = e.displayName;
      if (o)
        return o;
      var c = t.displayName || t.name || "";
      return c !== "" ? i + "(" + c + ")" : i;
    }
    function sa(e) {
      return e.displayName || "Context";
    }
    function pn(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && v("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case yn:
          return "Fragment";
        case At:
          return "Portal";
        case en:
          return "Profiler";
        case gn:
          return "StrictMode";
        case me:
          return "Suspense";
        case xe:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case A:
            var t = e;
            return sa(t) + ".Consumer";
          case ft:
            var i = e;
            return sa(i._context) + ".Provider";
          case ae:
            return an(e, e.render, "ForwardRef");
          case Ae:
            var o = e.displayName || null;
            return o !== null ? o : pn(e.type) || "Memo";
          case Ye: {
            var c = e, d = c._payload, g = c._init;
            try {
              return pn(g(d));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function ca(e, t, i) {
      var o = t.displayName || t.name || "";
      return e.displayName || (o !== "" ? i + "(" + o + ")" : i);
    }
    function fa(e) {
      return e.displayName || "Context";
    }
    function Dt(e) {
      var t = e.tag, i = e.type;
      switch (t) {
        case Fe:
          return "Cache";
        case X:
          var o = i;
          return fa(o) + ".Consumer";
        case J:
          var c = i;
          return fa(c._context) + ".Provider";
        case le:
          return "DehydratedFragment";
        case B:
          return ca(i, i.render, "ForwardRef");
        case U:
          return "Fragment";
        case O:
          return i;
        case D:
          return "Portal";
        case R:
          return "Root";
        case L:
          return "Text";
        case ze:
          return pn(i);
        case j:
          return i === gn ? "StrictMode" : "Mode";
        case fe:
          return "Offscreen";
        case ee:
          return "Profiler";
        case Re:
          return "Scope";
        case q:
          return "Suspense";
        case Oe:
          return "SuspenseList";
        case Ue:
          return "TracingMarker";
        // The display name for this tags come from the user-provided type:
        case T:
        case E:
        case he:
        case b:
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
    var ht = s.ReactDebugCurrentFrame, Sn = null, Er = !1;
    function Jn() {
      {
        if (Sn === null)
          return null;
        var e = Sn._debugOwner;
        if (e !== null && typeof e < "u")
          return Dt(e);
      }
      return null;
    }
    function hr() {
      return Sn === null ? "" : Aa(Sn);
    }
    function Nt() {
      ht.getCurrentStack = null, Sn = null, Er = !1;
    }
    function Tt(e) {
      ht.getCurrentStack = e === null ? null : hr, Sn = e, Er = !1;
    }
    function er() {
      return Sn;
    }
    function cn(e) {
      Er = e;
    }
    function vn(e) {
      return "" + e;
    }
    function Rn(e) {
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
    var Ma = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Gr(e, t) {
      Ma[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || v("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || v("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function so(e) {
      var t = e.type, i = e.nodeName;
      return i && i.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Di(e) {
      return e._valueTracker;
    }
    function ol(e) {
      e._valueTracker = null;
    }
    function ws(e) {
      var t = "";
      return e && (so(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Ka(e) {
      var t = so(e) ? "checked" : "value", i = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
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
            ol(e), delete e[t];
          }
        };
        return g;
      }
    }
    function hi(e) {
      Di(e) || (e._valueTracker = Ka(e));
    }
    function Oi(e) {
      if (!e)
        return !1;
      var t = Di(e);
      if (!t)
        return !0;
      var i = t.getValue(), o = ws(e);
      return o !== i ? (t.setValue(o), !0) : !1;
    }
    function Za(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var co = !1, fo = !1, ul = !1, Nl = !1;
    function po(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function vo(e, t) {
      var i = e, o = t.checked, c = Ct({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: o ?? i._wrapperState.initialChecked
      });
      return c;
    }
    function mi(e, t) {
      Gr("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !fo && (v("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Jn() || "A component", t.type), fo = !0), t.value !== void 0 && t.defaultValue !== void 0 && !co && (v("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Jn() || "A component", t.type), co = !0);
      var i = e, o = t.defaultValue == null ? "" : t.defaultValue;
      i._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Rn(t.value != null ? t.value : o),
        controlled: po(t)
      };
    }
    function M(e, t) {
      var i = e, o = t.checked;
      o != null && wn(i, "checked", o, !1);
    }
    function F(e, t) {
      var i = e;
      {
        var o = po(t);
        !i._wrapperState.controlled && o && !Nl && (v("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Nl = !0), i._wrapperState.controlled && !o && !ul && (v("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ul = !0);
      }
      M(e, t);
      var c = Rn(t.value), d = t.type;
      if (c != null)
        d === "number" ? (c === 0 && i.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        i.value != c) && (i.value = vn(c)) : i.value !== vn(c) && (i.value = vn(c));
      else if (d === "submit" || d === "reset") {
        i.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? ut(i, t.type, c) : t.hasOwnProperty("defaultValue") && ut(i, t.type, Rn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (i.defaultChecked = !!t.defaultChecked);
    }
    function K(e, t, i) {
      var o = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var c = t.type, d = c === "submit" || c === "reset";
        if (d && (t.value === void 0 || t.value === null))
          return;
        var g = vn(o._wrapperState.initialValue);
        i || g !== o.value && (o.value = g), o.defaultValue = g;
      }
      var x = o.name;
      x !== "" && (o.name = ""), o.defaultChecked = !o.defaultChecked, o.defaultChecked = !!o._wrapperState.initialChecked, x !== "" && (o.name = x);
    }
    function oe(e, t) {
      var i = e;
      F(i, t), we(i, t);
    }
    function we(e, t) {
      var i = t.name;
      if (t.type === "radio" && i != null) {
        for (var o = e; o.parentNode; )
          o = o.parentNode;
        et(i, "name");
        for (var c = o.querySelectorAll("input[name=" + JSON.stringify("" + i) + '][type="radio"]'), d = 0; d < c.length; d++) {
          var g = c[d];
          if (!(g === e || g.form !== e.form)) {
            var x = om(g);
            if (!x)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Oi(g), F(g, x);
          }
        }
      }
    }
    function ut(e, t, i) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Za(e.ownerDocument) !== e) && (i == null ? e.defaultValue = vn(e._wrapperState.initialValue) : e.defaultValue !== vn(i) && (e.defaultValue = vn(i)));
    }
    var Ne = !1, pt = !1, Wt = !1;
    function Kt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? n.Children.forEach(t.children, function(i) {
        i != null && (typeof i == "string" || typeof i == "number" || pt || (pt = !0, v("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Wt || (Wt = !0, v("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Ne && (v("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Ne = !0);
    }
    function bn(e, t) {
      t.value != null && e.setAttribute("value", vn(Rn(t.value)));
    }
    var Pn = Array.isArray;
    function Ot(e) {
      return Pn(e);
    }
    var Mn;
    Mn = !1;
    function tr() {
      var e = Jn();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var hn = ["value", "defaultValue"];
    function Ul(e) {
      {
        Gr("select", e);
        for (var t = 0; t < hn.length; t++) {
          var i = hn[t];
          if (e[i] != null) {
            var o = Ot(e[i]);
            e.multiple && !o ? v("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", i, tr()) : !e.multiple && o && v("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", i, tr());
          }
        }
      }
    }
    function yi(e, t, i, o) {
      var c = e.options;
      if (t) {
        for (var d = i, g = {}, x = 0; x < d.length; x++)
          g["$" + d[x]] = !0;
        for (var w = 0; w < c.length; w++) {
          var k = g.hasOwnProperty("$" + c[w].value);
          c[w].selected !== k && (c[w].selected = k), k && o && (c[w].defaultSelected = !0);
        }
      } else {
        for (var z = vn(Rn(i)), I = null, $ = 0; $ < c.length; $++) {
          if (c[$].value === z) {
            c[$].selected = !0, o && (c[$].defaultSelected = !0);
            return;
          }
          I === null && !c[$].disabled && (I = c[$]);
        }
        I !== null && (I.selected = !0);
      }
    }
    function jl(e, t) {
      return Ct({}, t, {
        value: void 0
      });
    }
    function sl(e, t) {
      var i = e;
      Ul(t), i._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Mn && (v("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Mn = !0);
    }
    function cl(e, t) {
      var i = e;
      i.multiple = !!t.multiple;
      var o = t.value;
      o != null ? yi(i, !!t.multiple, o, !1) : t.defaultValue != null && yi(i, !!t.multiple, t.defaultValue, !0);
    }
    function _a(e, t) {
      var i = e, o = i._wrapperState.wasMultiple;
      i._wrapperState.wasMultiple = !!t.multiple;
      var c = t.value;
      c != null ? yi(i, !!t.multiple, c, !1) : o !== !!t.multiple && (t.defaultValue != null ? yi(i, !!t.multiple, t.defaultValue, !0) : yi(i, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function Au(e, t) {
      var i = e, o = t.value;
      o != null && yi(i, !!t.multiple, o, !1);
    }
    var Nu = !1;
    function Yo(e, t) {
      var i = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var o = Ct({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: vn(i._wrapperState.initialValue)
      });
      return o;
    }
    function Wo(e, t) {
      var i = e;
      Gr("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Nu && (v("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Jn() || "A component"), Nu = !0);
      var o = t.value;
      if (o == null) {
        var c = t.children, d = t.defaultValue;
        if (c != null) {
          v("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (d != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (Ot(c)) {
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
        initialValue: Rn(o)
      };
    }
    function Md(e, t) {
      var i = e, o = Rn(t.value), c = Rn(t.defaultValue);
      if (o != null) {
        var d = vn(o);
        d !== i.value && (i.value = d), t.defaultValue == null && i.defaultValue !== d && (i.defaultValue = d);
      }
      c != null && (i.defaultValue = vn(c));
    }
    function Rs(e, t) {
      var i = e, o = i.textContent;
      o === i._wrapperState.initialValue && o !== "" && o !== null && (i.value = o);
    }
    function Uy(e, t) {
      Md(e, t);
    }
    var Fl = "http://www.w3.org/1999/xhtml", _d = "http://www.w3.org/1998/Math/MathML", kd = "http://www.w3.org/2000/svg";
    function Dd(e) {
      switch (e) {
        case "svg":
          return kd;
        case "math":
          return _d;
        default:
          return Fl;
      }
    }
    function Od(e, t) {
      return e == null || e === Fl ? Dd(t) : e === kd && t === "foreignObject" ? Fl : e;
    }
    var Lv = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, i, o, c) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, i, o, c);
        });
      } : e;
    }, Fc, Av = Lv(function(e, t) {
      if (e.namespaceURI === kd && !("innerHTML" in e)) {
        Fc = Fc || document.createElement("div"), Fc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var i = Fc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; i.firstChild; )
          e.appendChild(i.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Ja = 1, Pl = 3, Pr = 8, Hl = 9, zd = 11, Uu = function(e, t) {
      if (t) {
        var i = e.firstChild;
        if (i && i === e.lastChild && i.nodeType === Pl) {
          i.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, bs = {
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
    }, Ms = {
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
    function Nv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Uv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Ms).forEach(function(e) {
      Uv.forEach(function(t) {
        Ms[Nv(t, e)] = Ms[e];
      });
    });
    function Pc(e, t, i) {
      var o = t == null || typeof t == "boolean" || t === "";
      return o ? "" : !i && typeof t == "number" && t !== 0 && !(Ms.hasOwnProperty(e) && Ms[e]) ? t + "px" : (Ht(t, e), ("" + t).trim());
    }
    var jv = /([A-Z])/g, Fv = /^ms-/;
    function ju(e) {
      return e.replace(jv, "-$1").toLowerCase().replace(Fv, "-ms-");
    }
    var Pv = function() {
    };
    {
      var jy = /^(?:webkit|moz|o)[A-Z]/, Fy = /^-ms-/, Hv = /-(.)/g, Ld = /;\s*$/, fl = {}, Qo = {}, $v = !1, _s = !1, Py = function(e) {
        return e.replace(Hv, function(t, i) {
          return i.toUpperCase();
        });
      }, Vv = function(e) {
        fl.hasOwnProperty(e) && fl[e] || (fl[e] = !0, v(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Py(e.replace(Fy, "ms-"))
        ));
      }, Ad = function(e) {
        fl.hasOwnProperty(e) && fl[e] || (fl[e] = !0, v("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Nd = function(e, t) {
        Qo.hasOwnProperty(t) && Qo[t] || (Qo[t] = !0, v(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Ld, "")));
      }, Iv = function(e, t) {
        $v || ($v = !0, v("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Bv = function(e, t) {
        _s || (_s = !0, v("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Pv = function(e, t) {
        e.indexOf("-") > -1 ? Vv(e) : jy.test(e) ? Ad(e) : Ld.test(t) && Nd(e, t), typeof t == "number" && (isNaN(t) ? Iv(e, t) : isFinite(t) || Bv(e, t));
      };
    }
    var qv = Pv;
    function Hy(e) {
      {
        var t = "", i = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            var c = e[o];
            if (c != null) {
              var d = o.indexOf("--") === 0;
              t += i + (d ? o : ju(o)) + ":", t += Pc(o, c, d), i = ";";
            }
          }
        return t || null;
      }
    }
    function Yv(e, t) {
      var i = e.style;
      for (var o in t)
        if (t.hasOwnProperty(o)) {
          var c = o.indexOf("--") === 0;
          c || qv(o, t[o]);
          var d = Pc(o, t[o], c);
          o === "float" && (o = "cssFloat"), c ? i.setProperty(o, d) : i[o] = d;
        }
    }
    function $y(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Wv(e) {
      var t = {};
      for (var i in e)
        for (var o = bs[i] || [i], c = 0; c < o.length; c++)
          t[o[c]] = i;
      return t;
    }
    function Vy(e, t) {
      {
        if (!t)
          return;
        var i = Wv(e), o = Wv(t), c = {};
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
    var Gi = {
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
    }, ks = Ct({
      menuitem: !0
    }, Gi), Qv = "__html";
    function Hc(e, t) {
      if (t) {
        if (ks[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Qv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && v("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function ho(e, t) {
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
    var Ds = {
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
    }, $c = {
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
    }, Fu = {}, Iy = new RegExp("^(aria)-[" + Me + "]*$"), Pu = new RegExp("^(aria)[A-Z][" + Me + "]*$");
    function Ud(e, t) {
      {
        if (Wn.call(Fu, t) && Fu[t])
          return !0;
        if (Pu.test(t)) {
          var i = "aria-" + t.slice(4).toLowerCase(), o = $c.hasOwnProperty(i) ? i : null;
          if (o == null)
            return v("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Fu[t] = !0, !0;
          if (t !== o)
            return v("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, o), Fu[t] = !0, !0;
        }
        if (Iy.test(t)) {
          var c = t.toLowerCase(), d = $c.hasOwnProperty(c) ? c : null;
          if (d == null)
            return Fu[t] = !0, !1;
          if (t !== d)
            return v("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, d), Fu[t] = !0, !0;
        }
      }
      return !0;
    }
    function Os(e, t) {
      {
        var i = [];
        for (var o in t) {
          var c = Ud(e, o);
          c || i.push(o);
        }
        var d = i.map(function(g) {
          return "`" + g + "`";
        }).join(", ");
        i.length === 1 ? v("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e) : i.length > 1 && v("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e);
      }
    }
    function jd(e, t) {
      ho(e, t) || Os(e, t);
    }
    var Fd = !1;
    function Vc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !Fd && (Fd = !0, e === "select" && t.multiple ? v("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : v("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var Go = function() {
    };
    {
      var da = {}, Pd = /^on./, Ic = /^on[^A-Z]/, Gv = new RegExp("^(aria)-[" + Me + "]*$"), Xv = new RegExp("^(aria)[A-Z][" + Me + "]*$");
      Go = function(e, t, i, o) {
        if (Wn.call(da, t) && da[t])
          return !0;
        var c = t.toLowerCase();
        if (c === "onfocusin" || c === "onfocusout")
          return v("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), da[t] = !0, !0;
        if (o != null) {
          var d = o.registrationNameDependencies, g = o.possibleRegistrationNames;
          if (d.hasOwnProperty(t))
            return !0;
          var x = g.hasOwnProperty(c) ? g[c] : null;
          if (x != null)
            return v("Invalid event handler property `%s`. Did you mean `%s`?", t, x), da[t] = !0, !0;
          if (Pd.test(t))
            return v("Unknown event handler property `%s`. It will be ignored.", t), da[t] = !0, !0;
        } else if (Pd.test(t))
          return Ic.test(t) && v("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), da[t] = !0, !0;
        if (Gv.test(t) || Xv.test(t))
          return !0;
        if (c === "innerhtml")
          return v("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), da[t] = !0, !0;
        if (c === "aria")
          return v("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), da[t] = !0, !0;
        if (c === "is" && i !== null && i !== void 0 && typeof i != "string")
          return v("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof i), da[t] = !0, !0;
        if (typeof i == "number" && isNaN(i))
          return v("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), da[t] = !0, !0;
        var w = Et(t), k = w !== null && w.type === En;
        if (Ds.hasOwnProperty(c)) {
          var z = Ds[c];
          if (z !== t)
            return v("Invalid DOM property `%s`. Did you mean `%s`?", t, z), da[t] = !0, !0;
        } else if (!k && t !== c)
          return v("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, c), da[t] = !0, !0;
        return typeof i == "boolean" && qt(t, i, w, !1) ? (i ? v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', i, t, t, i, t) : v('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', i, t, t, i, t, t, t), da[t] = !0, !0) : k ? !0 : qt(t, i, w, !1) ? (da[t] = !0, !1) : ((i === "false" || i === "true") && w !== null && w.type === $e && (v("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", i, t, i === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, i), da[t] = !0), !0);
      };
    }
    var Kv = function(e, t, i) {
      {
        var o = [];
        for (var c in t) {
          var d = Go(e, c, t[c], i);
          d || o.push(c);
        }
        var g = o.map(function(x) {
          return "`" + x + "`";
        }).join(", ");
        o.length === 1 ? v("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", g, e) : o.length > 1 && v("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", g, e);
      }
    };
    function Zv(e, t, i) {
      ho(e, t) || Kv(e, t, i);
    }
    var Hd = 1, Bc = 2, zi = 4, $d = Hd | Bc | zi, Xo = null;
    function By(e) {
      Xo !== null && v("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Xo = e;
    }
    function qy() {
      Xo === null && v("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Xo = null;
    }
    function zs(e) {
      return e === Xo;
    }
    function Vd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Pl ? t.parentNode : t;
    }
    var qc = null, Ko = null, Kn = null;
    function Yc(e) {
      var t = ls(e);
      if (t) {
        if (typeof qc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var i = t.stateNode;
        if (i) {
          var o = om(i);
          qc(t.stateNode, t.type, o);
        }
      }
    }
    function Wc(e) {
      qc = e;
    }
    function Hu(e) {
      Ko ? Kn ? Kn.push(e) : Kn = [e] : Ko = e;
    }
    function Jv() {
      return Ko !== null || Kn !== null;
    }
    function Qc() {
      if (Ko) {
        var e = Ko, t = Kn;
        if (Ko = null, Kn = null, Yc(e), t)
          for (var i = 0; i < t.length; i++)
            Yc(t[i]);
      }
    }
    var $u = function(e, t) {
      return e(t);
    }, Ls = function() {
    }, mo = !1;
    function eh() {
      var e = Jv();
      e && (Ls(), Qc());
    }
    function th(e, t, i) {
      if (mo)
        return e(t, i);
      mo = !0;
      try {
        return $u(e, t, i);
      } finally {
        mo = !1, eh();
      }
    }
    function Yy(e, t, i) {
      $u = e, Ls = i;
    }
    function nh(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Gc(e, t, i) {
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
    function yo(e, t) {
      var i = e.stateNode;
      if (i === null)
        return null;
      var o = om(i);
      if (o === null)
        return null;
      var c = o[t];
      if (Gc(t, e.type, o))
        return null;
      if (c && typeof c != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof c + "` type.");
      return c;
    }
    var As = !1;
    if (kn)
      try {
        var Zo = {};
        Object.defineProperty(Zo, "passive", {
          get: function() {
            As = !0;
          }
        }), window.addEventListener("test", Zo, Zo), window.removeEventListener("test", Zo, Zo);
      } catch {
        As = !1;
      }
    function Xc(e, t, i, o, c, d, g, x, w) {
      var k = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(i, k);
      } catch (z) {
        this.onError(z);
      }
    }
    var Kc = Xc;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Id = document.createElement("react");
      Kc = function(t, i, o, c, d, g, x, w, k) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var z = document.createEvent("Event"), I = !1, $ = !0, Z = window.event, ne = Object.getOwnPropertyDescriptor(window, "event");
        function se() {
          Id.removeEventListener(ce, St, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = Z);
        }
        var Qe = Array.prototype.slice.call(arguments, 3);
        function St() {
          I = !0, se(), i.apply(o, Qe), $ = !1;
        }
        var dt, Un = !1, _n = !1;
        function W(Q) {
          if (dt = Q.error, Un = !0, dt === null && Q.colno === 0 && Q.lineno === 0 && (_n = !0), Q.defaultPrevented && dt != null && typeof dt == "object")
            try {
              dt._suppressLogging = !0;
            } catch {
            }
        }
        var ce = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", W), Id.addEventListener(ce, St, !1), z.initEvent(ce, !1, !1), Id.dispatchEvent(z), ne && Object.defineProperty(window, "event", ne), I && $ && (Un ? _n && (dt = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : dt = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(dt)), window.removeEventListener("error", W), !I)
          return se(), Xc.apply(this, arguments);
      };
    }
    var rh = Kc, Vu = !1, Zc = null, Iu = !1, dl = null, ah = {
      onError: function(e) {
        Vu = !0, Zc = e;
      }
    };
    function go(e, t, i, o, c, d, g, x, w) {
      Vu = !1, Zc = null, rh.apply(ah, arguments);
    }
    function pl(e, t, i, o, c, d, g, x, w) {
      if (go.apply(this, arguments), Vu) {
        var k = Us();
        Iu || (Iu = !0, dl = k);
      }
    }
    function Ns() {
      if (Iu) {
        var e = dl;
        throw Iu = !1, dl = null, e;
      }
    }
    function $l() {
      return Vu;
    }
    function Us() {
      if (Vu) {
        var e = Zc;
        return Vu = !1, Zc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Bu(e) {
      return e._reactInternals;
    }
    function Wy(e) {
      return e._reactInternals !== void 0;
    }
    function Jo(e, t) {
      e._reactInternals = t;
    }
    var mt = (
      /*                      */
      0
    ), Xi = (
      /*                */
      1
    ), Cr = (
      /*                    */
      2
    ), Ln = (
      /*                       */
      4
    ), Li = (
      /*                */
      16
    ), Ai = (
      /*                 */
      32
    ), sr = (
      /*                     */
      64
    ), vt = (
      /*                   */
      128
    ), ka = (
      /*            */
      256
    ), br = (
      /*                          */
      512
    ), Xr = (
      /*                     */
      1024
    ), ei = (
      /*                      */
      2048
    ), ti = (
      /*                    */
      4096
    ), Hr = (
      /*                   */
      8192
    ), qu = (
      /*             */
      16384
    ), ih = (
      /*               */
      32767
    ), js = (
      /*                   */
      32768
    ), na = (
      /*                */
      65536
    ), Jc = (
      /* */
      131072
    ), vl = (
      /*                       */
      1048576
    ), Yu = (
      /*                    */
      2097152
    ), Vl = (
      /*                 */
      4194304
    ), ef = (
      /*                */
      8388608
    ), So = (
      /*               */
      16777216
    ), hl = (
      /*              */
      33554432
    ), xo = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      Ln | Xr | 0
    ), Eo = Cr | Ln | Li | Ai | br | ti | Hr, Co = Ln | sr | br | Hr, Il = ei | Li, $r = Vl | ef | Yu, Ni = s.ReactCurrentOwner;
    function gi(e) {
      var t = e, i = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var o = t;
        do
          t = o, (t.flags & (Cr | ti)) !== mt && (i = t.return), o = t.return;
        while (o);
      }
      return t.tag === R ? i : null;
    }
    function ml(e) {
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
    function yl(e) {
      return e.tag === R ? e.stateNode.containerInfo : null;
    }
    function eu(e) {
      return gi(e) === e;
    }
    function lh(e) {
      {
        var t = Ni.current;
        if (t !== null && t.tag === T) {
          var i = t, o = i.stateNode;
          o._warnedAboutRefsInRender || v("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Dt(i) || "A component"), o._warnedAboutRefsInRender = !0;
        }
      }
      var c = Bu(e);
      return c ? gi(c) === c : !1;
    }
    function tf(e) {
      if (gi(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function nf(e) {
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
              return tf(d), e;
            if (w === c)
              return tf(d), t;
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
    function ni(e) {
      var t = nf(e);
      return t !== null ? ri(t) : null;
    }
    function ri(e) {
      if (e.tag === O || e.tag === L)
        return e;
      for (var t = e.child; t !== null; ) {
        var i = ri(t);
        if (i !== null)
          return i;
        t = t.sibling;
      }
      return null;
    }
    function mr(e) {
      var t = nf(e);
      return t !== null ? Ui(t) : null;
    }
    function Ui(e) {
      if (e.tag === O || e.tag === L)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== D) {
          var i = Ui(t);
          if (i !== null)
            return i;
        }
        t = t.sibling;
      }
      return null;
    }
    var Bd = l.unstable_scheduleCallback, oh = l.unstable_cancelCallback, qd = l.unstable_shouldYield, Yd = l.unstable_requestPaint, Kr = l.unstable_now, rf = l.unstable_getCurrentPriorityLevel, Fs = l.unstable_ImmediatePriority, To = l.unstable_UserBlockingPriority, Bl = l.unstable_NormalPriority, Qy = l.unstable_LowPriority, tu = l.unstable_IdlePriority, af = l.unstable_yieldValue, uh = l.unstable_setDisableYieldValue, nu = null, zr = null, We = null, Si = !1, ai = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Wu(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return v("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        Ve && (e = Ct({}, e, {
          getLaneLabelMap: ru,
          injectProfilingHooks: ji
        })), nu = t.inject(e), zr = t;
      } catch (i) {
        v("React instrumentation encountered an error: %s.", i);
      }
      return !!t.checkDCE;
    }
    function Wd(e, t) {
      if (zr && typeof zr.onScheduleFiberRoot == "function")
        try {
          zr.onScheduleFiberRoot(nu, e, t);
        } catch (i) {
          Si || (Si = !0, v("React instrumentation encountered an error: %s", i));
        }
    }
    function Qd(e, t) {
      if (zr && typeof zr.onCommitFiberRoot == "function")
        try {
          var i = (e.current.flags & vt) === vt;
          if (be) {
            var o;
            switch (t) {
              case Na:
                o = Fs;
                break;
              case Sl:
                o = To;
                break;
              case Fi:
                o = Bl;
                break;
              case Pi:
                o = tu;
                break;
              default:
                o = Bl;
                break;
            }
            zr.onCommitFiberRoot(nu, e, o, i);
          }
        } catch (c) {
          Si || (Si = !0, v("React instrumentation encountered an error: %s", c));
        }
    }
    function Gd(e) {
      if (zr && typeof zr.onPostCommitFiberRoot == "function")
        try {
          zr.onPostCommitFiberRoot(nu, e);
        } catch (t) {
          Si || (Si = !0, v("React instrumentation encountered an error: %s", t));
        }
    }
    function Xd(e) {
      if (zr && typeof zr.onCommitFiberUnmount == "function")
        try {
          zr.onCommitFiberUnmount(nu, e);
        } catch (t) {
          Si || (Si = !0, v("React instrumentation encountered an error: %s", t));
        }
    }
    function Tr(e) {
      if (typeof af == "function" && (uh(e), h(e)), zr && typeof zr.setStrictMode == "function")
        try {
          zr.setStrictMode(nu, e);
        } catch (t) {
          Si || (Si = !0, v("React instrumentation encountered an error: %s", t));
        }
    }
    function ji(e) {
      We = e;
    }
    function ru() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, i = 0; i < lu; i++) {
          var o = dh(t);
          e.set(t, o), t *= 2;
        }
        return e;
      }
    }
    function Kd(e) {
      We !== null && typeof We.markCommitStarted == "function" && We.markCommitStarted(e);
    }
    function Zd() {
      We !== null && typeof We.markCommitStopped == "function" && We.markCommitStopped();
    }
    function xi(e) {
      We !== null && typeof We.markComponentRenderStarted == "function" && We.markComponentRenderStarted(e);
    }
    function Ei() {
      We !== null && typeof We.markComponentRenderStopped == "function" && We.markComponentRenderStopped();
    }
    function Jd(e) {
      We !== null && typeof We.markComponentPassiveEffectMountStarted == "function" && We.markComponentPassiveEffectMountStarted(e);
    }
    function sh() {
      We !== null && typeof We.markComponentPassiveEffectMountStopped == "function" && We.markComponentPassiveEffectMountStopped();
    }
    function ql(e) {
      We !== null && typeof We.markComponentPassiveEffectUnmountStarted == "function" && We.markComponentPassiveEffectUnmountStarted(e);
    }
    function wo() {
      We !== null && typeof We.markComponentPassiveEffectUnmountStopped == "function" && We.markComponentPassiveEffectUnmountStopped();
    }
    function lf(e) {
      We !== null && typeof We.markComponentLayoutEffectMountStarted == "function" && We.markComponentLayoutEffectMountStarted(e);
    }
    function ch() {
      We !== null && typeof We.markComponentLayoutEffectMountStopped == "function" && We.markComponentLayoutEffectMountStopped();
    }
    function Ps(e) {
      We !== null && typeof We.markComponentLayoutEffectUnmountStarted == "function" && We.markComponentLayoutEffectUnmountStarted(e);
    }
    function ep() {
      We !== null && typeof We.markComponentLayoutEffectUnmountStopped == "function" && We.markComponentLayoutEffectUnmountStopped();
    }
    function Hs(e, t, i) {
      We !== null && typeof We.markComponentErrored == "function" && We.markComponentErrored(e, t, i);
    }
    function gl(e, t, i) {
      We !== null && typeof We.markComponentSuspended == "function" && We.markComponentSuspended(e, t, i);
    }
    function $s(e) {
      We !== null && typeof We.markLayoutEffectsStarted == "function" && We.markLayoutEffectsStarted(e);
    }
    function Vs() {
      We !== null && typeof We.markLayoutEffectsStopped == "function" && We.markLayoutEffectsStopped();
    }
    function au(e) {
      We !== null && typeof We.markPassiveEffectsStarted == "function" && We.markPassiveEffectsStarted(e);
    }
    function tp() {
      We !== null && typeof We.markPassiveEffectsStopped == "function" && We.markPassiveEffectsStopped();
    }
    function iu(e) {
      We !== null && typeof We.markRenderStarted == "function" && We.markRenderStarted(e);
    }
    function fh() {
      We !== null && typeof We.markRenderYielded == "function" && We.markRenderYielded();
    }
    function of() {
      We !== null && typeof We.markRenderStopped == "function" && We.markRenderStopped();
    }
    function wr(e) {
      We !== null && typeof We.markRenderScheduled == "function" && We.markRenderScheduled(e);
    }
    function uf(e, t) {
      We !== null && typeof We.markForceUpdateScheduled == "function" && We.markForceUpdateScheduled(e, t);
    }
    function Is(e, t) {
      We !== null && typeof We.markStateUpdateScheduled == "function" && We.markStateUpdateScheduled(e, t);
    }
    var yt = (
      /*                         */
      0
    ), mn = (
      /*                 */
      1
    ), $n = (
      /*                    */
      2
    ), nr = (
      /*               */
      8
    ), Vn = (
      /*              */
      16
    ), Vr = Math.clz32 ? Math.clz32 : Bs, ra = Math.log, sf = Math.LN2;
    function Bs(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (ra(t) / sf | 0) | 0;
    }
    var lu = 31, Se = (
      /*                        */
      0
    ), Hn = (
      /*                          */
      0
    ), Ut = (
      /*                        */
      1
    ), Ro = (
      /*    */
      2
    ), Ki = (
      /*             */
      4
    ), Da = (
      /*            */
      8
    ), Lr = (
      /*                     */
      16
    ), Yl = (
      /*                */
      32
    ), bo = (
      /*                       */
      4194240
    ), ou = (
      /*                        */
      64
    ), cf = (
      /*                        */
      128
    ), ff = (
      /*                        */
      256
    ), df = (
      /*                        */
      512
    ), pf = (
      /*                        */
      1024
    ), vf = (
      /*                        */
      2048
    ), hf = (
      /*                        */
      4096
    ), mf = (
      /*                        */
      8192
    ), yf = (
      /*                        */
      16384
    ), uu = (
      /*                       */
      32768
    ), gf = (
      /*                       */
      65536
    ), Qu = (
      /*                       */
      131072
    ), Gu = (
      /*                       */
      262144
    ), Sf = (
      /*                       */
      524288
    ), qs = (
      /*                       */
      1048576
    ), xf = (
      /*                       */
      2097152
    ), Ys = (
      /*                            */
      130023424
    ), su = (
      /*                             */
      4194304
    ), Ef = (
      /*                             */
      8388608
    ), Ws = (
      /*                             */
      16777216
    ), Cf = (
      /*                             */
      33554432
    ), Tf = (
      /*                             */
      67108864
    ), np = su, Qs = (
      /*          */
      134217728
    ), rp = (
      /*                          */
      268435455
    ), Gs = (
      /*               */
      268435456
    ), cu = (
      /*                        */
      536870912
    ), ii = (
      /*                   */
      1073741824
    );
    function dh(e) {
      {
        if (e & Ut)
          return "Sync";
        if (e & Ro)
          return "InputContinuousHydration";
        if (e & Ki)
          return "InputContinuous";
        if (e & Da)
          return "DefaultHydration";
        if (e & Lr)
          return "Default";
        if (e & Yl)
          return "TransitionHydration";
        if (e & bo)
          return "Transition";
        if (e & Ys)
          return "Retry";
        if (e & Qs)
          return "SelectiveHydration";
        if (e & Gs)
          return "IdleHydration";
        if (e & cu)
          return "Idle";
        if (e & ii)
          return "Offscreen";
      }
    }
    var ur = -1, fu = ou, wf = su;
    function Xs(e) {
      switch (Mo(e)) {
        case Ut:
          return Ut;
        case Ro:
          return Ro;
        case Ki:
          return Ki;
        case Da:
          return Da;
        case Lr:
          return Lr;
        case Yl:
          return Yl;
        case ou:
        case cf:
        case ff:
        case df:
        case pf:
        case vf:
        case hf:
        case mf:
        case yf:
        case uu:
        case gf:
        case Qu:
        case Gu:
        case Sf:
        case qs:
        case xf:
          return e & bo;
        case su:
        case Ef:
        case Ws:
        case Cf:
        case Tf:
          return e & Ys;
        case Qs:
          return Qs;
        case Gs:
          return Gs;
        case cu:
          return cu;
        case ii:
          return ii;
        default:
          return v("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function Rf(e, t) {
      var i = e.pendingLanes;
      if (i === Se)
        return Se;
      var o = Se, c = e.suspendedLanes, d = e.pingedLanes, g = i & rp;
      if (g !== Se) {
        var x = g & ~c;
        if (x !== Se)
          o = Xs(x);
        else {
          var w = g & d;
          w !== Se && (o = Xs(w));
        }
      } else {
        var k = i & ~c;
        k !== Se ? o = Xs(k) : d !== Se && (o = Xs(d));
      }
      if (o === Se)
        return Se;
      if (t !== Se && t !== o && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & c) === Se) {
        var z = Mo(o), I = Mo(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          z >= I || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          z === Lr && (I & bo) !== Se
        )
          return t;
      }
      (o & Ki) !== Se && (o |= i & Lr);
      var $ = e.entangledLanes;
      if ($ !== Se)
        for (var Z = e.entanglements, ne = o & $; ne > 0; ) {
          var se = Ir(ne), Qe = 1 << se;
          o |= Z[se], ne &= ~Qe;
        }
      return o;
    }
    function Zi(e, t) {
      for (var i = e.eventTimes, o = ur; t > 0; ) {
        var c = Ir(t), d = 1 << c, g = i[c];
        g > o && (o = g), t &= ~d;
      }
      return o;
    }
    function ap(e, t) {
      switch (e) {
        case Ut:
        case Ro:
        case Ki:
          return t + 250;
        case Da:
        case Lr:
        case Yl:
        case ou:
        case cf:
        case ff:
        case df:
        case pf:
        case vf:
        case hf:
        case mf:
        case yf:
        case uu:
        case gf:
        case Qu:
        case Gu:
        case Sf:
        case qs:
        case xf:
          return t + 5e3;
        case su:
        case Ef:
        case Ws:
        case Cf:
        case Tf:
          return ur;
        case Qs:
        case Gs:
        case cu:
        case ii:
          return ur;
        default:
          return v("Should have found matching lanes. This is a bug in React."), ur;
      }
    }
    function bf(e, t) {
      for (var i = e.pendingLanes, o = e.suspendedLanes, c = e.pingedLanes, d = e.expirationTimes, g = i; g > 0; ) {
        var x = Ir(g), w = 1 << x, k = d[x];
        k === ur ? ((w & o) === Se || (w & c) !== Se) && (d[x] = ap(w, t)) : k <= t && (e.expiredLanes |= w), g &= ~w;
      }
    }
    function ph(e) {
      return Xs(e.pendingLanes);
    }
    function Mf(e) {
      var t = e.pendingLanes & ~ii;
      return t !== Se ? t : t & ii ? ii : Se;
    }
    function vh(e) {
      return (e & Ut) !== Se;
    }
    function Ks(e) {
      return (e & rp) !== Se;
    }
    function du(e) {
      return (e & Ys) === e;
    }
    function ip(e) {
      var t = Ut | Ki | Lr;
      return (e & t) === Se;
    }
    function lp(e) {
      return (e & bo) === e;
    }
    function _f(e, t) {
      var i = Ro | Ki | Da | Lr;
      return (t & i) !== Se;
    }
    function hh(e, t) {
      return (t & e.expiredLanes) !== Se;
    }
    function op(e) {
      return (e & bo) !== Se;
    }
    function up() {
      var e = fu;
      return fu <<= 1, (fu & bo) === Se && (fu = ou), e;
    }
    function mh() {
      var e = wf;
      return wf <<= 1, (wf & Ys) === Se && (wf = su), e;
    }
    function Mo(e) {
      return e & -e;
    }
    function Zs(e) {
      return Mo(e);
    }
    function Ir(e) {
      return 31 - Vr(e);
    }
    function pa(e) {
      return Ir(e);
    }
    function li(e, t) {
      return (e & t) !== Se;
    }
    function pu(e, t) {
      return (e & t) === t;
    }
    function tn(e, t) {
      return e | t;
    }
    function Js(e, t) {
      return e & ~t;
    }
    function sp(e, t) {
      return e & t;
    }
    function yh(e) {
      return e;
    }
    function gh(e, t) {
      return e !== Hn && e < t ? e : t;
    }
    function ec(e) {
      for (var t = [], i = 0; i < lu; i++)
        t.push(e);
      return t;
    }
    function Xu(e, t, i) {
      e.pendingLanes |= t, t !== cu && (e.suspendedLanes = Se, e.pingedLanes = Se);
      var o = e.eventTimes, c = pa(t);
      o[c] = i;
    }
    function Sh(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var i = e.expirationTimes, o = t; o > 0; ) {
        var c = Ir(o), d = 1 << c;
        i[c] = ur, o &= ~d;
      }
    }
    function kf(e, t, i) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function cp(e, t) {
      var i = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = Se, e.pingedLanes = Se, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var o = e.entanglements, c = e.eventTimes, d = e.expirationTimes, g = i; g > 0; ) {
        var x = Ir(g), w = 1 << x;
        o[x] = Se, c[x] = ur, d[x] = ur, g &= ~w;
      }
    }
    function Df(e, t) {
      for (var i = e.entangledLanes |= t, o = e.entanglements, c = i; c; ) {
        var d = Ir(c), g = 1 << d;
        // Is this one of the newly entangled lanes?
        g & t | // Is this lane transitively entangled with the newly entangled lanes?
        o[d] & t && (o[d] |= t), c &= ~g;
      }
    }
    function fp(e, t) {
      var i = Mo(t), o;
      switch (i) {
        case Ki:
          o = Ro;
          break;
        case Lr:
          o = Da;
          break;
        case ou:
        case cf:
        case ff:
        case df:
        case pf:
        case vf:
        case hf:
        case mf:
        case yf:
        case uu:
        case gf:
        case Qu:
        case Gu:
        case Sf:
        case qs:
        case xf:
        case su:
        case Ef:
        case Ws:
        case Cf:
        case Tf:
          o = Yl;
          break;
        case cu:
          o = Gs;
          break;
        default:
          o = Hn;
          break;
      }
      return (o & (e.suspendedLanes | t)) !== Hn ? Hn : o;
    }
    function tc(e, t, i) {
      if (ai)
        for (var o = e.pendingUpdatersLaneMap; i > 0; ) {
          var c = pa(i), d = 1 << c, g = o[c];
          g.add(t), i &= ~d;
        }
    }
    function xh(e, t) {
      if (ai)
        for (var i = e.pendingUpdatersLaneMap, o = e.memoizedUpdaters; t > 0; ) {
          var c = pa(t), d = 1 << c, g = i[c];
          g.size > 0 && (g.forEach(function(x) {
            var w = x.alternate;
            (w === null || !o.has(w)) && o.add(x);
          }), g.clear()), t &= ~d;
        }
    }
    function dp(e, t) {
      return null;
    }
    var Na = Ut, Sl = Ki, Fi = Lr, Pi = cu, nc = Hn;
    function Hi() {
      return nc;
    }
    function Br(e) {
      nc = e;
    }
    function Eh(e, t) {
      var i = nc;
      try {
        return nc = e, t();
      } finally {
        nc = i;
      }
    }
    function Ch(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function rc(e, t) {
      return e > t ? e : t;
    }
    function aa(e, t) {
      return e !== 0 && e < t;
    }
    function Th(e) {
      var t = Mo(e);
      return aa(Na, t) ? aa(Sl, t) ? Ks(t) ? Fi : Pi : Sl : Na;
    }
    function Of(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var ac;
    function Oa(e) {
      ac = e;
    }
    function Gy(e) {
      ac(e);
    }
    var rt;
    function Ku(e) {
      rt = e;
    }
    var zf;
    function wh(e) {
      zf = e;
    }
    var Rh;
    function ic(e) {
      Rh = e;
    }
    var lc;
    function pp(e) {
      lc = e;
    }
    var Lf = !1, oc = [], Wl = null, xl = null, El = null, Ar = /* @__PURE__ */ new Map(), Ua = /* @__PURE__ */ new Map(), ja = [], bh = [
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
      return bh.indexOf(e) > -1;
    }
    function Ji(e, t, i, o, c) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: i,
        nativeEvent: c,
        targetContainers: [o]
      };
    }
    function vp(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Wl = null;
          break;
        case "dragenter":
        case "dragleave":
          xl = null;
          break;
        case "mouseover":
        case "mouseout":
          El = null;
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
    function oi(e, t, i, o, c, d) {
      if (e === null || e.nativeEvent !== d) {
        var g = Ji(t, i, o, c, d);
        if (t !== null) {
          var x = ls(t);
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
          return Wl = oi(Wl, e, t, i, o, d), !0;
        }
        case "dragenter": {
          var g = c;
          return xl = oi(xl, e, t, i, o, g), !0;
        }
        case "mouseover": {
          var x = c;
          return El = oi(El, e, t, i, o, x), !0;
        }
        case "pointerover": {
          var w = c, k = w.pointerId;
          return Ar.set(k, oi(Ar.get(k) || null, e, t, i, o, w)), !0;
        }
        case "gotpointercapture": {
          var z = c, I = z.pointerId;
          return Ua.set(I, oi(Ua.get(I) || null, e, t, i, o, z)), !0;
        }
      }
      return !1;
    }
    function hp(e) {
      var t = Sc(e.target);
      if (t !== null) {
        var i = gi(t);
        if (i !== null) {
          var o = i.tag;
          if (o === q) {
            var c = ml(i);
            if (c !== null) {
              e.blockedOn = c, lc(e.priority, function() {
                zf(i);
              });
              return;
            }
          } else if (o === R) {
            var d = i.stateNode;
            if (Of(d)) {
              e.blockedOn = yl(i);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function _h(e) {
      for (var t = Rh(), i = {
        blockedOn: null,
        target: e,
        priority: t
      }, o = 0; o < ja.length && aa(t, ja[o].priority); o++)
        ;
      ja.splice(o, 0, i), o === 0 && hp(i);
    }
    function uc(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var i = t[0], o = Ju(e.domEventName, e.eventSystemFlags, i, e.nativeEvent);
        if (o === null) {
          var c = e.nativeEvent, d = new c.constructor(c.type, c);
          By(d), c.target.dispatchEvent(d), qy();
        } else {
          var g = ls(o);
          return g !== null && rt(g), e.blockedOn = o, !1;
        }
        t.shift();
      }
      return !0;
    }
    function mp(e, t, i) {
      uc(e) && i.delete(t);
    }
    function Ky() {
      Lf = !1, Wl !== null && uc(Wl) && (Wl = null), xl !== null && uc(xl) && (xl = null), El !== null && uc(El) && (El = null), Ar.forEach(mp), Ua.forEach(mp);
    }
    function _o(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Lf || (Lf = !0, l.unstable_scheduleCallback(l.unstable_NormalPriority, Ky)));
    }
    function vu(e) {
      if (oc.length > 0) {
        _o(oc[0], e);
        for (var t = 1; t < oc.length; t++) {
          var i = oc[t];
          i.blockedOn === e && (i.blockedOn = null);
        }
      }
      Wl !== null && _o(Wl, e), xl !== null && _o(xl, e), El !== null && _o(El, e);
      var o = function(x) {
        return _o(x, e);
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
        hp(g), g.blockedOn === null && ja.shift();
      }
    }
    var va = s.ReactCurrentBatchConfig, An = !0;
    function Zr(e) {
      An = !!e;
    }
    function qr() {
      return An;
    }
    function ha(e, t, i) {
      var o = Af(t), c;
      switch (o) {
        case Na:
          c = Ci;
          break;
        case Sl:
          c = Zu;
          break;
        case Fi:
        default:
          c = Nr;
          break;
      }
      return c.bind(null, t, i, e);
    }
    function Ci(e, t, i, o) {
      var c = Hi(), d = va.transition;
      va.transition = null;
      try {
        Br(Na), Nr(e, t, i, o);
      } finally {
        Br(c), va.transition = d;
      }
    }
    function Zu(e, t, i, o) {
      var c = Hi(), d = va.transition;
      va.transition = null;
      try {
        Br(Sl), Nr(e, t, i, o);
      } finally {
        Br(c), va.transition = d;
      }
    }
    function Nr(e, t, i, o) {
      An && sc(e, t, i, o);
    }
    function sc(e, t, i, o) {
      var c = Ju(e, t, i, o);
      if (c === null) {
        v0(e, t, o, Cl, i), vp(e, o);
        return;
      }
      if (Xy(c, e, t, i, o)) {
        o.stopPropagation();
        return;
      }
      if (vp(e, o), t & zi && Mh(e)) {
        for (; c !== null; ) {
          var d = ls(c);
          d !== null && Gy(d);
          var g = Ju(e, t, i, o);
          if (g === null && v0(e, t, o, Cl, i), g === c)
            break;
          c = g;
        }
        c !== null && o.stopPropagation();
        return;
      }
      v0(e, t, o, null, i);
    }
    var Cl = null;
    function Ju(e, t, i, o) {
      Cl = null;
      var c = Vd(o), d = Sc(c);
      if (d !== null) {
        var g = gi(d);
        if (g === null)
          d = null;
        else {
          var x = g.tag;
          if (x === q) {
            var w = ml(g);
            if (w !== null)
              return w;
            d = null;
          } else if (x === R) {
            var k = g.stateNode;
            if (Of(k))
              return yl(g);
            d = null;
          } else g !== d && (d = null);
        }
      }
      return Cl = d, null;
    }
    function Af(e) {
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
          return Sl;
        case "message": {
          var t = rf();
          switch (t) {
            case Fs:
              return Na;
            case To:
              return Sl;
            case Bl:
            case Qy:
              return Fi;
            case tu:
              return Pi;
            default:
              return Fi;
          }
        }
        default:
          return Fi;
      }
    }
    function cc(e, t, i) {
      return e.addEventListener(t, i, !1), i;
    }
    function ui(e, t, i) {
      return e.addEventListener(t, i, !0), i;
    }
    function yp(e, t, i, o) {
      return e.addEventListener(t, i, {
        capture: !0,
        passive: o
      }), i;
    }
    function es(e, t, i, o) {
      return e.addEventListener(t, i, {
        passive: o
      }), i;
    }
    var Ti = null, ts = null, hu = null;
    function ko(e) {
      return Ti = e, ts = fc(), !0;
    }
    function Nf() {
      Ti = null, ts = null, hu = null;
    }
    function Ql() {
      if (hu)
        return hu;
      var e, t = ts, i = t.length, o, c = fc(), d = c.length;
      for (e = 0; e < i && t[e] === c[e]; e++)
        ;
      var g = i - e;
      for (o = 1; o <= g && t[i - o] === c[d - o]; o++)
        ;
      var x = o > 1 ? 1 - o : void 0;
      return hu = c.slice(e, x), hu;
    }
    function fc() {
      return "value" in Ti ? Ti.value : Ti.textContent;
    }
    function Do(e) {
      var t, i = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && i === 13 && (t = 13)) : t = i, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function ns() {
      return !0;
    }
    function dc() {
      return !1;
    }
    function za(e) {
      function t(i, o, c, d, g) {
        this._reactName = i, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = g, this.currentTarget = null;
        for (var x in e)
          if (e.hasOwnProperty(x)) {
            var w = e[x];
            w ? this[x] = w(d) : this[x] = d[x];
          }
        var k = d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1;
        return k ? this.isDefaultPrevented = ns : this.isDefaultPrevented = dc, this.isPropagationStopped = dc, this;
      }
      return Ct(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var i = this.nativeEvent;
          i && (i.preventDefault ? i.preventDefault() : typeof i.returnValue != "unknown" && (i.returnValue = !1), this.isDefaultPrevented = ns);
        },
        stopPropagation: function() {
          var i = this.nativeEvent;
          i && (i.stopPropagation ? i.stopPropagation() : typeof i.cancelBubble != "unknown" && (i.cancelBubble = !0), this.isPropagationStopped = ns);
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
        isPersistent: ns
      }), t;
    }
    var Yr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Tl = za(Yr), Fa = Ct({}, Yr, {
      view: 0,
      detail: 0
    }), si = za(Fa), Uf, pc, mu;
    function Zy(e) {
      e !== mu && (mu && e.type === "mousemove" ? (Uf = e.screenX - mu.screenX, pc = e.screenY - mu.screenY) : (Uf = 0, pc = 0), mu = e);
    }
    var el = Ct({}, Fa, {
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
      getModifierState: yr,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Zy(e), Uf);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : pc;
      }
    }), gp = za(el), Sp = Ct({}, el, {
      dataTransfer: 0
    }), yu = za(Sp), xp = Ct({}, Fa, {
      relatedTarget: 0
    }), Gl = za(xp), kh = Ct({}, Yr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Dh = za(kh), Ep = Ct({}, Yr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), jf = za(Ep), Jy = Ct({}, Yr, {
      data: 0
    }), Oh = za(Jy), zh = Oh, Lh = {
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
    }, gu = {
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
        var i = Do(e);
        return i === 13 ? "Enter" : String.fromCharCode(i);
      }
      return e.type === "keydown" || e.type === "keyup" ? gu[e.keyCode] || "Unidentified" : "";
    }
    var rs = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Ah(e) {
      var t = this, i = t.nativeEvent;
      if (i.getModifierState)
        return i.getModifierState(e);
      var o = rs[e];
      return o ? !!i[o] : !1;
    }
    function yr(e) {
      return Ah;
    }
    var t0 = Ct({}, Fa, {
      key: e0,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: yr,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Do(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Do(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Nh = za(t0), n0 = Ct({}, el, {
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
    }), Uh = za(n0), jh = Ct({}, Fa, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: yr
    }), Fh = za(jh), r0 = Ct({}, Yr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), $i = za(r0), Cp = Ct({}, el, {
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
    }), a0 = za(Cp), Oo = [9, 13, 27, 32], vc = 229, Xl = kn && "CompositionEvent" in window, zo = null;
    kn && "documentMode" in document && (zo = document.documentMode);
    var Tp = kn && "TextEvent" in window && !zo, Ff = kn && (!Xl || zo && zo > 8 && zo <= 11), Ph = 32, Pf = String.fromCharCode(Ph);
    function i0() {
      Be("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Be("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Be("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Be("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var wp = !1;
    function Hh(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Hf(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function $f(e, t) {
      return e === "keydown" && t.keyCode === vc;
    }
    function Rp(e, t) {
      switch (e) {
        case "keyup":
          return Oo.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== vc;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Vf(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function $h(e) {
      return e.locale === "ko";
    }
    var Su = !1;
    function bp(e, t, i, o, c) {
      var d, g;
      if (Xl ? d = Hf(t) : Su ? Rp(t, o) && (d = "onCompositionEnd") : $f(t, o) && (d = "onCompositionStart"), !d)
        return null;
      Ff && !$h(o) && (!Su && d === "onCompositionStart" ? Su = ko(c) : d === "onCompositionEnd" && Su && (g = Ql()));
      var x = Qh(i, d);
      if (x.length > 0) {
        var w = new Oh(d, t, null, o, c);
        if (e.push({
          event: w,
          listeners: x
        }), g)
          w.data = g;
        else {
          var k = Vf(o);
          k !== null && (w.data = k);
        }
      }
    }
    function If(e, t) {
      switch (e) {
        case "compositionend":
          return Vf(t);
        case "keypress":
          var i = t.which;
          return i !== Ph ? null : (wp = !0, Pf);
        case "textInput":
          var o = t.data;
          return o === Pf && wp ? null : o;
        default:
          return null;
      }
    }
    function Mp(e, t) {
      if (Su) {
        if (e === "compositionend" || !Xl && Rp(e, t)) {
          var i = Ql();
          return Nf(), Su = !1, i;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Hh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Ff && !$h(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Bf(e, t, i, o, c) {
      var d;
      if (Tp ? d = If(t, o) : d = Mp(t, o), !d)
        return null;
      var g = Qh(i, "onBeforeInput");
      if (g.length > 0) {
        var x = new zh("onBeforeInput", "beforeinput", null, o, c);
        e.push({
          event: x,
          listeners: g
        }), x.data = d;
      }
    }
    function Vh(e, t, i, o, c, d, g) {
      bp(e, t, i, o, c), Bf(e, t, i, o, c);
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
    function hc(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!l0[e.type] : t === "textarea";
    }
    function o0(e) {
      if (!kn)
        return !1;
      var t = "on" + e, i = t in document;
      if (!i) {
        var o = document.createElement("div");
        o.setAttribute(t, "return;"), i = typeof o[t] == "function";
      }
      return i;
    }
    function mc() {
      Be("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function Ih(e, t, i, o) {
      Hu(o);
      var c = Qh(t, "onChange");
      if (c.length > 0) {
        var d = new Tl("onChange", "change", null, i, o);
        e.push({
          event: d,
          listeners: c
        });
      }
    }
    var Lo = null, r = null;
    function a(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function u(e) {
      var t = [];
      Ih(t, r, e, Vd(e)), th(f, t);
    }
    function f(e) {
      LS(e, 0);
    }
    function m(e) {
      var t = Xf(e);
      if (Oi(t))
        return e;
    }
    function S(e, t) {
      if (e === "change")
        return t;
    }
    var _ = !1;
    kn && (_ = o0("input") && (!document.documentMode || document.documentMode > 9));
    function N(e, t) {
      Lo = e, r = t, Lo.attachEvent("onpropertychange", te);
    }
    function P() {
      Lo && (Lo.detachEvent("onpropertychange", te), Lo = null, r = null);
    }
    function te(e) {
      e.propertyName === "value" && m(r) && u(e);
    }
    function Ce(e, t, i) {
      e === "focusin" ? (P(), N(t, i)) : e === "focusout" && P();
    }
    function ke(e, t) {
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
    function it(e, t) {
      if (e === "input" || e === "change")
        return m(t);
    }
    function st(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || ut(e, "number", e.value);
    }
    function Ur(e, t, i, o, c, d, g) {
      var x = i ? Xf(i) : window, w, k;
      if (a(x) ? w = S : hc(x) ? _ ? w = it : (w = ke, k = Ce) : Ee(x) && (w = Ze), w) {
        var z = w(t, i);
        if (z) {
          Ih(e, z, o, c);
          return;
        }
      }
      k && k(t, x, i), t === "focusout" && st(x);
    }
    function Y() {
      Zt("onMouseEnter", ["mouseout", "mouseover"]), Zt("onMouseLeave", ["mouseout", "mouseover"]), Zt("onPointerEnter", ["pointerout", "pointerover"]), Zt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function V(e, t, i, o, c, d, g) {
      var x = t === "mouseover" || t === "pointerover", w = t === "mouseout" || t === "pointerout";
      if (x && !zs(o)) {
        var k = o.relatedTarget || o.fromElement;
        if (k && (Sc(k) || $p(k)))
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
          if ($ = i, Z = ne ? Sc(ne) : null, Z !== null) {
            var se = gi(Z);
            (Z !== se || Z.tag !== O && Z.tag !== L) && (Z = null);
          }
        } else
          $ = null, Z = i;
        if ($ !== Z) {
          var Qe = gp, St = "onMouseLeave", dt = "onMouseEnter", Un = "mouse";
          (t === "pointerout" || t === "pointerover") && (Qe = Uh, St = "onPointerLeave", dt = "onPointerEnter", Un = "pointer");
          var _n = $ == null ? z : Xf($), W = Z == null ? z : Xf(Z), ce = new Qe(St, Un + "leave", $, o, c);
          ce.target = _n, ce.relatedTarget = W;
          var Q = null, De = Sc(c);
          if (De === i) {
            var nt = new Qe(dt, Un + "enter", Z, o, c);
            nt.target = W, nt.relatedTarget = _n, Q = nt;
          }
          oT(e, ce, Q, $, Z);
        }
      }
    }
    function G(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Te = typeof Object.is == "function" ? Object.is : G;
    function lt(e, t) {
      if (Te(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var i = Object.keys(e), o = Object.keys(t);
      if (i.length !== o.length)
        return !1;
      for (var c = 0; c < i.length; c++) {
        var d = i[c];
        if (!Wn.call(t, d) || !Te(e[d], t[d]))
          return !1;
      }
      return !0;
    }
    function wt(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Rt(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Pt(e, t) {
      for (var i = wt(e), o = 0, c = 0; i; ) {
        if (i.nodeType === Pl) {
          if (c = o + i.textContent.length, o <= t && c >= t)
            return {
              node: i,
              offset: t - o
            };
          o = c;
        }
        i = wt(Rt(i));
      }
    }
    function ia(e) {
      var t = e.ownerDocument, i = t && t.defaultView || window, o = i.getSelection && i.getSelection();
      if (!o || o.rangeCount === 0)
        return null;
      var c = o.anchorNode, d = o.anchorOffset, g = o.focusNode, x = o.focusOffset;
      try {
        c.nodeType, g.nodeType;
      } catch {
        return null;
      }
      return In(e, c, d, g, x);
    }
    function In(e, t, i, o, c) {
      var d = 0, g = -1, x = -1, w = 0, k = 0, z = e, I = null;
      e: for (; ; ) {
        for (var $ = null; z === t && (i === 0 || z.nodeType === Pl) && (g = d + i), z === o && (c === 0 || z.nodeType === Pl) && (x = d + c), z.nodeType === Pl && (d += z.nodeValue.length), ($ = z.firstChild) !== null; )
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
    function Ao(e, t) {
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
    function Bh(e) {
      return e && e.nodeType === Pl;
    }
    function CS(e, t) {
      return !e || !t ? !1 : e === t ? !0 : Bh(e) ? !1 : Bh(t) ? CS(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
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
      for (var e = window, t = Za(); t instanceof e.HTMLIFrameElement; ) {
        if (BC(t))
          e = t.contentWindow;
        else
          return t;
        t = Za(e.document);
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
          d.nodeType === Ja && c.push({
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
      } : t = ia(e), t || {
        start: 0,
        end: 0
      };
    }
    function QC(e, t) {
      var i = t.start, o = t.end;
      o === void 0 && (o = i), "selectionStart" in e ? (e.selectionStart = i, e.selectionEnd = Math.min(o, e.value.length)) : Ao(e, t);
    }
    var GC = kn && "documentMode" in document && document.documentMode <= 11;
    function XC() {
      Be("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var qf = null, s0 = null, _p = null, c0 = !1;
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
      return e.window === e ? e.document : e.nodeType === Hl ? e : e.ownerDocument;
    }
    function wS(e, t, i) {
      var o = ZC(i);
      if (!(c0 || qf == null || qf !== Za(o))) {
        var c = KC(qf);
        if (!_p || !lt(_p, c)) {
          _p = c;
          var d = Qh(s0, "onSelect");
          if (d.length > 0) {
            var g = new Tl("onSelect", "select", null, t, i);
            e.push({
              event: g,
              listeners: d
            }), g.target = qf;
          }
        }
      }
    }
    function JC(e, t, i, o, c, d, g) {
      var x = i ? Xf(i) : window;
      switch (t) {
        // Track the input node that has focus.
        case "focusin":
          (hc(x) || x.contentEditable === "true") && (qf = x, s0 = i, _p = null);
          break;
        case "focusout":
          qf = null, s0 = null, _p = null;
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
    function qh(e, t) {
      var i = {};
      return i[e.toLowerCase()] = t.toLowerCase(), i["Webkit" + e] = "webkit" + t, i["Moz" + e] = "moz" + t, i;
    }
    var Yf = {
      animationend: qh("Animation", "AnimationEnd"),
      animationiteration: qh("Animation", "AnimationIteration"),
      animationstart: qh("Animation", "AnimationStart"),
      transitionend: qh("Transition", "TransitionEnd")
    }, f0 = {}, RS = {};
    kn && (RS = document.createElement("div").style, "AnimationEvent" in window || (delete Yf.animationend.animation, delete Yf.animationiteration.animation, delete Yf.animationstart.animation), "TransitionEvent" in window || delete Yf.transitionend.transition);
    function Yh(e) {
      if (f0[e])
        return f0[e];
      if (!Yf[e])
        return e;
      var t = Yf[e];
      for (var i in t)
        if (t.hasOwnProperty(i) && i in RS)
          return f0[e] = t[i];
      return e;
    }
    var bS = Yh("animationend"), MS = Yh("animationiteration"), _S = Yh("animationstart"), kS = Yh("transitionend"), DS = /* @__PURE__ */ new Map(), OS = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function as(e, t) {
      DS.set(e, t), Be(t, [e]);
    }
    function eT() {
      for (var e = 0; e < OS.length; e++) {
        var t = OS[e], i = t.toLowerCase(), o = t[0].toUpperCase() + t.slice(1);
        as(i, "on" + o);
      }
      as(bS, "onAnimationEnd"), as(MS, "onAnimationIteration"), as(_S, "onAnimationStart"), as("dblclick", "onDoubleClick"), as("focusin", "onFocus"), as("focusout", "onBlur"), as(kS, "onTransitionEnd");
    }
    function tT(e, t, i, o, c, d, g) {
      var x = DS.get(t);
      if (x !== void 0) {
        var w = Tl, k = t;
        switch (t) {
          case "keypress":
            if (Do(o) === 0)
              return;
          /* falls through */
          case "keydown":
          case "keyup":
            w = Nh;
            break;
          case "focusin":
            k = "focus", w = Gl;
            break;
          case "focusout":
            k = "blur", w = Gl;
            break;
          case "beforeblur":
          case "afterblur":
            w = Gl;
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
            w = gp;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = yu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Fh;
            break;
          case bS:
          case MS:
          case _S:
            w = Dh;
            break;
          case kS:
            w = $i;
            break;
          case "scroll":
            w = si;
            break;
          case "wheel":
            w = a0;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = jf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = Uh;
            break;
        }
        var z = (d & zi) !== 0;
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
    eT(), Y(), mc(), XC(), i0();
    function nT(e, t, i, o, c, d, g) {
      tT(e, t, i, o, c, d);
      var x = (d & $d) === 0;
      x && (V(e, t, i, o, c), Ur(e, t, i, o, c), JC(e, t, i, o, c), Vh(e, t, i, o, c));
    }
    var kp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], d0 = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(kp));
    function zS(e, t, i) {
      var o = e.type || "unknown-event";
      e.currentTarget = i, pl(o, t, void 0, e), e.currentTarget = null;
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
      for (var i = (t & zi) !== 0, o = 0; o < e.length; o++) {
        var c = e[o], d = c.event, g = c.listeners;
        rT(d, g, i);
      }
      Ns();
    }
    function aT(e, t, i, o, c) {
      var d = Vd(i), g = [];
      nT(g, e, o, i, d, t), LS(g, t);
    }
    function Rr(e, t) {
      d0.has(e) || v('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var i = !1, o = Aw(t), c = uT(e);
      o.has(c) || (AS(t, e, Bc, i), o.add(c));
    }
    function p0(e, t, i) {
      d0.has(e) && !t && v('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var o = 0;
      t && (o |= zi), AS(i, e, o, t);
    }
    var Wh = "_reactListening" + Math.random().toString(36).slice(2);
    function Dp(e) {
      if (!e[Wh]) {
        e[Wh] = !0, Ge.forEach(function(i) {
          i !== "selectionchange" && (d0.has(i) || p0(i, !1, e), p0(i, !0, e));
        });
        var t = e.nodeType === Hl ? e : e.ownerDocument;
        t !== null && (t[Wh] || (t[Wh] = !0, p0("selectionchange", !1, t)));
      }
    }
    function AS(e, t, i, o, c) {
      var d = ha(e, t, i), g = void 0;
      As && (t === "touchstart" || t === "touchmove" || t === "wheel") && (g = !0), e = e, o ? g !== void 0 ? yp(e, t, d, g) : ui(e, t, d) : g !== void 0 ? es(e, t, d, g) : cc(e, t, d);
    }
    function NS(e, t) {
      return e === t || e.nodeType === Pr && e.parentNode === t;
    }
    function v0(e, t, i, o, c) {
      var d = o;
      if ((t & Hd) === 0 && (t & Bc) === 0) {
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
                var Z = Sc(k);
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
      th(function() {
        return aT(e, t, i, d);
      });
    }
    function Op(e, t, i) {
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
          var ne = yo(k, x);
          ne != null && w.push(Op(k, ne, z));
        }
        if (c)
          break;
        k = k.return;
      }
      return w;
    }
    function Qh(e, t) {
      for (var i = t + "Capture", o = [], c = e; c !== null; ) {
        var d = c, g = d.stateNode, x = d.tag;
        if (x === O && g !== null) {
          var w = g, k = yo(c, i);
          k != null && o.unshift(Op(c, k, w));
          var z = yo(c, t);
          z != null && o.push(Op(c, z, w));
        }
        c = c.return;
      }
      return o;
    }
    function Wf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== O);
      return e || null;
    }
    function lT(e, t) {
      for (var i = e, o = t, c = 0, d = i; d; d = Wf(d))
        c++;
      for (var g = 0, x = o; x; x = Wf(x))
        g++;
      for (; c - g > 0; )
        i = Wf(i), c--;
      for (; g - c > 0; )
        o = Wf(o), g--;
      for (var w = c; w--; ) {
        if (i === o || o !== null && i === o.alternate)
          return i;
        i = Wf(i), o = Wf(o);
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
            var Z = yo(x, d);
            Z != null && g.unshift(Op(x, Z, $));
          } else if (!c) {
            var ne = yo(x, d);
            ne != null && g.push(Op(x, ne, $));
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
    var Vi = !1, zp = "dangerouslySetInnerHTML", Gh = "suppressContentEditableWarning", is = "suppressHydrationWarning", jS = "autoFocus", yc = "children", gc = "style", Xh = "__html", h0, Kh, Lp, FS, Zh, PS, HS;
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
      jd(e, t), Vc(e, t), Zv(e, t, {
        registrationNameDependencies: He,
        possibleRegistrationNames: Ie
      });
    }, PS = kn && !document.documentMode, Lp = function(e, t, i) {
      if (!Vi) {
        var o = Jh(i), c = Jh(t);
        c !== o && (Vi = !0, v("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(c), JSON.stringify(o)));
      }
    }, FS = function(e) {
      if (!Vi) {
        Vi = !0;
        var t = [];
        e.forEach(function(i) {
          t.push(i);
        }), v("Extra attributes from the server: %s", t);
      }
    }, Zh = function(e, t) {
      t === !1 ? v("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : v("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, HS = function(e, t) {
      var i = e.namespaceURI === Fl ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return i.innerHTML = t, i.innerHTML;
    };
    var sT = /\r\n?/g, cT = /\u0000|\uFFFD/g;
    function Jh(e) {
      on(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(sT, `
`).replace(cT, "");
    }
    function em(e, t, i, o) {
      var c = Jh(t), d = Jh(e);
      if (d !== c && (o && (Vi || (Vi = !0, v('Text content did not match. Server: "%s" Client: "%s"', d, c))), i && ge))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function $S(e) {
      return e.nodeType === Hl ? e : e.ownerDocument;
    }
    function fT() {
    }
    function tm(e) {
      e.onclick = fT;
    }
    function dT(e, t, i, o, c) {
      for (var d in o)
        if (o.hasOwnProperty(d)) {
          var g = o[d];
          if (d === gc)
            g && Object.freeze(g), Yv(t, g);
          else if (d === zp) {
            var x = g ? g[Xh] : void 0;
            x != null && Av(t, x);
          } else if (d === yc)
            if (typeof g == "string") {
              var w = e !== "textarea" || g !== "";
              w && Uu(t, g);
            } else typeof g == "number" && Uu(t, "" + g);
          else d === Gh || d === is || d === jS || (He.hasOwnProperty(d) ? g != null && (typeof g != "function" && Zh(d, g), d === "onScroll" && Rr("scroll", t)) : g != null && wn(t, d, g, c));
        }
    }
    function pT(e, t, i, o) {
      for (var c = 0; c < t.length; c += 2) {
        var d = t[c], g = t[c + 1];
        d === gc ? Yv(e, g) : d === zp ? Av(e, g) : d === yc ? Uu(e, g) : wn(e, d, g, o);
      }
    }
    function vT(e, t, i, o) {
      var c, d = $S(i), g, x = o;
      if (x === Fl && (x = Dd(e)), x === Fl) {
        if (c = ho(e, t), !c && e !== e.toLowerCase() && v("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
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
      return x === Fl && !c && Object.prototype.toString.call(g) === "[object HTMLUnknownElement]" && !Wn.call(h0, e) && (h0[e] = !0, v("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), g;
    }
    function hT(e, t) {
      return $S(t).createTextNode(e);
    }
    function mT(e, t, i, o) {
      var c = ho(t, i);
      Kh(t, i);
      var d;
      switch (t) {
        case "dialog":
          Rr("cancel", e), Rr("close", e), d = i;
          break;
        case "iframe":
        case "object":
        case "embed":
          Rr("load", e), d = i;
          break;
        case "video":
        case "audio":
          for (var g = 0; g < kp.length; g++)
            Rr(kp[g], e);
          d = i;
          break;
        case "source":
          Rr("error", e), d = i;
          break;
        case "img":
        case "image":
        case "link":
          Rr("error", e), Rr("load", e), d = i;
          break;
        case "details":
          Rr("toggle", e), d = i;
          break;
        case "input":
          mi(e, i), d = vo(e, i), Rr("invalid", e);
          break;
        case "option":
          Kt(e, i), d = i;
          break;
        case "select":
          sl(e, i), d = jl(e, i), Rr("invalid", e);
          break;
        case "textarea":
          Wo(e, i), d = Yo(e, i), Rr("invalid", e);
          break;
        default:
          d = i;
      }
      switch (Hc(t, d), dT(t, e, o, d, c), t) {
        case "input":
          hi(e), K(e, i, !1);
          break;
        case "textarea":
          hi(e), Rs(e);
          break;
        case "option":
          bn(e, i);
          break;
        case "select":
          cl(e, i);
          break;
        default:
          typeof d.onClick == "function" && tm(e);
          break;
      }
    }
    function yT(e, t, i, o, c) {
      Kh(t, o);
      var d = null, g, x;
      switch (t) {
        case "input":
          g = vo(e, i), x = vo(e, o), d = [];
          break;
        case "select":
          g = jl(e, i), x = jl(e, o), d = [];
          break;
        case "textarea":
          g = Yo(e, i), x = Yo(e, o), d = [];
          break;
        default:
          g = i, x = o, typeof g.onClick != "function" && typeof x.onClick == "function" && tm(e);
          break;
      }
      Hc(t, x);
      var w, k, z = null;
      for (w in g)
        if (!(x.hasOwnProperty(w) || !g.hasOwnProperty(w) || g[w] == null))
          if (w === gc) {
            var I = g[w];
            for (k in I)
              I.hasOwnProperty(k) && (z || (z = {}), z[k] = "");
          } else w === zp || w === yc || w === Gh || w === is || w === jS || (He.hasOwnProperty(w) ? d || (d = []) : (d = d || []).push(w, null));
      for (w in x) {
        var $ = x[w], Z = g?.[w];
        if (!(!x.hasOwnProperty(w) || $ === Z || $ == null && Z == null))
          if (w === gc)
            if ($ && Object.freeze($), Z) {
              for (k in Z)
                Z.hasOwnProperty(k) && (!$ || !$.hasOwnProperty(k)) && (z || (z = {}), z[k] = "");
              for (k in $)
                $.hasOwnProperty(k) && Z[k] !== $[k] && (z || (z = {}), z[k] = $[k]);
            } else
              z || (d || (d = []), d.push(w, z)), z = $;
          else if (w === zp) {
            var ne = $ ? $[Xh] : void 0, se = Z ? Z[Xh] : void 0;
            ne != null && se !== ne && (d = d || []).push(w, ne);
          } else w === yc ? (typeof $ == "string" || typeof $ == "number") && (d = d || []).push(w, "" + $) : w === Gh || w === is || (He.hasOwnProperty(w) ? ($ != null && (typeof $ != "function" && Zh(w, $), w === "onScroll" && Rr("scroll", e)), !d && Z !== $ && (d = [])) : (d = d || []).push(w, $));
      }
      return z && (Vy(z, x[gc]), (d = d || []).push(gc, z)), d;
    }
    function gT(e, t, i, o, c) {
      i === "input" && c.type === "radio" && c.name != null && M(e, c);
      var d = ho(i, o), g = ho(i, c);
      switch (pT(e, t, d, g), i) {
        case "input":
          F(e, c);
          break;
        case "textarea":
          Md(e, c);
          break;
        case "select":
          _a(e, c);
          break;
      }
    }
    function ST(e) {
      {
        var t = e.toLowerCase();
        return Ds.hasOwnProperty(t) && Ds[t] || null;
      }
    }
    function xT(e, t, i, o, c, d, g) {
      var x, w;
      switch (x = ho(t, i), Kh(t, i), t) {
        case "dialog":
          Rr("cancel", e), Rr("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          Rr("load", e);
          break;
        case "video":
        case "audio":
          for (var k = 0; k < kp.length; k++)
            Rr(kp[k], e);
          break;
        case "source":
          Rr("error", e);
          break;
        case "img":
        case "image":
        case "link":
          Rr("error", e), Rr("load", e);
          break;
        case "details":
          Rr("toggle", e);
          break;
        case "input":
          mi(e, i), Rr("invalid", e);
          break;
        case "option":
          Kt(e, i);
          break;
        case "select":
          sl(e, i), Rr("invalid", e);
          break;
        case "textarea":
          Wo(e, i), Rr("invalid", e);
          break;
      }
      Hc(t, i);
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
          if (ne === yc)
            typeof se == "string" ? e.textContent !== se && (i[is] !== !0 && em(e.textContent, se, d, g), Z = [yc, se]) : typeof se == "number" && e.textContent !== "" + se && (i[is] !== !0 && em(e.textContent, se, d, g), Z = [yc, "" + se]);
          else if (He.hasOwnProperty(ne))
            se != null && (typeof se != "function" && Zh(ne, se), ne === "onScroll" && Rr("scroll", e));
          else if (g && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof x == "boolean") {
            var Qe = void 0, St = Et(ne);
            if (i[is] !== !0) {
              if (!(ne === Gh || ne === is || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              ne === "value" || ne === "checked" || ne === "selected")) {
                if (ne === zp) {
                  var dt = e.innerHTML, Un = se ? se[Xh] : void 0;
                  if (Un != null) {
                    var _n = HS(e, Un);
                    _n !== dt && Lp(ne, dt, _n);
                  }
                } else if (ne === gc) {
                  if (w.delete(ne), PS) {
                    var W = Hy(se);
                    Qe = e.getAttribute("style"), W !== Qe && Lp(ne, Qe, W);
                  }
                } else if (x && !H)
                  w.delete(ne.toLowerCase()), Qe = kr(e, ne, se), se !== Qe && Lp(ne, Qe, se);
                else if (!Cn(ne, St, x) && !fn(ne, se, St, x)) {
                  var ce = !1;
                  if (St !== null)
                    w.delete(St.attributeName), Qe = Tn(e, ne, se, St);
                  else {
                    var Q = o;
                    if (Q === Fl && (Q = Dd(t)), Q === Fl)
                      w.delete(ne.toLowerCase());
                    else {
                      var De = ST(ne);
                      De !== null && De !== ne && (ce = !0, w.delete(De)), w.delete(ne);
                    }
                    Qe = kr(e, ne, se);
                  }
                  var nt = H;
                  !nt && se !== Qe && !ce && Lp(ne, Qe, se);
                }
              }
            }
          }
        }
      switch (g && // $FlowFixMe - Should be inferred as not undefined.
      w.size > 0 && i[is] !== !0 && FS(w), t) {
        case "input":
          hi(e), K(e, i, !0);
          break;
        case "textarea":
          hi(e), Rs(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof i.onClick == "function" && tm(e);
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
        if (Vi)
          return;
        Vi = !0, v("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function y0(e, t) {
      {
        if (Vi)
          return;
        Vi = !0, v('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function g0(e, t, i) {
      {
        if (Vi)
          return;
        Vi = !0, v("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function S0(e, t) {
      {
        if (t === "" || Vi)
          return;
        Vi = !0, v('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function CT(e, t, i) {
      switch (t) {
        case "input":
          oe(e, i);
          return;
        case "textarea":
          Uy(e, i);
          return;
        case "select":
          Au(e, i);
          return;
      }
    }
    var Ap = function() {
    }, Np = function() {
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
      Np = function(e, t) {
        var i = Ct({}, e || IS), o = {
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
      Ap = function(e, t, i) {
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
    var nm = "suppressHydrationWarning", rm = "$", am = "/$", Up = "$?", jp = "$!", _T = "style", x0 = null, E0 = null;
    function kT(e) {
      var t, i, o = e.nodeType;
      switch (o) {
        case Hl:
        case zd: {
          t = o === Hl ? "#document" : "#fragment";
          var c = e.documentElement;
          i = c ? c.namespaceURI : Od(null, "");
          break;
        }
        default: {
          var d = o === Pr ? e.parentNode : e, g = d.namespaceURI || null;
          t = d.tagName, i = Od(g, t);
          break;
        }
      }
      {
        var x = t.toLowerCase(), w = Np(null, x);
        return {
          namespace: i,
          ancestorInfo: w
        };
      }
    }
    function DT(e, t, i) {
      {
        var o = e, c = Od(o.namespace, t), d = Np(o.ancestorInfo, t);
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
      x0 = qr(), E0 = qC();
      var t = null;
      return Zr(!1), t;
    }
    function zT(e) {
      YC(E0), Zr(x0), x0 = null, E0 = null;
    }
    function LT(e, t, i, o, c) {
      var d;
      {
        var g = o;
        if (Ap(e, null, g.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var x = "" + t.children, w = Np(g.ancestorInfo, e);
          Ap(null, x, w);
        }
        d = g.namespace;
      }
      var k = vT(e, t, i, d);
      return Hp(c, k), k0(k, t), k;
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
          var x = "" + o.children, w = Np(g.ancestorInfo, t);
          Ap(null, x, w);
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
        Ap(null, e, c.ancestorInfo);
      }
      var d = hT(e, t);
      return Hp(o, d), d;
    }
    function FT() {
      var e = window.event;
      return e === void 0 ? Fi : Af(e.type);
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
      Uu(e, "");
    }
    function BT(e, t, i) {
      e.nodeValue = i;
    }
    function qT(e, t) {
      e.appendChild(t);
    }
    function YT(e, t) {
      var i;
      e.nodeType === Pr ? (i = e.parentNode, i.insertBefore(t, e)) : (i = e, i.appendChild(t));
      var o = e._reactRootContainer;
      o == null && i.onclick === null && tm(i);
    }
    function WT(e, t, i) {
      e.insertBefore(t, i);
    }
    function QT(e, t, i) {
      e.nodeType === Pr ? e.parentNode.insertBefore(t, i) : e.insertBefore(t, i);
    }
    function GT(e, t) {
      e.removeChild(t);
    }
    function XT(e, t) {
      e.nodeType === Pr ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function R0(e, t) {
      var i = t, o = 0;
      do {
        var c = i.nextSibling;
        if (e.removeChild(i), c && c.nodeType === Pr) {
          var d = c.data;
          if (d === am)
            if (o === 0) {
              e.removeChild(c), vu(t);
              return;
            } else
              o--;
          else (d === rm || d === Up || d === jp) && o++;
        }
        i = c;
      } while (i);
      vu(t);
    }
    function KT(e, t) {
      e.nodeType === Pr ? R0(e.parentNode, t) : e.nodeType === Ja && R0(e, t), vu(e);
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
      e.style.display = Pc("display", o);
    }
    function tw(e, t) {
      e.nodeValue = t;
    }
    function nw(e) {
      e.nodeType === Ja ? e.textContent = "" : e.nodeType === Hl && e.documentElement && e.removeChild(e.documentElement);
    }
    function rw(e, t, i) {
      return e.nodeType !== Ja || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function aw(e, t) {
      return t === "" || e.nodeType !== Pl ? null : e;
    }
    function iw(e) {
      return e.nodeType !== Pr ? null : e;
    }
    function WS(e) {
      return e.data === Up;
    }
    function b0(e) {
      return e.data === jp;
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
    function im(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Ja || t === Pl)
          break;
        if (t === Pr) {
          var i = e.data;
          if (i === rm || i === jp || i === Up)
            break;
          if (i === am)
            return null;
        }
      }
      return e;
    }
    function Fp(e) {
      return im(e.nextSibling);
    }
    function uw(e) {
      return im(e.firstChild);
    }
    function sw(e) {
      return im(e.firstChild);
    }
    function cw(e) {
      return im(e.nextSibling);
    }
    function fw(e, t, i, o, c, d, g) {
      Hp(d, e), k0(e, i);
      var x;
      {
        var w = c;
        x = w.namespace;
      }
      var k = (d.mode & mn) !== yt;
      return xT(e, t, i, x, o, k, g);
    }
    function dw(e, t, i, o) {
      return Hp(i, e), i.mode & mn, ET(e, t);
    }
    function pw(e, t) {
      Hp(t, e);
    }
    function vw(e) {
      for (var t = e.nextSibling, i = 0; t; ) {
        if (t.nodeType === Pr) {
          var o = t.data;
          if (o === am) {
            if (i === 0)
              return Fp(t);
            i--;
          } else (o === rm || o === jp || o === Up) && i++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function QS(e) {
      for (var t = e.previousSibling, i = 0; t; ) {
        if (t.nodeType === Pr) {
          var o = t.data;
          if (o === rm || o === jp || o === Up) {
            if (i === 0)
              return t;
            i--;
          } else o === am && i++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function hw(e) {
      vu(e);
    }
    function mw(e) {
      vu(e);
    }
    function yw(e) {
      return e !== "head" && e !== "body";
    }
    function gw(e, t, i, o) {
      var c = !0;
      em(t.nodeValue, i, o, c);
    }
    function Sw(e, t, i, o, c, d) {
      if (t[nm] !== !0) {
        var g = !0;
        em(o.nodeValue, c, d, g);
      }
    }
    function xw(e, t) {
      t.nodeType === Ja ? m0(e, t) : t.nodeType === Pr || y0(e, t);
    }
    function Ew(e, t) {
      {
        var i = e.parentNode;
        i !== null && (t.nodeType === Ja ? m0(i, t) : t.nodeType === Pr || y0(i, t));
      }
    }
    function Cw(e, t, i, o, c) {
      (c || t[nm] !== !0) && (o.nodeType === Ja ? m0(i, o) : o.nodeType === Pr || y0(i, o));
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
      (d || t[nm] !== !0) && g0(i, o);
    }
    function _w(e, t, i, o, c) {
      (c || t[nm] !== !0) && S0(i, o);
    }
    function kw(e) {
      v("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function Dw(e) {
      Dp(e);
    }
    var Qf = Math.random().toString(36).slice(2), Gf = "__reactFiber$" + Qf, M0 = "__reactProps$" + Qf, Pp = "__reactContainer$" + Qf, _0 = "__reactEvents$" + Qf, Ow = "__reactListeners$" + Qf, zw = "__reactHandles$" + Qf;
    function Lw(e) {
      delete e[Gf], delete e[M0], delete e[_0], delete e[Ow], delete e[zw];
    }
    function Hp(e, t) {
      t[Gf] = e;
    }
    function lm(e, t) {
      t[Pp] = e;
    }
    function GS(e) {
      e[Pp] = null;
    }
    function $p(e) {
      return !!e[Pp];
    }
    function Sc(e) {
      var t = e[Gf];
      if (t)
        return t;
      for (var i = e.parentNode; i; ) {
        if (t = i[Pp] || i[Gf], t) {
          var o = t.alternate;
          if (t.child !== null || o !== null && o.child !== null)
            for (var c = QS(e); c !== null; ) {
              var d = c[Gf];
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
    function ls(e) {
      var t = e[Gf] || e[Pp];
      return t && (t.tag === O || t.tag === L || t.tag === q || t.tag === R) ? t : null;
    }
    function Xf(e) {
      if (e.tag === O || e.tag === L)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function om(e) {
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
    function um(e) {
      if (e) {
        var t = e._owner, i = ua(e.type, e._source, t ? t.type : null);
        KS.setExtraStackFrame(i);
      } else
        KS.setExtraStackFrame(null);
    }
    function Kl(e, t, i, o, c) {
      {
        var d = Function.call.bind(Wn);
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
            x && !(x instanceof Error) && (um(c), v("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", i, g, typeof x), um(null)), x instanceof Error && !(x.message in XS) && (XS[x.message] = !0, um(c), v("Failed %s type: %s", i, x.message), um(null));
          }
      }
    }
    var D0 = [], sm;
    sm = [];
    var xu = -1;
    function os(e) {
      return {
        current: e
      };
    }
    function ci(e, t) {
      if (xu < 0) {
        v("Unexpected pop.");
        return;
      }
      t !== sm[xu] && v("Unexpected Fiber popped."), e.current = D0[xu], D0[xu] = null, sm[xu] = null, xu--;
    }
    function fi(e, t, i) {
      xu++, D0[xu] = e.current, sm[xu] = i, e.current = t;
    }
    var O0;
    O0 = {};
    var tl = {};
    Object.freeze(tl);
    var Eu = os(tl), No = os(!1), z0 = tl;
    function Kf(e, t, i) {
      return i && Uo(t) ? z0 : Eu.current;
    }
    function ZS(e, t, i) {
      {
        var o = e.stateNode;
        o.__reactInternalMemoizedUnmaskedChildContext = t, o.__reactInternalMemoizedMaskedChildContext = i;
      }
    }
    function Zf(e, t) {
      {
        var i = e.type, o = i.contextTypes;
        if (!o)
          return tl;
        var c = e.stateNode;
        if (c && c.__reactInternalMemoizedUnmaskedChildContext === t)
          return c.__reactInternalMemoizedMaskedChildContext;
        var d = {};
        for (var g in o)
          d[g] = t[g];
        {
          var x = Dt(e) || "Unknown";
          Kl(o, d, "context", x);
        }
        return c && ZS(e, t, d), d;
      }
    }
    function cm() {
      return No.current;
    }
    function Uo(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function fm(e) {
      ci(No, e), ci(Eu, e);
    }
    function L0(e) {
      ci(No, e), ci(Eu, e);
    }
    function JS(e, t, i) {
      {
        if (Eu.current !== tl)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        fi(Eu, t, e), fi(No, i, e);
      }
    }
    function e2(e, t, i) {
      {
        var o = e.stateNode, c = t.childContextTypes;
        if (typeof o.getChildContext != "function") {
          {
            var d = Dt(e) || "Unknown";
            O0[d] || (O0[d] = !0, v("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", d, d));
          }
          return i;
        }
        var g = o.getChildContext();
        for (var x in g)
          if (!(x in c))
            throw new Error((Dt(e) || "Unknown") + '.getChildContext(): key "' + x + '" is not defined in childContextTypes.');
        {
          var w = Dt(e) || "Unknown";
          Kl(c, g, "child context", w);
        }
        return Ct({}, i, g);
      }
    }
    function dm(e) {
      {
        var t = e.stateNode, i = t && t.__reactInternalMemoizedMergedChildContext || tl;
        return z0 = Eu.current, fi(Eu, i, e), fi(No, No.current, e), !0;
      }
    }
    function t2(e, t, i) {
      {
        var o = e.stateNode;
        if (!o)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (i) {
          var c = e2(e, t, z0);
          o.__reactInternalMemoizedMergedChildContext = c, ci(No, e), ci(Eu, e), fi(Eu, c, e), fi(No, i, e);
        } else
          ci(No, e), fi(No, i, e);
      }
    }
    function Nw(e) {
      {
        if (!eu(e) || e.tag !== T)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case R:
              return t.stateNode.context;
            case T: {
              var i = t.type;
              if (Uo(i))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var us = 0, pm = 1, Cu = null, A0 = !1, N0 = !1;
    function n2(e) {
      Cu === null ? Cu = [e] : Cu.push(e);
    }
    function Uw(e) {
      A0 = !0, n2(e);
    }
    function r2() {
      A0 && ss();
    }
    function ss() {
      if (!N0 && Cu !== null) {
        N0 = !0;
        var e = 0, t = Hi();
        try {
          var i = !0, o = Cu;
          for (Br(Na); e < o.length; e++) {
            var c = o[e];
            do
              c = c(i);
            while (c !== null);
          }
          Cu = null, A0 = !1;
        } catch (d) {
          throw Cu !== null && (Cu = Cu.slice(e + 1)), Bd(Fs, ss), d;
        } finally {
          Br(t), N0 = !1;
        }
      }
      return null;
    }
    var Jf = [], ed = 0, vm = null, hm = 0, wl = [], Rl = 0, xc = null, Tu = 1, wu = "";
    function jw(e) {
      return Cc(), (e.flags & vl) !== mt;
    }
    function Fw(e) {
      return Cc(), hm;
    }
    function Pw() {
      var e = wu, t = Tu, i = t & ~Hw(t);
      return i.toString(32) + e;
    }
    function Ec(e, t) {
      Cc(), Jf[ed++] = hm, Jf[ed++] = vm, vm = e, hm = t;
    }
    function a2(e, t, i) {
      Cc(), wl[Rl++] = Tu, wl[Rl++] = wu, wl[Rl++] = xc, xc = e;
      var o = Tu, c = wu, d = mm(o) - 1, g = o & ~(1 << d), x = i + 1, w = mm(t) + d;
      if (w > 30) {
        var k = d - d % 5, z = (1 << k) - 1, I = (g & z).toString(32), $ = g >> k, Z = d - k, ne = mm(t) + Z, se = x << Z, Qe = se | $, St = I + c;
        Tu = 1 << ne | Qe, wu = St;
      } else {
        var dt = x << d, Un = dt | g, _n = c;
        Tu = 1 << w | Un, wu = _n;
      }
    }
    function U0(e) {
      Cc();
      var t = e.return;
      if (t !== null) {
        var i = 1, o = 0;
        Ec(e, i), a2(e, i, o);
      }
    }
    function mm(e) {
      return 32 - Vr(e);
    }
    function Hw(e) {
      return 1 << mm(e) - 1;
    }
    function j0(e) {
      for (; e === vm; )
        vm = Jf[--ed], Jf[ed] = null, hm = Jf[--ed], Jf[ed] = null;
      for (; e === xc; )
        xc = wl[--Rl], wl[Rl] = null, wu = wl[--Rl], wl[Rl] = null, Tu = wl[--Rl], wl[Rl] = null;
    }
    function $w() {
      return Cc(), xc !== null ? {
        id: Tu,
        overflow: wu
      } : null;
    }
    function Vw(e, t) {
      Cc(), wl[Rl++] = Tu, wl[Rl++] = wu, wl[Rl++] = xc, Tu = t.id, wu = t.overflow, xc = e;
    }
    function Cc() {
      Ha() || v("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Pa = null, bl = null, Zl = !1, Tc = !1, cs = null;
    function Iw() {
      Zl && v("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function i2() {
      Tc = !0;
    }
    function Bw() {
      return Tc;
    }
    function qw(e) {
      var t = e.stateNode.containerInfo;
      return bl = sw(t), Pa = e, Zl = !0, cs = null, Tc = !1, !0;
    }
    function Yw(e, t, i) {
      return bl = cw(t), Pa = e, Zl = !0, cs = null, Tc = !1, i !== null && Vw(e, i), !0;
    }
    function l2(e, t) {
      switch (e.tag) {
        case R: {
          xw(e.stateNode.containerInfo, t);
          break;
        }
        case O: {
          var i = (e.mode & mn) !== yt;
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
      o === null ? (e.deletions = [i], e.flags |= Li) : o.push(i);
    }
    function F0(e, t) {
      {
        if (Tc)
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
                var w = t.type, k = t.pendingProps, z = (e.mode & mn) !== yt;
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
                var I = t.pendingProps, $ = (e.mode & mn) !== yt;
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
      t.flags = t.flags & ~ti | Cr, F0(e, t);
    }
    function s2(e, t) {
      switch (e.tag) {
        case O: {
          var i = e.type;
          e.pendingProps;
          var o = rw(t, i);
          return o !== null ? (e.stateNode = o, Pa = e, bl = uw(o), !0) : !1;
        }
        case L: {
          var c = e.pendingProps, d = aw(t, c);
          return d !== null ? (e.stateNode = d, Pa = e, bl = null, !0) : !1;
        }
        case q: {
          var g = iw(t);
          if (g !== null) {
            var x = {
              dehydrated: g,
              treeContext: $w(),
              retryLane: ii
            };
            e.memoizedState = x;
            var w = KM(g);
            return w.return = e, e.child = w, Pa = e, bl = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function P0(e) {
      return (e.mode & mn) !== yt && (e.flags & vt) === mt;
    }
    function H0(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function $0(e) {
      if (Zl) {
        var t = bl;
        if (!t) {
          P0(e) && (F0(Pa, e), H0()), u2(Pa, e), Zl = !1, Pa = e;
          return;
        }
        var i = t;
        if (!s2(e, t)) {
          P0(e) && (F0(Pa, e), H0()), t = Fp(i);
          var o = Pa;
          if (!t || !s2(e, t)) {
            u2(Pa, e), Zl = !1, Pa = e;
            return;
          }
          o2(o, i);
        }
      }
    }
    function Ww(e, t, i) {
      var o = e.stateNode, c = !Tc, d = fw(o, e.type, e.memoizedProps, t, i, e, c);
      return e.updateQueue = d, d !== null;
    }
    function Qw(e) {
      var t = e.stateNode, i = e.memoizedProps, o = dw(t, i, e);
      if (o) {
        var c = Pa;
        if (c !== null)
          switch (c.tag) {
            case R: {
              var d = c.stateNode.containerInfo, g = (c.mode & mn) !== yt;
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
              var x = c.type, w = c.memoizedProps, k = c.stateNode, z = (c.mode & mn) !== yt;
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
    function ym(e) {
      if (e !== Pa)
        return !1;
      if (!Zl)
        return c2(e), Zl = !0, !1;
      if (e.tag !== R && (e.tag !== O || yw(e.type) && !C0(e.type, e.memoizedProps))) {
        var t = bl;
        if (t)
          if (P0(e))
            f2(e), H0();
          else
            for (; t; )
              o2(e, t), t = Fp(t);
      }
      return c2(e), e.tag === q ? bl = Xw(e) : bl = Pa ? Fp(e.stateNode) : null, !0;
    }
    function Kw() {
      return Zl && bl !== null;
    }
    function f2(e) {
      for (var t = bl; t; )
        l2(e, t), t = Fp(t);
    }
    function td() {
      Pa = null, bl = null, Zl = !1, Tc = !1;
    }
    function d2() {
      cs !== null && (ix(cs), cs = null);
    }
    function Ha() {
      return Zl;
    }
    function V0(e) {
      cs === null ? cs = [e] : cs.push(e);
    }
    var Zw = s.ReactCurrentBatchConfig, Jw = null;
    function eR() {
      return Zw.transition;
    }
    var Jl = {
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
      }, wc = function(e) {
        var t = [];
        return e.forEach(function(i) {
          t.push(i);
        }), t.sort().join(", ");
      }, Vp = [], Ip = [], Bp = [], qp = [], Yp = [], Wp = [], Rc = /* @__PURE__ */ new Set();
      Jl.recordUnsafeLifecycleWarnings = function(e, t) {
        Rc.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Vp.push(e), e.mode & nr && typeof t.UNSAFE_componentWillMount == "function" && Ip.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Bp.push(e), e.mode & nr && typeof t.UNSAFE_componentWillReceiveProps == "function" && qp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Yp.push(e), e.mode & nr && typeof t.UNSAFE_componentWillUpdate == "function" && Wp.push(e));
      }, Jl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Vp.length > 0 && (Vp.forEach(function($) {
          e.add(Dt($) || "Component"), Rc.add($.type);
        }), Vp = []);
        var t = /* @__PURE__ */ new Set();
        Ip.length > 0 && (Ip.forEach(function($) {
          t.add(Dt($) || "Component"), Rc.add($.type);
        }), Ip = []);
        var i = /* @__PURE__ */ new Set();
        Bp.length > 0 && (Bp.forEach(function($) {
          i.add(Dt($) || "Component"), Rc.add($.type);
        }), Bp = []);
        var o = /* @__PURE__ */ new Set();
        qp.length > 0 && (qp.forEach(function($) {
          o.add(Dt($) || "Component"), Rc.add($.type);
        }), qp = []);
        var c = /* @__PURE__ */ new Set();
        Yp.length > 0 && (Yp.forEach(function($) {
          c.add(Dt($) || "Component"), Rc.add($.type);
        }), Yp = []);
        var d = /* @__PURE__ */ new Set();
        if (Wp.length > 0 && (Wp.forEach(function($) {
          d.add(Dt($) || "Component"), Rc.add($.type);
        }), Wp = []), t.size > 0) {
          var g = wc(t);
          v(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, g);
        }
        if (o.size > 0) {
          var x = wc(o);
          v(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, x);
        }
        if (d.size > 0) {
          var w = wc(d);
          v(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, w);
        }
        if (e.size > 0) {
          var k = wc(e);
          y(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, k);
        }
        if (i.size > 0) {
          var z = wc(i);
          y(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, z);
        }
        if (c.size > 0) {
          var I = wc(c);
          y(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, I);
        }
      };
      var gm = /* @__PURE__ */ new Map(), p2 = /* @__PURE__ */ new Set();
      Jl.recordLegacyContextWarning = function(e, t) {
        var i = tR(e);
        if (i === null) {
          v("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!p2.has(e.type)) {
          var o = gm.get(i);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (o === void 0 && (o = [], gm.set(i, o)), o.push(e));
        }
      }, Jl.flushLegacyContextWarning = function() {
        gm.forEach(function(e, t) {
          if (e.length !== 0) {
            var i = e[0], o = /* @__PURE__ */ new Set();
            e.forEach(function(d) {
              o.add(Dt(d) || "Component"), p2.add(d.type);
            });
            var c = wc(o);
            try {
              Tt(i), v(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c);
            } finally {
              Nt();
            }
          }
        });
      }, Jl.discardPendingWarnings = function() {
        Vp = [], Ip = [], Bp = [], qp = [], Yp = [], Wp = [], gm = /* @__PURE__ */ new Map();
      };
    }
    var I0, B0, q0, Y0, W0, v2 = function(e, t) {
    };
    I0 = !1, B0 = !1, q0 = {}, Y0 = {}, W0 = {}, v2 = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var i = Dt(t) || "Component";
        Y0[i] || (Y0[i] = !0, v('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function nR(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Qp(e, t, i) {
      var o = i.ref;
      if (o !== null && typeof o != "function" && typeof o != "object") {
        if ((e.mode & nr || ue) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(i._owner && i._self && i._owner.stateNode !== i._self) && // Will already throw with "Function components cannot have string refs"
        !(i._owner && i._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
        !(typeof i.type == "function" && !nR(i.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        i._owner) {
          var c = Dt(e) || "Component";
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
          bt(o, "ref");
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
    function Sm(e, t) {
      var i = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (i === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : i) + "). If you meant to render a collection of children, use an array instead.");
    }
    function xm(e) {
      {
        var t = Dt(e) || "Component";
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
          Q === null ? (W.deletions = [ce], W.flags |= Li) : Q.push(ce);
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
        for (var Q = /* @__PURE__ */ new Map(), De = ce; De !== null; )
          De.key !== null ? Q.set(De.key, De) : Q.set(De.index, De), De = De.sibling;
        return Q;
      }
      function c(W, ce) {
        var Q = Ac(W, ce);
        return Q.index = 0, Q.sibling = null, Q;
      }
      function d(W, ce, Q) {
        if (W.index = Q, !e)
          return W.flags |= vl, ce;
        var De = W.alternate;
        if (De !== null) {
          var nt = De.index;
          return nt < ce ? (W.flags |= Cr, ce) : nt;
        } else
          return W.flags |= Cr, ce;
      }
      function g(W) {
        return e && W.alternate === null && (W.flags |= Cr), W;
      }
      function x(W, ce, Q, De) {
        if (ce === null || ce.tag !== L) {
          var nt = Vg(Q, W.mode, De);
          return nt.return = W, nt;
        } else {
          var Xe = c(ce, Q);
          return Xe.return = W, Xe;
        }
      }
      function w(W, ce, Q, De) {
        var nt = Q.type;
        if (nt === yn)
          return z(W, ce, Q.props.children, De, Q.key);
        if (ce !== null && (ce.elementType === nt || // Keep this check inline so it only runs on the false path:
        Ex(ce, Q) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof nt == "object" && nt !== null && nt.$$typeof === Ye && h2(nt) === ce.type)) {
          var Xe = c(ce, Q.props);
          return Xe.ref = Qp(W, ce, Q), Xe.return = W, Xe._debugSource = Q._source, Xe._debugOwner = Q._owner, Xe;
        }
        var jt = $g(Q, W.mode, De);
        return jt.ref = Qp(W, ce, Q), jt.return = W, jt;
      }
      function k(W, ce, Q, De) {
        if (ce === null || ce.tag !== D || ce.stateNode.containerInfo !== Q.containerInfo || ce.stateNode.implementation !== Q.implementation) {
          var nt = Ig(Q, W.mode, De);
          return nt.return = W, nt;
        } else {
          var Xe = c(ce, Q.children || []);
          return Xe.return = W, Xe;
        }
      }
      function z(W, ce, Q, De, nt) {
        if (ce === null || ce.tag !== U) {
          var Xe = Es(Q, W.mode, De, nt);
          return Xe.return = W, Xe;
        } else {
          var jt = c(ce, Q);
          return jt.return = W, jt;
        }
      }
      function I(W, ce, Q) {
        if (typeof ce == "string" && ce !== "" || typeof ce == "number") {
          var De = Vg("" + ce, W.mode, Q);
          return De.return = W, De;
        }
        if (typeof ce == "object" && ce !== null) {
          switch (ce.$$typeof) {
            case Yt: {
              var nt = $g(ce, W.mode, Q);
              return nt.ref = Qp(W, null, ce), nt.return = W, nt;
            }
            case At: {
              var Xe = Ig(ce, W.mode, Q);
              return Xe.return = W, Xe;
            }
            case Ye: {
              var jt = ce._payload, Qt = ce._init;
              return I(W, Qt(jt), Q);
            }
          }
          if (Ot(ce) || gt(ce)) {
            var ar = Es(ce, W.mode, Q, null);
            return ar.return = W, ar;
          }
          Sm(W, ce);
        }
        return typeof ce == "function" && xm(W), null;
      }
      function $(W, ce, Q, De) {
        var nt = ce !== null ? ce.key : null;
        if (typeof Q == "string" && Q !== "" || typeof Q == "number")
          return nt !== null ? null : x(W, ce, "" + Q, De);
        if (typeof Q == "object" && Q !== null) {
          switch (Q.$$typeof) {
            case Yt:
              return Q.key === nt ? w(W, ce, Q, De) : null;
            case At:
              return Q.key === nt ? k(W, ce, Q, De) : null;
            case Ye: {
              var Xe = Q._payload, jt = Q._init;
              return $(W, ce, jt(Xe), De);
            }
          }
          if (Ot(Q) || gt(Q))
            return nt !== null ? null : z(W, ce, Q, De, null);
          Sm(W, Q);
        }
        return typeof Q == "function" && xm(W), null;
      }
      function Z(W, ce, Q, De, nt) {
        if (typeof De == "string" && De !== "" || typeof De == "number") {
          var Xe = W.get(Q) || null;
          return x(ce, Xe, "" + De, nt);
        }
        if (typeof De == "object" && De !== null) {
          switch (De.$$typeof) {
            case Yt: {
              var jt = W.get(De.key === null ? Q : De.key) || null;
              return w(ce, jt, De, nt);
            }
            case At: {
              var Qt = W.get(De.key === null ? Q : De.key) || null;
              return k(ce, Qt, De, nt);
            }
            case Ye:
              var ar = De._payload, Bn = De._init;
              return Z(W, ce, Q, Bn(ar), nt);
          }
          if (Ot(De) || gt(De)) {
            var Jr = W.get(Q) || null;
            return z(ce, Jr, De, nt, null);
          }
          Sm(ce, De);
        }
        return typeof De == "function" && xm(ce), null;
      }
      function ne(W, ce, Q) {
        {
          if (typeof W != "object" || W === null)
            return ce;
          switch (W.$$typeof) {
            case Yt:
            case At:
              v2(W, Q);
              var De = W.key;
              if (typeof De != "string")
                break;
              if (ce === null) {
                ce = /* @__PURE__ */ new Set(), ce.add(De);
                break;
              }
              if (!ce.has(De)) {
                ce.add(De);
                break;
              }
              v("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", De);
              break;
            case Ye:
              var nt = W._payload, Xe = W._init;
              ne(Xe(nt), ce, Q);
              break;
          }
        }
        return ce;
      }
      function se(W, ce, Q, De) {
        for (var nt = null, Xe = 0; Xe < Q.length; Xe++) {
          var jt = Q[Xe];
          nt = ne(jt, nt, W);
        }
        for (var Qt = null, ar = null, Bn = ce, Jr = 0, qn = 0, Wr = null; Bn !== null && qn < Q.length; qn++) {
          Bn.index > qn ? (Wr = Bn, Bn = null) : Wr = Bn.sibling;
          var pi = $(W, Bn, Q[qn], De);
          if (pi === null) {
            Bn === null && (Bn = Wr);
            break;
          }
          e && Bn && pi.alternate === null && t(W, Bn), Jr = d(pi, Jr, qn), ar === null ? Qt = pi : ar.sibling = pi, ar = pi, Bn = Wr;
        }
        if (qn === Q.length) {
          if (i(W, Bn), Ha()) {
            var Wa = qn;
            Ec(W, Wa);
          }
          return Qt;
        }
        if (Bn === null) {
          for (; qn < Q.length; qn++) {
            var rl = I(W, Q[qn], De);
            rl !== null && (Jr = d(rl, Jr, qn), ar === null ? Qt = rl : ar.sibling = rl, ar = rl);
          }
          if (Ha()) {
            var Mi = qn;
            Ec(W, Mi);
          }
          return Qt;
        }
        for (var _i = o(W, Bn); qn < Q.length; qn++) {
          var vi = Z(_i, W, qn, Q[qn], De);
          vi !== null && (e && vi.alternate !== null && _i.delete(vi.key === null ? qn : vi.key), Jr = d(vi, Jr, qn), ar === null ? Qt = vi : ar.sibling = vi, ar = vi);
        }
        if (e && _i.forEach(function(xd) {
          return t(W, xd);
        }), Ha()) {
          var Ou = qn;
          Ec(W, Ou);
        }
        return Qt;
      }
      function Qe(W, ce, Q, De) {
        var nt = gt(Q);
        if (typeof nt != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          Q[Symbol.toStringTag] === "Generator" && (B0 || v("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), B0 = !0), Q.entries === nt && (I0 || v("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), I0 = !0);
          var Xe = nt.call(Q);
          if (Xe)
            for (var jt = null, Qt = Xe.next(); !Qt.done; Qt = Xe.next()) {
              var ar = Qt.value;
              jt = ne(ar, jt, W);
            }
        }
        var Bn = nt.call(Q);
        if (Bn == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Jr = null, qn = null, Wr = ce, pi = 0, Wa = 0, rl = null, Mi = Bn.next(); Wr !== null && !Mi.done; Wa++, Mi = Bn.next()) {
          Wr.index > Wa ? (rl = Wr, Wr = null) : rl = Wr.sibling;
          var _i = $(W, Wr, Mi.value, De);
          if (_i === null) {
            Wr === null && (Wr = rl);
            break;
          }
          e && Wr && _i.alternate === null && t(W, Wr), pi = d(_i, pi, Wa), qn === null ? Jr = _i : qn.sibling = _i, qn = _i, Wr = rl;
        }
        if (Mi.done) {
          if (i(W, Wr), Ha()) {
            var vi = Wa;
            Ec(W, vi);
          }
          return Jr;
        }
        if (Wr === null) {
          for (; !Mi.done; Wa++, Mi = Bn.next()) {
            var Ou = I(W, Mi.value, De);
            Ou !== null && (pi = d(Ou, pi, Wa), qn === null ? Jr = Ou : qn.sibling = Ou, qn = Ou);
          }
          if (Ha()) {
            var xd = Wa;
            Ec(W, xd);
          }
          return Jr;
        }
        for (var bv = o(W, Wr); !Mi.done; Wa++, Mi = Bn.next()) {
          var Bo = Z(bv, W, Wa, Mi.value, De);
          Bo !== null && (e && Bo.alternate !== null && bv.delete(Bo.key === null ? Wa : Bo.key), pi = d(Bo, pi, Wa), qn === null ? Jr = Bo : qn.sibling = Bo, qn = Bo);
        }
        if (e && bv.forEach(function(__) {
          return t(W, __);
        }), Ha()) {
          var M_ = Wa;
          Ec(W, M_);
        }
        return Jr;
      }
      function St(W, ce, Q, De) {
        if (ce !== null && ce.tag === L) {
          i(W, ce.sibling);
          var nt = c(ce, Q);
          return nt.return = W, nt;
        }
        i(W, ce);
        var Xe = Vg(Q, W.mode, De);
        return Xe.return = W, Xe;
      }
      function dt(W, ce, Q, De) {
        for (var nt = Q.key, Xe = ce; Xe !== null; ) {
          if (Xe.key === nt) {
            var jt = Q.type;
            if (jt === yn) {
              if (Xe.tag === U) {
                i(W, Xe.sibling);
                var Qt = c(Xe, Q.props.children);
                return Qt.return = W, Qt._debugSource = Q._source, Qt._debugOwner = Q._owner, Qt;
              }
            } else if (Xe.elementType === jt || // Keep this check inline so it only runs on the false path:
            Ex(Xe, Q) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof jt == "object" && jt !== null && jt.$$typeof === Ye && h2(jt) === Xe.type) {
              i(W, Xe.sibling);
              var ar = c(Xe, Q.props);
              return ar.ref = Qp(W, Xe, Q), ar.return = W, ar._debugSource = Q._source, ar._debugOwner = Q._owner, ar;
            }
            i(W, Xe);
            break;
          } else
            t(W, Xe);
          Xe = Xe.sibling;
        }
        if (Q.type === yn) {
          var Bn = Es(Q.props.children, W.mode, De, Q.key);
          return Bn.return = W, Bn;
        } else {
          var Jr = $g(Q, W.mode, De);
          return Jr.ref = Qp(W, ce, Q), Jr.return = W, Jr;
        }
      }
      function Un(W, ce, Q, De) {
        for (var nt = Q.key, Xe = ce; Xe !== null; ) {
          if (Xe.key === nt)
            if (Xe.tag === D && Xe.stateNode.containerInfo === Q.containerInfo && Xe.stateNode.implementation === Q.implementation) {
              i(W, Xe.sibling);
              var jt = c(Xe, Q.children || []);
              return jt.return = W, jt;
            } else {
              i(W, Xe);
              break;
            }
          else
            t(W, Xe);
          Xe = Xe.sibling;
        }
        var Qt = Ig(Q, W.mode, De);
        return Qt.return = W, Qt;
      }
      function _n(W, ce, Q, De) {
        var nt = typeof Q == "object" && Q !== null && Q.type === yn && Q.key === null;
        if (nt && (Q = Q.props.children), typeof Q == "object" && Q !== null) {
          switch (Q.$$typeof) {
            case Yt:
              return g(dt(W, ce, Q, De));
            case At:
              return g(Un(W, ce, Q, De));
            case Ye:
              var Xe = Q._payload, jt = Q._init;
              return _n(W, ce, jt(Xe), De);
          }
          if (Ot(Q))
            return se(W, ce, Q, De);
          if (gt(Q))
            return Qe(W, ce, Q, De);
          Sm(W, Q);
        }
        return typeof Q == "string" && Q !== "" || typeof Q == "number" ? g(St(W, ce, "" + Q, De)) : (typeof Q == "function" && xm(W), i(W, ce));
      }
      return _n;
    }
    var nd = m2(!0), y2 = m2(!1);
    function rR(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var i = t.child, o = Ac(i, i.pendingProps);
        for (t.child = o, o.return = t; i.sibling !== null; )
          i = i.sibling, o = o.sibling = Ac(i, i.pendingProps), o.return = t;
        o.sibling = null;
      }
    }
    function aR(e, t) {
      for (var i = e.child; i !== null; )
        qM(i, t), i = i.sibling;
    }
    var Q0 = os(null), G0;
    G0 = {};
    var Em = null, rd = null, X0 = null, Cm = !1;
    function Tm() {
      Em = null, rd = null, X0 = null, Cm = !1;
    }
    function g2() {
      Cm = !0;
    }
    function S2() {
      Cm = !1;
    }
    function x2(e, t, i) {
      fi(Q0, t._currentValue, e), t._currentValue = i, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== G0 && v("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = G0;
    }
    function K0(e, t) {
      var i = Q0.current;
      ci(Q0, t), e._currentValue = i;
    }
    function Z0(e, t, i) {
      for (var o = e; o !== null; ) {
        var c = o.alternate;
        if (pu(o.childLanes, t) ? c !== null && !pu(c.childLanes, t) && (c.childLanes = tn(c.childLanes, t)) : (o.childLanes = tn(o.childLanes, t), c !== null && (c.childLanes = tn(c.childLanes, t))), o === i)
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
                var x = Zs(i), w = Ru(ur, x);
                w.tag = Rm;
                var k = o.updateQueue;
                if (k !== null) {
                  var z = k.shared, I = z.pending;
                  I === null ? w.next = w : (w.next = I.next, I.next = w), z.pending = w;
                }
              }
              o.lanes = tn(o.lanes, i);
              var $ = o.alternate;
              $ !== null && ($.lanes = tn($.lanes, i)), Z0(o.return, i, e), d.lanes = tn(d.lanes, i);
              break;
            }
            g = g.next;
          }
        } else if (o.tag === J)
          c = o.type === e.type ? null : o.child;
        else if (o.tag === le) {
          var Z = o.return;
          if (Z === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          Z.lanes = tn(Z.lanes, i);
          var ne = Z.alternate;
          ne !== null && (ne.lanes = tn(ne.lanes, i)), Z0(Z, i, e), c = o.sibling;
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
    function ad(e, t) {
      Em = e, rd = null, X0 = null;
      var i = e.dependencies;
      if (i !== null) {
        var o = i.firstContext;
        o !== null && (li(i.lanes, t) && sv(), i.firstContext = null);
      }
    }
    function la(e) {
      Cm && v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (X0 !== e) {
        var i = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (rd === null) {
          if (Em === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          rd = i, Em.dependencies = {
            lanes: Se,
            firstContext: i
          };
        } else
          rd = rd.next = i;
      }
      return t;
    }
    var bc = null;
    function J0(e) {
      bc === null ? bc = [e] : bc.push(e);
    }
    function oR() {
      if (bc !== null) {
        for (var e = 0; e < bc.length; e++) {
          var t = bc[e], i = t.interleaved;
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
        bc = null;
      }
    }
    function E2(e, t, i, o) {
      var c = t.interleaved;
      return c === null ? (i.next = i, J0(t)) : (i.next = c.next, c.next = i), t.interleaved = i, wm(e, o);
    }
    function uR(e, t, i, o) {
      var c = t.interleaved;
      c === null ? (i.next = i, J0(t)) : (i.next = c.next, c.next = i), t.interleaved = i;
    }
    function sR(e, t, i, o) {
      var c = t.interleaved;
      return c === null ? (i.next = i, J0(t)) : (i.next = c.next, c.next = i), t.interleaved = i, wm(e, o);
    }
    function Ii(e, t) {
      return wm(e, t);
    }
    var cR = wm;
    function wm(e, t) {
      e.lanes = tn(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = tn(i.lanes, t)), i === null && (e.flags & (Cr | ti)) !== mt && yx(e);
      for (var o = e, c = e.return; c !== null; )
        c.childLanes = tn(c.childLanes, t), i = c.alternate, i !== null ? i.childLanes = tn(i.childLanes, t) : (c.flags & (Cr | ti)) !== mt && yx(e), o = c, c = c.return;
      if (o.tag === R) {
        var d = o.stateNode;
        return d;
      } else
        return null;
    }
    var C2 = 0, T2 = 1, Rm = 2, e1 = 3, bm = !1, t1, Mm;
    t1 = !1, Mm = null;
    function n1(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: Se
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
    function Ru(e, t) {
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
    function fs(e, t, i) {
      var o = e.updateQueue;
      if (o === null)
        return null;
      var c = o.shared;
      if (Mm === c && !t1 && (v("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), t1 = !0), uM()) {
        var d = c.pending;
        return d === null ? t.next = t : (t.next = d.next, d.next = t), c.pending = t, cR(e, i);
      } else
        return sR(e, c, t, i);
    }
    function _m(e, t, i) {
      var o = t.updateQueue;
      if (o !== null) {
        var c = o.shared;
        if (op(i)) {
          var d = c.lanes;
          d = sp(d, e.pendingLanes);
          var g = tn(d, i);
          c.lanes = g, Df(e, g);
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
                Tr(!0);
                try {
                  g.call(d, o, c);
                } finally {
                  Tr(!1);
                }
              }
              S2();
            }
            return x;
          }
          return g;
        }
        case e1:
          e.flags = e.flags & ~na | vt;
        // Intentional fallthrough
        case C2: {
          var w = i.payload, k;
          if (typeof w == "function") {
            g2(), k = w.call(d, o, c);
            {
              if (e.mode & nr) {
                Tr(!0);
                try {
                  w.call(d, o, c);
                } finally {
                  Tr(!1);
                }
              }
              S2();
            }
          } else
            k = w;
          return k == null ? o : Ct({}, o, k);
        }
        case Rm:
          return bm = !0, o;
      }
      return o;
    }
    function km(e, t, i, o) {
      var c = e.updateQueue;
      bm = !1, Mm = c.shared;
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
        var Z = c.baseState, ne = Se, se = null, Qe = null, St = null, dt = d;
        do {
          var Un = dt.lane, _n = dt.eventTime;
          if (pu(o, Un)) {
            if (St !== null) {
              var ce = {
                eventTime: _n,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Hn,
                tag: dt.tag,
                payload: dt.payload,
                callback: dt.callback,
                next: null
              };
              St = St.next = ce;
            }
            Z = fR(e, c, dt, Z, t, i);
            var Q = dt.callback;
            if (Q !== null && // If the update was already committed, we should not queue its
            // callback again.
            dt.lane !== Hn) {
              e.flags |= sr;
              var De = c.effects;
              De === null ? c.effects = [dt] : De.push(dt);
            }
          } else {
            var W = {
              eventTime: _n,
              lane: Un,
              tag: dt.tag,
              payload: dt.payload,
              callback: dt.callback,
              next: null
            };
            St === null ? (Qe = St = W, se = Z) : St = St.next = W, ne = tn(ne, Un);
          }
          if (dt = dt.next, dt === null) {
            if (x = c.shared.pending, x === null)
              break;
            var nt = x, Xe = nt.next;
            nt.next = null, dt = Xe, c.lastBaseUpdate = nt, c.shared.pending = null;
          }
        } while (!0);
        St === null && (se = Z), c.baseState = se, c.firstBaseUpdate = Qe, c.lastBaseUpdate = St;
        var jt = c.shared.interleaved;
        if (jt !== null) {
          var Qt = jt;
          do
            ne = tn(ne, Qt.lane), Qt = Qt.next;
          while (Qt !== jt);
        } else d === null && (c.shared.lanes = Se);
        Ev(ne), e.lanes = ne, e.memoizedState = Z;
      }
      Mm = null;
    }
    function dR(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function R2() {
      bm = !1;
    }
    function Dm() {
      return bm;
    }
    function b2(e, t, i) {
      var o = t.effects;
      if (t.effects = null, o !== null)
        for (var c = 0; c < o.length; c++) {
          var d = o[c], g = d.callback;
          g !== null && (d.callback = null, dR(g, i));
        }
    }
    var Gp = {}, ds = os(Gp), Xp = os(Gp), Om = os(Gp);
    function zm(e) {
      if (e === Gp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function M2() {
      var e = zm(Om.current);
      return e;
    }
    function a1(e, t) {
      fi(Om, t, e), fi(Xp, e, e), fi(ds, Gp, e);
      var i = kT(t);
      ci(ds, e), fi(ds, i, e);
    }
    function id(e) {
      ci(ds, e), ci(Xp, e), ci(Om, e);
    }
    function i1() {
      var e = zm(ds.current);
      return e;
    }
    function _2(e) {
      zm(Om.current);
      var t = zm(ds.current), i = DT(t, e.type);
      t !== i && (fi(Xp, e, e), fi(ds, i, e));
    }
    function l1(e) {
      Xp.current === e && (ci(ds, e), ci(Xp, e));
    }
    var pR = 0, k2 = 1, D2 = 1, Kp = 2, eo = os(pR);
    function o1(e, t) {
      return (e & t) !== 0;
    }
    function ld(e) {
      return e & k2;
    }
    function u1(e, t) {
      return e & k2 | t;
    }
    function vR(e, t) {
      return e | t;
    }
    function ps(e, t) {
      fi(eo, t, e);
    }
    function od(e) {
      ci(eo, e);
    }
    function hR(e, t) {
      var i = e.memoizedState;
      return i !== null ? i.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Lm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === q) {
          var i = t.memoizedState;
          if (i !== null) {
            var o = i.dehydrated;
            if (o === null || WS(o) || b0(o))
              return t;
          }
        } else if (t.tag === Oe && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var c = (t.flags & vt) !== mt;
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
    var Bi = (
      /*   */
      0
    ), ma = (
      /* */
      1
    ), jo = (
      /*  */
      2
    ), ya = (
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
    var Je = s.ReactCurrentDispatcher, Zp = s.ReactCurrentBatchConfig, f1, ud;
    f1 = /* @__PURE__ */ new Set();
    var Mc = Se, rr = null, ga = null, Sa = null, Am = !1, Jp = !1, ev = 0, yR = 0, gR = 25, ve = null, Ml = null, vs = -1, d1 = !1;
    function Zn() {
      {
        var e = ve;
        Ml === null ? Ml = [e] : Ml.push(e);
      }
    }
    function je() {
      {
        var e = ve;
        Ml !== null && (vs++, Ml[vs] !== e && SR(e));
      }
    }
    function sd(e) {
      e != null && !Ot(e) && v("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", ve, typeof e);
    }
    function SR(e) {
      {
        var t = Dt(rr);
        if (!f1.has(t) && (f1.add(t), Ml !== null)) {
          for (var i = "", o = 30, c = 0; c <= vs; c++) {
            for (var d = Ml[c], g = c === vs ? e : d, x = c + 1 + ". " + d; x.length < o; )
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
    function di() {
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
    function cd(e, t, i, o, c, d) {
      Mc = d, rr = t, Ml = e !== null ? e._debugHookTypes : null, vs = -1, d1 = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = Se, e !== null && e.memoizedState !== null ? Je.current = Z2 : Ml !== null ? Je.current = K2 : Je.current = X2;
      var g = i(o, c);
      if (Jp) {
        var x = 0;
        do {
          if (Jp = !1, ev = 0, x >= gR)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          x += 1, d1 = !1, ga = null, Sa = null, t.updateQueue = null, vs = -1, Je.current = J2, g = i(o, c);
        } while (Jp);
      }
      Je.current = Wm, t._debugHookTypes = Ml;
      var w = ga !== null && ga.next !== null;
      if (Mc = Se, rr = null, ga = null, Sa = null, ve = null, Ml = null, vs = -1, e !== null && (e.flags & $r) !== (t.flags & $r) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & mn) !== yt && v("Internal React error: Expected static flag was missing. Please notify the React team."), Am = !1, w)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return g;
    }
    function fd() {
      var e = ev !== 0;
      return ev = 0, e;
    }
    function O2(e, t, i) {
      t.updateQueue = e.updateQueue, (t.mode & Vn) !== yt ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Js(e.lanes, i);
    }
    function z2() {
      if (Je.current = Wm, Am) {
        for (var e = rr.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Am = !1;
      }
      Mc = Se, rr = null, ga = null, Sa = null, Ml = null, vs = -1, ve = null, q2 = !1, Jp = !1, ev = 0;
    }
    function Fo() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Sa === null ? rr.memoizedState = Sa = e : Sa = Sa.next = e, Sa;
    }
    function _l() {
      var e;
      if (ga === null) {
        var t = rr.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = ga.next;
      var i;
      if (Sa === null ? i = rr.memoizedState : i = Sa.next, i !== null)
        Sa = i, i = Sa.next, ga = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        ga = e;
        var o = {
          memoizedState: ga.memoizedState,
          baseState: ga.baseState,
          baseQueue: ga.baseQueue,
          queue: ga.queue,
          next: null
        };
        Sa === null ? rr.memoizedState = Sa = o : Sa = Sa.next = o;
      }
      return Sa;
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
      var o = Fo(), c;
      i !== void 0 ? c = i(t) : c = t, o.memoizedState = o.baseState = c;
      var d = {
        pending: null,
        interleaved: null,
        lanes: Se,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: c
      };
      o.queue = d;
      var g = d.dispatch = TR.bind(null, rr, d);
      return [o.memoizedState, g];
    }
    function m1(e, t, i) {
      var o = _l(), c = o.queue;
      if (c === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      c.lastRenderedReducer = e;
      var d = ga, g = d.baseQueue, x = c.pending;
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
          if (pu(Mc, Qe)) {
            if (ne !== null) {
              var dt = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Hn,
                action: se.action,
                hasEagerState: se.hasEagerState,
                eagerState: se.eagerState,
                next: null
              };
              ne = ne.next = dt;
            }
            if (se.hasEagerState)
              I = se.eagerState;
            else {
              var Un = se.action;
              I = e(I, Un);
            }
          } else {
            var St = {
              lane: Qe,
              action: se.action,
              hasEagerState: se.hasEagerState,
              eagerState: se.eagerState,
              next: null
            };
            ne === null ? (Z = ne = St, $ = I) : ne = ne.next = St, rr.lanes = tn(rr.lanes, Qe), Ev(Qe);
          }
          se = se.next;
        } while (se !== null && se !== z);
        ne === null ? $ = I : ne.next = Z, Te(I, o.memoizedState) || sv(), o.memoizedState = I, o.baseState = $, o.baseQueue = ne, c.lastRenderedState = I;
      }
      var _n = c.interleaved;
      if (_n !== null) {
        var W = _n;
        do {
          var ce = W.lane;
          rr.lanes = tn(rr.lanes, ce), Ev(ce), W = W.next;
        } while (W !== _n);
      } else g === null && (c.lanes = Se);
      var Q = c.dispatch;
      return [o.memoizedState, Q];
    }
    function y1(e, t, i) {
      var o = _l(), c = o.queue;
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
        Te(x, o.memoizedState) || sv(), o.memoizedState = x, o.baseQueue === null && (o.baseState = x), c.lastRenderedState = x;
      }
      return [x, d];
    }
    function x4(e, t, i) {
    }
    function E4(e, t, i) {
    }
    function g1(e, t, i) {
      var o = rr, c = Fo(), d, g = Ha();
      if (g) {
        if (i === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        d = i(), ud || d !== i() && (v("The result of getServerSnapshot should be cached to avoid an infinite loop"), ud = !0);
      } else {
        if (d = t(), !ud) {
          var x = t();
          Te(d, x) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), ud = !0);
        }
        var w = dy();
        if (w === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        _f(w, Mc) || A2(o, t, d);
      }
      c.memoizedState = d;
      var k = {
        value: d,
        getSnapshot: t
      };
      return c.queue = k, Pm(U2.bind(null, o, k, e), [e]), o.flags |= ei, tv(ma | $a, N2.bind(null, o, k, d, t), void 0, null), d;
    }
    function Nm(e, t, i) {
      var o = rr, c = _l(), d = t();
      if (!ud) {
        var g = t();
        Te(d, g) || (v("The result of getSnapshot should be cached to avoid an infinite loop"), ud = !0);
      }
      var x = c.memoizedState, w = !Te(x, d);
      w && (c.memoizedState = d, sv());
      var k = c.queue;
      if (rv(U2.bind(null, o, k, e), [e]), k.getSnapshot !== t || w || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      Sa !== null && Sa.memoizedState.tag & ma) {
        o.flags |= ei, tv(ma | $a, N2.bind(null, o, k, d, t), void 0, null);
        var z = dy();
        if (z === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        _f(z, Mc) || A2(o, t, d);
      }
      return d;
    }
    function A2(e, t, i) {
      e.flags |= qu;
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
      var t = Ii(e, Ut);
      t !== null && Ta(t, e, Ut, ur);
    }
    function Um(e) {
      var t = Fo();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var i = {
        pending: null,
        interleaved: null,
        lanes: Se,
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
    function tv(e, t, i, o) {
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
      var t = Fo();
      {
        var i = {
          current: e
        };
        return t.memoizedState = i, i;
      }
    }
    function jm(e) {
      var t = _l();
      return t.memoizedState;
    }
    function nv(e, t, i, o) {
      var c = Fo(), d = o === void 0 ? null : o;
      rr.flags |= e, c.memoizedState = tv(ma | t, i, void 0, d);
    }
    function Fm(e, t, i, o) {
      var c = _l(), d = o === void 0 ? null : o, g = void 0;
      if (ga !== null) {
        var x = ga.memoizedState;
        if (g = x.destroy, d !== null) {
          var w = x.deps;
          if (p1(d, w)) {
            c.memoizedState = tv(t, i, g, d);
            return;
          }
        }
      }
      rr.flags |= e, c.memoizedState = tv(ma | t, i, g, d);
    }
    function Pm(e, t) {
      return (rr.mode & Vn) !== yt ? nv(hl | ei | ef, $a, e, t) : nv(ei | ef, $a, e, t);
    }
    function rv(e, t) {
      return Fm(ei, $a, e, t);
    }
    function C1(e, t) {
      return nv(Ln, jo, e, t);
    }
    function Hm(e, t) {
      return Fm(Ln, jo, e, t);
    }
    function T1(e, t) {
      var i = Ln;
      return i |= Vl, (rr.mode & Vn) !== yt && (i |= So), nv(i, ya, e, t);
    }
    function $m(e, t) {
      return Fm(Ln, ya, e, t);
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
      var o = i != null ? i.concat([e]) : null, c = Ln;
      return c |= Vl, (rr.mode & Vn) !== yt && (c |= So), nv(c, ya, P2.bind(null, t, e), o);
    }
    function Vm(e, t, i) {
      typeof t != "function" && v("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = i != null ? i.concat([e]) : null;
      return Fm(Ln, ya, P2.bind(null, t, e), o);
    }
    function xR(e, t) {
    }
    var Im = xR;
    function R1(e, t) {
      var i = Fo(), o = t === void 0 ? null : t;
      return i.memoizedState = [e, o], e;
    }
    function Bm(e, t) {
      var i = _l(), o = t === void 0 ? null : t, c = i.memoizedState;
      if (c !== null && o !== null) {
        var d = c[1];
        if (p1(o, d))
          return c[0];
      }
      return i.memoizedState = [e, o], e;
    }
    function b1(e, t) {
      var i = Fo(), o = t === void 0 ? null : t, c = e();
      return i.memoizedState = [c, o], c;
    }
    function qm(e, t) {
      var i = _l(), o = t === void 0 ? null : t, c = i.memoizedState;
      if (c !== null && o !== null) {
        var d = c[1];
        if (p1(o, d))
          return c[0];
      }
      var g = e();
      return i.memoizedState = [g, o], g;
    }
    function M1(e) {
      var t = Fo();
      return t.memoizedState = e, e;
    }
    function H2(e) {
      var t = _l(), i = ga, o = i.memoizedState;
      return V2(t, o, e);
    }
    function $2(e) {
      var t = _l();
      if (ga === null)
        return t.memoizedState = e, e;
      var i = ga.memoizedState;
      return V2(t, i, e);
    }
    function V2(e, t, i) {
      var o = !ip(Mc);
      if (o) {
        if (!Te(i, t)) {
          var c = up();
          rr.lanes = tn(rr.lanes, c), Ev(c), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, sv()), e.memoizedState = i, i;
    }
    function ER(e, t, i) {
      var o = Hi();
      Br(Ch(o, Sl)), e(!0);
      var c = Zp.transition;
      Zp.transition = {};
      var d = Zp.transition;
      Zp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (Br(o), Zp.transition = c, c === null && d._updatedFibers) {
          var g = d._updatedFibers.size;
          g > 10 && y("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), d._updatedFibers.clear();
        }
      }
    }
    function _1() {
      var e = Um(!1), t = e[0], i = e[1], o = ER.bind(null, i), c = Fo();
      return c.memoizedState = o, [t, o];
    }
    function I2() {
      var e = S1(), t = e[0], i = _l(), o = i.memoizedState;
      return [t, o];
    }
    function B2() {
      var e = x1(), t = e[0], i = _l(), o = i.memoizedState;
      return [t, o];
    }
    var q2 = !1;
    function CR() {
      return q2;
    }
    function k1() {
      var e = Fo(), t = dy(), i = t.identifierPrefix, o;
      if (Ha()) {
        var c = Pw();
        o = ":" + i + "R" + c;
        var d = ev++;
        d > 0 && (o += "H" + d.toString(32)), o += ":";
      } else {
        var g = yR++;
        o = ":" + i + "r" + g.toString(32) + ":";
      }
      return e.memoizedState = o, o;
    }
    function Ym() {
      var e = _l(), t = e.memoizedState;
      return t;
    }
    function TR(e, t, i) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = Ss(e), c = {
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
          Ta(d, e, o, g), Q2(d, t, o);
        }
      }
      G2(e, o);
    }
    function wR(e, t, i) {
      typeof arguments[3] == "function" && v("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = Ss(e), c = {
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
        if (e.lanes === Se && (d === null || d.lanes === Se)) {
          var g = t.lastRenderedReducer;
          if (g !== null) {
            var x;
            x = Je.current, Je.current = to;
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
          Ta(z, e, o, I), Q2(z, t, o);
        }
      }
      G2(e, o);
    }
    function Y2(e) {
      var t = e.alternate;
      return e === rr || t !== null && t === rr;
    }
    function W2(e, t) {
      Jp = Am = !0;
      var i = e.pending;
      i === null ? t.next = t : (t.next = i.next, i.next = t), e.pending = t;
    }
    function Q2(e, t, i) {
      if (op(i)) {
        var o = t.lanes;
        o = sp(o, e.pendingLanes);
        var c = tn(o, i);
        t.lanes = c, Df(e, c);
      }
    }
    function G2(e, t, i) {
      Is(e, t);
    }
    var Wm = {
      readContext: la,
      useCallback: di,
      useContext: di,
      useEffect: di,
      useImperativeHandle: di,
      useInsertionEffect: di,
      useLayoutEffect: di,
      useMemo: di,
      useReducer: di,
      useRef: di,
      useState: di,
      useDebugValue: di,
      useDeferredValue: di,
      useTransition: di,
      useMutableSource: di,
      useSyncExternalStore: di,
      useId: di,
      unstable_isNewReconciler: de
    }, X2 = null, K2 = null, Z2 = null, J2 = null, Po = null, to = null, Qm = null;
    {
      var D1 = function() {
        v("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, It = function() {
        v("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      X2 = {
        readContext: function(e) {
          return la(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", Zn(), sd(t), R1(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", Zn(), la(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", Zn(), sd(t), Pm(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", Zn(), sd(i), w1(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", Zn(), sd(t), C1(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", Zn(), sd(t), T1(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", Zn(), sd(t);
          var i = Je.current;
          Je.current = Po;
          try {
            return b1(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", Zn();
          var o = Je.current;
          Je.current = Po;
          try {
            return h1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", Zn(), E1(e);
        },
        useState: function(e) {
          ve = "useState", Zn();
          var t = Je.current;
          Je.current = Po;
          try {
            return Um(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", Zn(), void 0;
        },
        useDeferredValue: function(e) {
          return ve = "useDeferredValue", Zn(), M1(e);
        },
        useTransition: function() {
          return ve = "useTransition", Zn(), _1();
        },
        useMutableSource: function(e, t, i) {
          return ve = "useMutableSource", Zn(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return ve = "useSyncExternalStore", Zn(), g1(e, t, i);
        },
        useId: function() {
          return ve = "useId", Zn(), k1();
        },
        unstable_isNewReconciler: de
      }, K2 = {
        readContext: function(e) {
          return la(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", je(), R1(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", je(), la(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", je(), Pm(e, t);
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
          Je.current = Po;
          try {
            return b1(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", je();
          var o = Je.current;
          Je.current = Po;
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
          Je.current = Po;
          try {
            return Um(e);
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
          return la(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", je(), Bm(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", je(), la(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", je(), rv(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", je(), Vm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", je(), Hm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", je(), $m(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", je();
          var i = Je.current;
          Je.current = to;
          try {
            return qm(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", je();
          var o = Je.current;
          Je.current = to;
          try {
            return m1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", je(), jm();
        },
        useState: function(e) {
          ve = "useState", je();
          var t = Je.current;
          Je.current = to;
          try {
            return S1(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", je(), Im();
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
          return ve = "useSyncExternalStore", je(), Nm(e, t);
        },
        useId: function() {
          return ve = "useId", je(), Ym();
        },
        unstable_isNewReconciler: de
      }, J2 = {
        readContext: function(e) {
          return la(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", je(), Bm(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", je(), la(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", je(), rv(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", je(), Vm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", je(), Hm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", je(), $m(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", je();
          var i = Je.current;
          Je.current = Qm;
          try {
            return qm(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", je();
          var o = Je.current;
          Je.current = Qm;
          try {
            return y1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", je(), jm();
        },
        useState: function(e) {
          ve = "useState", je();
          var t = Je.current;
          Je.current = Qm;
          try {
            return x1(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", je(), Im();
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
          return ve = "useSyncExternalStore", je(), Nm(e, t);
        },
        useId: function() {
          return ve = "useId", je(), Ym();
        },
        unstable_isNewReconciler: de
      }, Po = {
        readContext: function(e) {
          return D1(), la(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", It(), Zn(), R1(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", It(), Zn(), la(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", It(), Zn(), Pm(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", It(), Zn(), w1(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", It(), Zn(), C1(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", It(), Zn(), T1(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", It(), Zn();
          var i = Je.current;
          Je.current = Po;
          try {
            return b1(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", It(), Zn();
          var o = Je.current;
          Je.current = Po;
          try {
            return h1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", It(), Zn(), E1(e);
        },
        useState: function(e) {
          ve = "useState", It(), Zn();
          var t = Je.current;
          Je.current = Po;
          try {
            return Um(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", It(), Zn(), void 0;
        },
        useDeferredValue: function(e) {
          return ve = "useDeferredValue", It(), Zn(), M1(e);
        },
        useTransition: function() {
          return ve = "useTransition", It(), Zn(), _1();
        },
        useMutableSource: function(e, t, i) {
          return ve = "useMutableSource", It(), Zn(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return ve = "useSyncExternalStore", It(), Zn(), g1(e, t, i);
        },
        useId: function() {
          return ve = "useId", It(), Zn(), k1();
        },
        unstable_isNewReconciler: de
      }, to = {
        readContext: function(e) {
          return D1(), la(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", It(), je(), Bm(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", It(), je(), la(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", It(), je(), rv(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", It(), je(), Vm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", It(), je(), Hm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", It(), je(), $m(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", It(), je();
          var i = Je.current;
          Je.current = to;
          try {
            return qm(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", It(), je();
          var o = Je.current;
          Je.current = to;
          try {
            return m1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", It(), je(), jm();
        },
        useState: function(e) {
          ve = "useState", It(), je();
          var t = Je.current;
          Je.current = to;
          try {
            return S1(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", It(), je(), Im();
        },
        useDeferredValue: function(e) {
          return ve = "useDeferredValue", It(), je(), H2(e);
        },
        useTransition: function() {
          return ve = "useTransition", It(), je(), I2();
        },
        useMutableSource: function(e, t, i) {
          return ve = "useMutableSource", It(), je(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return ve = "useSyncExternalStore", It(), je(), Nm(e, t);
        },
        useId: function() {
          return ve = "useId", It(), je(), Ym();
        },
        unstable_isNewReconciler: de
      }, Qm = {
        readContext: function(e) {
          return D1(), la(e);
        },
        useCallback: function(e, t) {
          return ve = "useCallback", It(), je(), Bm(e, t);
        },
        useContext: function(e) {
          return ve = "useContext", It(), je(), la(e);
        },
        useEffect: function(e, t) {
          return ve = "useEffect", It(), je(), rv(e, t);
        },
        useImperativeHandle: function(e, t, i) {
          return ve = "useImperativeHandle", It(), je(), Vm(e, t, i);
        },
        useInsertionEffect: function(e, t) {
          return ve = "useInsertionEffect", It(), je(), Hm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ve = "useLayoutEffect", It(), je(), $m(e, t);
        },
        useMemo: function(e, t) {
          ve = "useMemo", It(), je();
          var i = Je.current;
          Je.current = to;
          try {
            return qm(e, t);
          } finally {
            Je.current = i;
          }
        },
        useReducer: function(e, t, i) {
          ve = "useReducer", It(), je();
          var o = Je.current;
          Je.current = to;
          try {
            return y1(e, t, i);
          } finally {
            Je.current = o;
          }
        },
        useRef: function(e) {
          return ve = "useRef", It(), je(), jm();
        },
        useState: function(e) {
          ve = "useState", It(), je();
          var t = Je.current;
          Je.current = to;
          try {
            return x1(e);
          } finally {
            Je.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ve = "useDebugValue", It(), je(), Im();
        },
        useDeferredValue: function(e) {
          return ve = "useDeferredValue", It(), je(), $2(e);
        },
        useTransition: function() {
          return ve = "useTransition", It(), je(), B2();
        },
        useMutableSource: function(e, t, i) {
          return ve = "useMutableSource", It(), je(), void 0;
        },
        useSyncExternalStore: function(e, t, i) {
          return ve = "useSyncExternalStore", It(), je(), Nm(e, t);
        },
        useId: function() {
          return ve = "useId", It(), je(), Ym();
        },
        unstable_isNewReconciler: de
      };
    }
    var hs = l.unstable_now, e3 = 0, Gm = -1, av = -1, Xm = -1, O1 = !1, Km = !1;
    function t3() {
      return O1;
    }
    function RR() {
      Km = !0;
    }
    function bR() {
      O1 = !1, Km = !1;
    }
    function MR() {
      O1 = Km, Km = !1;
    }
    function n3() {
      return e3;
    }
    function r3() {
      e3 = hs();
    }
    function z1(e) {
      av = hs(), e.actualStartTime < 0 && (e.actualStartTime = hs());
    }
    function a3(e) {
      av = -1;
    }
    function Zm(e, t) {
      if (av >= 0) {
        var i = hs() - av;
        e.actualDuration += i, t && (e.selfBaseDuration = i), av = -1;
      }
    }
    function Ho(e) {
      if (Gm >= 0) {
        var t = hs() - Gm;
        Gm = -1;
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
      if (Xm >= 0) {
        var t = hs() - Xm;
        Xm = -1;
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
    function $o() {
      Gm = hs();
    }
    function A1() {
      Xm = hs();
    }
    function N1(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function no(e, t) {
      if (e && e.defaultProps) {
        var i = Ct({}, t), o = e.defaultProps;
        for (var c in o)
          i[c] === void 0 && (i[c] = o[c]);
        return i;
      }
      return t;
    }
    var U1 = {}, j1, F1, P1, H1, $1, i3, Jm, V1, I1, B1, iv;
    {
      j1 = /* @__PURE__ */ new Set(), F1 = /* @__PURE__ */ new Set(), P1 = /* @__PURE__ */ new Set(), H1 = /* @__PURE__ */ new Set(), V1 = /* @__PURE__ */ new Set(), $1 = /* @__PURE__ */ new Set(), I1 = /* @__PURE__ */ new Set(), B1 = /* @__PURE__ */ new Set(), iv = /* @__PURE__ */ new Set();
      var l3 = /* @__PURE__ */ new Set();
      Jm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var i = t + "_" + e;
          l3.has(i) || (l3.add(i), v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, i3 = function(e, t) {
        if (t === void 0) {
          var i = pn(e) || "Component";
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
          Tr(!0);
          try {
            d = i(o, c);
          } finally {
            Tr(!1);
          }
        }
        i3(t, d);
      }
      var g = d == null ? c : Ct({}, c, d);
      if (e.memoizedState = g, e.lanes === Se) {
        var x = e.updateQueue;
        x.baseState = g;
      }
    }
    var Y1 = {
      isMounted: lh,
      enqueueSetState: function(e, t, i) {
        var o = Bu(e), c = bi(), d = Ss(o), g = Ru(c, d);
        g.payload = t, i != null && (Jm(i, "setState"), g.callback = i);
        var x = fs(o, g, d);
        x !== null && (Ta(x, o, d, c), _m(x, o, d)), Is(o, d);
      },
      enqueueReplaceState: function(e, t, i) {
        var o = Bu(e), c = bi(), d = Ss(o), g = Ru(c, d);
        g.tag = T2, g.payload = t, i != null && (Jm(i, "replaceState"), g.callback = i);
        var x = fs(o, g, d);
        x !== null && (Ta(x, o, d, c), _m(x, o, d)), Is(o, d);
      },
      enqueueForceUpdate: function(e, t) {
        var i = Bu(e), o = bi(), c = Ss(i), d = Ru(o, c);
        d.tag = Rm, t != null && (Jm(t, "forceUpdate"), d.callback = t);
        var g = fs(i, d, c);
        g !== null && (Ta(g, i, c, o), _m(g, i, c)), uf(i, c);
      }
    };
    function o3(e, t, i, o, c, d, g) {
      var x = e.stateNode;
      if (typeof x.shouldComponentUpdate == "function") {
        var w = x.shouldComponentUpdate(o, d, g);
        {
          if (e.mode & nr) {
            Tr(!0);
            try {
              w = x.shouldComponentUpdate(o, d, g);
            } finally {
              Tr(!1);
            }
          }
          w === void 0 && v("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", pn(t) || "Component");
        }
        return w;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !lt(i, o) || !lt(c, d) : !0;
    }
    function _R(e, t, i) {
      var o = e.stateNode;
      {
        var c = pn(t) || "Component", d = o.render;
        d || (t.prototype && typeof t.prototype.render == "function" ? v("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", c) : v("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", c)), o.getInitialState && !o.getInitialState.isReactClassApproved && !o.state && v("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", c), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && v("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", c), o.propTypes && v("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", c), o.contextType && v("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", c), t.childContextTypes && !iv.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & nr) === yt && (iv.add(t), v(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), t.contextTypes && !iv.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & nr) === yt && (iv.add(t), v(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, c)), o.contextTypes && v("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", c), t.contextType && t.contextTypes && !I1.has(t) && (I1.add(t), v("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", c)), typeof o.componentShouldUpdate == "function" && v("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", c), t.prototype && t.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && v("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", pn(t) || "A pure component"), typeof o.componentDidUnmount == "function" && v("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", c), typeof o.componentDidReceiveProps == "function" && v("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", c), typeof o.componentWillRecieveProps == "function" && v("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", c), typeof o.UNSAFE_componentWillRecieveProps == "function" && v("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", c);
        var g = o.props !== i;
        o.props !== void 0 && g && v("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", c, c), o.defaultProps && v("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", c, c), typeof o.getSnapshotBeforeUpdate == "function" && typeof o.componentDidUpdate != "function" && !P1.has(t) && (P1.add(t), v("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", pn(t))), typeof o.getDerivedStateFromProps == "function" && v("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof o.getDerivedStateFromError == "function" && v("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", c), typeof t.getSnapshotBeforeUpdate == "function" && v("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", c);
        var x = o.state;
        x && (typeof x != "object" || Ot(x)) && v("%s.state: must be set to an object or null", c), typeof o.getChildContext == "function" && typeof t.childContextTypes != "object" && v("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", c);
      }
    }
    function u3(e, t) {
      t.updater = Y1, e.stateNode = t, Jo(t, e), t._reactInternalInstance = U1;
    }
    function s3(e, t, i) {
      var o = !1, c = tl, d = tl, g = t.contextType;
      if ("contextType" in t) {
        var x = (
          // Allow null for conditional declaration
          g === null || g !== void 0 && g.$$typeof === A && g._context === void 0
        );
        if (!x && !B1.has(t)) {
          B1.add(t);
          var w = "";
          g === void 0 ? w = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof g != "object" ? w = " However, it is set to a " + typeof g + "." : g.$$typeof === ft ? w = " Did you accidentally pass the Context.Provider instead?" : g._context !== void 0 ? w = " Did you accidentally pass the Context.Consumer instead?" : w = " However, it is set to an object with keys {" + Object.keys(g).join(", ") + "}.", v("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", pn(t) || "Component", w);
        }
      }
      if (typeof g == "object" && g !== null)
        d = la(g);
      else {
        c = Kf(e, t, !0);
        var k = t.contextTypes;
        o = k != null, d = o ? Zf(e, c) : tl;
      }
      var z = new t(i, d);
      if (e.mode & nr) {
        Tr(!0);
        try {
          z = new t(i, d);
        } finally {
          Tr(!1);
        }
      }
      var I = e.memoizedState = z.state !== null && z.state !== void 0 ? z.state : null;
      u3(e, z);
      {
        if (typeof t.getDerivedStateFromProps == "function" && I === null) {
          var $ = pn(t) || "Component";
          F1.has($) || (F1.add($), v("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", $, z.state === null ? "null" : "undefined", $));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof z.getSnapshotBeforeUpdate == "function") {
          var Z = null, ne = null, se = null;
          if (typeof z.componentWillMount == "function" && z.componentWillMount.__suppressDeprecationWarning !== !0 ? Z = "componentWillMount" : typeof z.UNSAFE_componentWillMount == "function" && (Z = "UNSAFE_componentWillMount"), typeof z.componentWillReceiveProps == "function" && z.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? ne = "componentWillReceiveProps" : typeof z.UNSAFE_componentWillReceiveProps == "function" && (ne = "UNSAFE_componentWillReceiveProps"), typeof z.componentWillUpdate == "function" && z.componentWillUpdate.__suppressDeprecationWarning !== !0 ? se = "componentWillUpdate" : typeof z.UNSAFE_componentWillUpdate == "function" && (se = "UNSAFE_componentWillUpdate"), Z !== null || ne !== null || se !== null) {
            var Qe = pn(t) || "Component", St = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            H1.has(Qe) || (H1.add(Qe), v(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, Qe, St, Z !== null ? `
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
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), i !== t.state && (v("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Dt(e) || "Component"), Y1.enqueueReplaceState(t, t.state, null));
    }
    function c3(e, t, i, o) {
      var c = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(i, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(i, o), t.state !== c) {
        {
          var d = Dt(e) || "Component";
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
        c.context = la(d);
      else {
        var g = Kf(e, t, !0);
        c.context = Zf(e, g);
      }
      {
        if (c.state === i) {
          var x = pn(t) || "Component";
          V1.has(x) || (V1.add(x), v("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", x));
        }
        e.mode & nr && Jl.recordLegacyContextWarning(e, c), Jl.recordUnsafeLifecycleWarnings(e, c);
      }
      c.state = e.memoizedState;
      var w = t.getDerivedStateFromProps;
      if (typeof w == "function" && (q1(e, t, w, i), c.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof c.getSnapshotBeforeUpdate != "function" && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (kR(e, c), km(e, i, c, o), c.state = e.memoizedState), typeof c.componentDidMount == "function") {
        var k = Ln;
        k |= Vl, (e.mode & Vn) !== yt && (k |= So), e.flags |= k;
      }
    }
    function DR(e, t, i, o) {
      var c = e.stateNode, d = e.memoizedProps;
      c.props = d;
      var g = c.context, x = t.contextType, w = tl;
      if (typeof x == "object" && x !== null)
        w = la(x);
      else {
        var k = Kf(e, t, !0);
        w = Zf(e, k);
      }
      var z = t.getDerivedStateFromProps, I = typeof z == "function" || typeof c.getSnapshotBeforeUpdate == "function";
      !I && (typeof c.UNSAFE_componentWillReceiveProps == "function" || typeof c.componentWillReceiveProps == "function") && (d !== i || g !== w) && c3(e, c, i, w), R2();
      var $ = e.memoizedState, Z = c.state = $;
      if (km(e, i, c, o), Z = e.memoizedState, d === i && $ === Z && !cm() && !Dm()) {
        if (typeof c.componentDidMount == "function") {
          var ne = Ln;
          ne |= Vl, (e.mode & Vn) !== yt && (ne |= So), e.flags |= ne;
        }
        return !1;
      }
      typeof z == "function" && (q1(e, t, z, i), Z = e.memoizedState);
      var se = Dm() || o3(e, t, d, i, $, Z, w);
      if (se) {
        if (!I && (typeof c.UNSAFE_componentWillMount == "function" || typeof c.componentWillMount == "function") && (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function") {
          var Qe = Ln;
          Qe |= Vl, (e.mode & Vn) !== yt && (Qe |= So), e.flags |= Qe;
        }
      } else {
        if (typeof c.componentDidMount == "function") {
          var St = Ln;
          St |= Vl, (e.mode & Vn) !== yt && (St |= So), e.flags |= St;
        }
        e.memoizedProps = i, e.memoizedState = Z;
      }
      return c.props = i, c.state = Z, c.context = w, se;
    }
    function OR(e, t, i, o, c) {
      var d = t.stateNode;
      w2(e, t);
      var g = t.memoizedProps, x = t.type === t.elementType ? g : no(t.type, g);
      d.props = x;
      var w = t.pendingProps, k = d.context, z = i.contextType, I = tl;
      if (typeof z == "object" && z !== null)
        I = la(z);
      else {
        var $ = Kf(t, i, !0);
        I = Zf(t, $);
      }
      var Z = i.getDerivedStateFromProps, ne = typeof Z == "function" || typeof d.getSnapshotBeforeUpdate == "function";
      !ne && (typeof d.UNSAFE_componentWillReceiveProps == "function" || typeof d.componentWillReceiveProps == "function") && (g !== w || k !== I) && c3(t, d, o, I), R2();
      var se = t.memoizedState, Qe = d.state = se;
      if (km(t, o, d, c), Qe = t.memoizedState, g === w && se === Qe && !cm() && !Dm() && !Le)
        return typeof d.componentDidUpdate == "function" && (g !== e.memoizedProps || se !== e.memoizedState) && (t.flags |= Ln), typeof d.getSnapshotBeforeUpdate == "function" && (g !== e.memoizedProps || se !== e.memoizedState) && (t.flags |= Xr), !1;
      typeof Z == "function" && (q1(t, i, Z, o), Qe = t.memoizedState);
      var St = Dm() || o3(t, i, x, o, se, Qe, I) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Le;
      return St ? (!ne && (typeof d.UNSAFE_componentWillUpdate == "function" || typeof d.componentWillUpdate == "function") && (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, Qe, I), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(o, Qe, I)), typeof d.componentDidUpdate == "function" && (t.flags |= Ln), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= Xr)) : (typeof d.componentDidUpdate == "function" && (g !== e.memoizedProps || se !== e.memoizedState) && (t.flags |= Ln), typeof d.getSnapshotBeforeUpdate == "function" && (g !== e.memoizedProps || se !== e.memoizedState) && (t.flags |= Xr), t.memoizedProps = o, t.memoizedState = Qe), d.props = o, d.state = Qe, d.context = I, St;
    }
    function _c(e, t) {
      return {
        value: e,
        source: t,
        stack: Aa(t),
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
        var x = c ? Dt(c) : null, w = x ? "The above error occurred in the <" + x + "> component:" : "The above error occurred in one of your React components:", k;
        if (e.tag === R)
          k = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var z = Dt(e) || "Anonymous";
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
      var o = Ru(ur, i);
      o.tag = e1, o.payload = {
        element: null
      };
      var c = t.value;
      return o.callback = function() {
        RM(c), G1(e, t);
      }, o;
    }
    function X1(e, t, i) {
      var o = Ru(ur, i);
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
        }), typeof c != "function" && (li(e.lanes, Ut) || v("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Dt(e) || "Unknown"));
      }), o;
    }
    function d3(e, t, i) {
      var o = e.pingCache, c;
      if (o === null ? (o = e.pingCache = new LR(), c = /* @__PURE__ */ new Set(), o.set(t, c)) : (c = o.get(t), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(t, c))), !c.has(i)) {
        c.add(i);
        var d = bM.bind(null, e, t, i);
        ai && Cv(e, i), t.then(d, d);
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
      if ((e.mode & mn) === yt && (i === E || i === B || i === pe)) {
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
      if ((e.mode & mn) === yt) {
        if (e === t)
          e.flags |= na;
        else {
          if (e.flags |= vt, i.flags |= Jc, i.flags &= -52805, i.tag === T) {
            var d = i.alternate;
            if (d === null)
              i.tag = he;
            else {
              var g = Ru(ur, Ut);
              g.tag = Rm, fs(i, g, Ut);
            }
          }
          i.lanes = tn(i.lanes, Ut);
        }
        return e;
      }
      return e.flags |= na, e.lanes = c, e;
    }
    function UR(e, t, i, o, c) {
      if (i.flags |= js, ai && Cv(e, c), o !== null && typeof o == "object" && typeof o.then == "function") {
        var d = o;
        NR(i), Ha() && i.mode & mn && i2();
        var g = p3(t);
        if (g !== null) {
          g.flags &= ~ka, v3(g, t, i, e, c), g.mode & mn && d3(e, d, c), AR(g, e, d);
          return;
        } else {
          if (!vh(c)) {
            d3(e, d, c), kg();
            return;
          }
          var x = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          o = x;
        }
      } else if (Ha() && i.mode & mn) {
        i2();
        var w = p3(t);
        if (w !== null) {
          (w.flags & na) === mt && (w.flags |= ka), v3(w, t, i, e, c), V0(_c(o, i));
          return;
        }
      }
      o = _c(o, i), hM(o);
      var k = t;
      do {
        switch (k.tag) {
          case R: {
            var z = o;
            k.flags |= na;
            var I = Zs(c);
            k.lanes = tn(k.lanes, I);
            var $ = f3(k, z, I);
            r1(k, $);
            return;
          }
          case T:
            var Z = o, ne = k.type, se = k.stateNode;
            if ((k.flags & vt) === mt && (typeof ne.getDerivedStateFromError == "function" || se !== null && typeof se.componentDidCatch == "function" && !px(se))) {
              k.flags |= na;
              var Qe = Zs(c);
              k.lanes = tn(k.lanes, Qe);
              var St = X1(k, Z, Qe);
              r1(k, St);
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
    var lv = s.ReactCurrentOwner, ro = !1, K1, ov, Z1, J1, eg, kc, tg, ey, uv;
    K1 = {}, ov = {}, Z1 = {}, J1 = {}, eg = {}, kc = !1, tg = {}, ey = {}, uv = {};
    function wi(e, t, i, o) {
      e === null ? t.child = y2(t, null, i, o) : t.child = nd(t, e.child, i, o);
    }
    function FR(e, t, i, o) {
      t.child = nd(t, e.child, null, o), t.child = nd(t, null, i, o);
    }
    function h3(e, t, i, o, c) {
      if (t.type !== t.elementType) {
        var d = i.propTypes;
        d && Kl(
          d,
          o,
          // Resolved props
          "prop",
          pn(i)
        );
      }
      var g = i.render, x = t.ref, w, k;
      ad(t, c), xi(t);
      {
        if (lv.current = t, cn(!0), w = cd(e, t, g, o, x, c), k = fd(), t.mode & nr) {
          Tr(!0);
          try {
            w = cd(e, t, g, o, x, c), k = fd();
          } finally {
            Tr(!1);
          }
        }
        cn(!1);
      }
      return Ei(), e !== null && !ro ? (O2(e, t, c), bu(e, t, c)) : (Ha() && k && U0(t), t.flags |= Xi, wi(e, t, w, c), t.child);
    }
    function m3(e, t, i, o, c) {
      if (e === null) {
        var d = i.type;
        if (IM(d) && i.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        i.defaultProps === void 0) {
          var g = d;
          return g = Sd(d), t.tag = pe, t.type = g, ag(t, d), y3(e, t, g, o, c);
        }
        {
          var x = d.propTypes;
          if (x && Kl(
            x,
            o,
            // Resolved props
            "prop",
            pn(d)
          ), i.defaultProps !== void 0) {
            var w = pn(d) || "Unknown";
            uv[w] || (v("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", w), uv[w] = !0);
          }
        }
        var k = Hg(i.type, null, o, t, t.mode, c);
        return k.ref = t.ref, k.return = t, t.child = k, k;
      }
      {
        var z = i.type, I = z.propTypes;
        I && Kl(
          I,
          o,
          // Resolved props
          "prop",
          pn(z)
        );
      }
      var $ = e.child, Z = cg(e, c);
      if (!Z) {
        var ne = $.memoizedProps, se = i.compare;
        if (se = se !== null ? se : lt, se(ne, o) && e.ref === t.ref)
          return bu(e, t, c);
      }
      t.flags |= Xi;
      var Qe = Ac($, o);
      return Qe.ref = t.ref, Qe.return = t, t.child = Qe, Qe;
    }
    function y3(e, t, i, o, c) {
      if (t.type !== t.elementType) {
        var d = t.elementType;
        if (d.$$typeof === Ye) {
          var g = d, x = g._payload, w = g._init;
          try {
            d = w(x);
          } catch {
            d = null;
          }
          var k = d && d.propTypes;
          k && Kl(
            k,
            o,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            pn(d)
          );
        }
      }
      if (e !== null) {
        var z = e.memoizedProps;
        if (lt(z, o) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (ro = !1, t.pendingProps = o = z, cg(e, c))
            (e.flags & Jc) !== mt && (ro = !0);
          else return t.lanes = e.lanes, bu(e, t, c);
      }
      return ng(e, t, i, o, c);
    }
    function g3(e, t, i) {
      var o = t.pendingProps, c = o.children, d = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden" || ie)
        if ((t.mode & mn) === yt) {
          var g = {
            baseLanes: Se,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = g, py(t, i);
        } else if (li(i, ii)) {
          var I = {
            baseLanes: Se,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = I;
          var $ = d !== null ? d.baseLanes : i;
          py(t, $);
        } else {
          var x = null, w;
          if (d !== null) {
            var k = d.baseLanes;
            w = tn(k, i);
          } else
            w = i;
          t.lanes = t.childLanes = ii;
          var z = {
            baseLanes: w,
            cachePool: x,
            transitions: null
          };
          return t.memoizedState = z, t.updateQueue = null, py(t, w), null;
        }
      else {
        var Z;
        d !== null ? (Z = tn(d.baseLanes, i), t.memoizedState = null) : Z = i, py(t, Z);
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
        t.flags |= Ln;
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
      (e === null && i !== null || e !== null && e.ref !== i) && (t.flags |= br, t.flags |= Yu);
    }
    function ng(e, t, i, o, c) {
      if (t.type !== t.elementType) {
        var d = i.propTypes;
        d && Kl(
          d,
          o,
          // Resolved props
          "prop",
          pn(i)
        );
      }
      var g;
      {
        var x = Kf(t, i, !0);
        g = Zf(t, x);
      }
      var w, k;
      ad(t, c), xi(t);
      {
        if (lv.current = t, cn(!0), w = cd(e, t, i, o, g, c), k = fd(), t.mode & nr) {
          Tr(!0);
          try {
            w = cd(e, t, i, o, g, c), k = fd();
          } finally {
            Tr(!1);
          }
        }
        cn(!1);
      }
      return Ei(), e !== null && !ro ? (O2(e, t, c), bu(e, t, c)) : (Ha() && k && U0(t), t.flags |= Xi, wi(e, t, w, c), t.child);
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
            t.flags |= vt, t.flags |= na;
            var k = new Error("Simulated error coming from DevTools"), z = Zs(c);
            t.lanes = tn(t.lanes, z);
            var I = X1(t, _c(k, t), z);
            r1(t, I);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var $ = i.propTypes;
          $ && Kl(
            $,
            o,
            // Resolved props
            "prop",
            pn(i)
          );
        }
      }
      var Z;
      Uo(i) ? (Z = !0, dm(t)) : Z = !1, ad(t, c);
      var ne = t.stateNode, se;
      ne === null ? (ny(e, t), s3(t, i, o), W1(t, i, o, c), se = !0) : e === null ? se = DR(t, i, o, c) : se = OR(e, t, i, o, c);
      var Qe = rg(e, t, i, se, Z, c);
      {
        var St = t.stateNode;
        se && St.props !== o && (kc || v("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Dt(t) || "a component"), kc = !0);
      }
      return Qe;
    }
    function rg(e, t, i, o, c, d) {
      S3(e, t);
      var g = (t.flags & vt) !== mt;
      if (!o && !g)
        return c && t2(t, i, !1), bu(e, t, d);
      var x = t.stateNode;
      lv.current = t;
      var w;
      if (g && typeof i.getDerivedStateFromError != "function")
        w = null, a3();
      else {
        xi(t);
        {
          if (cn(!0), w = x.render(), t.mode & nr) {
            Tr(!0);
            try {
              x.render();
            } finally {
              Tr(!1);
            }
          }
          cn(!1);
        }
        Ei();
      }
      return t.flags |= Xi, e !== null && g ? FR(e, t, w, d) : wi(e, t, w, d), t.memoizedState = x.state, c && t2(t, i, !0), t.child;
    }
    function E3(e) {
      var t = e.stateNode;
      t.pendingContext ? JS(e, t.pendingContext, t.pendingContext !== t.context) : t.context && JS(e, t.context, !1), a1(e, t.containerInfo);
    }
    function VR(e, t, i) {
      if (E3(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var o = t.pendingProps, c = t.memoizedState, d = c.element;
      w2(e, t), km(t, o, null, i);
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
        if (k.baseState = w, t.memoizedState = w, t.flags & ka) {
          var z = _c(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return C3(e, t, x, i, z);
        } else if (x !== d) {
          var I = _c(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return C3(e, t, x, i, I);
        } else {
          qw(t);
          var $ = y2(t, null, x, i);
          t.child = $;
          for (var Z = $; Z; )
            Z.flags = Z.flags & ~Cr | ti, Z = Z.sibling;
        }
      } else {
        if (td(), x === d)
          return bu(e, t, i);
        wi(e, t, x, i);
      }
      return t.child;
    }
    function C3(e, t, i, o, c) {
      return td(), V0(c), t.flags |= ka, wi(e, t, i, o), t.child;
    }
    function IR(e, t, i) {
      _2(t), e === null && $0(t);
      var o = t.type, c = t.pendingProps, d = e !== null ? e.memoizedProps : null, g = c.children, x = C0(o, c);
      return x ? g = null : d !== null && C0(o, d) && (t.flags |= Ai), S3(e, t), wi(e, t, g, i), t.child;
    }
    function BR(e, t) {
      return e === null && $0(t), null;
    }
    function qR(e, t, i, o) {
      ny(e, t);
      var c = t.pendingProps, d = i, g = d._payload, x = d._init, w = x(g);
      t.type = w;
      var k = t.tag = BM(w), z = no(w, c), I;
      switch (k) {
        case E:
          return ag(t, w), t.type = w = Sd(w), I = ng(null, t, w, z, o), I;
        case T:
          return t.type = w = Ag(w), I = x3(null, t, w, z, o), I;
        case B:
          return t.type = w = Ng(w), I = h3(null, t, w, z, o), I;
        case re: {
          if (t.type !== t.elementType) {
            var $ = w.propTypes;
            $ && Kl(
              $,
              z,
              // Resolved for outer only
              "prop",
              pn(w)
            );
          }
          return I = m3(
            null,
            t,
            w,
            no(w.type, z),
            // The inner type can have defaults too
            o
          ), I;
        }
      }
      var Z = "";
      throw w !== null && typeof w == "object" && w.$$typeof === Ye && (Z = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + w + ". " + ("Lazy element type must resolve to a class or function." + Z));
    }
    function YR(e, t, i, o, c) {
      ny(e, t), t.tag = T;
      var d;
      return Uo(i) ? (d = !0, dm(t)) : d = !1, ad(t, c), s3(t, i, o), W1(t, i, o, c), rg(null, t, i, !0, d, c);
    }
    function WR(e, t, i, o) {
      ny(e, t);
      var c = t.pendingProps, d;
      {
        var g = Kf(t, i, !1);
        d = Zf(t, g);
      }
      ad(t, o);
      var x, w;
      xi(t);
      {
        if (i.prototype && typeof i.prototype.render == "function") {
          var k = pn(i) || "Unknown";
          K1[k] || (v("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", k, k), K1[k] = !0);
        }
        t.mode & nr && Jl.recordLegacyContextWarning(t, null), cn(!0), lv.current = t, x = cd(null, t, i, c, d, o), w = fd(), cn(!1);
      }
      if (Ei(), t.flags |= Xi, typeof x == "object" && x !== null && typeof x.render == "function" && x.$$typeof === void 0) {
        var z = pn(i) || "Unknown";
        ov[z] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", z, z, z), ov[z] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof x == "object" && x !== null && typeof x.render == "function" && x.$$typeof === void 0
      ) {
        {
          var I = pn(i) || "Unknown";
          ov[I] || (v("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", I, I, I), ov[I] = !0);
        }
        t.tag = T, t.memoizedState = null, t.updateQueue = null;
        var $ = !1;
        return Uo(i) ? ($ = !0, dm(t)) : $ = !1, t.memoizedState = x.state !== null && x.state !== void 0 ? x.state : null, n1(t), u3(t, x), W1(t, i, c, o), rg(null, t, i, !0, $, o);
      } else {
        if (t.tag = E, t.mode & nr) {
          Tr(!0);
          try {
            x = cd(null, t, i, c, d, o), w = fd();
          } finally {
            Tr(!1);
          }
        }
        return Ha() && w && U0(t), wi(null, t, x, o), ag(t, i), t.child;
      }
    }
    function ag(e, t) {
      {
        if (t && t.childContextTypes && v("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var i = "", o = Jn();
          o && (i += `

Check the render method of \`` + o + "`.");
          var c = o || "", d = e._debugSource;
          d && (c = d.fileName + ":" + d.lineNumber), eg[c] || (eg[c] = !0, v("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", i));
        }
        if (t.defaultProps !== void 0) {
          var g = pn(t) || "Unknown";
          uv[g] || (v("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", g), uv[g] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var x = pn(t) || "Unknown";
          J1[x] || (v("%s: Function components do not support getDerivedStateFromProps.", x), J1[x] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var w = pn(t) || "Unknown";
          Z1[w] || (v("%s: Function components do not support contextType.", w), Z1[w] = !0);
        }
      }
    }
    var ig = {
      dehydrated: null,
      treeContext: null,
      retryLane: Hn
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
        baseLanes: tn(e.baseLanes, t),
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
      return o1(e, Kp);
    }
    function XR(e, t) {
      return Js(e.childLanes, t);
    }
    function T3(e, t, i) {
      var o = t.pendingProps;
      i_(t) && (t.flags |= vt);
      var c = eo.current, d = !1, g = (t.flags & vt) !== mt;
      if (g || GR(c, e) ? (d = !0, t.flags &= ~vt) : (e === null || e.memoizedState !== null) && (c = vR(c, D2)), c = ld(c), ps(t, c), e === null) {
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
          var se = o.fallback, Qe = o.children, St = JR(e, t, Qe, se, i), dt = t.child, Un = e.child.memoizedState;
          return dt.memoizedState = Un === null ? lg(i) : QR(Un, i), dt.childLanes = XR(e, i), t.memoizedState = ig, St;
        } else {
          var _n = o.children, W = ZR(e, t, _n, i);
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
      return (c & mn) === yt && d !== null ? (x = d, x.childLanes = Se, x.pendingProps = g, e.mode & $n && (x.actualDuration = 0, x.actualStartTime = -1, x.selfBaseDuration = 0, x.treeBaseDuration = 0), w = Es(i, c, o, null)) : (x = ug(g, c), w = Es(i, c, o, null)), x.return = e, w.return = e, x.sibling = w, e.child = x, w;
    }
    function ug(e, t, i) {
      return wx(e, t, Se, null);
    }
    function w3(e, t) {
      return Ac(e, t);
    }
    function ZR(e, t, i, o) {
      var c = e.child, d = c.sibling, g = w3(c, {
        mode: "visible",
        children: i
      });
      if ((t.mode & mn) === yt && (g.lanes = o), g.return = t, g.sibling = null, d !== null) {
        var x = t.deletions;
        x === null ? (t.deletions = [d], t.flags |= Li) : x.push(d);
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
        (d & mn) === yt && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== g
      ) {
        var z = t.child;
        k = z, k.childLanes = Se, k.pendingProps = w, t.mode & $n && (k.actualDuration = 0, k.actualStartTime = -1, k.selfBaseDuration = g.selfBaseDuration, k.treeBaseDuration = g.treeBaseDuration), t.deletions = null;
      } else
        k = w3(g, w), k.subtreeFlags = g.subtreeFlags & $r;
      var I;
      return x !== null ? I = Ac(x, o) : (I = Es(o, d, c, null), I.flags |= Cr), I.return = t, k.return = t, k.sibling = I, t.child = k, I;
    }
    function ty(e, t, i, o) {
      o !== null && V0(o), nd(t, e.child, null, i);
      var c = t.pendingProps, d = c.children, g = og(t, d);
      return g.flags |= Cr, t.memoizedState = null, g;
    }
    function eb(e, t, i, o, c) {
      var d = t.mode, g = {
        mode: "visible",
        children: i
      }, x = ug(g, d), w = Es(o, d, c, null);
      return w.flags |= Cr, x.return = t, w.return = t, x.sibling = w, t.child = x, (t.mode & mn) !== yt && nd(t, e.child, null, c), w;
    }
    function tb(e, t, i) {
      return (e.mode & mn) === yt ? (v("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ut) : b0(t) ? e.lanes = Da : e.lanes = ii, null;
    }
    function nb(e, t, i, o, c, d, g) {
      if (i)
        if (t.flags & ka) {
          t.flags &= ~ka;
          var W = Q1(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return ty(e, t, g, W);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= vt, null;
          var ce = o.children, Q = o.fallback, De = eb(e, t, ce, Q, g), nt = t.child;
          return nt.memoizedState = lg(g), t.memoizedState = ig, De;
        }
      else {
        if (Iw(), (t.mode & mn) === yt)
          return ty(
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
          return ty(e, t, g, $);
        }
        var Z = li(g, e.childLanes);
        if (ro || Z) {
          var ne = dy();
          if (ne !== null) {
            var se = fp(ne, g);
            if (se !== Hn && se !== d.retryLane) {
              d.retryLane = se;
              var Qe = ur;
              Ii(e, se), Ta(ne, e, se, Qe);
            }
          }
          kg();
          var St = Q1(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return ty(e, t, g, St);
        } else if (WS(c)) {
          t.flags |= vt, t.child = e.child;
          var dt = MM.bind(null, e);
          return ow(c, dt), null;
        } else {
          Yw(t, c, d.treeContext);
          var Un = o.children, _n = og(t, Un);
          return _n.flags |= ti, _n;
        }
      }
    }
    function R3(e, t, i) {
      e.lanes = tn(e.lanes, t);
      var o = e.alternate;
      o !== null && (o.lanes = tn(o.lanes, t)), Z0(e.return, t, i);
    }
    function rb(e, t, i) {
      for (var o = t; o !== null; ) {
        if (o.tag === q) {
          var c = o.memoizedState;
          c !== null && R3(o, i, e);
        } else if (o.tag === Oe)
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
        o !== null && Lm(o) === null && (i = t), t = t.sibling;
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
      e !== void 0 && !ey[e] && (e !== "collapsed" && e !== "hidden" ? (ey[e] = !0, v('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (ey[e] = !0, v('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function b3(e, t) {
      {
        var i = Ot(e), o = !i && typeof gt(e) == "function";
        if (i || o) {
          var c = i ? "array" : "iterable";
          return v("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", c, t, c), !1;
        }
      }
      return !0;
    }
    function ob(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (Ot(e)) {
          for (var i = 0; i < e.length; i++)
            if (!b3(e[i], i))
              return;
        } else {
          var o = gt(e);
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
      var x = eo.current, w = o1(x, Kp);
      if (w)
        x = u1(x, Kp), t.flags |= vt;
      else {
        var k = e !== null && (e.flags & vt) !== mt;
        k && rb(t, t.child, i), x = ld(x);
      }
      if (ps(t, x), (t.mode & mn) === yt)
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
              if (ne !== null && Lm(ne) === null) {
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
      return e === null ? t.child = nd(t, null, o, i) : wi(e, t, o, i), t.child;
    }
    var _3 = !1;
    function sb(e, t, i) {
      var o = t.type, c = o._context, d = t.pendingProps, g = t.memoizedProps, x = d.value;
      {
        "value" in d || _3 || (_3 = !0, v("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var w = t.type.propTypes;
        w && Kl(w, d, "prop", "Context.Provider");
      }
      if (x2(t, c, x), g !== null) {
        var k = g.value;
        if (Te(k, x)) {
          if (g.children === d.children && !cm())
            return bu(e, t, i);
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
      typeof d != "function" && v("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), ad(t, i);
      var g = la(o);
      xi(t);
      var x;
      return lv.current = t, cn(!0), x = d(g), cn(!1), Ei(), t.flags |= Xi, wi(e, t, x, i), t.child;
    }
    function sv() {
      ro = !0;
    }
    function ny(e, t) {
      (t.mode & mn) === yt && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Cr);
    }
    function bu(e, t, i) {
      return e !== null && (t.dependencies = e.dependencies), a3(), Ev(t.lanes), li(i, t.childLanes) ? (rR(e, t), t.child) : null;
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
        return d === null ? (o.deletions = [e], o.flags |= Li) : d.push(e), i.flags |= Cr, i;
      }
    }
    function cg(e, t) {
      var i = e.lanes;
      return !!li(i, t);
    }
    function db(e, t, i) {
      switch (t.tag) {
        case R:
          E3(t), t.stateNode, td();
          break;
        case O:
          _2(t);
          break;
        case T: {
          var o = t.type;
          Uo(o) && dm(t);
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
            var g = li(i, t.childLanes);
            g && (t.flags |= Ln);
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
              return ps(t, ld(eo.current)), t.flags |= vt, null;
            var k = t.child, z = k.childLanes;
            if (li(i, z))
              return T3(e, t, i);
            ps(t, ld(eo.current));
            var I = bu(e, t, i);
            return I !== null ? I.sibling : null;
          } else
            ps(t, ld(eo.current));
          break;
        }
        case Oe: {
          var $ = (e.flags & vt) !== mt, Z = li(i, t.childLanes);
          if ($) {
            if (Z)
              return M3(e, t, i);
            t.flags |= vt;
          }
          var ne = t.memoizedState;
          if (ne !== null && (ne.rendering = null, ne.tail = null, ne.lastEffect = null), ps(t, eo.current), Z)
            break;
          return null;
        }
        case fe:
        case ye:
          return t.lanes = Se, g3(e, t, i);
      }
      return bu(e, t, i);
    }
    function D3(e, t, i) {
      if (t._debugNeedsRemount && e !== null)
        return fb(e, t, Hg(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var o = e.memoizedProps, c = t.pendingProps;
        if (o !== c || cm() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          ro = !0;
        else {
          var d = cg(e, i);
          if (!d && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & vt) === mt)
            return ro = !1, db(e, t, i);
          (e.flags & Jc) !== mt ? ro = !0 : ro = !1;
        }
      } else if (ro = !1, Ha() && jw(t)) {
        var g = t.index, x = Fw();
        a2(t, x, g);
      }
      switch (t.lanes = Se, t.tag) {
        case b:
          return WR(e, t, t.type, i);
        case ze: {
          var w = t.elementType;
          return qR(e, t, w, i);
        }
        case E: {
          var k = t.type, z = t.pendingProps, I = t.elementType === k ? z : no(k, z);
          return ng(e, t, k, I, i);
        }
        case T: {
          var $ = t.type, Z = t.pendingProps, ne = t.elementType === $ ? Z : no($, Z);
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
          var se = t.type, Qe = t.pendingProps, St = t.elementType === se ? Qe : no(se, Qe);
          return h3(e, t, se, St, i);
        }
        case U:
          return PR(e, t, i);
        case j:
          return HR(e, t, i);
        case ee:
          return $R(e, t, i);
        case J:
          return sb(e, t, i);
        case X:
          return cb(e, t, i);
        case re: {
          var dt = t.type, Un = t.pendingProps, _n = no(dt, Un);
          if (t.type !== t.elementType) {
            var W = dt.propTypes;
            W && Kl(
              W,
              _n,
              // Resolved for outer only
              "prop",
              pn(dt)
            );
          }
          return _n = no(dt.type, _n), m3(e, t, dt, _n, i);
        }
        case pe:
          return y3(e, t, t.type, t.pendingProps, i);
        case he: {
          var ce = t.type, Q = t.pendingProps, De = t.elementType === ce ? Q : no(ce, Q);
          return YR(e, t, ce, De, i);
        }
        case Oe:
          return M3(e, t, i);
        case Re:
          break;
        case fe:
          return g3(e, t, i);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function dd(e) {
      e.flags |= Ln;
    }
    function O3(e) {
      e.flags |= br, e.flags |= Yu;
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
        t.updateQueue = w, w && dd(t);
      }
    }, A3 = function(e, t, i, o) {
      i !== o && dd(t);
    };
    function cv(e, t) {
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
      var t = e.alternate !== null && e.alternate.child === e.child, i = Se, o = mt;
      if (t) {
        if ((e.mode & $n) !== yt) {
          for (var w = e.selfBaseDuration, k = e.child; k !== null; )
            i = tn(i, tn(k.lanes, k.childLanes)), o |= k.subtreeFlags & $r, o |= k.flags & $r, w += k.treeBaseDuration, k = k.sibling;
          e.treeBaseDuration = w;
        } else
          for (var z = e.child; z !== null; )
            i = tn(i, tn(z.lanes, z.childLanes)), o |= z.subtreeFlags & $r, o |= z.flags & $r, z.return = e, z = z.sibling;
        e.subtreeFlags |= o;
      } else {
        if ((e.mode & $n) !== yt) {
          for (var c = e.actualDuration, d = e.selfBaseDuration, g = e.child; g !== null; )
            i = tn(i, tn(g.lanes, g.childLanes)), o |= g.subtreeFlags, o |= g.flags, c += g.actualDuration, d += g.treeBaseDuration, g = g.sibling;
          e.actualDuration = c, e.treeBaseDuration = d;
        } else
          for (var x = e.child; x !== null; )
            i = tn(i, tn(x.lanes, x.childLanes)), o |= x.subtreeFlags, o |= x.flags, x.return = e, x = x.sibling;
        e.subtreeFlags |= o;
      }
      return e.childLanes = i, t;
    }
    function pb(e, t, i) {
      if (Kw() && (t.mode & mn) !== yt && (t.flags & vt) === mt)
        return f2(t), td(), t.flags |= ka | js | na, !1;
      var o = ym(t);
      if (i !== null && i.dehydrated !== null)
        if (e === null) {
          if (!o)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (Gw(t), Va(t), (t.mode & $n) !== yt) {
            var c = i !== null;
            if (c) {
              var d = t.child;
              d !== null && (t.treeBaseDuration -= d.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (td(), (t.flags & vt) === mt && (t.memoizedState = null), t.flags |= Ln, Va(t), (t.mode & $n) !== yt) {
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
        case b:
        case ze:
        case pe:
        case E:
        case B:
        case U:
        case j:
        case ee:
        case X:
        case re:
          return Va(t), null;
        case T: {
          var c = t.type;
          return Uo(c) && fm(t), Va(t), null;
        }
        case R: {
          var d = t.stateNode;
          if (id(t), L0(t), c1(), d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), e === null || e.child === null) {
            var g = ym(t);
            if (g)
              dd(t);
            else if (e !== null) {
              var x = e.memoizedState;
              // Check if this is a client root
              (!x.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & ka) !== mt) && (t.flags |= Xr, d2());
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
            var z = i1(), I = ym(t);
            if (I)
              Ww(t, w, z) && dd(t);
            else {
              var $ = LT(k, o, w, z, t);
              z3($, t, !1, !1), t.stateNode = $, NT($, k, o, w) && dd(t);
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
            var se = M2(), Qe = i1(), St = ym(t);
            St ? Qw(t) && dd(t) : t.stateNode = jT(Z, se, Qe, t);
          }
          return Va(t), null;
        }
        case q: {
          od(t);
          var dt = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Un = pb(e, t, dt);
            if (!Un)
              return t.flags & na ? t : null;
          }
          if ((t.flags & vt) !== mt)
            return t.lanes = i, (t.mode & $n) !== yt && N1(t), t;
          var _n = dt !== null, W = e !== null && e.memoizedState !== null;
          if (_n !== W && _n) {
            var ce = t.child;
            if (ce.flags |= Hr, (t.mode & mn) !== yt) {
              var Q = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              Q || o1(eo.current, D2) ? vM() : kg();
            }
          }
          var De = t.updateQueue;
          if (De !== null && (t.flags |= Ln), Va(t), (t.mode & $n) !== yt && _n) {
            var nt = t.child;
            nt !== null && (t.treeBaseDuration -= nt.treeBaseDuration);
          }
          return null;
        }
        case D:
          return id(t), fg(e, t), e === null && Dw(t.stateNode.containerInfo), Va(t), null;
        case J:
          var Xe = t.type._context;
          return K0(Xe, t), Va(t), null;
        case he: {
          var jt = t.type;
          return Uo(jt) && fm(t), Va(t), null;
        }
        case Oe: {
          od(t);
          var Qt = t.memoizedState;
          if (Qt === null)
            return Va(t), null;
          var ar = (t.flags & vt) !== mt, Bn = Qt.rendering;
          if (Bn === null)
            if (ar)
              cv(Qt, !1);
            else {
              var Jr = mM() && (e === null || (e.flags & vt) === mt);
              if (!Jr)
                for (var qn = t.child; qn !== null; ) {
                  var Wr = Lm(qn);
                  if (Wr !== null) {
                    ar = !0, t.flags |= vt, cv(Qt, !1);
                    var pi = Wr.updateQueue;
                    return pi !== null && (t.updateQueue = pi, t.flags |= Ln), t.subtreeFlags = mt, aR(t, i), ps(t, u1(eo.current, Kp)), t.child;
                  }
                  qn = qn.sibling;
                }
              Qt.tail !== null && Kr() > nx() && (t.flags |= vt, ar = !0, cv(Qt, !1), t.lanes = np);
            }
          else {
            if (!ar) {
              var Wa = Lm(Bn);
              if (Wa !== null) {
                t.flags |= vt, ar = !0;
                var rl = Wa.updateQueue;
                if (rl !== null && (t.updateQueue = rl, t.flags |= Ln), cv(Qt, !0), Qt.tail === null && Qt.tailMode === "hidden" && !Bn.alternate && !Ha())
                  return Va(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Kr() * 2 - Qt.renderingStartTime > nx() && i !== ii && (t.flags |= vt, ar = !0, cv(Qt, !1), t.lanes = np);
            }
            if (Qt.isBackwards)
              Bn.sibling = t.child, t.child = Bn;
            else {
              var Mi = Qt.last;
              Mi !== null ? Mi.sibling = Bn : t.child = Bn, Qt.last = Bn;
            }
          }
          if (Qt.tail !== null) {
            var _i = Qt.tail;
            Qt.rendering = _i, Qt.tail = _i.sibling, Qt.renderingStartTime = Kr(), _i.sibling = null;
            var vi = eo.current;
            return ar ? vi = u1(vi, Kp) : vi = ld(vi), ps(t, vi), _i;
          }
          return Va(t), null;
        }
        case Re:
          break;
        case fe:
        case ye: {
          _g(t);
          var Ou = t.memoizedState, xd = Ou !== null;
          if (e !== null) {
            var bv = e.memoizedState, Bo = bv !== null;
            Bo !== xd && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ie && (t.flags |= Hr);
          }
          return !xd || (t.mode & mn) === yt ? Va(t) : li(Io, ii) && (Va(t), t.subtreeFlags & (Cr | Ln) && (t.flags |= Hr)), null;
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
          Uo(o) && fm(t);
          var c = t.flags;
          return c & na ? (t.flags = c & ~na | vt, (t.mode & $n) !== yt && N1(t), t) : null;
        }
        case R: {
          t.stateNode, id(t), L0(t), c1();
          var d = t.flags;
          return (d & na) !== mt && (d & vt) === mt ? (t.flags = d & ~na | vt, t) : null;
        }
        case O:
          return l1(t), null;
        case q: {
          od(t);
          var g = t.memoizedState;
          if (g !== null && g.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            td();
          }
          var x = t.flags;
          return x & na ? (t.flags = x & ~na | vt, (t.mode & $n) !== yt && N1(t), t) : null;
        }
        case Oe:
          return od(t), null;
        case D:
          return id(t), null;
        case J:
          var w = t.type._context;
          return K0(w, t), null;
        case fe:
        case ye:
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
          o != null && fm(t);
          break;
        }
        case R: {
          t.stateNode, id(t), L0(t), c1();
          break;
        }
        case O: {
          l1(t);
          break;
        }
        case D:
          id(t);
          break;
        case q:
          od(t);
          break;
        case Oe:
          od(t);
          break;
        case J:
          var c = t.type._context;
          K0(c, t);
          break;
        case fe:
        case ye:
          _g(t);
          break;
      }
    }
    var j3 = null;
    j3 = /* @__PURE__ */ new Set();
    var ry = !1, Ia = !1, hb = typeof WeakSet == "function" ? WeakSet : Set, ot = null, pd = null, vd = null;
    function mb(e) {
      go(null, function() {
        throw e;
      }), Us();
    }
    var yb = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & $n)
        try {
          $o(), t.componentWillUnmount();
        } finally {
          Ho(e);
        }
      else
        t.componentWillUnmount();
    };
    function F3(e, t) {
      try {
        ms(ya, e);
      } catch (i) {
        dr(e, t, i);
      }
    }
    function dg(e, t, i) {
      try {
        yb(e, i);
      } catch (o) {
        dr(e, t, o);
      }
    }
    function gb(e, t, i) {
      try {
        i.componentDidMount();
      } catch (o) {
        dr(e, t, o);
      }
    }
    function P3(e, t) {
      try {
        $3(e);
      } catch (i) {
        dr(e, t, i);
      }
    }
    function hd(e, t) {
      var i = e.ref;
      if (i !== null)
        if (typeof i == "function") {
          var o;
          try {
            if (be && Pe && e.mode & $n)
              try {
                $o(), o = i(null);
              } finally {
                Ho(e);
              }
            else
              o = i(null);
          } catch (c) {
            dr(e, t, c);
          }
          typeof o == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Dt(e));
        } else
          i.current = null;
    }
    function ay(e, t, i) {
      try {
        i();
      } catch (o) {
        dr(e, t, o);
      }
    }
    var H3 = !1;
    function Sb(e, t) {
      OT(e.containerInfo), ot = t, xb();
      var i = H3;
      return H3 = !1, i;
    }
    function xb() {
      for (; ot !== null; ) {
        var e = ot, t = e.child;
        (e.subtreeFlags & xo) !== mt && t !== null ? (t.return = e, ot = t) : Eb();
      }
    }
    function Eb() {
      for (; ot !== null; ) {
        var e = ot;
        Tt(e);
        try {
          Cb(e);
        } catch (i) {
          dr(e, e.return, i);
        }
        Nt();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ot = t;
          return;
        }
        ot = e.return;
      }
    }
    function Cb(e) {
      var t = e.alternate, i = e.flags;
      if ((i & Xr) !== mt) {
        switch (Tt(e), e.tag) {
          case E:
          case B:
          case pe:
            break;
          case T: {
            if (t !== null) {
              var o = t.memoizedProps, c = t.memoizedState, d = e.stateNode;
              e.type === e.elementType && !kc && (d.props !== e.memoizedProps && v("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Dt(e) || "instance"), d.state !== e.memoizedState && v("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Dt(e) || "instance"));
              var g = d.getSnapshotBeforeUpdate(e.elementType === e.type ? o : no(e.type, o), c);
              {
                var x = j3;
                g === void 0 && !x.has(e.type) && (x.add(e.type), v("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Dt(e)));
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
        Nt();
      }
    }
    function ao(e, t, i) {
      var o = t.updateQueue, c = o !== null ? o.lastEffect : null;
      if (c !== null) {
        var d = c.next, g = d;
        do {
          if ((g.tag & e) === e) {
            var x = g.destroy;
            g.destroy = void 0, x !== void 0 && ((e & $a) !== Bi ? ql(t) : (e & ya) !== Bi && Ps(t), (e & jo) !== Bi && Tv(!0), ay(t, i, x), (e & jo) !== Bi && Tv(!1), (e & $a) !== Bi ? wo() : (e & ya) !== Bi && ep());
          }
          g = g.next;
        } while (g !== d);
      }
    }
    function ms(e, t) {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var c = o.next, d = c;
        do {
          if ((d.tag & e) === e) {
            (e & $a) !== Bi ? Jd(t) : (e & ya) !== Bi && lf(t);
            var g = d.create;
            (e & jo) !== Bi && Tv(!0), d.destroy = g(), (e & jo) !== Bi && Tv(!1), (e & $a) !== Bi ? sh() : (e & ya) !== Bi && ch();
            {
              var x = d.destroy;
              if (x !== void 0 && typeof x != "function") {
                var w = void 0;
                (d.tag & ya) !== mt ? w = "useLayoutEffect" : (d.tag & jo) !== mt ? w = "useInsertionEffect" : w = "useEffect";
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
      if ((t.flags & Ln) !== mt)
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
      if ((i.flags & Co) !== mt)
        switch (i.tag) {
          case E:
          case B:
          case pe: {
            if (!Ia)
              if (i.mode & $n)
                try {
                  $o(), ms(ya | ma, i);
                } finally {
                  Ho(i);
                }
              else
                ms(ya | ma, i);
            break;
          }
          case T: {
            var c = i.stateNode;
            if (i.flags & Ln && !Ia)
              if (t === null)
                if (i.type === i.elementType && !kc && (c.props !== i.memoizedProps && v("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Dt(i) || "instance"), c.state !== i.memoizedState && v("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Dt(i) || "instance")), i.mode & $n)
                  try {
                    $o(), c.componentDidMount();
                  } finally {
                    Ho(i);
                  }
                else
                  c.componentDidMount();
              else {
                var d = i.elementType === i.type ? t.memoizedProps : no(i.type, t.memoizedProps), g = t.memoizedState;
                if (i.type === i.elementType && !kc && (c.props !== i.memoizedProps && v("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Dt(i) || "instance"), c.state !== i.memoizedState && v("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Dt(i) || "instance")), i.mode & $n)
                  try {
                    $o(), c.componentDidUpdate(d, g, c.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Ho(i);
                  }
                else
                  c.componentDidUpdate(d, g, c.__reactInternalSnapshotBeforeUpdate);
              }
            var x = i.updateQueue;
            x !== null && (i.type === i.elementType && !kc && (c.props !== i.memoizedProps && v("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Dt(i) || "instance"), c.state !== i.memoizedState && v("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Dt(i) || "instance")), b2(i, x, c));
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
            if (t === null && i.flags & Ln) {
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
              var Z = i.memoizedProps, ne = Z.onCommit, se = Z.onRender, Qe = i.stateNode.effectDuration, St = n3(), dt = t === null ? "mount" : "update";
              t3() && (dt = "nested-update"), typeof se == "function" && se(i.memoizedProps.id, dt, i.actualDuration, i.treeBaseDuration, i.actualStartTime, St);
              {
                typeof ne == "function" && ne(i.memoizedProps.id, dt, Qe, St), EM(i);
                var Un = i.return;
                e: for (; Un !== null; ) {
                  switch (Un.tag) {
                    case R:
                      var _n = Un.stateNode;
                      _n.effectDuration += Qe;
                      break e;
                    case ee:
                      var W = Un.stateNode;
                      W.effectDuration += Qe;
                      break e;
                  }
                  Un = Un.return;
                }
              }
            }
            break;
          }
          case q: {
            zb(e, i);
            break;
          }
          case Oe:
          case he:
          case Re:
          case fe:
          case ye:
          case Ue:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Ia || i.flags & br && $3(i);
    }
    function Rb(e) {
      switch (e.tag) {
        case E:
        case B:
        case pe: {
          if (e.mode & $n)
            try {
              $o(), F3(e, e.return);
            } finally {
              Ho(e);
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
              dr(e, e.return, g);
            }
          }
        } else if (o.tag === L) {
          if (i === null)
            try {
              var d = o.stateNode;
              t ? JT(d) : tw(d, o.memoizedProps);
            } catch (g) {
              dr(e, e.return, g);
            }
        } else if (!((o.tag === fe || o.tag === ye) && o.memoizedState !== null && o !== e)) {
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
          if (e.mode & $n)
            try {
              $o(), c = t(o);
            } finally {
              Ho(e);
            }
          else
            c = t(o);
          typeof c == "function" && v("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Dt(e));
        } else
          t.hasOwnProperty("current") || v("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Dt(e)), t.current = o;
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
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== O && t.tag !== L && t.tag !== le; ) {
          if (t.flags & Cr || t.child === null || t.tag === D)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & Cr))
          return t.stateNode;
      }
    }
    function kb(e) {
      var t = _b(e);
      switch (t.tag) {
        case O: {
          var i = t.stateNode;
          t.flags & Ai && (YS(i), t.flags &= ~Ai);
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
    var Ba = null, io = !1;
    function Db(e, t, i) {
      {
        var o = t;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case O: {
              Ba = o.stateNode, io = !1;
              break e;
            }
            case R: {
              Ba = o.stateNode.containerInfo, io = !0;
              break e;
            }
            case D: {
              Ba = o.stateNode.containerInfo, io = !0;
              break e;
            }
          }
          o = o.return;
        }
        if (Ba === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        q3(e, t, i), Ba = null, io = !1;
      }
      Mb(i);
    }
    function ys(e, t, i) {
      for (var o = i.child; o !== null; )
        q3(e, t, o), o = o.sibling;
    }
    function q3(e, t, i) {
      switch (Xd(i), i.tag) {
        case O:
          Ia || hd(i, t);
        // eslint-disable-next-line-no-fallthrough
        case L: {
          {
            var o = Ba, c = io;
            Ba = null, ys(e, t, i), Ba = o, io = c, Ba !== null && (io ? XT(Ba, i.stateNode) : GT(Ba, i.stateNode));
          }
          return;
        }
        case le: {
          Ba !== null && (io ? KT(Ba, i.stateNode) : R0(Ba, i.stateNode));
          return;
        }
        case D: {
          {
            var d = Ba, g = io;
            Ba = i.stateNode.containerInfo, io = !0, ys(e, t, i), Ba = d, io = g;
          }
          return;
        }
        case E:
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
                  $ !== void 0 && ((Z & jo) !== Bi ? ay(i, t, $) : (Z & ya) !== Bi && (Ps(i), i.mode & $n ? ($o(), ay(i, t, $), Ho(i)) : ay(i, t, $), ep())), z = z.next;
                } while (z !== k);
              }
            }
          }
          ys(e, t, i);
          return;
        }
        case T: {
          if (!Ia) {
            hd(i, t);
            var ne = i.stateNode;
            typeof ne.componentWillUnmount == "function" && dg(i, t, ne);
          }
          ys(e, t, i);
          return;
        }
        case Re: {
          ys(e, t, i);
          return;
        }
        case fe: {
          if (
            // TODO: Remove this dead flag
            i.mode & mn
          ) {
            var se = Ia;
            Ia = se || i.memoizedState !== null, ys(e, t, i), Ia = se;
          } else
            ys(e, t, i);
          break;
        }
        default: {
          ys(e, t, i);
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
            if (i.add(o), ai)
              if (pd !== null && vd !== null)
                Cv(vd, pd);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            o.then(c, c);
          }
        });
      }
    }
    function Lb(e, t, i) {
      pd = i, vd = e, Tt(t), W3(t, e), Tt(t), pd = null, vd = null;
    }
    function lo(e, t, i) {
      var o = t.deletions;
      if (o !== null)
        for (var c = 0; c < o.length; c++) {
          var d = o[c];
          try {
            Db(e, t, d);
          } catch (w) {
            dr(d, t, w);
          }
        }
      var g = er();
      if (t.subtreeFlags & Eo)
        for (var x = t.child; x !== null; )
          Tt(x), W3(x, e), x = x.sibling;
      Tt(g);
    }
    function W3(e, t, i) {
      var o = e.alternate, c = e.flags;
      switch (e.tag) {
        case E:
        case B:
        case re:
        case pe: {
          if (lo(t, e), Vo(e), c & Ln) {
            try {
              ao(jo | ma, e, e.return), ms(jo | ma, e);
            } catch (jt) {
              dr(e, e.return, jt);
            }
            if (e.mode & $n) {
              try {
                $o(), ao(ya | ma, e, e.return);
              } catch (jt) {
                dr(e, e.return, jt);
              }
              Ho(e);
            } else
              try {
                ao(ya | ma, e, e.return);
              } catch (jt) {
                dr(e, e.return, jt);
              }
          }
          return;
        }
        case T: {
          lo(t, e), Vo(e), c & br && o !== null && hd(o, o.return);
          return;
        }
        case O: {
          lo(t, e), Vo(e), c & br && o !== null && hd(o, o.return);
          {
            if (e.flags & Ai) {
              var d = e.stateNode;
              try {
                YS(d);
              } catch (jt) {
                dr(e, e.return, jt);
              }
            }
            if (c & Ln) {
              var g = e.stateNode;
              if (g != null) {
                var x = e.memoizedProps, w = o !== null ? o.memoizedProps : x, k = e.type, z = e.updateQueue;
                if (e.updateQueue = null, z !== null)
                  try {
                    IT(g, z, k, w, x, e);
                  } catch (jt) {
                    dr(e, e.return, jt);
                  }
              }
            }
          }
          return;
        }
        case L: {
          if (lo(t, e), Vo(e), c & Ln) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var I = e.stateNode, $ = e.memoizedProps, Z = o !== null ? o.memoizedProps : $;
            try {
              BT(I, Z, $);
            } catch (jt) {
              dr(e, e.return, jt);
            }
          }
          return;
        }
        case R: {
          if (lo(t, e), Vo(e), c & Ln && o !== null) {
            var ne = o.memoizedState;
            if (ne.isDehydrated)
              try {
                hw(t.containerInfo);
              } catch (jt) {
                dr(e, e.return, jt);
              }
          }
          return;
        }
        case D: {
          lo(t, e), Vo(e);
          return;
        }
        case q: {
          lo(t, e), Vo(e);
          var se = e.child;
          if (se.flags & Hr) {
            var Qe = se.stateNode, St = se.memoizedState, dt = St !== null;
            if (Qe.isHidden = dt, dt) {
              var Un = se.alternate !== null && se.alternate.memoizedState !== null;
              Un || pM();
            }
          }
          if (c & Ln) {
            try {
              Ob(e);
            } catch (jt) {
              dr(e, e.return, jt);
            }
            Y3(e);
          }
          return;
        }
        case fe: {
          var _n = o !== null && o.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & mn
          ) {
            var W = Ia;
            Ia = W || _n, lo(t, e), Ia = W;
          } else
            lo(t, e);
          if (Vo(e), c & Hr) {
            var ce = e.stateNode, Q = e.memoizedState, De = Q !== null, nt = e;
            if (ce.isHidden = De, De && !_n && (nt.mode & mn) !== yt) {
              ot = nt;
              for (var Xe = nt.child; Xe !== null; )
                ot = Xe, Nb(Xe), Xe = Xe.sibling;
            }
            bb(nt, De);
          }
          return;
        }
        case Oe: {
          lo(t, e), Vo(e), c & Ln && Y3(e);
          return;
        }
        case Re:
          return;
        default: {
          lo(t, e), Vo(e);
          return;
        }
      }
    }
    function Vo(e) {
      var t = e.flags;
      if (t & Cr) {
        try {
          kb(e);
        } catch (i) {
          dr(e, e.return, i);
        }
        e.flags &= ~Cr;
      }
      t & ti && (e.flags &= ~ti);
    }
    function Ab(e, t, i) {
      pd = i, vd = t, ot = e, Q3(e, t, i), pd = null, vd = null;
    }
    function Q3(e, t, i) {
      for (var o = (e.mode & mn) !== yt; ot !== null; ) {
        var c = ot, d = c.child;
        if (c.tag === fe && o) {
          var g = c.memoizedState !== null, x = g || ry;
          if (x) {
            hg(e, t, i);
            continue;
          } else {
            var w = c.alternate, k = w !== null && w.memoizedState !== null, z = k || Ia, I = ry, $ = Ia;
            ry = x, Ia = z, Ia && !$ && (ot = c, Ub(c));
            for (var Z = d; Z !== null; )
              ot = Z, Q3(
                Z,
                // New root; bubble back up to here and stop.
                t,
                i
              ), Z = Z.sibling;
            ot = c, ry = I, Ia = $, hg(e, t, i);
            continue;
          }
        }
        (c.subtreeFlags & Co) !== mt && d !== null ? (d.return = c, ot = d) : hg(e, t, i);
      }
    }
    function hg(e, t, i) {
      for (; ot !== null; ) {
        var o = ot;
        if ((o.flags & Co) !== mt) {
          var c = o.alternate;
          Tt(o);
          try {
            wb(t, c, o, i);
          } catch (g) {
            dr(o, o.return, g);
          }
          Nt();
        }
        if (o === e) {
          ot = null;
          return;
        }
        var d = o.sibling;
        if (d !== null) {
          d.return = o.return, ot = d;
          return;
        }
        ot = o.return;
      }
    }
    function Nb(e) {
      for (; ot !== null; ) {
        var t = ot, i = t.child;
        switch (t.tag) {
          case E:
          case B:
          case re:
          case pe: {
            if (t.mode & $n)
              try {
                $o(), ao(ya, t, t.return);
              } finally {
                Ho(t);
              }
            else
              ao(ya, t, t.return);
            break;
          }
          case T: {
            hd(t, t.return);
            var o = t.stateNode;
            typeof o.componentWillUnmount == "function" && dg(t, t.return, o);
            break;
          }
          case O: {
            hd(t, t.return);
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
        i !== null ? (i.return = t, ot = i) : G3(e);
      }
    }
    function G3(e) {
      for (; ot !== null; ) {
        var t = ot;
        if (t === e) {
          ot = null;
          return;
        }
        var i = t.sibling;
        if (i !== null) {
          i.return = t.return, ot = i;
          return;
        }
        ot = t.return;
      }
    }
    function Ub(e) {
      for (; ot !== null; ) {
        var t = ot, i = t.child;
        if (t.tag === fe) {
          var o = t.memoizedState !== null;
          if (o) {
            X3(e);
            continue;
          }
        }
        i !== null ? (i.return = t, ot = i) : X3(e);
      }
    }
    function X3(e) {
      for (; ot !== null; ) {
        var t = ot;
        Tt(t);
        try {
          Rb(t);
        } catch (o) {
          dr(t, t.return, o);
        }
        if (Nt(), t === e) {
          ot = null;
          return;
        }
        var i = t.sibling;
        if (i !== null) {
          i.return = t.return, ot = i;
          return;
        }
        ot = t.return;
      }
    }
    function jb(e, t, i, o) {
      ot = t, Fb(t, e, i, o);
    }
    function Fb(e, t, i, o) {
      for (; ot !== null; ) {
        var c = ot, d = c.child;
        (c.subtreeFlags & Il) !== mt && d !== null ? (d.return = c, ot = d) : Pb(e, t, i, o);
      }
    }
    function Pb(e, t, i, o) {
      for (; ot !== null; ) {
        var c = ot;
        if ((c.flags & ei) !== mt) {
          Tt(c);
          try {
            Hb(t, c, i, o);
          } catch (g) {
            dr(c, c.return, g);
          }
          Nt();
        }
        if (c === e) {
          ot = null;
          return;
        }
        var d = c.sibling;
        if (d !== null) {
          d.return = c.return, ot = d;
          return;
        }
        ot = c.return;
      }
    }
    function Hb(e, t, i, o) {
      switch (t.tag) {
        case E:
        case B:
        case pe: {
          if (t.mode & $n) {
            A1();
            try {
              ms($a | ma, t);
            } finally {
              L1(t);
            }
          } else
            ms($a | ma, t);
          break;
        }
      }
    }
    function $b(e) {
      ot = e, Vb();
    }
    function Vb() {
      for (; ot !== null; ) {
        var e = ot, t = e.child;
        if ((ot.flags & Li) !== mt) {
          var i = e.deletions;
          if (i !== null) {
            for (var o = 0; o < i.length; o++) {
              var c = i[o];
              ot = c, qb(c, e);
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
            ot = e;
          }
        }
        (e.subtreeFlags & Il) !== mt && t !== null ? (t.return = e, ot = t) : Ib();
      }
    }
    function Ib() {
      for (; ot !== null; ) {
        var e = ot;
        (e.flags & ei) !== mt && (Tt(e), Bb(e), Nt());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ot = t;
          return;
        }
        ot = e.return;
      }
    }
    function Bb(e) {
      switch (e.tag) {
        case E:
        case B:
        case pe: {
          e.mode & $n ? (A1(), ao($a | ma, e, e.return), L1(e)) : ao($a | ma, e, e.return);
          break;
        }
      }
    }
    function qb(e, t) {
      for (; ot !== null; ) {
        var i = ot;
        Tt(i), Wb(i, t), Nt();
        var o = i.child;
        o !== null ? (o.return = i, ot = o) : Yb(e);
      }
    }
    function Yb(e) {
      for (; ot !== null; ) {
        var t = ot, i = t.sibling, o = t.return;
        if (V3(t), t === e) {
          ot = null;
          return;
        }
        if (i !== null) {
          i.return = o, ot = i;
          return;
        }
        ot = o;
      }
    }
    function Wb(e, t) {
      switch (e.tag) {
        case E:
        case B:
        case pe: {
          e.mode & $n ? (A1(), ao($a, e, t), L1(e)) : ao($a, e, t);
          break;
        }
      }
    }
    function Qb(e) {
      switch (e.tag) {
        case E:
        case B:
        case pe: {
          try {
            ms(ya | ma, e);
          } catch (i) {
            dr(e, e.return, i);
          }
          break;
        }
        case T: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (i) {
            dr(e, e.return, i);
          }
          break;
        }
      }
    }
    function Gb(e) {
      switch (e.tag) {
        case E:
        case B:
        case pe: {
          try {
            ms($a | ma, e);
          } catch (t) {
            dr(e, e.return, t);
          }
          break;
        }
      }
    }
    function Xb(e) {
      switch (e.tag) {
        case E:
        case B:
        case pe: {
          try {
            ao(ya | ma, e, e.return);
          } catch (i) {
            dr(e, e.return, i);
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
        case E:
        case B:
        case pe:
          try {
            ao($a | ma, e, e.return);
          } catch (t) {
            dr(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var fv = Symbol.for;
      fv("selector.component"), fv("selector.has_pseudo_class"), fv("selector.role"), fv("selector.test_id"), fv("selector.text");
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
    var nM = Math.ceil, mg = s.ReactCurrentDispatcher, yg = s.ReactCurrentOwner, qa = s.ReactCurrentBatchConfig, oo = s.ReactCurrentActQueue, xa = (
      /*             */
      0
    ), Z3 = (
      /*               */
      1
    ), Ya = (
      /*                */
      2
    ), kl = (
      /*                */
      4
    ), Mu = 0, dv = 1, Dc = 2, iy = 3, pv = 4, J3 = 5, gg = 6, Nn = xa, Ri = null, jr = null, Ea = Se, Io = Se, Sg = os(Se), Ca = Mu, vv = null, ly = Se, hv = Se, oy = Se, mv = null, qi = null, xg = 0, ex = 500, tx = 1 / 0, rM = 500, _u = null;
    function yv() {
      tx = Kr() + rM;
    }
    function nx() {
      return tx;
    }
    var uy = !1, Eg = null, md = null, Oc = !1, gs = null, gv = Se, Cg = [], Tg = null, aM = 50, Sv = 0, wg = null, Rg = !1, sy = !1, iM = 50, yd = 0, cy = null, xv = ur, fy = Se, rx = !1;
    function dy() {
      return Ri;
    }
    function bi() {
      return (Nn & (Ya | kl)) !== xa ? Kr() : (xv !== ur || (xv = Kr()), xv);
    }
    function Ss(e) {
      var t = e.mode;
      if ((t & mn) === yt)
        return Ut;
      if ((Nn & Ya) !== xa && Ea !== Se)
        return Zs(Ea);
      var i = eR() !== Jw;
      if (i) {
        if (qa.transition !== null) {
          var o = qa.transition;
          o._updatedFibers || (o._updatedFibers = /* @__PURE__ */ new Set()), o._updatedFibers.add(e);
        }
        return fy === Hn && (fy = up()), fy;
      }
      var c = Hi();
      if (c !== Hn)
        return c;
      var d = FT();
      return d;
    }
    function lM(e) {
      var t = e.mode;
      return (t & mn) === yt ? Ut : mh();
    }
    function Ta(e, t, i, o) {
      DM(), rx && v("useInsertionEffect must not schedule updates."), Rg && (sy = !0), Xu(e, i, o), (Nn & Ya) !== Se && e === Ri ? LM(t) : (ai && tc(e, t, i), AM(t), e === Ri && ((Nn & Ya) === xa && (hv = tn(hv, i)), Ca === pv && xs(e, Ea)), Yi(e, o), i === Ut && Nn === xa && (t.mode & mn) === yt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !oo.isBatchingLegacy && (yv(), r2()));
    }
    function oM(e, t, i) {
      var o = e.current;
      o.lanes = t, Xu(e, t, i), Yi(e, i);
    }
    function uM(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Nn & Ya) !== xa
      );
    }
    function Yi(e, t) {
      var i = e.callbackNode;
      bf(e, t);
      var o = Rf(e, e === Ri ? Ea : Se);
      if (o === Se) {
        i !== null && Sx(i), e.callbackNode = null, e.callbackPriority = Hn;
        return;
      }
      var c = Mo(o), d = e.callbackPriority;
      if (d === c && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(oo.current !== null && i !== zg)) {
        i == null && d !== Ut && v("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      i != null && Sx(i);
      var g;
      if (c === Ut)
        e.tag === us ? (oo.isBatchingLegacy !== null && (oo.didScheduleLegacyUpdate = !0), Uw(lx.bind(null, e))) : n2(lx.bind(null, e)), oo.current !== null ? oo.current.push(ss) : HT(function() {
          (Nn & (Ya | kl)) === xa && ss();
        }), g = null;
      else {
        var x;
        switch (Th(o)) {
          case Na:
            x = Fs;
            break;
          case Sl:
            x = To;
            break;
          case Fi:
            x = Bl;
            break;
          case Pi:
            x = tu;
            break;
          default:
            x = Bl;
            break;
        }
        g = Lg(x, ax.bind(null, e));
      }
      e.callbackPriority = c, e.callbackNode = g;
    }
    function ax(e, t) {
      if (bR(), xv = ur, fy = Se, (Nn & (Ya | kl)) !== xa)
        throw new Error("Should not already be working.");
      var i = e.callbackNode, o = Du();
      if (o && e.callbackNode !== i)
        return null;
      var c = Rf(e, e === Ri ? Ea : Se);
      if (c === Se)
        return null;
      var d = !_f(e, c) && !hh(e, c) && !t, g = d ? gM(e, c) : vy(e, c);
      if (g !== Mu) {
        if (g === Dc) {
          var x = Mf(e);
          x !== Se && (c = x, g = bg(e, x));
        }
        if (g === dv) {
          var w = vv;
          throw zc(e, Se), xs(e, c), Yi(e, Kr()), w;
        }
        if (g === gg)
          xs(e, c);
        else {
          var k = !_f(e, c), z = e.current.alternate;
          if (k && !cM(z)) {
            if (g = vy(e, c), g === Dc) {
              var I = Mf(e);
              I !== Se && (c = I, g = bg(e, I));
            }
            if (g === dv) {
              var $ = vv;
              throw zc(e, Se), xs(e, c), Yi(e, Kr()), $;
            }
          }
          e.finishedWork = z, e.finishedLanes = c, sM(e, g, c);
        }
      }
      return Yi(e, Kr()), e.callbackNode === i ? ax.bind(null, e) : null;
    }
    function bg(e, t) {
      var i = mv;
      if (Of(e)) {
        var o = zc(e, t);
        o.flags |= ka, kw(e.containerInfo);
      }
      var c = vy(e, t);
      if (c !== Dc) {
        var d = qi;
        qi = i, d !== null && ix(d);
      }
      return c;
    }
    function ix(e) {
      qi === null ? qi = e : qi.push.apply(qi, e);
    }
    function sM(e, t, i) {
      switch (t) {
        case Mu:
        case dv:
          throw new Error("Root did not complete. This is a bug in React.");
        // Flow knows about invariant, so it complains if I add a break
        // statement, but eslint doesn't know about invariant, so it complains
        // if I do. eslint-disable-next-line no-fallthrough
        case Dc: {
          Lc(e, qi, _u);
          break;
        }
        case iy: {
          if (xs(e, i), du(i) && // do not delay if we're inside an act() scope
          !xx()) {
            var o = xg + ex - Kr();
            if (o > 10) {
              var c = Rf(e, Se);
              if (c !== Se)
                break;
              var d = e.suspendedLanes;
              if (!pu(d, i)) {
                bi(), kf(e, d);
                break;
              }
              e.timeoutHandle = T0(Lc.bind(null, e, qi, _u), o);
              break;
            }
          }
          Lc(e, qi, _u);
          break;
        }
        case pv: {
          if (xs(e, i), lp(i))
            break;
          if (!xx()) {
            var g = Zi(e, i), x = g, w = Kr() - x, k = kM(w) - w;
            if (k > 10) {
              e.timeoutHandle = T0(Lc.bind(null, e, qi, _u), k);
              break;
            }
          }
          Lc(e, qi, _u);
          break;
        }
        case J3: {
          Lc(e, qi, _u);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function cM(e) {
      for (var t = e; ; ) {
        if (t.flags & qu) {
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
        if (t.subtreeFlags & qu && w !== null) {
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
    function xs(e, t) {
      t = Js(t, oy), t = Js(t, hv), Sh(e, t);
    }
    function lx(e) {
      if (MR(), (Nn & (Ya | kl)) !== xa)
        throw new Error("Should not already be working.");
      Du();
      var t = Rf(e, Se);
      if (!li(t, Ut))
        return Yi(e, Kr()), null;
      var i = vy(e, t);
      if (e.tag !== us && i === Dc) {
        var o = Mf(e);
        o !== Se && (t = o, i = bg(e, o));
      }
      if (i === dv) {
        var c = vv;
        throw zc(e, Se), xs(e, t), Yi(e, Kr()), c;
      }
      if (i === gg)
        throw new Error("Root did not complete. This is a bug in React.");
      var d = e.current.alternate;
      return e.finishedWork = d, e.finishedLanes = t, Lc(e, qi, _u), Yi(e, Kr()), null;
    }
    function fM(e, t) {
      t !== Se && (Df(e, tn(t, Ut)), Yi(e, Kr()), (Nn & (Ya | kl)) === xa && (yv(), ss()));
    }
    function Mg(e, t) {
      var i = Nn;
      Nn |= Z3;
      try {
        return e(t);
      } finally {
        Nn = i, Nn === xa && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !oo.isBatchingLegacy && (yv(), r2());
      }
    }
    function dM(e, t, i, o, c) {
      var d = Hi(), g = qa.transition;
      try {
        return qa.transition = null, Br(Na), e(t, i, o, c);
      } finally {
        Br(d), qa.transition = g, Nn === xa && yv();
      }
    }
    function ku(e) {
      gs !== null && gs.tag === us && (Nn & (Ya | kl)) === xa && Du();
      var t = Nn;
      Nn |= Z3;
      var i = qa.transition, o = Hi();
      try {
        return qa.transition = null, Br(Na), e ? e() : void 0;
      } finally {
        Br(o), qa.transition = i, Nn = t, (Nn & (Ya | kl)) === xa && ss();
      }
    }
    function ox() {
      return (Nn & (Ya | kl)) !== xa;
    }
    function py(e, t) {
      fi(Sg, Io, e), Io = tn(Io, t);
    }
    function _g(e) {
      Io = Sg.current, ci(Sg, e);
    }
    function zc(e, t) {
      e.finishedWork = null, e.finishedLanes = Se;
      var i = e.timeoutHandle;
      if (i !== w0 && (e.timeoutHandle = w0, PT(i)), jr !== null)
        for (var o = jr.return; o !== null; ) {
          var c = o.alternate;
          U3(c, o), o = o.return;
        }
      Ri = e;
      var d = Ac(e.current, null);
      return jr = d, Ea = Io = t, Ca = Mu, vv = null, ly = Se, hv = Se, oy = Se, mv = null, qi = null, oR(), Jl.discardPendingWarnings(), d;
    }
    function ux(e, t) {
      do {
        var i = jr;
        try {
          if (Tm(), z2(), Nt(), yg.current = null, i === null || i.return === null) {
            Ca = dv, vv = t, jr = null;
            return;
          }
          if (be && i.mode & $n && Zm(i, !0), Ve)
            if (Ei(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var o = t;
              gl(i, o, Ea);
            } else
              Hs(i, t, Ea);
          UR(e, i.return, i, t, Ea), dx(i);
        } catch (c) {
          t = c, jr === i && i !== null ? (i = i.return, jr = i) : i = jr;
          continue;
        }
        return;
      } while (!0);
    }
    function sx() {
      var e = mg.current;
      return mg.current = Wm, e === null ? Wm : e;
    }
    function cx(e) {
      mg.current = e;
    }
    function pM() {
      xg = Kr();
    }
    function Ev(e) {
      ly = tn(e, ly);
    }
    function vM() {
      Ca === Mu && (Ca = iy);
    }
    function kg() {
      (Ca === Mu || Ca === iy || Ca === Dc) && (Ca = pv), Ri !== null && (Ks(ly) || Ks(hv)) && xs(Ri, Ea);
    }
    function hM(e) {
      Ca !== pv && (Ca = Dc), mv === null ? mv = [e] : mv.push(e);
    }
    function mM() {
      return Ca === Mu;
    }
    function vy(e, t) {
      var i = Nn;
      Nn |= Ya;
      var o = sx();
      if (Ri !== e || Ea !== t) {
        if (ai) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (Cv(e, Ea), c.clear()), xh(e, t);
        }
        _u = dp(), zc(e, t);
      }
      iu(t);
      do
        try {
          yM();
          break;
        } catch (d) {
          ux(e, d);
        }
      while (!0);
      if (Tm(), Nn = i, cx(o), jr !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return of(), Ri = null, Ea = Se, Ca;
    }
    function yM() {
      for (; jr !== null; )
        fx(jr);
    }
    function gM(e, t) {
      var i = Nn;
      Nn |= Ya;
      var o = sx();
      if (Ri !== e || Ea !== t) {
        if (ai) {
          var c = e.memoizedUpdaters;
          c.size > 0 && (Cv(e, Ea), c.clear()), xh(e, t);
        }
        _u = dp(), yv(), zc(e, t);
      }
      iu(t);
      do
        try {
          SM();
          break;
        } catch (d) {
          ux(e, d);
        }
      while (!0);
      return Tm(), cx(o), Nn = i, jr !== null ? (fh(), Mu) : (of(), Ri = null, Ea = Se, Ca);
    }
    function SM() {
      for (; jr !== null && !qd(); )
        fx(jr);
    }
    function fx(e) {
      var t = e.alternate;
      Tt(e);
      var i;
      (e.mode & $n) !== yt ? (z1(e), i = Dg(t, e, Io), Zm(e, !0)) : i = Dg(t, e, Io), Nt(), e.memoizedProps = e.pendingProps, i === null ? dx(e) : jr = i, yg.current = null;
    }
    function dx(e) {
      var t = e;
      do {
        var i = t.alternate, o = t.return;
        if ((t.flags & js) === mt) {
          Tt(t);
          var c = void 0;
          if ((t.mode & $n) === yt ? c = N3(i, t, Io) : (z1(t), c = N3(i, t, Io), Zm(t, !1)), Nt(), c !== null) {
            jr = c;
            return;
          }
        } else {
          var d = vb(i, t);
          if (d !== null) {
            d.flags &= ih, jr = d;
            return;
          }
          if ((t.mode & $n) !== yt) {
            Zm(t, !1);
            for (var g = t.actualDuration, x = t.child; x !== null; )
              g += x.actualDuration, x = x.sibling;
            t.actualDuration = g;
          }
          if (o !== null)
            o.flags |= js, o.subtreeFlags = mt, o.deletions = null;
          else {
            Ca = gg, jr = null;
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
      Ca === Mu && (Ca = J3);
    }
    function Lc(e, t, i) {
      var o = Hi(), c = qa.transition;
      try {
        qa.transition = null, Br(Na), xM(e, t, i, o);
      } finally {
        qa.transition = c, Br(o);
      }
      return null;
    }
    function xM(e, t, i, o) {
      do
        Du();
      while (gs !== null);
      if (OM(), (Nn & (Ya | kl)) !== xa)
        throw new Error("Should not already be working.");
      var c = e.finishedWork, d = e.finishedLanes;
      if (Kd(d), c === null)
        return Zd(), null;
      if (d === Se && v("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Se, c === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Hn;
      var g = tn(c.lanes, c.childLanes);
      cp(e, g), e === Ri && (Ri = null, jr = null, Ea = Se), ((c.subtreeFlags & Il) !== mt || (c.flags & Il) !== mt) && (Oc || (Oc = !0, Tg = i, Lg(Bl, function() {
        return Du(), null;
      })));
      var x = (c.subtreeFlags & (xo | Eo | Co | Il)) !== mt, w = (c.flags & (xo | Eo | Co | Il)) !== mt;
      if (x || w) {
        var k = qa.transition;
        qa.transition = null;
        var z = Hi();
        Br(Na);
        var I = Nn;
        Nn |= kl, yg.current = null, Sb(e, c), r3(), Lb(e, c, d), zT(e.containerInfo), e.current = c, $s(d), Ab(c, e, d), Vs(), Yd(), Nn = I, Br(z), qa.transition = k;
      } else
        e.current = c, r3();
      var $ = Oc;
      if (Oc ? (Oc = !1, gs = e, gv = d) : (yd = 0, cy = null), g = e.pendingLanes, g === Se && (md = null), $ || mx(e.current, !1), Qd(c.stateNode, o), ai && e.memoizedUpdaters.clear(), Jb(), Yi(e, Kr()), t !== null)
        for (var Z = e.onRecoverableError, ne = 0; ne < t.length; ne++) {
          var se = t[ne], Qe = se.stack, St = se.digest;
          Z(se.value, {
            componentStack: Qe,
            digest: St
          });
        }
      if (uy) {
        uy = !1;
        var dt = Eg;
        throw Eg = null, dt;
      }
      return li(gv, Ut) && e.tag !== us && Du(), g = e.pendingLanes, li(g, Ut) ? (RR(), e === wg ? Sv++ : (Sv = 0, wg = e)) : Sv = 0, ss(), Zd(), null;
    }
    function Du() {
      if (gs !== null) {
        var e = Th(gv), t = rc(Fi, e), i = qa.transition, o = Hi();
        try {
          return qa.transition = null, Br(t), CM();
        } finally {
          Br(o), qa.transition = i;
        }
      }
      return !1;
    }
    function EM(e) {
      Cg.push(e), Oc || (Oc = !0, Lg(Bl, function() {
        return Du(), null;
      }));
    }
    function CM() {
      if (gs === null)
        return !1;
      var e = Tg;
      Tg = null;
      var t = gs, i = gv;
      if (gs = null, gv = Se, (Nn & (Ya | kl)) !== xa)
        throw new Error("Cannot flush passive effects while already rendering.");
      Rg = !0, sy = !1, au(i);
      var o = Nn;
      Nn |= kl, $b(t.current), jb(t, t.current, i, e);
      {
        var c = Cg;
        Cg = [];
        for (var d = 0; d < c.length; d++) {
          var g = c[d];
          Tb(t, g);
        }
      }
      tp(), mx(t.current, !0), Nn = o, ss(), sy ? t === cy ? yd++ : (yd = 0, cy = t) : yd = 0, Rg = !1, sy = !1, Gd(t);
      {
        var x = t.current.stateNode;
        x.effectDuration = 0, x.passiveEffectDuration = 0;
      }
      return !0;
    }
    function px(e) {
      return md !== null && md.has(e);
    }
    function TM(e) {
      md === null ? md = /* @__PURE__ */ new Set([e]) : md.add(e);
    }
    function wM(e) {
      uy || (uy = !0, Eg = e);
    }
    var RM = wM;
    function vx(e, t, i) {
      var o = _c(i, t), c = f3(e, o, Ut), d = fs(e, c, Ut), g = bi();
      d !== null && (Xu(d, Ut, g), Yi(d, g));
    }
    function dr(e, t, i) {
      if (mb(i), Tv(!1), e.tag === R) {
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
            var g = _c(i, e), x = X1(o, g, Ut), w = fs(o, x, Ut), k = bi();
            w !== null && (Xu(w, Ut, k), Yi(w, k));
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
      kf(e, i), NM(e), Ri === e && pu(Ea, i) && (Ca === pv || Ca === iy && du(Ea) && Kr() - xg < ex ? zc(e, Se) : oy = tn(oy, i)), Yi(e, c);
    }
    function hx(e, t) {
      t === Hn && (t = lM(e));
      var i = bi(), o = Ii(e, t);
      o !== null && (Xu(o, t, i), Yi(o, i));
    }
    function MM(e) {
      var t = e.memoizedState, i = Hn;
      t !== null && (i = t.retryLane), hx(e, i);
    }
    function _M(e, t) {
      var i = Hn, o;
      switch (e.tag) {
        case q:
          o = e.stateNode;
          var c = e.memoizedState;
          c !== null && (i = c.retryLane);
          break;
        case Oe:
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
      if (Sv > aM)
        throw Sv = 0, wg = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      yd > iM && (yd = 0, cy = null, v("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function OM() {
      Jl.flushLegacyContextWarning(), Jl.flushPendingUnsafeLifecycleWarnings();
    }
    function mx(e, t) {
      Tt(e), hy(e, So, Xb), t && hy(e, hl, Kb), hy(e, So, Qb), t && hy(e, hl, Gb), Nt();
    }
    function hy(e, t, i) {
      for (var o = e, c = null; o !== null; ) {
        var d = o.subtreeFlags & t;
        o !== c && o.child !== null && d !== mt ? o = o.child : ((o.flags & t) !== mt && i(o), o.sibling !== null ? o = o.sibling : o = c = o.return);
      }
    }
    var my = null;
    function yx(e) {
      {
        if ((Nn & Ya) !== xa || !(e.mode & mn))
          return;
        var t = e.tag;
        if (t !== b && t !== R && t !== T && t !== E && t !== B && t !== re && t !== pe)
          return;
        var i = Dt(e) || "ReactComponent";
        if (my !== null) {
          if (my.has(i))
            return;
          my.add(i);
        } else
          my = /* @__PURE__ */ new Set([i]);
        var o = Sn;
        try {
          Tt(e), v("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          o ? Tt(e) : Nt();
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
          if (Tm(), z2(), U3(e, t), Rx(t, o), t.mode & $n && z1(t), go(null, D3, null, e, t, i), $l()) {
            var c = Us();
            typeof c == "object" && c !== null && c._suppressLogging && typeof d == "object" && d !== null && !d._suppressLogging && (d._suppressLogging = !0);
          }
          throw d;
        }
      };
    }
    var gx = !1, Og;
    Og = /* @__PURE__ */ new Set();
    function LM(e) {
      if (Er && !CR())
        switch (e.tag) {
          case E:
          case B:
          case pe: {
            var t = jr && Dt(jr) || "Unknown", i = t;
            if (!Og.has(i)) {
              Og.add(i);
              var o = Dt(e) || "Unknown";
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
    function Cv(e, t) {
      if (ai) {
        var i = e.memoizedUpdaters;
        i.forEach(function(o) {
          tc(e, o, t);
        });
      }
    }
    var zg = {};
    function Lg(e, t) {
      {
        var i = oo.current;
        return i !== null ? (i.push(t), zg) : Bd(e, t);
      }
    }
    function Sx(e) {
      if (e !== zg)
        return oh(e);
    }
    function xx() {
      return oo.current !== null;
    }
    function AM(e) {
      {
        if (e.mode & mn) {
          if (!K3())
            return;
        } else if (!tM() || Nn !== xa || e.tag !== E && e.tag !== B && e.tag !== pe)
          return;
        if (oo.current === null) {
          var t = Sn;
          try {
            Tt(e), v(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Dt(e));
          } finally {
            t ? Tt(e) : Nt();
          }
        }
      }
    }
    function NM(e) {
      e.tag !== us && K3() && oo.current === null && v(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Tv(e) {
      rx = e;
    }
    var Dl = null, gd = null, UM = function(e) {
      Dl = e;
    };
    function Sd(e) {
      {
        if (Dl === null)
          return e;
        var t = Dl(e);
        return t === void 0 ? e : t.current;
      }
    }
    function Ag(e) {
      return Sd(e);
    }
    function Ng(e) {
      {
        if (Dl === null)
          return e;
        var t = Dl(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var i = Sd(e.render);
            if (e.render !== i) {
              var o = {
                $$typeof: ae,
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
        if (Dl === null)
          return !1;
        var i = e.elementType, o = t.type, c = !1, d = typeof o == "object" && o !== null ? o.$$typeof : null;
        switch (e.tag) {
          case T: {
            typeof o == "function" && (c = !0);
            break;
          }
          case E: {
            (typeof o == "function" || d === Ye) && (c = !0);
            break;
          }
          case B: {
            (d === ae || d === Ye) && (c = !0);
            break;
          }
          case re:
          case pe: {
            (d === Ae || d === Ye) && (c = !0);
            break;
          }
          default:
            return !1;
        }
        if (c) {
          var g = Dl(i);
          if (g !== void 0 && g === Dl(o))
            return !0;
        }
        return !1;
      }
    }
    function Cx(e) {
      {
        if (Dl === null || typeof WeakSet != "function")
          return;
        gd === null && (gd = /* @__PURE__ */ new WeakSet()), gd.add(e);
      }
    }
    var jM = function(e, t) {
      {
        if (Dl === null)
          return;
        var i = t.staleFamilies, o = t.updatedFamilies;
        Du(), ku(function() {
          Ug(e.current, o, i);
        });
      }
    }, FM = function(e, t) {
      {
        if (e.context !== tl)
          return;
        Du(), ku(function() {
          wv(t, e, null, null);
        });
      }
    };
    function Ug(e, t, i) {
      {
        var o = e.alternate, c = e.child, d = e.sibling, g = e.tag, x = e.type, w = null;
        switch (g) {
          case E:
          case pe:
          case T:
            w = x;
            break;
          case B:
            w = x.render;
            break;
        }
        if (Dl === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var k = !1, z = !1;
        if (w !== null) {
          var I = Dl(w);
          I !== void 0 && (i.has(I) ? z = !0 : t.has(I) && (g === T ? z = !0 : k = !0));
        }
        if (gd !== null && (gd.has(e) || o !== null && gd.has(o)) && (z = !0), z && (e._debugNeedsRemount = !0), z || k) {
          var $ = Ii(e, Ut);
          $ !== null && Ta($, e, Ut, ur);
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
          case E:
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
      this.tag = e, this.key = i, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = o, this.flags = mt, this.subtreeFlags = mt, this.deletions = null, this.lanes = Se, this.childLanes = Se, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !Fg && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var nl = function(e, t, i, o) {
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
        return Pg(e) ? T : E;
      if (e != null) {
        var t = e.$$typeof;
        if (t === ae)
          return B;
        if (t === Ae)
          return re;
      }
      return b;
    }
    function Ac(e, t) {
      var i = e.alternate;
      i === null ? (i = nl(e.tag, t, e.key, e.mode), i.elementType = e.elementType, i.type = e.type, i.stateNode = e.stateNode, i._debugSource = e._debugSource, i._debugOwner = e._debugOwner, i._debugHookTypes = e._debugHookTypes, i.alternate = e, e.alternate = i) : (i.pendingProps = t, i.type = e.type, i.flags = mt, i.subtreeFlags = mt, i.deletions = null, i.actualDuration = 0, i.actualStartTime = -1), i.flags = e.flags & $r, i.childLanes = e.childLanes, i.lanes = e.lanes, i.child = e.child, i.memoizedProps = e.memoizedProps, i.memoizedState = e.memoizedState, i.updateQueue = e.updateQueue;
      var o = e.dependencies;
      switch (i.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
      }, i.sibling = e.sibling, i.index = e.index, i.ref = e.ref, i.selfBaseDuration = e.selfBaseDuration, i.treeBaseDuration = e.treeBaseDuration, i._debugNeedsRemount = e._debugNeedsRemount, i.tag) {
        case b:
        case E:
        case pe:
          i.type = Sd(e.type);
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
      e.flags &= $r | Cr;
      var i = e.alternate;
      if (i === null)
        e.childLanes = Se, e.lanes = t, e.child = null, e.subtreeFlags = mt, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = i.childLanes, e.lanes = i.lanes, e.child = i.child, e.subtreeFlags = mt, e.deletions = null, e.memoizedProps = i.memoizedProps, e.memoizedState = i.memoizedState, e.updateQueue = i.updateQueue, e.type = i.type;
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
      return e === pm ? (o = mn, t === !0 && (o |= nr, o |= Vn)) : o = yt, ai && (o |= $n), nl(R, null, null, o);
    }
    function Hg(e, t, i, o, c, d) {
      var g = b, x = e;
      if (typeof e == "function")
        Pg(e) ? (g = T, x = Ag(x)) : x = Sd(x);
      else if (typeof e == "string")
        g = O;
      else
        e: switch (e) {
          case yn:
            return Es(i.children, c, d, t);
          case gn:
            g = j, c |= nr, (c & mn) !== yt && (c |= Vn);
            break;
          case en:
            return WM(i, c, d, t);
          case me:
            return QM(i, c, d, t);
          case xe:
            return GM(i, c, d, t);
          case Ft:
            return wx(i, c, d, t);
          case _t:
          // eslint-disable-next-line no-fallthrough
          case Ke:
          // eslint-disable-next-line no-fallthrough
          case sn:
          // eslint-disable-next-line no-fallthrough
          case rn:
          // eslint-disable-next-line no-fallthrough
          case at:
          // eslint-disable-next-line no-fallthrough
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case ft:
                  g = J;
                  break e;
                case A:
                  g = X;
                  break e;
                case ae:
                  g = B, x = Ng(x);
                  break e;
                case Ae:
                  g = re;
                  break e;
                case Ye:
                  g = ze, x = null;
                  break e;
              }
            var w = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (w += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var k = o ? Dt(o) : null;
              k && (w += `

Check the render method of \`` + k + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + w));
          }
        }
      var z = nl(g, i, t, c);
      return z.elementType = e, z.type = x, z.lanes = d, z._debugOwner = o, z;
    }
    function $g(e, t, i) {
      var o = null;
      o = e._owner;
      var c = e.type, d = e.key, g = e.props, x = Hg(c, d, g, o, t, i);
      return x._debugSource = e._source, x._debugOwner = e._owner, x;
    }
    function Es(e, t, i, o) {
      var c = nl(U, e, o, t);
      return c.lanes = i, c;
    }
    function WM(e, t, i, o) {
      typeof e.id != "string" && v('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var c = nl(ee, e, o, t | $n);
      return c.elementType = en, c.lanes = i, c.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, c;
    }
    function QM(e, t, i, o) {
      var c = nl(q, e, o, t);
      return c.elementType = me, c.lanes = i, c;
    }
    function GM(e, t, i, o) {
      var c = nl(Oe, e, o, t);
      return c.elementType = xe, c.lanes = i, c;
    }
    function wx(e, t, i, o) {
      var c = nl(fe, e, o, t);
      c.elementType = Ft, c.lanes = i;
      var d = {
        isHidden: !1
      };
      return c.stateNode = d, c;
    }
    function Vg(e, t, i) {
      var o = nl(L, e, null, t);
      return o.lanes = i, o;
    }
    function XM() {
      var e = nl(O, null, null, yt);
      return e.elementType = "DELETED", e;
    }
    function KM(e) {
      var t = nl(le, null, null, yt);
      return t.stateNode = e, t;
    }
    function Ig(e, t, i) {
      var o = e.children !== null ? e.children : [], c = nl(D, o, e.key, t);
      return c.lanes = i, c.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, c;
    }
    function Rx(e, t) {
      return e === null && (e = nl(b, null, null, yt)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function ZM(e, t, i, o, c) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = w0, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Hn, this.eventTimes = ec(Se), this.expirationTimes = ec(ur), this.pendingLanes = Se, this.suspendedLanes = Se, this.pingedLanes = Se, this.expiredLanes = Se, this.mutableReadLanes = Se, this.finishedLanes = Se, this.entangledLanes = Se, this.entanglements = ec(Se), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var d = this.pendingUpdatersLaneMap = [], g = 0; g < lu; g++)
          d.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case pm:
          this._debugRootType = i ? "hydrateRoot()" : "createRoot()";
          break;
        case us:
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
      return Lt(o), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: At,
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
        return tl;
      var t = Bu(e), i = Nw(t);
      if (t.tag === T) {
        var o = t.type;
        if (Uo(o))
          return e2(t, o, i);
      }
      return i;
    }
    function e_(e, t) {
      {
        var i = Bu(e);
        if (i === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var o = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + o);
        }
        var c = ni(i);
        if (c === null)
          return null;
        if (c.mode & nr) {
          var d = Dt(i) || "Component";
          if (!Yg[d]) {
            Yg[d] = !0;
            var g = Sn;
            try {
              Tt(c), i.mode & nr ? v("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d) : v("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d);
            } finally {
              g ? Tt(g) : Nt();
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
      var $ = I.current, Z = bi(), ne = Ss($), se = Ru(Z, ne);
      return se.callback = t ?? null, fs($, se, ne), oM(I, ne, Z), I;
    }
    function wv(e, t, i, o) {
      Wd(t, e);
      var c = t.current, d = bi(), g = Ss(c);
      wr(g);
      var x = Mx(i);
      t.context === null ? t.context = x : t.pendingContext = x, Er && Sn !== null && !qg && (qg = !0, v(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Dt(Sn) || "Unknown"));
      var w = Ru(d, g);
      w.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && v("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", o), w.callback = o);
      var k = fs(c, w, g);
      return k !== null && (Ta(k, c, g, d), _m(k, c, g)), g;
    }
    function yy(e) {
      var t = e.current;
      return t.child ? t.child.tag === O ? t.child.stateNode : t.child.stateNode : null;
    }
    function t_(e) {
      switch (e.tag) {
        case R: {
          var t = e.stateNode;
          if (Of(t)) {
            var i = ph(t);
            fM(t, i);
          }
          break;
        }
        case q: {
          ku(function() {
            var c = Ii(e, Ut);
            if (c !== null) {
              var d = bi();
              Ta(c, e, Ut, d);
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
      i !== null && i.dehydrated !== null && (i.retryLane = gh(i.retryLane, t));
    }
    function Wg(e, t) {
      Dx(e, t);
      var i = e.alternate;
      i && Dx(i, t);
    }
    function n_(e) {
      if (e.tag === q) {
        var t = Qs, i = Ii(e, t);
        if (i !== null) {
          var o = bi();
          Ta(i, e, t, o);
        }
        Wg(e, t);
      }
    }
    function r_(e) {
      if (e.tag === q) {
        var t = Ss(e), i = Ii(e, t);
        if (i !== null) {
          var o = bi();
          Ta(i, e, t, o);
        }
        Wg(e, t);
      }
    }
    function Ox(e) {
      var t = mr(e);
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
        var o = t[i], c = Ot(e) ? e.slice() : Ct({}, e);
        return i + 1 === t.length ? (Ot(c) ? c.splice(o, 1) : delete c[o], c) : (c[o] = Ix(e[o], t, i + 1), c);
      }, Bx = function(e, t) {
        return Ix(e, t, 0);
      }, qx = function(e, t, i, o) {
        var c = t[o], d = Ot(e) ? e.slice() : Ct({}, e);
        if (o + 1 === t.length) {
          var g = i[o];
          d[g] = d[c], Ot(d) ? d.splice(c, 1) : delete d[c];
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
        var c = t[i], d = Ot(e) ? e.slice() : Ct({}, e);
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
          c.memoizedState = d, c.baseState = d, e.memoizedProps = Ct({}, e.memoizedProps);
          var g = Ii(e, Ut);
          g !== null && Ta(g, e, Ut, ur);
        }
      }, Nx = function(e, t, i) {
        var o = Qg(e, t);
        if (o !== null) {
          var c = Bx(o.memoizedState, i);
          o.memoizedState = c, o.baseState = c, e.memoizedProps = Ct({}, e.memoizedProps);
          var d = Ii(e, Ut);
          d !== null && Ta(d, e, Ut, ur);
        }
      }, Ux = function(e, t, i, o) {
        var c = Qg(e, t);
        if (c !== null) {
          var d = Yx(c.memoizedState, i, o);
          c.memoizedState = d, c.baseState = d, e.memoizedProps = Ct({}, e.memoizedProps);
          var g = Ii(e, Ut);
          g !== null && Ta(g, e, Ut, ur);
        }
      }, jx = function(e, t, i) {
        e.pendingProps = Qx(e.memoizedProps, t, i), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Ii(e, Ut);
        o !== null && Ta(o, e, Ut, ur);
      }, Fx = function(e, t) {
        e.pendingProps = Bx(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ii(e, Ut);
        i !== null && Ta(i, e, Ut, ur);
      }, Px = function(e, t, i) {
        e.pendingProps = Yx(e.memoizedProps, t, i), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Ii(e, Ut);
        o !== null && Ta(o, e, Ut, ur);
      }, Hx = function(e) {
        var t = Ii(e, Ut);
        t !== null && Ta(t, e, Ut, ur);
      }, $x = function(e) {
        zx = e;
      }, Vx = function(e) {
        Lx = e;
      };
    }
    function l_(e) {
      var t = ni(e);
      return t === null ? null : t.stateNode;
    }
    function o_(e) {
      return null;
    }
    function u_() {
      return Sn;
    }
    function s_(e) {
      var t = e.findFiberByHostInstance, i = s.ReactCurrentDispatcher;
      return Wu({
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
    gy.prototype.render = Gg.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? v("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Sy(arguments[1]) ? v("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && v("You passed a second argument to root.render(...) but it only accepts one argument.");
        var i = t.containerInfo;
        if (i.nodeType !== Pr) {
          var o = Ox(t.current);
          o && o.parentNode !== i && v("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      wv(e, t, null, null);
    }, gy.prototype.unmount = Gg.prototype.unmount = function() {
      typeof arguments[0] == "function" && v("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        ox() && v("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), ku(function() {
          wv(null, e, null, null);
        }), GS(t);
      }
    };
    function c_(e, t) {
      if (!Sy(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      Xx(e);
      var i = !1, o = !1, c = "", d = Gx;
      t != null && (t.hydrate ? y("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Yt && v(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (i = !0), t.identifierPrefix !== void 0 && (c = t.identifierPrefix), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var g = _x(e, pm, null, i, o, c, d);
      lm(g.current, e);
      var x = e.nodeType === Pr ? e.parentNode : e;
      return Dp(x), new Gg(g);
    }
    function gy(e) {
      this._internalRoot = e;
    }
    function f_(e) {
      e && _h(e);
    }
    gy.prototype.unstable_scheduleHydration = f_;
    function d_(e, t, i) {
      if (!Sy(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      Xx(e), t === void 0 && v("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var o = i ?? null, c = i != null && i.hydratedSources || null, d = !1, g = !1, x = "", w = Gx;
      i != null && (i.unstable_strictMode === !0 && (d = !0), i.identifierPrefix !== void 0 && (x = i.identifierPrefix), i.onRecoverableError !== void 0 && (w = i.onRecoverableError));
      var k = kx(t, null, e, pm, o, d, g, x, w);
      if (lm(k.current, e), Dp(e), c)
        for (var z = 0; z < c.length; z++) {
          var I = c[z];
          mR(k, I);
        }
      return new gy(k);
    }
    function Sy(e) {
      return !!(e && (e.nodeType === Ja || e.nodeType === Hl || e.nodeType === zd));
    }
    function Rv(e) {
      return !!(e && (e.nodeType === Ja || e.nodeType === Hl || e.nodeType === zd || e.nodeType === Pr && e.nodeValue === " react-mount-point-unstable "));
    }
    function Xx(e) {
      e.nodeType === Ja && e.tagName && e.tagName.toUpperCase() === "BODY" && v("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), $p(e) && (e._reactRootContainer ? v("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : v("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var p_ = s.ReactCurrentOwner, Kx;
    Kx = function(e) {
      if (e._reactRootContainer && e.nodeType !== Pr) {
        var t = Ox(e._reactRootContainer.current);
        t && t.parentNode !== e && v("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var i = !!e._reactRootContainer, o = Xg(e), c = !!(o && ls(o));
      c && !i && v("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Ja && e.tagName && e.tagName.toUpperCase() === "BODY" && v("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function Xg(e) {
      return e ? e.nodeType === Hl ? e.documentElement : e.firstChild : null;
    }
    function Zx() {
    }
    function v_(e, t, i, o, c) {
      if (c) {
        if (typeof o == "function") {
          var d = o;
          o = function() {
            var $ = yy(g);
            d.call($);
          };
        }
        var g = kx(
          t,
          o,
          e,
          us,
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
        e._reactRootContainer = g, lm(g.current, e);
        var x = e.nodeType === Pr ? e.parentNode : e;
        return Dp(x), ku(), g;
      } else {
        for (var w; w = e.lastChild; )
          e.removeChild(w);
        if (typeof o == "function") {
          var k = o;
          o = function() {
            var $ = yy(z);
            k.call($);
          };
        }
        var z = _x(
          e,
          us,
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
        e._reactRootContainer = z, lm(z.current, e);
        var I = e.nodeType === Pr ? e.parentNode : e;
        return Dp(I), ku(function() {
          wv(t, z, i, o);
        }), z;
      }
    }
    function h_(e, t) {
      e !== null && typeof e != "function" && v("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function xy(e, t, i, o, c) {
      Kx(i), h_(c === void 0 ? null : c, "render");
      var d = i._reactRootContainer, g;
      if (!d)
        g = v_(i, t, e, c, o);
      else {
        if (g = d, typeof c == "function") {
          var x = c;
          c = function() {
            var w = yy(g);
            x.call(w);
          };
        }
        wv(t, g, e, c);
      }
      return yy(g);
    }
    var Jx = !1;
    function m_(e) {
      {
        Jx || (Jx = !0, v("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = p_.current;
        if (t !== null && t.stateNode !== null) {
          var i = t.stateNode._warnedAboutRefsInRender;
          i || v("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", pn(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Ja ? e : e_(e, "findDOMNode");
    }
    function y_(e, t, i) {
      if (v("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Rv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = $p(t) && t._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return xy(null, e, t, !0, i);
    }
    function g_(e, t, i) {
      if (v("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Rv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = $p(t) && t._reactRootContainer === void 0;
        o && v("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return xy(null, e, t, !1, i);
    }
    function S_(e, t, i, o) {
      if (v("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Rv(i))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !Wy(e))
        throw new Error("parentComponent must be a valid React Component");
      return xy(e, t, i, !1, o);
    }
    var eE = !1;
    function x_(e) {
      if (eE || (eE = !0, v("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Rv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = $p(e) && e._reactRootContainer === void 0;
        t && v("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var i = Xg(e), o = i && !ls(i);
          o && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return ku(function() {
          xy(null, null, e, !1, function() {
            e._reactRootContainer = null, GS(e);
          });
        }), !0;
      } else {
        {
          var c = Xg(e), d = !!(c && ls(c)), g = e.nodeType === Ja && Rv(e.parentNode) && !!e.parentNode._reactRootContainer;
          d && v("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", g ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Oa(t_), Ku(n_), wh(r_), ic(Hi), pp(Eh), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && v("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), Wc(CT), Yy(Mg, dM, ku);
    function E_(e, t) {
      var i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Sy(t))
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
      Events: [ls, Xf, om, Hu, Qc, Mg]
    };
    function T_(e, t) {
      return Kg.usingClientEntryPoint || v('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), c_(e, t);
    }
    function w_(e, t, i) {
      return Kg.usingClientEntryPoint || v('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), d_(e, t, i);
    }
    function R_(e) {
      return ox() && v("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), ku(e);
    }
    var b_ = s_({
      findFiberByHostInstance: Sc,
      bundleType: 1,
      version: Bg,
      rendererPackageName: "react-dom"
    });
    if (!b_ && kn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var tE = window.location.protocol;
      /^(https?|file):$/.test(tE) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (tE === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Qi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Kg, Qi.createPortal = E_, Qi.createRoot = T_, Qi.findDOMNode = m_, Qi.flushSync = R_, Qi.hydrate = y_, Qi.hydrateRoot = w_, Qi.render = g_, Qi.unmountComponentAtNode = x_, Qi.unstable_batchedUpdates = Mg, Qi.unstable_renderSubtreeIntoContainer = C_, Qi.version = Bg, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })()), Qi;
}
var mE;
function v4() {
  if (mE) return Ty.exports;
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
  return process.env.NODE_ENV === "production" ? (n(), Ty.exports = d4()) : Ty.exports = p4(), Ty.exports;
}
var yE;
function h4() {
  if (yE) return Cd;
  yE = 1;
  var n = v4();
  if (process.env.NODE_ENV === "production")
    Cd.createRoot = n.createRoot, Cd.hydrateRoot = n.hydrateRoot;
  else {
    var l = n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    Cd.createRoot = function(s, p) {
      l.usingClientEntryPoint = !0;
      try {
        return n.createRoot(s, p);
      } finally {
        l.usingClientEntryPoint = !1;
      }
    }, Cd.hydrateRoot = function(s, p, h) {
      l.usingClientEntryPoint = !0;
      try {
        return n.hydrateRoot(s, p, h);
      } finally {
        l.usingClientEntryPoint = !1;
      }
    };
  }
  return Cd;
}
var m4 = h4();
const Cs = (n) => typeof n != "number" ? "N/A" : `${Math.round(n)} ms`;
function y4({ viewport: n }) {
  const [l, s] = Ed.useState({
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
  }), [p, h] = Ed.useState(() => localStorage.getItem("s3d-debug-open") === "true"), [y, v] = Ed.useState(!1);
  Ed.useEffect(() => {
    const E = () => {
      n && n.renderer && v(!!n.renderer.wireframe);
    };
    E();
    const T = setInterval(E, 500);
    return () => clearInterval(T);
  }, [n]), Ed.useEffect(() => {
    localStorage.setItem("s3d-debug-open", p);
  }, [p]), Ed.useEffect(() => {
    let E = 0;
    const T = setInterval(() => {
      if (n) {
        const b = n.lastRenderStats || {};
        E = Math.max(E, b.fps || 0), s({
          fps: b.fps || 0,
          maxFps: E,
          totalObjects: b.totalObjects || 0,
          visibleObjects: b.visibleObjects || 0,
          faces: b.faces || 0,
          sortTime: b.sortTime || 0,
          cullTime: b.cullTime || 0,
          groupTime: b.groupTime || 0,
          processTime: b.processTime || 0,
          drawTime: b.drawTime || 0,
          updateTime: b.updateTime || 0,
          retrieveTime: b.retrieveTime || 0,
          frameTime: b.frameTime || 0,
          drawCalls: b.drawCalls || 0,
          dt: b.dt || 0
        });
      }
    }, 100);
    return () => clearInterval(T);
  }, [n]);
  const C = () => {
    const E = !y;
    v(E), n && n.renderer && (n.renderer.wireframe = E), window.dispatchEvent(new CustomEvent("s3d-wireframe-change", {
      detail: { enabled: E }
    }));
  };
  return /* @__PURE__ */ zt.jsxs("div", { className: "s3d-debug-container s3d-flex s3d-flex-col s3d-items-end s3d-gap-2 s3d-font-sans", children: [
    /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-gap-2", children: [
      /* @__PURE__ */ zt.jsx(
        "button",
        {
          onClick: C,
          title: "Toggle Wireframe",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${y ? "s3d-bg-blue-600/80 s3d-border-blue-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ zt.jsx("svg", { className: "s3d-w-5 s3d-h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ zt.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25m-9-5.25v9l9 5.25M12 12.75v9" }) })
        }
      ),
      /* @__PURE__ */ zt.jsx(
        "button",
        {
          onClick: () => h(!p),
          title: "Toggle Diagnostics",
          className: `s3d-p-2 s3d-rounded-lg s3d-border s3d-transition-colors s3d-duration-200 ${p ? "s3d-bg-emerald-600/80 s3d-border-emerald-400 s3d-text-white" : "s3d-bg-slate-900/80 s3d-border-slate-700/50 s3d-text-slate-400 hover:s3d-text-slate-200 hover:s3d-bg-slate-800/80"} s3d-backdrop-blur-md s3d-shadow-lg`,
          children: /* @__PURE__ */ zt.jsx("svg", { className: "s3d-w-5 s3d-h-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5, children: /* @__PURE__ */ zt.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9zm0 0v3m-6.36 1.36l2.12 2.12M12 12l3.54-3.54" }) })
        }
      )
    ] }),
    p && /* @__PURE__ */ zt.jsxs("div", { className: "s3d-w-56 s3d-bg-slate-900/85 s3d-backdrop-blur-md s3d-border s3d-border-slate-700/50 s3d-rounded-lg s3d-p-3 s3d-shadow-2xl s3d-text-slate-300 s3d-flex s3d-flex-col", children: [
      /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-justify-between s3d-items-center s3d-border-b s3d-border-slate-800 s3d-pb-1.5 s3d-mb-2.5", children: [
        /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide s3d-font-semibold", children: "FPS / FPS (max)" }),
        /* @__PURE__ */ zt.jsxs("span", { className: "s3d-font-mono s3d-text-sm s3d-font-semibold", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-emerald-400", children: l.fps }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500", children: " / " }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-200", children: l.maxFps })
        ] })
      ] }),
      /* @__PURE__ */ zt.jsxs("div", { className: "s3d-grid s3d-grid-cols-2 s3d-gap-y-2.5 s3d-gap-x-3 s3d-text-[11px]", children: [
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Device DPR" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: (window.devicePixelRatio || 1).toFixed(2) })
        ] }),
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Scene)" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: l.totalObjects })
        ] }),
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Objects (Screen)" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: l.visibleObjects })
        ] }),
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Faces (screen)" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-semibold s3d-text-slate-200", children: l.faces })
        ] }),
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Update" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Cs(l.updateTime) })
        ] }),
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Scene Retrieval" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Cs(l.retrieveTime) })
        ] }),
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Object Culling" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Cs(l.cullTime) })
        ] }),
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Layer Grouping" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Cs(l.groupTime) })
        ] }),
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Process Meshes" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Cs(l.processTime) })
        ] }),
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Sort Faces" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Cs(l.sortTime) })
        ] }),
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Rasterize Faces" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Cs(l.drawTime) })
        ] }),
        /* @__PURE__ */ zt.jsxs("div", { className: "s3d-flex s3d-flex-col", children: [
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-text-slate-500 s3d-text-[9px] s3d-uppercase s3d-tracking-wide", children: "Render (total)" }),
          /* @__PURE__ */ zt.jsx("span", { className: "s3d-font-mono s3d-text-xs s3d-font-medium s3d-text-slate-200", children: Cs(l.dt) })
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
  p = document.createElement("div"), p.id = "s3d-debug-root", p.className = "s3d-absolute s3d-top-4 s3d-right-4 s3d-z-[99999]", s.appendChild(p), m4.createRoot(p).render(/* @__PURE__ */ zt.jsx(y4, { viewport: n }));
}
const C4 = window.scaliaEngine = {
  config: wd,
  Game: EE,
  GameObject: ki,
  Component: cr,
  Camera: UC,
  CameraComponent: Yn,
  MeshComponent: oa,
  TransformComponent: Ny,
  SpriteRenderer: hS,
  glMatrix: Iz,
  PathRenderer: mS,
  TextRenderer: yS,
  Plane: jC,
  Box: FC,
  Cone: PC,
  Ball: ES,
  Light: Rd,
  Canvas2dViewport: $C,
  showDebug: g4
};
export {
  C4 as default
};
