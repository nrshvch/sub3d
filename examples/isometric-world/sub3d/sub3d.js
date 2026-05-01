const Ir = {
  depthSortingMask: parseInt("11", 2),
  //bitmask, bit per layer
  layerStrokeMask: parseInt("11", 2),
  //bitmask, bit per layer
  layerClearMask: parseInt("11", 2),
  //bitmask, bit per layer
  layersCount: 2,
  debug: !0
};
function xe() {
  this.now = Date.now();
}
var Qr = xe.prototype;
Qr.time = 0;
Qr.now = 0;
Qr.dt = 60;
function pe() {
  this.gameObjects = [];
}
var Wr = pe.prototype;
Wr.gameObjects = null;
Wr.addGameObject = function(n) {
  this.gameObjects[this.gameObjects.length++] = n, n.setScene(this);
};
Wr.removeGameObject = function(n) {
  this.gameObjects[this.gameObjects.indexOf(n)] = this.gameObjects[this.gameObjects.length - 1], this.gameObjects.length -= 1;
};
Wr.retrieve = function() {
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
function Ae(n) {
  this.time = new xe(), this.list = [], this.scene = new pe();
}
var jr = Ae.prototype;
jr.scene = null;
jr.time = null;
jr.tickRegister = function(n) {
  n._tickerIndex === void 0 && (n._tickerIndex = this.list.length, this.list.push(n));
};
jr.tickUnregister = function(n) {
  const r = n._tickerIndex;
  if (r === void 0) return;
  const e = this.list.pop();
  e !== n && (this.list[r] = e, e._tickerIndex = r), n._tickerIndex = void 0;
};
jr.update = function(n) {
  const r = this.list;
  for (let e = 0; e < r.length; e++)
    r[e].tick(n);
};
jr.tick = function() {
  for (var n = Date.now(), r = 0, e = n - this.time.now, t = this.time.dt; e >= t && (e -= t, this.time.now += t, this.time.time += t, this.update(this.time), !(r++ > 200)); )
    ;
};
function we() {
  this.world = new Ae();
  var n = this.world;
  this.tick = function r() {
    n.tick(), requestAnimationFrame(r);
  };
}
var Zr = we.prototype;
Zr.world = null;
Zr.render = null;
Zr.run = function() {
  this.tick();
};
Zr.rafHandler = null;
function an() {
}
var Pr = an.prototype;
Pr.gameObject = null;
Pr.enabled = !0;
Pr.setGameObject = function(n) {
  this.gameObject = n;
};
Pr.unsetGameObject = function() {
  this.gameObject = null;
};
function D1(n, r, e, t, s, a) {
  return n[r] = a[0] * e + a[4] * t + a[8] * s + a[12], n[r + 1] = a[1] * e + a[5] * t + a[9] * s + a[13], n[r + 2] = a[2] * e + a[6] * t + a[10] * s + a[14], n;
}
function k1(n, r, e, t, s, a) {
  return n[r] = a[0] * e + a[4] * t + a[8] * s + a[12], n[r + 1] = a[1] * e + a[5] * t + a[9] * s + a[13], n;
}
function Gr(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], M = r[9], d = r[10], y = r[11], o = r[12], m = r[13], x = r[14], $ = r[15], w = e[0], p = e[1], z = e[2], A = e[3];
  return n[0] = w * t + p * c + z * v + A * o, n[1] = w * s + p * l + z * M + A * m, n[2] = w * a + p * h + z * d + A * x, n[3] = w * i + p * f + z * y + A * $, w = e[4], p = e[5], z = e[6], A = e[7], n[4] = w * t + p * c + z * v + A * o, n[5] = w * s + p * l + z * M + A * m, n[6] = w * a + p * h + z * d + A * x, n[7] = w * i + p * f + z * y + A * $, w = e[8], p = e[9], z = e[10], A = e[11], n[8] = w * t + p * c + z * v + A * o, n[9] = w * s + p * l + z * M + A * m, n[10] = w * a + p * h + z * d + A * x, n[11] = w * i + p * f + z * y + A * $, w = e[12], p = e[13], z = e[14], A = e[15], n[12] = w * t + p * c + z * v + A * o, n[13] = w * s + p * l + z * M + A * m, n[14] = w * a + p * h + z * d + A * x, n[15] = w * i + p * f + z * y + A * $, n;
}
var C = 1e-6, N = typeof Float32Array < "u" ? Float32Array : Array, or = Math.random, ge = "zyx";
function xr(n) {
  return n >= 0 ? Math.round(n) : n % 0.5 === 0 ? Math.floor(n) : Math.round(n);
}
function U1(n) {
  N = n;
}
var V1 = Math.PI / 180, N1 = 180 / Math.PI;
function X1(n) {
  return n * V1;
}
function _1(n) {
  return n * N1;
}
function K1(n, r) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : C;
  return Math.abs(n - r) <= e * Math.max(1, Math.abs(n), Math.abs(r));
}
const Q1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ANGLE_ORDER: ge,
  get ARRAY_TYPE() {
    return N;
  },
  EPSILON: C,
  RANDOM: or,
  equals: K1,
  round: xr,
  setMatrixArrayType: U1,
  toDegree: _1,
  toRadian: X1
}, Symbol.toStringTag, { value: "Module" }));
function H1() {
  var n = new N(4);
  return N != Float32Array && (n[1] = 0, n[2] = 0), n[0] = 1, n[3] = 1, n;
}
function J1(n) {
  var r = new N(4);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function u1(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function nt(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function rt(n, r, e, t) {
  var s = new N(4);
  return s[0] = n, s[1] = r, s[2] = e, s[3] = t, s;
}
function et(n, r, e, t, s) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n;
}
function tt(n, r) {
  if (n === r) {
    var e = r[1];
    n[1] = r[2], n[2] = e;
  } else
    n[0] = r[0], n[1] = r[2], n[2] = r[1], n[3] = r[3];
  return n;
}
function st(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e * a - s * t;
  return i ? (i = 1 / i, n[0] = a * i, n[1] = -t * i, n[2] = -s * i, n[3] = e * i, n) : null;
}
function at(n, r) {
  var e = r[0];
  return n[0] = r[3], n[1] = -r[1], n[2] = -r[2], n[3] = e, n;
}
function it(n) {
  return n[0] * n[3] - n[2] * n[1];
}
function ze(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return n[0] = t * c + a * l, n[1] = s * c + i * l, n[2] = t * h + a * f, n[3] = s * h + i * f, n;
}
function ct(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l + a * c, n[1] = s * l + i * c, n[2] = t * -c + a * l, n[3] = s * -c + i * l, n;
}
function lt(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1];
  return n[0] = t * c, n[1] = s * c, n[2] = a * l, n[3] = i * l, n;
}
function ht(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = -e, n[3] = t, n;
}
function ft(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = r[1], n;
}
function vt(n) {
  return "mat2(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
function Mt(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3]);
}
function dt(n, r, e, t) {
  return n[2] = t[2] / t[0], e[0] = t[0], e[1] = t[1], e[3] = t[3] - n[2] * e[1], [n, r, e];
}
function mt(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n;
}
function $e(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n;
}
function yt(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3];
}
function ot(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = r[0], c = r[1], l = r[2], h = r[3];
  return Math.abs(e - i) <= C * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= C * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(s - l) <= C * Math.max(1, Math.abs(s), Math.abs(l)) && Math.abs(a - h) <= C * Math.max(1, Math.abs(a), Math.abs(h));
}
function xt(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n;
}
function pt(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n;
}
var At = ze, wt = $e;
const gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: dt,
  add: mt,
  adjoint: at,
  clone: J1,
  copy: u1,
  create: H1,
  determinant: it,
  equals: ot,
  exactEquals: yt,
  frob: Mt,
  fromRotation: ht,
  fromScaling: ft,
  fromValues: rt,
  identity: nt,
  invert: st,
  mul: At,
  multiply: ze,
  multiplyScalar: xt,
  multiplyScalarAndAdd: pt,
  rotate: ct,
  scale: lt,
  set: et,
  str: vt,
  sub: wt,
  subtract: $e,
  transpose: tt
}, Symbol.toStringTag, { value: "Module" }));
function zt() {
  var n = new N(6);
  return N != Float32Array && (n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0), n[0] = 1, n[3] = 1, n;
}
function $t(n) {
  var r = new N(6);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r;
}
function bt(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n;
}
function qt(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function St(n, r, e, t, s, a) {
  var i = new N(6);
  return i[0] = n, i[1] = r, i[2] = e, i[3] = t, i[4] = s, i[5] = a, i;
}
function It(n, r, e, t, s, a, i) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n;
}
function Ot(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = e * a - t * s;
  return l ? (l = 1 / l, n[0] = a * l, n[1] = -t * l, n[2] = -s * l, n[3] = e * l, n[4] = (s * c - a * i) * l, n[5] = (t * i - e * c) * l, n) : null;
}
function jt(n) {
  return n[0] * n[3] - n[1] * n[2];
}
function be(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = e[0], f = e[1], v = e[2], M = e[3], d = e[4], y = e[5];
  return n[0] = t * h + a * f, n[1] = s * h + i * f, n[2] = t * v + a * M, n[3] = s * v + i * M, n[4] = t * d + a * y + c, n[5] = s * d + i * y + l, n;
}
function Ct(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = Math.sin(e), f = Math.cos(e);
  return n[0] = t * f + a * h, n[1] = s * f + i * h, n[2] = t * -h + a * f, n[3] = s * -h + i * f, n[4] = c, n[5] = l, n;
}
function Tt(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = e[0], f = e[1];
  return n[0] = t * h, n[1] = s * h, n[2] = a * f, n[3] = i * f, n[4] = c, n[5] = l, n;
}
function Rt(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = e[0], f = e[1];
  return n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = t * h + a * f + c, n[5] = s * h + i * f + l, n;
}
function Et(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = -e, n[3] = t, n[4] = 0, n[5] = 0, n;
}
function Ft(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = r[1], n[4] = 0, n[5] = 0, n;
}
function Yt(n, r) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = r[0], n[5] = r[1], n;
}
function Lt(n) {
  return "mat2d(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ")";
}
function Bt(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + 1);
}
function Wt(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n;
}
function qe(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n[4] = r[4] - e[4], n[5] = r[5] - e[5], n;
}
function Zt(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n;
}
function Pt(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n[4] = r[4] + e[4] * t, n[5] = r[5] + e[5] * t, n;
}
function Gt(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5];
}
function Dt(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = r[0], h = r[1], f = r[2], v = r[3], M = r[4], d = r[5];
  return Math.abs(e - l) <= C * Math.max(1, Math.abs(e), Math.abs(l)) && Math.abs(t - h) <= C * Math.max(1, Math.abs(t), Math.abs(h)) && Math.abs(s - f) <= C * Math.max(1, Math.abs(s), Math.abs(f)) && Math.abs(a - v) <= C * Math.max(1, Math.abs(a), Math.abs(v)) && Math.abs(i - M) <= C * Math.max(1, Math.abs(i), Math.abs(M)) && Math.abs(c - d) <= C * Math.max(1, Math.abs(c), Math.abs(d));
}
var kt = be, Ut = qe;
const Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Wt,
  clone: $t,
  copy: bt,
  create: zt,
  determinant: jt,
  equals: Dt,
  exactEquals: Gt,
  frob: Bt,
  fromRotation: Et,
  fromScaling: Ft,
  fromTranslation: Yt,
  fromValues: St,
  identity: qt,
  invert: Ot,
  mul: kt,
  multiply: be,
  multiplyScalar: Zt,
  multiplyScalarAndAdd: Pt,
  rotate: Ct,
  scale: Tt,
  set: It,
  str: Lt,
  sub: Ut,
  subtract: qe,
  translate: Rt
}, Symbol.toStringTag, { value: "Module" }));
function Se() {
  var n = new N(9);
  return N != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[0] = 1, n[4] = 1, n[8] = 1, n;
}
function Nt(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[4], n[4] = r[5], n[5] = r[6], n[6] = r[8], n[7] = r[9], n[8] = r[10], n;
}
function Xt(n) {
  var r = new N(9);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r;
}
function _t(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n;
}
function Kt(n, r, e, t, s, a, i, c, l) {
  var h = new N(9);
  return h[0] = n, h[1] = r, h[2] = e, h[3] = t, h[4] = s, h[5] = a, h[6] = i, h[7] = c, h[8] = l, h;
}
function Qt(n, r, e, t, s, a, i, c, l, h) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n[6] = c, n[7] = l, n[8] = h, n;
}
function Ht(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 1, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function Jt(n, r) {
  if (n === r) {
    var e = r[1], t = r[2], s = r[5];
    n[1] = r[3], n[2] = r[6], n[3] = e, n[5] = r[7], n[6] = t, n[7] = s;
  } else
    n[0] = r[0], n[1] = r[3], n[2] = r[6], n[3] = r[1], n[4] = r[4], n[5] = r[7], n[6] = r[2], n[7] = r[5], n[8] = r[8];
  return n;
}
function ut(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = f * i - c * h, M = -f * a + c * l, d = h * a - i * l, y = e * v + t * M + s * d;
  return y ? (y = 1 / y, n[0] = v * y, n[1] = (-f * t + s * h) * y, n[2] = (c * t - s * i) * y, n[3] = M * y, n[4] = (f * e - s * l) * y, n[5] = (-c * e + s * a) * y, n[6] = d * y, n[7] = (-h * e + t * l) * y, n[8] = (i * e - t * a) * y, n) : null;
}
function n0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8];
  return n[0] = i * f - c * h, n[1] = s * h - t * f, n[2] = t * c - s * i, n[3] = c * l - a * f, n[4] = e * f - s * l, n[5] = s * a - e * c, n[6] = a * h - i * l, n[7] = t * l - e * h, n[8] = e * i - t * a, n;
}
function r0(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3], a = n[4], i = n[5], c = n[6], l = n[7], h = n[8];
  return r * (h * a - i * l) + e * (-h * s + i * c) + t * (l * s - a * c);
}
function Ie(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], M = e[0], d = e[1], y = e[2], o = e[3], m = e[4], x = e[5], $ = e[6], w = e[7], p = e[8];
  return n[0] = M * t + d * i + y * h, n[1] = M * s + d * c + y * f, n[2] = M * a + d * l + y * v, n[3] = o * t + m * i + x * h, n[4] = o * s + m * c + x * f, n[5] = o * a + m * l + x * v, n[6] = $ * t + w * i + p * h, n[7] = $ * s + w * c + p * f, n[8] = $ * a + w * l + p * v, n;
}
function e0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], M = e[0], d = e[1];
  return n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = c, n[5] = l, n[6] = M * t + d * i + h, n[7] = M * s + d * c + f, n[8] = M * a + d * l + v, n;
}
function t0(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], M = Math.sin(e), d = Math.cos(e);
  return n[0] = d * t + M * i, n[1] = d * s + M * c, n[2] = d * a + M * l, n[3] = d * i - M * t, n[4] = d * c - M * s, n[5] = d * l - M * a, n[6] = h, n[7] = f, n[8] = v, n;
}
function s0(n, r, e) {
  var t = e[0], s = e[1];
  return n[0] = t * r[0], n[1] = t * r[1], n[2] = t * r[2], n[3] = s * r[3], n[4] = s * r[4], n[5] = s * r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n;
}
function a0(n, r) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 1, n[5] = 0, n[6] = r[0], n[7] = r[1], n[8] = 1, n;
}
function i0(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = 0, n[3] = -e, n[4] = t, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function c0(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = r[1], n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 1, n;
}
function l0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = 0, n[3] = r[2], n[4] = r[3], n[5] = 0, n[6] = r[4], n[7] = r[5], n[8] = 1, n;
}
function h0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e + e, c = t + t, l = s + s, h = e * i, f = t * i, v = t * c, M = s * i, d = s * c, y = s * l, o = a * i, m = a * c, x = a * l;
  return n[0] = 1 - v - y, n[3] = f - x, n[6] = M + m, n[1] = f + x, n[4] = 1 - h - y, n[7] = d - o, n[2] = M - m, n[5] = d + o, n[8] = 1 - h - v, n;
}
function f0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], M = r[10], d = r[11], y = r[12], o = r[13], m = r[14], x = r[15], $ = e * c - t * i, w = e * l - s * i, p = e * h - a * i, z = t * l - s * c, A = t * h - a * c, R = s * h - a * l, E = f * o - v * y, b = f * m - M * y, g = f * x - d * y, j = v * m - M * o, O = v * x - d * o, S = M * x - d * m, I = $ * S - w * O + p * j + z * g - A * b + R * E;
  return I ? (I = 1 / I, n[0] = (c * S - l * O + h * j) * I, n[1] = (l * g - i * S - h * b) * I, n[2] = (i * O - c * g + h * E) * I, n[3] = (s * O - t * S - a * j) * I, n[4] = (e * S - s * g + a * b) * I, n[5] = (t * g - e * O - a * E) * I, n[6] = (o * R - m * A + x * z) * I, n[7] = (m * p - y * R - x * w) * I, n[8] = (y * A - o * p + x * $) * I, n) : null;
}
function v0(n, r, e) {
  return n[0] = 2 / r, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = -2 / e, n[5] = 0, n[6] = -1, n[7] = 1, n[8] = 1, n;
}
function M0(n) {
  return "mat3(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ", " + n[8] + ")";
}
function d0(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + n[6] * n[6] + n[7] * n[7] + n[8] * n[8]);
}
function m0(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n[8] = r[8] + e[8], n;
}
function Oe(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n[4] = r[4] - e[4], n[5] = r[5] - e[5], n[6] = r[6] - e[6], n[7] = r[7] - e[7], n[8] = r[8] - e[8], n;
}
function y0(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n[6] = r[6] * e, n[7] = r[7] * e, n[8] = r[8] * e, n;
}
function o0(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n[4] = r[4] + e[4] * t, n[5] = r[5] + e[5] * t, n[6] = r[6] + e[6] * t, n[7] = r[7] + e[7] * t, n[8] = r[8] + e[8] * t, n;
}
function x0(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5] && n[6] === r[6] && n[7] === r[7] && n[8] === r[8];
}
function p0(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = r[0], M = r[1], d = r[2], y = r[3], o = r[4], m = r[5], x = r[6], $ = r[7], w = r[8];
  return Math.abs(e - v) <= C * Math.max(1, Math.abs(e), Math.abs(v)) && Math.abs(t - M) <= C * Math.max(1, Math.abs(t), Math.abs(M)) && Math.abs(s - d) <= C * Math.max(1, Math.abs(s), Math.abs(d)) && Math.abs(a - y) <= C * Math.max(1, Math.abs(a), Math.abs(y)) && Math.abs(i - o) <= C * Math.max(1, Math.abs(i), Math.abs(o)) && Math.abs(c - m) <= C * Math.max(1, Math.abs(c), Math.abs(m)) && Math.abs(l - x) <= C * Math.max(1, Math.abs(l), Math.abs(x)) && Math.abs(h - $) <= C * Math.max(1, Math.abs(h), Math.abs($)) && Math.abs(f - w) <= C * Math.max(1, Math.abs(f), Math.abs(w));
}
var A0 = Ie, w0 = Oe;
const g0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: m0,
  adjoint: n0,
  clone: Xt,
  copy: _t,
  create: Se,
  determinant: r0,
  equals: p0,
  exactEquals: x0,
  frob: d0,
  fromMat2d: l0,
  fromMat4: Nt,
  fromQuat: h0,
  fromRotation: i0,
  fromScaling: c0,
  fromTranslation: a0,
  fromValues: Kt,
  identity: Ht,
  invert: ut,
  mul: A0,
  multiply: Ie,
  multiplyScalar: y0,
  multiplyScalarAndAdd: o0,
  normalFromMat4: f0,
  projection: v0,
  rotate: t0,
  scale: s0,
  set: Qt,
  str: M0,
  sub: w0,
  subtract: Oe,
  translate: e0,
  transpose: Jt
}, Symbol.toStringTag, { value: "Module" }));
function z0() {
  var n = new N(16);
  return N != Float32Array && (n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0), n[0] = 1, n[5] = 1, n[10] = 1, n[15] = 1, n;
}
function $0(n) {
  var r = new N(16);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r[8] = n[8], r[9] = n[9], r[10] = n[10], r[11] = n[11], r[12] = n[12], r[13] = n[13], r[14] = n[14], r[15] = n[15], r;
}
function b0(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function q0(n, r, e, t, s, a, i, c, l, h, f, v, M, d, y, o) {
  var m = new N(16);
  return m[0] = n, m[1] = r, m[2] = e, m[3] = t, m[4] = s, m[5] = a, m[6] = i, m[7] = c, m[8] = l, m[9] = h, m[10] = f, m[11] = v, m[12] = M, m[13] = d, m[14] = y, m[15] = o, m;
}
function S0(n, r, e, t, s, a, i, c, l, h, f, v, M, d, y, o, m) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n[6] = c, n[7] = l, n[8] = h, n[9] = f, n[10] = v, n[11] = M, n[12] = d, n[13] = y, n[14] = o, n[15] = m, n;
}
function Hr(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function I0(n, r) {
  if (n === r) {
    var e = r[1], t = r[2], s = r[3], a = r[6], i = r[7], c = r[11];
    n[1] = r[4], n[2] = r[8], n[3] = r[12], n[4] = e, n[6] = r[9], n[7] = r[13], n[8] = t, n[9] = a, n[11] = r[14], n[12] = s, n[13] = i, n[14] = c;
  } else
    n[0] = r[0], n[1] = r[4], n[2] = r[8], n[3] = r[12], n[4] = r[1], n[5] = r[5], n[6] = r[9], n[7] = r[13], n[8] = r[2], n[9] = r[6], n[10] = r[10], n[11] = r[14], n[12] = r[3], n[13] = r[7], n[14] = r[11], n[15] = r[15];
  return n;
}
function je(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], M = r[10], d = r[11], y = r[12], o = r[13], m = r[14], x = r[15], $ = e * c - t * i, w = e * l - s * i, p = e * h - a * i, z = t * l - s * c, A = t * h - a * c, R = s * h - a * l, E = f * o - v * y, b = f * m - M * y, g = f * x - d * y, j = v * m - M * o, O = v * x - d * o, S = M * x - d * m, I = $ * S - w * O + p * j + z * g - A * b + R * E;
  return I ? (I = 1 / I, n[0] = (c * S - l * O + h * j) * I, n[1] = (s * O - t * S - a * j) * I, n[2] = (o * R - m * A + x * z) * I, n[3] = (M * A - v * R - d * z) * I, n[4] = (l * g - i * S - h * b) * I, n[5] = (e * S - s * g + a * b) * I, n[6] = (m * p - y * R - x * w) * I, n[7] = (f * R - M * p + d * w) * I, n[8] = (i * O - c * g + h * E) * I, n[9] = (t * g - e * O - a * E) * I, n[10] = (y * A - o * p + x * $) * I, n[11] = (v * p - f * A - d * $) * I, n[12] = (c * b - i * j - l * E) * I, n[13] = (e * j - t * b + s * E) * I, n[14] = (o * w - y * z - m * $) * I, n[15] = (f * z - v * w + M * $) * I, n) : null;
}
function O0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = r[4], c = r[5], l = r[6], h = r[7], f = r[8], v = r[9], M = r[10], d = r[11], y = r[12], o = r[13], m = r[14], x = r[15], $ = e * c - t * i, w = e * l - s * i, p = e * h - a * i, z = t * l - s * c, A = t * h - a * c, R = s * h - a * l, E = f * o - v * y, b = f * m - M * y, g = f * x - d * y, j = v * m - M * o, O = v * x - d * o, S = M * x - d * m;
  return n[0] = c * S - l * O + h * j, n[1] = s * O - t * S - a * j, n[2] = o * R - m * A + x * z, n[3] = M * A - v * R - d * z, n[4] = l * g - i * S - h * b, n[5] = e * S - s * g + a * b, n[6] = m * p - y * R - x * w, n[7] = f * R - M * p + d * w, n[8] = i * O - c * g + h * E, n[9] = t * g - e * O - a * E, n[10] = y * A - o * p + x * $, n[11] = v * p - f * A - d * $, n[12] = c * b - i * j - l * E, n[13] = e * j - t * b + s * E, n[14] = o * w - y * z - m * $, n[15] = f * z - v * w + M * $, n;
}
function j0(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3], a = n[4], i = n[5], c = n[6], l = n[7], h = n[8], f = n[9], v = n[10], M = n[11], d = n[12], y = n[13], o = n[14], m = n[15], x = r * i - e * a, $ = r * c - t * a, w = e * c - t * i, p = h * y - f * d, z = h * o - v * d, A = f * o - v * y, R = r * A - e * z + t * p, E = a * A - i * z + c * p, b = h * w - f * $ + v * x, g = d * w - y * $ + o * x;
  return l * R - s * E + m * b - M * g;
}
function Ce(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = r[8], M = r[9], d = r[10], y = r[11], o = r[12], m = r[13], x = r[14], $ = r[15], w = e[0], p = e[1], z = e[2], A = e[3];
  return n[0] = w * t + p * c + z * v + A * o, n[1] = w * s + p * l + z * M + A * m, n[2] = w * a + p * h + z * d + A * x, n[3] = w * i + p * f + z * y + A * $, w = e[4], p = e[5], z = e[6], A = e[7], n[4] = w * t + p * c + z * v + A * o, n[5] = w * s + p * l + z * M + A * m, n[6] = w * a + p * h + z * d + A * x, n[7] = w * i + p * f + z * y + A * $, w = e[8], p = e[9], z = e[10], A = e[11], n[8] = w * t + p * c + z * v + A * o, n[9] = w * s + p * l + z * M + A * m, n[10] = w * a + p * h + z * d + A * x, n[11] = w * i + p * f + z * y + A * $, w = e[12], p = e[13], z = e[14], A = e[15], n[12] = w * t + p * c + z * v + A * o, n[13] = w * s + p * l + z * M + A * m, n[14] = w * a + p * h + z * d + A * x, n[15] = w * i + p * f + z * y + A * $, n;
}
function _r(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i, c, l, h, f, v, M, d, y, o, m, x;
  return r === n ? (n[12] = r[0] * t + r[4] * s + r[8] * a + r[12], n[13] = r[1] * t + r[5] * s + r[9] * a + r[13], n[14] = r[2] * t + r[6] * s + r[10] * a + r[14], n[15] = r[3] * t + r[7] * s + r[11] * a + r[15]) : (i = r[0], c = r[1], l = r[2], h = r[3], f = r[4], v = r[5], M = r[6], d = r[7], y = r[8], o = r[9], m = r[10], x = r[11], n[0] = i, n[1] = c, n[2] = l, n[3] = h, n[4] = f, n[5] = v, n[6] = M, n[7] = d, n[8] = y, n[9] = o, n[10] = m, n[11] = x, n[12] = i * t + f * s + y * a + r[12], n[13] = c * t + v * s + o * a + r[13], n[14] = l * t + M * s + m * a + r[14], n[15] = h * t + d * s + x * a + r[15]), n;
}
function Te(n, r, e) {
  var t = e[0], s = e[1], a = e[2];
  return n[0] = r[0] * t, n[1] = r[1] * t, n[2] = r[2] * t, n[3] = r[3] * t, n[4] = r[4] * s, n[5] = r[5] * s, n[6] = r[6] * s, n[7] = r[7] * s, n[8] = r[8] * a, n[9] = r[9] * a, n[10] = r[10] * a, n[11] = r[11] * a, n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15], n;
}
function C0(n, r, e, t) {
  var s = t[0], a = t[1], i = t[2], c = Math.sqrt(s * s + a * a + i * i), l, h, f, v, M, d, y, o, m, x, $, w, p, z, A, R, E, b, g, j, O, S, I, F;
  return c < C ? null : (c = 1 / c, s *= c, a *= c, i *= c, l = Math.sin(e), h = Math.cos(e), f = 1 - h, v = r[0], M = r[1], d = r[2], y = r[3], o = r[4], m = r[5], x = r[6], $ = r[7], w = r[8], p = r[9], z = r[10], A = r[11], R = s * s * f + h, E = a * s * f + i * l, b = i * s * f - a * l, g = s * a * f - i * l, j = a * a * f + h, O = i * a * f + s * l, S = s * i * f + a * l, I = a * i * f - s * l, F = i * i * f + h, n[0] = v * R + o * E + w * b, n[1] = M * R + m * E + p * b, n[2] = d * R + x * E + z * b, n[3] = y * R + $ * E + A * b, n[4] = v * g + o * j + w * O, n[5] = M * g + m * j + p * O, n[6] = d * g + x * j + z * O, n[7] = y * g + $ * j + A * O, n[8] = v * S + o * I + w * F, n[9] = M * S + m * I + p * F, n[10] = d * S + x * I + z * F, n[11] = y * S + $ * I + A * F, r !== n && (n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n);
}
function T0(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[4], i = r[5], c = r[6], l = r[7], h = r[8], f = r[9], v = r[10], M = r[11];
  return r !== n && (n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[4] = a * s + h * t, n[5] = i * s + f * t, n[6] = c * s + v * t, n[7] = l * s + M * t, n[8] = h * s - a * t, n[9] = f * s - i * t, n[10] = v * s - c * t, n[11] = M * s - l * t, n;
}
function R0(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[0], i = r[1], c = r[2], l = r[3], h = r[8], f = r[9], v = r[10], M = r[11];
  return r !== n && (n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[0] = a * s - h * t, n[1] = i * s - f * t, n[2] = c * s - v * t, n[3] = l * s - M * t, n[8] = a * t + h * s, n[9] = i * t + f * s, n[10] = c * t + v * s, n[11] = l * t + M * s, n;
}
function E0(n, r, e) {
  var t = Math.sin(e), s = Math.cos(e), a = r[0], i = r[1], c = r[2], l = r[3], h = r[4], f = r[5], v = r[6], M = r[7];
  return r !== n && (n[8] = r[8], n[9] = r[9], n[10] = r[10], n[11] = r[11], n[12] = r[12], n[13] = r[13], n[14] = r[14], n[15] = r[15]), n[0] = a * s + h * t, n[1] = i * s + f * t, n[2] = c * s + v * t, n[3] = l * s + M * t, n[4] = h * s - a * t, n[5] = f * s - i * t, n[6] = v * s - c * t, n[7] = M * s - l * t, n;
}
function F0(n, r) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = r[0], n[13] = r[1], n[14] = r[2], n[15] = 1, n;
}
function Y0(n, r) {
  return n[0] = r[0], n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = r[1], n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = r[2], n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function L0(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = Math.sqrt(t * t + s * s + a * a), c, l, h;
  return i < C ? null : (i = 1 / i, t *= i, s *= i, a *= i, c = Math.sin(r), l = Math.cos(r), h = 1 - l, n[0] = t * t * h + l, n[1] = s * t * h + a * c, n[2] = a * t * h - s * c, n[3] = 0, n[4] = t * s * h - a * c, n[5] = s * s * h + l, n[6] = a * s * h + t * c, n[7] = 0, n[8] = t * a * h + s * c, n[9] = s * a * h - t * c, n[10] = a * a * h + l, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n);
}
function B0(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = t, n[6] = e, n[7] = 0, n[8] = 0, n[9] = -e, n[10] = t, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function W0(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = 0, n[2] = -e, n[3] = 0, n[4] = 0, n[5] = 1, n[6] = 0, n[7] = 0, n[8] = e, n[9] = 0, n[10] = t, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function Z0(n, r) {
  var e = Math.sin(r), t = Math.cos(r);
  return n[0] = t, n[1] = e, n[2] = 0, n[3] = 0, n[4] = -e, n[5] = t, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 1, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function Re(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = t + t, l = s + s, h = a + a, f = t * c, v = t * l, M = t * h, d = s * l, y = s * h, o = a * h, m = i * c, x = i * l, $ = i * h;
  return n[0] = 1 - (d + o), n[1] = v + $, n[2] = M - x, n[3] = 0, n[4] = v - $, n[5] = 1 - (f + o), n[6] = y + m, n[7] = 0, n[8] = M + x, n[9] = y - m, n[10] = 1 - (f + d), n[11] = 0, n[12] = e[0], n[13] = e[1], n[14] = e[2], n[15] = 1, n;
}
function P0(n, r) {
  var e = new N(3), t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = t * t + s * s + a * a + i * i;
  return v > 0 ? (e[0] = (c * i + f * t + l * a - h * s) * 2 / v, e[1] = (l * i + f * s + h * t - c * a) * 2 / v, e[2] = (h * i + f * a + c * s - l * t) * 2 / v) : (e[0] = (c * i + f * t + l * a - h * s) * 2, e[1] = (l * i + f * s + h * t - c * a) * 2, e[2] = (h * i + f * a + c * s - l * t) * 2), Re(n, r, e), n;
}
function Ee(n, r) {
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
}
function Fe(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[4], i = r[5], c = r[6], l = r[8], h = r[9], f = r[10];
  return n[0] = Math.sqrt(e * e + t * t + s * s), n[1] = Math.sqrt(a * a + i * i + c * c), n[2] = Math.sqrt(l * l + h * h + f * f), n;
}
function Ye(n, r) {
  var e = new N(3);
  Fe(e, r);
  var t = 1 / e[0], s = 1 / e[1], a = 1 / e[2], i = r[0] * t, c = r[1] * s, l = r[2] * a, h = r[4] * t, f = r[5] * s, v = r[6] * a, M = r[8] * t, d = r[9] * s, y = r[10] * a, o = i + f + y, m = 0;
  return o > 0 ? (m = Math.sqrt(o + 1) * 2, n[3] = 0.25 * m, n[0] = (v - d) / m, n[1] = (M - l) / m, n[2] = (c - h) / m) : i > f && i > y ? (m = Math.sqrt(1 + i - f - y) * 2, n[3] = (v - d) / m, n[0] = 0.25 * m, n[1] = (c + h) / m, n[2] = (M + l) / m) : f > y ? (m = Math.sqrt(1 + f - i - y) * 2, n[3] = (M - l) / m, n[0] = (c + h) / m, n[1] = 0.25 * m, n[2] = (v + d) / m) : (m = Math.sqrt(1 + y - i - f) * 2, n[3] = (c - h) / m, n[0] = (M + l) / m, n[1] = (v + d) / m, n[2] = 0.25 * m), n;
}
function G0(n, r, e, t) {
  r[0] = t[12], r[1] = t[13], r[2] = t[14];
  var s = t[0], a = t[1], i = t[2], c = t[4], l = t[5], h = t[6], f = t[8], v = t[9], M = t[10];
  e[0] = Math.sqrt(s * s + a * a + i * i), e[1] = Math.sqrt(c * c + l * l + h * h), e[2] = Math.sqrt(f * f + v * v + M * M);
  var d = 1 / e[0], y = 1 / e[1], o = 1 / e[2], m = s * d, x = a * y, $ = i * o, w = c * d, p = l * y, z = h * o, A = f * d, R = v * y, E = M * o, b = m + p + E, g = 0;
  return b > 0 ? (g = Math.sqrt(b + 1) * 2, n[3] = 0.25 * g, n[0] = (z - R) / g, n[1] = (A - $) / g, n[2] = (x - w) / g) : m > p && m > E ? (g = Math.sqrt(1 + m - p - E) * 2, n[3] = (z - R) / g, n[0] = 0.25 * g, n[1] = (x + w) / g, n[2] = (A + $) / g) : p > E ? (g = Math.sqrt(1 + p - m - E) * 2, n[3] = (A - $) / g, n[0] = (x + w) / g, n[1] = 0.25 * g, n[2] = (z + R) / g) : (g = Math.sqrt(1 + E - m - p) * 2, n[3] = (x - w) / g, n[0] = (A + $) / g, n[1] = (z + R) / g, n[2] = 0.25 * g), n;
}
function D0(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = r[3], l = s + s, h = a + a, f = i + i, v = s * l, M = s * h, d = s * f, y = a * h, o = a * f, m = i * f, x = c * l, $ = c * h, w = c * f, p = t[0], z = t[1], A = t[2];
  return n[0] = (1 - (y + m)) * p, n[1] = (M + w) * p, n[2] = (d - $) * p, n[3] = 0, n[4] = (M - w) * z, n[5] = (1 - (v + m)) * z, n[6] = (o + x) * z, n[7] = 0, n[8] = (d + $) * A, n[9] = (o - x) * A, n[10] = (1 - (v + y)) * A, n[11] = 0, n[12] = e[0], n[13] = e[1], n[14] = e[2], n[15] = 1, n;
}
function k0(n, r, e, t, s) {
  var a = r[0], i = r[1], c = r[2], l = r[3], h = a + a, f = i + i, v = c + c, M = a * h, d = a * f, y = a * v, o = i * f, m = i * v, x = c * v, $ = l * h, w = l * f, p = l * v, z = t[0], A = t[1], R = t[2], E = s[0], b = s[1], g = s[2], j = (1 - (o + x)) * z, O = (d + p) * z, S = (y - w) * z, I = (d - p) * A, F = (1 - (M + x)) * A, G = (m + $) * A, K = (y + w) * R, T = (m - $) * R, hn = (1 - (M + o)) * R;
  return n[0] = j, n[1] = O, n[2] = S, n[3] = 0, n[4] = I, n[5] = F, n[6] = G, n[7] = 0, n[8] = K, n[9] = T, n[10] = hn, n[11] = 0, n[12] = e[0] + E - (j * E + I * b + K * g), n[13] = e[1] + b - (O * E + F * b + T * g), n[14] = e[2] + g - (S * E + G * b + hn * g), n[15] = 1, n;
}
function U0(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e + e, c = t + t, l = s + s, h = e * i, f = t * i, v = t * c, M = s * i, d = s * c, y = s * l, o = a * i, m = a * c, x = a * l;
  return n[0] = 1 - v - y, n[1] = f + x, n[2] = M - m, n[3] = 0, n[4] = f - x, n[5] = 1 - h - y, n[6] = d + o, n[7] = 0, n[8] = M + m, n[9] = d - o, n[10] = 1 - h - v, n[11] = 0, n[12] = 0, n[13] = 0, n[14] = 0, n[15] = 1, n;
}
function V0(n, r, e, t, s, a, i) {
  var c = 1 / (e - r), l = 1 / (s - t), h = 1 / (a - i);
  return n[0] = a * 2 * c, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = a * 2 * l, n[6] = 0, n[7] = 0, n[8] = (e + r) * c, n[9] = (s + t) * l, n[10] = (i + a) * h, n[11] = -1, n[12] = 0, n[13] = 0, n[14] = i * a * 2 * h, n[15] = 0, n;
}
function Le(n, r, e, t, s) {
  var a = 1 / Math.tan(r / 2);
  if (n[0] = a / e, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = a, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = -1, n[12] = 0, n[13] = 0, n[15] = 0, s != null && s !== 1 / 0) {
    var i = 1 / (t - s);
    n[10] = (s + t) * i, n[14] = 2 * s * t * i;
  } else
    n[10] = -1, n[14] = -2 * t;
  return n;
}
var N0 = Le;
function X0(n, r, e, t, s) {
  var a = 1 / Math.tan(r / 2);
  if (n[0] = a / e, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = a, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[11] = -1, n[12] = 0, n[13] = 0, n[15] = 0, s != null && s !== 1 / 0) {
    var i = 1 / (t - s);
    n[10] = s * i, n[14] = s * t * i;
  } else
    n[10] = -1, n[14] = -t;
  return n;
}
function _0(n, r, e, t) {
  var s = Math.tan(r.upDegrees * Math.PI / 180), a = Math.tan(r.downDegrees * Math.PI / 180), i = Math.tan(r.leftDegrees * Math.PI / 180), c = Math.tan(r.rightDegrees * Math.PI / 180), l = 2 / (i + c), h = 2 / (s + a);
  return n[0] = l, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = h, n[6] = 0, n[7] = 0, n[8] = -((i - c) * l * 0.5), n[9] = (s - a) * h * 0.5, n[10] = t / (e - t), n[11] = -1, n[12] = 0, n[13] = 0, n[14] = t * e / (e - t), n[15] = 0, n;
}
function Be(n, r, e, t, s, a, i) {
  var c = 1 / (r - e), l = 1 / (t - s), h = 1 / (a - i);
  return n[0] = -2 * c, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * l, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 2 * h, n[11] = 0, n[12] = (r + e) * c, n[13] = (s + t) * l, n[14] = (i + a) * h, n[15] = 1, n;
}
var We = Be;
function K0(n, r, e, t, s, a, i) {
  var c = 1 / (r - e), l = 1 / (t - s), h = 1 / (a - i);
  return n[0] = -2 * c, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = -2 * l, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = h, n[11] = 0, n[12] = (r + e) * c, n[13] = (s + t) * l, n[14] = a * h, n[15] = 1, n;
}
function Q0(n, r, e, t) {
  var s, a, i, c, l, h, f, v, M, d, y = r[0], o = r[1], m = r[2], x = t[0], $ = t[1], w = t[2], p = e[0], z = e[1], A = e[2];
  return Math.abs(y - p) < C && Math.abs(o - z) < C && Math.abs(m - A) < C ? Hr(n) : (f = y - p, v = o - z, M = m - A, d = 1 / Math.sqrt(f * f + v * v + M * M), f *= d, v *= d, M *= d, s = $ * M - w * v, a = w * f - x * M, i = x * v - $ * f, d = Math.sqrt(s * s + a * a + i * i), d ? (d = 1 / d, s *= d, a *= d, i *= d) : (s = 0, a = 0, i = 0), c = v * i - M * a, l = M * s - f * i, h = f * a - v * s, d = Math.sqrt(c * c + l * l + h * h), d ? (d = 1 / d, c *= d, l *= d, h *= d) : (c = 0, l = 0, h = 0), n[0] = s, n[1] = c, n[2] = f, n[3] = 0, n[4] = a, n[5] = l, n[6] = v, n[7] = 0, n[8] = i, n[9] = h, n[10] = M, n[11] = 0, n[12] = -(s * y + a * o + i * m), n[13] = -(c * y + l * o + h * m), n[14] = -(f * y + v * o + M * m), n[15] = 1, n);
}
function H0(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = t[0], l = t[1], h = t[2], f = s - e[0], v = a - e[1], M = i - e[2], d = f * f + v * v + M * M;
  d > 0 && (d = 1 / Math.sqrt(d), f *= d, v *= d, M *= d);
  var y = l * M - h * v, o = h * f - c * M, m = c * v - l * f;
  return d = y * y + o * o + m * m, d > 0 && (d = 1 / Math.sqrt(d), y *= d, o *= d, m *= d), n[0] = y, n[1] = o, n[2] = m, n[3] = 0, n[4] = v * m - M * o, n[5] = M * y - f * m, n[6] = f * o - v * y, n[7] = 0, n[8] = f, n[9] = v, n[10] = M, n[11] = 0, n[12] = s, n[13] = a, n[14] = i, n[15] = 1, n;
}
function J0(n) {
  return "mat4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ", " + n[8] + ", " + n[9] + ", " + n[10] + ", " + n[11] + ", " + n[12] + ", " + n[13] + ", " + n[14] + ", " + n[15] + ")";
}
function u0(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2] + n[3] * n[3] + n[4] * n[4] + n[5] * n[5] + n[6] * n[6] + n[7] * n[7] + n[8] * n[8] + n[9] * n[9] + n[10] * n[10] + n[11] * n[11] + n[12] * n[12] + n[13] * n[13] + n[14] * n[14] + n[15] * n[15]);
}
function ns(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n[8] = r[8] + e[8], n[9] = r[9] + e[9], n[10] = r[10] + e[10], n[11] = r[11] + e[11], n[12] = r[12] + e[12], n[13] = r[13] + e[13], n[14] = r[14] + e[14], n[15] = r[15] + e[15], n;
}
function Ze(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n[4] = r[4] - e[4], n[5] = r[5] - e[5], n[6] = r[6] - e[6], n[7] = r[7] - e[7], n[8] = r[8] - e[8], n[9] = r[9] - e[9], n[10] = r[10] - e[10], n[11] = r[11] - e[11], n[12] = r[12] - e[12], n[13] = r[13] - e[13], n[14] = r[14] - e[14], n[15] = r[15] - e[15], n;
}
function rs(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n[6] = r[6] * e, n[7] = r[7] * e, n[8] = r[8] * e, n[9] = r[9] * e, n[10] = r[10] * e, n[11] = r[11] * e, n[12] = r[12] * e, n[13] = r[13] * e, n[14] = r[14] * e, n[15] = r[15] * e, n;
}
function es(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n[4] = r[4] + e[4] * t, n[5] = r[5] + e[5] * t, n[6] = r[6] + e[6] * t, n[7] = r[7] + e[7] * t, n[8] = r[8] + e[8] * t, n[9] = r[9] + e[9] * t, n[10] = r[10] + e[10] * t, n[11] = r[11] + e[11] * t, n[12] = r[12] + e[12] * t, n[13] = r[13] + e[13] * t, n[14] = r[14] + e[14] * t, n[15] = r[15] + e[15] * t, n;
}
function ts(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5] && n[6] === r[6] && n[7] === r[7] && n[8] === r[8] && n[9] === r[9] && n[10] === r[10] && n[11] === r[11] && n[12] === r[12] && n[13] === r[13] && n[14] === r[14] && n[15] === r[15];
}
function ss(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = n[8], v = n[9], M = n[10], d = n[11], y = n[12], o = n[13], m = n[14], x = n[15], $ = r[0], w = r[1], p = r[2], z = r[3], A = r[4], R = r[5], E = r[6], b = r[7], g = r[8], j = r[9], O = r[10], S = r[11], I = r[12], F = r[13], G = r[14], K = r[15];
  return Math.abs(e - $) <= C * Math.max(1, Math.abs(e), Math.abs($)) && Math.abs(t - w) <= C * Math.max(1, Math.abs(t), Math.abs(w)) && Math.abs(s - p) <= C * Math.max(1, Math.abs(s), Math.abs(p)) && Math.abs(a - z) <= C * Math.max(1, Math.abs(a), Math.abs(z)) && Math.abs(i - A) <= C * Math.max(1, Math.abs(i), Math.abs(A)) && Math.abs(c - R) <= C * Math.max(1, Math.abs(c), Math.abs(R)) && Math.abs(l - E) <= C * Math.max(1, Math.abs(l), Math.abs(E)) && Math.abs(h - b) <= C * Math.max(1, Math.abs(h), Math.abs(b)) && Math.abs(f - g) <= C * Math.max(1, Math.abs(f), Math.abs(g)) && Math.abs(v - j) <= C * Math.max(1, Math.abs(v), Math.abs(j)) && Math.abs(M - O) <= C * Math.max(1, Math.abs(M), Math.abs(O)) && Math.abs(d - S) <= C * Math.max(1, Math.abs(d), Math.abs(S)) && Math.abs(y - I) <= C * Math.max(1, Math.abs(y), Math.abs(I)) && Math.abs(o - F) <= C * Math.max(1, Math.abs(o), Math.abs(F)) && Math.abs(m - G) <= C * Math.max(1, Math.abs(m), Math.abs(G)) && Math.abs(x - K) <= C * Math.max(1, Math.abs(x), Math.abs(K));
}
var as = Ce, is = Ze;
const Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: ns,
  adjoint: O0,
  clone: $0,
  copy: b0,
  create: z0,
  decompose: G0,
  determinant: j0,
  equals: ss,
  exactEquals: ts,
  frob: u0,
  fromQuat: U0,
  fromQuat2: P0,
  fromRotation: L0,
  fromRotationTranslation: Re,
  fromRotationTranslationScale: D0,
  fromRotationTranslationScaleOrigin: k0,
  fromScaling: Y0,
  fromTranslation: F0,
  fromValues: q0,
  fromXRotation: B0,
  fromYRotation: W0,
  fromZRotation: Z0,
  frustum: V0,
  getRotation: Ye,
  getScaling: Fe,
  getTranslation: Ee,
  identity: Hr,
  invert: je,
  lookAt: Q0,
  mul: as,
  multiply: Ce,
  multiplyScalar: rs,
  multiplyScalarAndAdd: es,
  ortho: We,
  orthoNO: Be,
  orthoZO: K0,
  perspective: N0,
  perspectiveFromFieldOfView: _0,
  perspectiveNO: Le,
  perspectiveZO: X0,
  rotate: C0,
  rotateX: T0,
  rotateY: R0,
  rotateZ: E0,
  scale: Te,
  set: S0,
  str: J0,
  sub: is,
  subtract: Ze,
  targetTo: H0,
  translate: _r,
  transpose: I0
}, Symbol.toStringTag, { value: "Module" }));
function Jr() {
  var n = new N(3);
  return N != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n;
}
function cs(n) {
  var r = new N(3);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r;
}
function Ge(n) {
  var r = n[0], e = n[1], t = n[2];
  return Math.sqrt(r * r + e * e + t * t);
}
function Kr(n, r, e) {
  var t = new N(3);
  return t[0] = n, t[1] = r, t[2] = e, t;
}
function ls(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n;
}
function hs(n, r, e, t) {
  return n[0] = r, n[1] = e, n[2] = t, n;
}
function fs(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n;
}
function De(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n;
}
function ke(n, r, e) {
  return n[0] = r[0] * e[0], n[1] = r[1] * e[1], n[2] = r[2] * e[2], n;
}
function Ue(n, r, e) {
  return n[0] = r[0] / e[0], n[1] = r[1] / e[1], n[2] = r[2] / e[2], n;
}
function vs(n, r) {
  return n[0] = Math.ceil(r[0]), n[1] = Math.ceil(r[1]), n[2] = Math.ceil(r[2]), n;
}
function Ms(n, r) {
  return n[0] = Math.floor(r[0]), n[1] = Math.floor(r[1]), n[2] = Math.floor(r[2]), n;
}
function ds(n, r, e) {
  return n[0] = Math.min(r[0], e[0]), n[1] = Math.min(r[1], e[1]), n[2] = Math.min(r[2], e[2]), n;
}
function ms(n, r, e) {
  return n[0] = Math.max(r[0], e[0]), n[1] = Math.max(r[1], e[1]), n[2] = Math.max(r[2], e[2]), n;
}
function ys(n, r) {
  return n[0] = xr(r[0]), n[1] = xr(r[1]), n[2] = xr(r[2]), n;
}
function os(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n;
}
function xs(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n;
}
function Ve(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2];
  return Math.sqrt(e * e + t * t + s * s);
}
function Ne(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2];
  return e * e + t * t + s * s;
}
function Xe(n) {
  var r = n[0], e = n[1], t = n[2];
  return r * r + e * e + t * t;
}
function ps(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n;
}
function As(n, r) {
  return n[0] = 1 / r[0], n[1] = 1 / r[1], n[2] = 1 / r[2], n;
}
function _e(n, r) {
  var e = r[0], t = r[1], s = r[2], a = e * e + t * t + s * s;
  return a > 0 && (a = 1 / Math.sqrt(a)), n[0] = r[0] * a, n[1] = r[1] * a, n[2] = r[2] * a, n;
}
function Dr(n, r) {
  return n[0] * r[0] + n[1] * r[1] + n[2] * r[2];
}
function Rr(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = e[0], c = e[1], l = e[2];
  return n[0] = s * l - a * c, n[1] = a * i - t * l, n[2] = t * c - s * i, n;
}
function ws(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2];
  return n[0] = s + t * (e[0] - s), n[1] = a + t * (e[1] - a), n[2] = i + t * (e[2] - i), n;
}
function gs(n, r, e, t) {
  var s = Math.acos(Math.min(Math.max(Dr(r, e), -1), 1)), a = Math.sin(s), i = Math.sin((1 - t) * s) / a, c = Math.sin(t * s) / a;
  return n[0] = i * r[0] + c * e[0], n[1] = i * r[1] + c * e[1], n[2] = i * r[2] + c * e[2], n;
}
function zs(n, r, e, t, s, a) {
  var i = a * a, c = i * (2 * a - 3) + 1, l = i * (a - 2) + a, h = i * (a - 1), f = i * (3 - 2 * a);
  return n[0] = r[0] * c + e[0] * l + t[0] * h + s[0] * f, n[1] = r[1] * c + e[1] * l + t[1] * h + s[1] * f, n[2] = r[2] * c + e[2] * l + t[2] * h + s[2] * f, n;
}
function $s(n, r, e, t, s, a) {
  var i = 1 - a, c = i * i, l = a * a, h = c * i, f = 3 * a * c, v = 3 * l * i, M = l * a;
  return n[0] = r[0] * h + e[0] * f + t[0] * v + s[0] * M, n[1] = r[1] * h + e[1] * f + t[1] * v + s[1] * M, n[2] = r[2] * h + e[2] * f + t[2] * v + s[2] * M, n;
}
function bs(n, r) {
  r = r === void 0 ? 1 : r;
  var e = or() * 2 * Math.PI, t = or() * 2 - 1, s = Math.sqrt(1 - t * t) * r;
  return n[0] = Math.cos(e) * s, n[1] = Math.sin(e) * s, n[2] = t * r, n;
}
function Ke(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = e[3] * t + e[7] * s + e[11] * a + e[15];
  return i = i || 1, n[0] = (e[0] * t + e[4] * s + e[8] * a + e[12]) / i, n[1] = (e[1] * t + e[5] * s + e[9] * a + e[13]) / i, n[2] = (e[2] * t + e[6] * s + e[10] * a + e[14]) / i, n;
}
function qs(n, r, e) {
  var t = r[0], s = r[1], a = r[2];
  return n[0] = t * e[0] + s * e[3] + a * e[6], n[1] = t * e[1] + s * e[4] + a * e[7], n[2] = t * e[2] + s * e[5] + a * e[8], n;
}
function Ss(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = s * h - a * l, v = a * c - t * h, M = t * l - s * c;
  return f = f + f, v = v + v, M = M + M, n[0] = c + i * f + s * M - a * v, n[1] = l + i * v + a * f - t * M, n[2] = h + i * M + t * v - s * f, n;
}
function Is(n, r, e, t) {
  var s = [], a = [];
  return s[0] = r[0] - e[0], s[1] = r[1] - e[1], s[2] = r[2] - e[2], a[0] = s[0], a[1] = s[1] * Math.cos(t) - s[2] * Math.sin(t), a[2] = s[1] * Math.sin(t) + s[2] * Math.cos(t), n[0] = a[0] + e[0], n[1] = a[1] + e[1], n[2] = a[2] + e[2], n;
}
function Os(n, r, e, t) {
  var s = [], a = [];
  return s[0] = r[0] - e[0], s[1] = r[1] - e[1], s[2] = r[2] - e[2], a[0] = s[2] * Math.sin(t) + s[0] * Math.cos(t), a[1] = s[1], a[2] = s[2] * Math.cos(t) - s[0] * Math.sin(t), n[0] = a[0] + e[0], n[1] = a[1] + e[1], n[2] = a[2] + e[2], n;
}
function js(n, r, e, t) {
  var s = [], a = [];
  return s[0] = r[0] - e[0], s[1] = r[1] - e[1], s[2] = r[2] - e[2], a[0] = s[0] * Math.cos(t) - s[1] * Math.sin(t), a[1] = s[0] * Math.sin(t) + s[1] * Math.cos(t), a[2] = s[2], n[0] = a[0] + e[0], n[1] = a[1] + e[1], n[2] = a[2] + e[2], n;
}
function Cs(n, r) {
  var e = n[0], t = n[1], s = n[2], a = r[0], i = r[1], c = r[2], l = Math.sqrt((e * e + t * t + s * s) * (a * a + i * i + c * c)), h = l && Dr(n, r) / l;
  return Math.acos(Math.min(Math.max(h, -1), 1));
}
function Ts(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n;
}
function Rs(n) {
  return "vec3(" + n[0] + ", " + n[1] + ", " + n[2] + ")";
}
function Es(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2];
}
function Fs(n, r) {
  var e = n[0], t = n[1], s = n[2], a = r[0], i = r[1], c = r[2];
  return Math.abs(e - a) <= C * Math.max(1, Math.abs(e), Math.abs(a)) && Math.abs(t - i) <= C * Math.max(1, Math.abs(t), Math.abs(i)) && Math.abs(s - c) <= C * Math.max(1, Math.abs(s), Math.abs(c));
}
var Ys = De, Ls = ke, Bs = Ue, Ws = Ve, Zs = Ne, Qe = Ge, Ps = Xe, Gs = (function() {
  var n = Jr();
  return function(r, e, t, s, a, i) {
    var c, l;
    for (e || (e = 3), t || (t = 0), s ? l = Math.min(s * e + t, r.length) : l = r.length, c = t; c < l; c += e)
      n[0] = r[c], n[1] = r[c + 1], n[2] = r[c + 2], a(n, n, i), r[c] = n[0], r[c + 1] = n[1], r[c + 2] = n[2];
    return r;
  };
})();
const Ds = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: fs,
  angle: Cs,
  bezier: $s,
  ceil: vs,
  clone: cs,
  copy: ls,
  create: Jr,
  cross: Rr,
  dist: Ws,
  distance: Ve,
  div: Bs,
  divide: Ue,
  dot: Dr,
  equals: Fs,
  exactEquals: Es,
  floor: Ms,
  forEach: Gs,
  fromValues: Kr,
  hermite: zs,
  inverse: As,
  len: Qe,
  length: Ge,
  lerp: ws,
  max: ms,
  min: ds,
  mul: Ls,
  multiply: ke,
  negate: ps,
  normalize: _e,
  random: bs,
  rotateX: Is,
  rotateY: Os,
  rotateZ: js,
  round: ys,
  scale: os,
  scaleAndAdd: xs,
  set: hs,
  slerp: gs,
  sqrDist: Zs,
  sqrLen: Ps,
  squaredDistance: Ne,
  squaredLength: Xe,
  str: Rs,
  sub: Ys,
  subtract: De,
  transformMat3: qs,
  transformMat4: Ke,
  transformQuat: Ss,
  zero: Ts
}, Symbol.toStringTag, { value: "Module" }));
function He() {
  var n = new N(4);
  return N != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0), n;
}
function Je(n) {
  var r = new N(4);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r;
}
function ue(n, r, e, t) {
  var s = new N(4);
  return s[0] = n, s[1] = r, s[2] = e, s[3] = t, s;
}
function n1(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n;
}
function r1(n, r, e, t, s) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n;
}
function e1(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n;
}
function t1(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n[2] = r[2] - e[2], n[3] = r[3] - e[3], n;
}
function s1(n, r, e) {
  return n[0] = r[0] * e[0], n[1] = r[1] * e[1], n[2] = r[2] * e[2], n[3] = r[3] * e[3], n;
}
function a1(n, r, e) {
  return n[0] = r[0] / e[0], n[1] = r[1] / e[1], n[2] = r[2] / e[2], n[3] = r[3] / e[3], n;
}
function ks(n, r) {
  return n[0] = Math.ceil(r[0]), n[1] = Math.ceil(r[1]), n[2] = Math.ceil(r[2]), n[3] = Math.ceil(r[3]), n;
}
function Us(n, r) {
  return n[0] = Math.floor(r[0]), n[1] = Math.floor(r[1]), n[2] = Math.floor(r[2]), n[3] = Math.floor(r[3]), n;
}
function Vs(n, r, e) {
  return n[0] = Math.min(r[0], e[0]), n[1] = Math.min(r[1], e[1]), n[2] = Math.min(r[2], e[2]), n[3] = Math.min(r[3], e[3]), n;
}
function Ns(n, r, e) {
  return n[0] = Math.max(r[0], e[0]), n[1] = Math.max(r[1], e[1]), n[2] = Math.max(r[2], e[2]), n[3] = Math.max(r[3], e[3]), n;
}
function Xs(n, r) {
  return n[0] = xr(r[0]), n[1] = xr(r[1]), n[2] = xr(r[2]), n[3] = xr(r[3]), n;
}
function i1(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n;
}
function _s(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n[2] = r[2] + e[2] * t, n[3] = r[3] + e[3] * t, n;
}
function c1(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2], a = r[3] - n[3];
  return Math.sqrt(e * e + t * t + s * s + a * a);
}
function l1(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1], s = r[2] - n[2], a = r[3] - n[3];
  return e * e + t * t + s * s + a * a;
}
function ur(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3];
  return Math.sqrt(r * r + e * e + t * t + s * s);
}
function ne(n) {
  var r = n[0], e = n[1], t = n[2], s = n[3];
  return r * r + e * e + t * t + s * s;
}
function Ks(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n[3] = -r[3], n;
}
function Qs(n, r) {
  return n[0] = 1 / r[0], n[1] = 1 / r[1], n[2] = 1 / r[2], n[3] = 1 / r[3], n;
}
function h1(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e * e + t * t + s * s + a * a;
  return i > 0 && (i = 1 / Math.sqrt(i)), n[0] = e * i, n[1] = t * i, n[2] = s * i, n[3] = a * i, n;
}
function re(n, r) {
  return n[0] * r[0] + n[1] * r[1] + n[2] * r[2] + n[3] * r[3];
}
function Hs(n, r, e, t) {
  var s = e[0] * t[1] - e[1] * t[0], a = e[0] * t[2] - e[2] * t[0], i = e[0] * t[3] - e[3] * t[0], c = e[1] * t[2] - e[2] * t[1], l = e[1] * t[3] - e[3] * t[1], h = e[2] * t[3] - e[3] * t[2], f = r[0], v = r[1], M = r[2], d = r[3];
  return n[0] = v * h - M * l + d * c, n[1] = -(f * h) + M * i - d * a, n[2] = f * l - v * i + d * s, n[3] = -(f * c) + v * a - M * s, n;
}
function f1(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = r[3];
  return n[0] = s + t * (e[0] - s), n[1] = a + t * (e[1] - a), n[2] = i + t * (e[2] - i), n[3] = c + t * (e[3] - c), n;
}
function Js(n, r) {
  r = r === void 0 ? 1 : r;
  var e, t, s, a, i, c, l;
  l = or(), e = l * 2 - 1, t = (4 * or() - 2) * Math.sqrt(l * -l + l), i = e * e + t * t, l = or(), s = l * 2 - 1, a = (4 * or() - 2) * Math.sqrt(l * -l + l), c = s * s + a * a;
  var h = Math.sqrt((1 - i) / c);
  return n[0] = r * e, n[1] = r * t, n[2] = r * s * h, n[3] = r * a * h, n;
}
function us(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3];
  return n[0] = e[0] * t + e[4] * s + e[8] * a + e[12] * i, n[1] = e[1] * t + e[5] * s + e[9] * a + e[13] * i, n[2] = e[2] * t + e[6] * s + e[10] * a + e[14] * i, n[3] = e[3] * t + e[7] * s + e[11] * a + e[15] * i, n;
}
function na(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = s * h - a * l, v = a * c - t * h, M = t * l - s * c;
  return f = f + f, v = v + v, M = M + M, n[0] = c + i * f + s * M - a * v, n[1] = l + i * v + a * f - t * M, n[2] = h + i * M + t * v - s * f, n[3] = r[3], n;
}
function ra(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0, n;
}
function ea(n) {
  return "vec4(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
function v1(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3];
}
function ta(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = r[0], c = r[1], l = r[2], h = r[3];
  return Math.abs(e - i) <= C * Math.max(1, Math.abs(e), Math.abs(i)) && Math.abs(t - c) <= C * Math.max(1, Math.abs(t), Math.abs(c)) && Math.abs(s - l) <= C * Math.max(1, Math.abs(s), Math.abs(l)) && Math.abs(a - h) <= C * Math.max(1, Math.abs(a), Math.abs(h));
}
var sa = t1, aa = s1, ia = a1, ca = c1, la = l1, ha = ur, fa = ne, va = (function() {
  var n = He();
  return function(r, e, t, s, a, i) {
    var c, l;
    for (e || (e = 4), t || (t = 0), s ? l = Math.min(s * e + t, r.length) : l = r.length, c = t; c < l; c += e)
      n[0] = r[c], n[1] = r[c + 1], n[2] = r[c + 2], n[3] = r[c + 3], a(n, n, i), r[c] = n[0], r[c + 1] = n[1], r[c + 2] = n[2], r[c + 3] = n[3];
    return r;
  };
})();
const Ma = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: e1,
  ceil: ks,
  clone: Je,
  copy: n1,
  create: He,
  cross: Hs,
  dist: ca,
  distance: c1,
  div: ia,
  divide: a1,
  dot: re,
  equals: ta,
  exactEquals: v1,
  floor: Us,
  forEach: va,
  fromValues: ue,
  inverse: Qs,
  len: ha,
  length: ur,
  lerp: f1,
  max: Ns,
  min: Vs,
  mul: aa,
  multiply: s1,
  negate: Ks,
  normalize: h1,
  random: Js,
  round: Xs,
  scale: i1,
  scaleAndAdd: _s,
  set: r1,
  sqrDist: la,
  sqrLen: fa,
  squaredDistance: l1,
  squaredLength: ne,
  str: ea,
  sub: sa,
  subtract: t1,
  transformMat4: us,
  transformQuat: na,
  zero: ra
}, Symbol.toStringTag, { value: "Module" }));
function Fr() {
  var n = new N(4);
  return N != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0), n[3] = 1, n;
}
function da(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n;
}
function M1(n, r, e) {
  e = e * 0.5;
  var t = Math.sin(e);
  return n[0] = t * r[0], n[1] = t * r[1], n[2] = t * r[2], n[3] = Math.cos(e), n;
}
function ma(n, r) {
  var e = Math.acos(r[3]) * 2, t = Math.sin(e / 2);
  return t > C ? (n[0] = r[0] / t, n[1] = r[1] / t, n[2] = r[2] / t) : (n[0] = 1, n[1] = 0, n[2] = 0), e;
}
function ya(n, r) {
  var e = te(n, r);
  return Math.acos(2 * e * e - 1);
}
function d1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return n[0] = t * f + i * c + s * h - a * l, n[1] = s * f + i * l + a * c - t * h, n[2] = a * f + i * h + t * l - s * c, n[3] = i * f - t * c - s * l - a * h, n;
}
function m1(n, r, e) {
  e *= 0.5;
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l + i * c, n[1] = s * l + a * c, n[2] = a * l - s * c, n[3] = i * l - t * c, n;
}
function y1(n, r, e) {
  e *= 0.5;
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l - a * c, n[1] = s * l + i * c, n[2] = a * l + t * c, n[3] = i * l - s * c, n;
}
function o1(n, r, e) {
  e *= 0.5;
  var t = r[0], s = r[1], a = r[2], i = r[3], c = Math.sin(e), l = Math.cos(e);
  return n[0] = t * l + s * c, n[1] = s * l - t * c, n[2] = a * l + i * c, n[3] = i * l - a * c, n;
}
function oa(n, r) {
  var e = r[0], t = r[1], s = r[2];
  return n[0] = e, n[1] = t, n[2] = s, n[3] = Math.sqrt(Math.abs(1 - e * e - t * t - s * s)), n;
}
function x1(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = Math.sqrt(e * e + t * t + s * s), c = Math.exp(a), l = i > 0 ? c * Math.sin(i) / i : 0;
  return n[0] = e * l, n[1] = t * l, n[2] = s * l, n[3] = c * Math.cos(i), n;
}
function p1(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = Math.sqrt(e * e + t * t + s * s), c = i > 0 ? Math.atan2(i, a) / i : 0;
  return n[0] = e * c, n[1] = t * c, n[2] = s * c, n[3] = 0.5 * Math.log(e * e + t * t + s * s + a * a), n;
}
function xa(n, r, e) {
  return p1(n, r), w1(n, n, e), x1(n, n), n;
}
function Er(n, r, e, t) {
  var s = r[0], a = r[1], i = r[2], c = r[3], l = e[0], h = e[1], f = e[2], v = e[3], M, d, y, o, m;
  return d = s * l + a * h + i * f + c * v, d < 0 && (d = -d, l = -l, h = -h, f = -f, v = -v), 1 - d > C ? (M = Math.acos(d), y = Math.sin(M), o = Math.sin((1 - t) * M) / y, m = Math.sin(t * M) / y) : (o = 1 - t, m = t), n[0] = o * s + m * l, n[1] = o * a + m * h, n[2] = o * i + m * f, n[3] = o * c + m * v, n;
}
function pa(n) {
  var r = or(), e = or(), t = or(), s = Math.sqrt(1 - r), a = Math.sqrt(r);
  return n[0] = s * Math.sin(2 * Math.PI * e), n[1] = s * Math.cos(2 * Math.PI * e), n[2] = a * Math.sin(2 * Math.PI * t), n[3] = a * Math.cos(2 * Math.PI * t), n;
}
function Aa(n, r) {
  var e = r[0], t = r[1], s = r[2], a = r[3], i = e * e + t * t + s * s + a * a, c = i ? 1 / i : 0;
  return n[0] = -e * c, n[1] = -t * c, n[2] = -s * c, n[3] = a * c, n;
}
function wa(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n[3] = r[3], n;
}
function A1(n, r) {
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
function ga(n, r, e, t) {
  var s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : ge, a = Math.PI / 360;
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
function za(n) {
  return "quat(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ")";
}
var $a = Je, ba = ue, ee = n1, qa = r1, Sa = e1, Ia = d1, w1 = i1, te = re, Oa = f1, se = ur, ja = se, ae = ne, Ca = ae, ie = h1, Ta = v1;
function Ra(n, r) {
  return Math.abs(re(n, r)) >= 1 - C;
}
var Ea = (function() {
  var n = Jr(), r = Kr(1, 0, 0), e = Kr(0, 1, 0);
  return function(t, s, a) {
    var i = Dr(s, a);
    return i < -0.999999 ? (Rr(n, r, s), Qe(n) < 1e-6 && Rr(n, e, s), _e(n, n), M1(t, n, Math.PI), t) : i > 0.999999 ? (t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t) : (Rr(n, s, a), t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = 1 + i, ie(t, t));
  };
})(), Fa = (function() {
  var n = Fr(), r = Fr();
  return function(e, t, s, a, i, c) {
    return Er(n, t, i, c), Er(r, s, a, c), Er(e, n, r, 2 * c * (1 - c)), e;
  };
})(), Ya = (function() {
  var n = Se();
  return function(r, e, t, s) {
    return n[0] = t[0], n[3] = t[1], n[6] = t[2], n[1] = s[0], n[4] = s[1], n[7] = s[2], n[2] = -e[0], n[5] = -e[1], n[8] = -e[2], ie(r, A1(r, n));
  };
})();
const La = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Sa,
  calculateW: oa,
  clone: $a,
  conjugate: wa,
  copy: ee,
  create: Fr,
  dot: te,
  equals: Ra,
  exactEquals: Ta,
  exp: x1,
  fromEuler: ga,
  fromMat3: A1,
  fromValues: ba,
  getAngle: ya,
  getAxisAngle: ma,
  identity: da,
  invert: Aa,
  len: ja,
  length: se,
  lerp: Oa,
  ln: p1,
  mul: Ia,
  multiply: d1,
  normalize: ie,
  pow: xa,
  random: pa,
  rotateX: m1,
  rotateY: y1,
  rotateZ: o1,
  rotationTo: Ea,
  scale: w1,
  set: qa,
  setAxes: Ya,
  setAxisAngle: M1,
  slerp: Er,
  sqlerp: Fa,
  sqrLen: Ca,
  squaredLength: ae,
  str: za
}, Symbol.toStringTag, { value: "Module" }));
function Ba() {
  var n = new N(8);
  return N != Float32Array && (n[0] = 0, n[1] = 0, n[2] = 0, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0), n[3] = 1, n;
}
function Wa(n) {
  var r = new N(8);
  return r[0] = n[0], r[1] = n[1], r[2] = n[2], r[3] = n[3], r[4] = n[4], r[5] = n[5], r[6] = n[6], r[7] = n[7], r;
}
function Za(n, r, e, t, s, a, i, c) {
  var l = new N(8);
  return l[0] = n, l[1] = r, l[2] = e, l[3] = t, l[4] = s, l[5] = a, l[6] = i, l[7] = c, l;
}
function Pa(n, r, e, t, s, a, i) {
  var c = new N(8);
  c[0] = n, c[1] = r, c[2] = e, c[3] = t;
  var l = s * 0.5, h = a * 0.5, f = i * 0.5;
  return c[4] = l * t + h * e - f * r, c[5] = h * t + f * n - l * e, c[6] = f * t + l * r - h * n, c[7] = -l * n - h * r - f * e, c;
}
function g1(n, r, e) {
  var t = e[0] * 0.5, s = e[1] * 0.5, a = e[2] * 0.5, i = r[0], c = r[1], l = r[2], h = r[3];
  return n[0] = i, n[1] = c, n[2] = l, n[3] = h, n[4] = t * h + s * l - a * c, n[5] = s * h + a * i - t * l, n[6] = a * h + t * c - s * i, n[7] = -t * i - s * c - a * l, n;
}
function Ga(n, r) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = r[0] * 0.5, n[5] = r[1] * 0.5, n[6] = r[2] * 0.5, n[7] = 0, n;
}
function Da(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function ka(n, r) {
  var e = Fr();
  Ye(e, r);
  var t = new N(3);
  return Ee(t, r), g1(n, e, t), n;
}
function z1(n, r) {
  return n[0] = r[0], n[1] = r[1], n[2] = r[2], n[3] = r[3], n[4] = r[4], n[5] = r[5], n[6] = r[6], n[7] = r[7], n;
}
function Ua(n) {
  return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n;
}
function Va(n, r, e, t, s, a, i, c, l) {
  return n[0] = r, n[1] = e, n[2] = t, n[3] = s, n[4] = a, n[5] = i, n[6] = c, n[7] = l, n;
}
var Na = ee;
function Xa(n, r) {
  return n[0] = r[4], n[1] = r[5], n[2] = r[6], n[3] = r[7], n;
}
var _a = ee;
function Ka(n, r) {
  return n[4] = r[0], n[5] = r[1], n[6] = r[2], n[7] = r[3], n;
}
function Qa(n, r) {
  var e = r[4], t = r[5], s = r[6], a = r[7], i = -r[0], c = -r[1], l = -r[2], h = r[3];
  return n[0] = (e * h + a * i + t * l - s * c) * 2, n[1] = (t * h + a * c + s * i - e * l) * 2, n[2] = (s * h + a * l + e * c - t * i) * 2, n;
}
function Ha(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0] * 0.5, l = e[1] * 0.5, h = e[2] * 0.5, f = r[4], v = r[5], M = r[6], d = r[7];
  return n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = i * c + s * h - a * l + f, n[5] = i * l + a * c - t * h + v, n[6] = i * h + t * l - s * c + M, n[7] = -t * c - s * l - a * h + d, n;
}
function Ja(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, M = l * i + f * s + h * t - c * a, d = h * i + f * a + c * s - l * t, y = f * i - c * t - l * s - h * a;
  return m1(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + y * t + M * a - d * s, n[5] = M * i + y * s + d * t - v * a, n[6] = d * i + y * a + v * s - M * t, n[7] = y * i - v * t - M * s - d * a, n;
}
function ua(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, M = l * i + f * s + h * t - c * a, d = h * i + f * a + c * s - l * t, y = f * i - c * t - l * s - h * a;
  return y1(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + y * t + M * a - d * s, n[5] = M * i + y * s + d * t - v * a, n[6] = d * i + y * a + v * s - M * t, n[7] = y * i - v * t - M * s - d * a, n;
}
function ni(n, r, e) {
  var t = -r[0], s = -r[1], a = -r[2], i = r[3], c = r[4], l = r[5], h = r[6], f = r[7], v = c * i + f * t + l * a - h * s, M = l * i + f * s + h * t - c * a, d = h * i + f * a + c * s - l * t, y = f * i - c * t - l * s - h * a;
  return o1(n, r, e), t = n[0], s = n[1], a = n[2], i = n[3], n[4] = v * i + y * t + M * a - d * s, n[5] = M * i + y * s + d * t - v * a, n[6] = d * i + y * a + v * s - M * t, n[7] = y * i - v * t - M * s - d * a, n;
}
function ri(n, r, e) {
  var t = e[0], s = e[1], a = e[2], i = e[3], c = r[0], l = r[1], h = r[2], f = r[3];
  return n[0] = c * i + f * t + l * a - h * s, n[1] = l * i + f * s + h * t - c * a, n[2] = h * i + f * a + c * s - l * t, n[3] = f * i - c * t - l * s - h * a, c = r[4], l = r[5], h = r[6], f = r[7], n[4] = c * i + f * t + l * a - h * s, n[5] = l * i + f * s + h * t - c * a, n[6] = h * i + f * a + c * s - l * t, n[7] = f * i - c * t - l * s - h * a, n;
}
function ei(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[0], l = e[1], h = e[2], f = e[3];
  return n[0] = t * f + i * c + s * h - a * l, n[1] = s * f + i * l + a * c - t * h, n[2] = a * f + i * h + t * l - s * c, n[3] = i * f - t * c - s * l - a * h, c = e[4], l = e[5], h = e[6], f = e[7], n[4] = t * f + i * c + s * h - a * l, n[5] = s * f + i * l + a * c - t * h, n[6] = a * f + i * h + t * l - s * c, n[7] = i * f - t * c - s * l - a * h, n;
}
function ti(n, r, e, t) {
  if (Math.abs(t) < C)
    return z1(n, r);
  var s = Math.sqrt(e[0] * e[0] + e[1] * e[1] + e[2] * e[2]);
  t = t * 0.5;
  var a = Math.sin(t), i = a * e[0] / s, c = a * e[1] / s, l = a * e[2] / s, h = Math.cos(t), f = r[0], v = r[1], M = r[2], d = r[3];
  n[0] = f * h + d * i + v * l - M * c, n[1] = v * h + d * c + M * i - f * l, n[2] = M * h + d * l + f * c - v * i, n[3] = d * h - f * i - v * c - M * l;
  var y = r[4], o = r[5], m = r[6], x = r[7];
  return n[4] = y * h + x * i + o * l - m * c, n[5] = o * h + x * c + m * i - y * l, n[6] = m * h + x * l + y * c - o * i, n[7] = x * h - y * i - o * c - m * l, n;
}
function si(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n[2] = r[2] + e[2], n[3] = r[3] + e[3], n[4] = r[4] + e[4], n[5] = r[5] + e[5], n[6] = r[6] + e[6], n[7] = r[7] + e[7], n;
}
function $1(n, r, e) {
  var t = r[0], s = r[1], a = r[2], i = r[3], c = e[4], l = e[5], h = e[6], f = e[7], v = r[4], M = r[5], d = r[6], y = r[7], o = e[0], m = e[1], x = e[2], $ = e[3];
  return n[0] = t * $ + i * o + s * x - a * m, n[1] = s * $ + i * m + a * o - t * x, n[2] = a * $ + i * x + t * m - s * o, n[3] = i * $ - t * o - s * m - a * x, n[4] = t * f + i * c + s * h - a * l + v * $ + y * o + M * x - d * m, n[5] = s * f + i * l + a * c - t * h + M * $ + y * m + d * o - v * x, n[6] = a * f + i * h + t * l - s * c + d * $ + y * x + v * m - M * o, n[7] = i * f - t * c - s * l - a * h + y * $ - v * o - M * m - d * x, n;
}
var ai = $1;
function ii(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n[2] = r[2] * e, n[3] = r[3] * e, n[4] = r[4] * e, n[5] = r[5] * e, n[6] = r[6] * e, n[7] = r[7] * e, n;
}
var b1 = te;
function ci(n, r, e, t) {
  var s = 1 - t;
  return b1(r, e) < 0 && (t = -t), n[0] = r[0] * s + e[0] * t, n[1] = r[1] * s + e[1] * t, n[2] = r[2] * s + e[2] * t, n[3] = r[3] * s + e[3] * t, n[4] = r[4] * s + e[4] * t, n[5] = r[5] * s + e[5] * t, n[6] = r[6] * s + e[6] * t, n[7] = r[7] * s + e[7] * t, n;
}
function li(n, r) {
  var e = kr(r);
  return n[0] = -r[0] / e, n[1] = -r[1] / e, n[2] = -r[2] / e, n[3] = r[3] / e, n[4] = -r[4] / e, n[5] = -r[5] / e, n[6] = -r[6] / e, n[7] = r[7] / e, n;
}
function hi(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n[2] = -r[2], n[3] = r[3], n[4] = -r[4], n[5] = -r[5], n[6] = -r[6], n[7] = r[7], n;
}
var q1 = se, fi = q1, kr = ae, vi = kr;
function Mi(n, r) {
  var e = kr(r);
  if (e > 0) {
    e = Math.sqrt(e);
    var t = r[0] / e, s = r[1] / e, a = r[2] / e, i = r[3] / e, c = r[4], l = r[5], h = r[6], f = r[7], v = t * c + s * l + a * h + i * f;
    n[0] = t, n[1] = s, n[2] = a, n[3] = i, n[4] = (c - t * v) / e, n[5] = (l - s * v) / e, n[6] = (h - a * v) / e, n[7] = (f - i * v) / e;
  }
  return n;
}
function di(n) {
  return "quat2(" + n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3] + ", " + n[4] + ", " + n[5] + ", " + n[6] + ", " + n[7] + ")";
}
function mi(n, r) {
  return n[0] === r[0] && n[1] === r[1] && n[2] === r[2] && n[3] === r[3] && n[4] === r[4] && n[5] === r[5] && n[6] === r[6] && n[7] === r[7];
}
function yi(n, r) {
  var e = n[0], t = n[1], s = n[2], a = n[3], i = n[4], c = n[5], l = n[6], h = n[7], f = r[0], v = r[1], M = r[2], d = r[3], y = r[4], o = r[5], m = r[6], x = r[7];
  return Math.abs(e - f) <= C * Math.max(1, Math.abs(e), Math.abs(f)) && Math.abs(t - v) <= C * Math.max(1, Math.abs(t), Math.abs(v)) && Math.abs(s - M) <= C * Math.max(1, Math.abs(s), Math.abs(M)) && Math.abs(a - d) <= C * Math.max(1, Math.abs(a), Math.abs(d)) && Math.abs(i - y) <= C * Math.max(1, Math.abs(i), Math.abs(y)) && Math.abs(c - o) <= C * Math.max(1, Math.abs(c), Math.abs(o)) && Math.abs(l - m) <= C * Math.max(1, Math.abs(l), Math.abs(m)) && Math.abs(h - x) <= C * Math.max(1, Math.abs(h), Math.abs(x));
}
const oi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: si,
  clone: Wa,
  conjugate: hi,
  copy: z1,
  create: Ba,
  dot: b1,
  equals: yi,
  exactEquals: mi,
  fromMat4: ka,
  fromRotation: Da,
  fromRotationTranslation: g1,
  fromRotationTranslationValues: Pa,
  fromTranslation: Ga,
  fromValues: Za,
  getDual: Xa,
  getReal: Na,
  getTranslation: Qa,
  identity: Ua,
  invert: li,
  len: fi,
  length: q1,
  lerp: ci,
  mul: ai,
  multiply: $1,
  normalize: Mi,
  rotateAroundAxis: ti,
  rotateByQuatAppend: ri,
  rotateByQuatPrepend: ei,
  rotateX: Ja,
  rotateY: ua,
  rotateZ: ni,
  scale: ii,
  set: Va,
  setDual: Ka,
  setReal: _a,
  sqrLen: vi,
  squaredLength: kr,
  str: di,
  translate: Ha
}, Symbol.toStringTag, { value: "Module" }));
function S1() {
  var n = new N(2);
  return N != Float32Array && (n[0] = 0, n[1] = 0), n;
}
function xi(n) {
  var r = new N(2);
  return r[0] = n[0], r[1] = n[1], r;
}
function pi(n, r) {
  var e = new N(2);
  return e[0] = n, e[1] = r, e;
}
function Ai(n, r) {
  return n[0] = r[0], n[1] = r[1], n;
}
function wi(n, r, e) {
  return n[0] = r, n[1] = e, n;
}
function gi(n, r, e) {
  return n[0] = r[0] + e[0], n[1] = r[1] + e[1], n;
}
function I1(n, r, e) {
  return n[0] = r[0] - e[0], n[1] = r[1] - e[1], n;
}
function O1(n, r, e) {
  return n[0] = r[0] * e[0], n[1] = r[1] * e[1], n;
}
function j1(n, r, e) {
  return n[0] = r[0] / e[0], n[1] = r[1] / e[1], n;
}
function zi(n, r) {
  return n[0] = Math.ceil(r[0]), n[1] = Math.ceil(r[1]), n;
}
function $i(n, r) {
  return n[0] = Math.floor(r[0]), n[1] = Math.floor(r[1]), n;
}
function bi(n, r, e) {
  return n[0] = Math.min(r[0], e[0]), n[1] = Math.min(r[1], e[1]), n;
}
function qi(n, r, e) {
  return n[0] = Math.max(r[0], e[0]), n[1] = Math.max(r[1], e[1]), n;
}
function Si(n, r) {
  return n[0] = xr(r[0]), n[1] = xr(r[1]), n;
}
function Ii(n, r, e) {
  return n[0] = r[0] * e, n[1] = r[1] * e, n;
}
function Oi(n, r, e, t) {
  return n[0] = r[0] + e[0] * t, n[1] = r[1] + e[1] * t, n;
}
function C1(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1];
  return Math.sqrt(e * e + t * t);
}
function T1(n, r) {
  var e = r[0] - n[0], t = r[1] - n[1];
  return e * e + t * t;
}
function R1(n) {
  var r = n[0], e = n[1];
  return Math.sqrt(r * r + e * e);
}
function E1(n) {
  var r = n[0], e = n[1];
  return r * r + e * e;
}
function ji(n, r) {
  return n[0] = -r[0], n[1] = -r[1], n;
}
function Ci(n, r) {
  return n[0] = 1 / r[0], n[1] = 1 / r[1], n;
}
function Ti(n, r) {
  var e = r[0], t = r[1], s = e * e + t * t;
  return s > 0 && (s = 1 / Math.sqrt(s)), n[0] = r[0] * s, n[1] = r[1] * s, n;
}
function Ri(n, r) {
  return n[0] * r[0] + n[1] * r[1];
}
function Ei(n, r, e) {
  var t = r[0] * e[1] - r[1] * e[0];
  return n[0] = n[1] = 0, n[2] = t, n;
}
function Fi(n, r, e, t) {
  var s = r[0], a = r[1];
  return n[0] = s + t * (e[0] - s), n[1] = a + t * (e[1] - a), n;
}
function Yi(n, r) {
  r = r === void 0 ? 1 : r;
  var e = or() * 2 * Math.PI;
  return n[0] = Math.cos(e) * r, n[1] = Math.sin(e) * r, n;
}
function Li(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[2] * s, n[1] = e[1] * t + e[3] * s, n;
}
function Bi(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[2] * s + e[4], n[1] = e[1] * t + e[3] * s + e[5], n;
}
function Wi(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[3] * s + e[6], n[1] = e[1] * t + e[4] * s + e[7], n;
}
function Zi(n, r, e) {
  var t = r[0], s = r[1];
  return n[0] = e[0] * t + e[4] * s + e[12], n[1] = e[1] * t + e[5] * s + e[13], n;
}
function Pi(n, r, e, t) {
  var s = r[0] - e[0], a = r[1] - e[1], i = Math.sin(t), c = Math.cos(t);
  return n[0] = s * c - a * i + e[0], n[1] = s * i + a * c + e[1], n;
}
function Gi(n, r) {
  var e = n[0], t = n[1], s = r[0], a = r[1];
  return Math.abs(Math.atan2(t * s - e * a, e * s + t * a));
}
function Di(n, r) {
  var e = n[0], t = n[1], s = r[0], a = r[1];
  return Math.atan2(e * a - t * s, e * s + t * a);
}
function ki(n) {
  return n[0] = 0, n[1] = 0, n;
}
function Ui(n) {
  return "vec2(" + n[0] + ", " + n[1] + ")";
}
function Vi(n, r) {
  return n[0] === r[0] && n[1] === r[1];
}
function Ni(n, r) {
  var e = n[0], t = n[1], s = r[0], a = r[1];
  return Math.abs(e - s) <= C * Math.max(1, Math.abs(e), Math.abs(s)) && Math.abs(t - a) <= C * Math.max(1, Math.abs(t), Math.abs(a));
}
var Xi = R1, _i = I1, Ki = O1, Qi = j1, Hi = C1, Ji = T1, ui = E1, nc = (function() {
  var n = S1();
  return function(r, e, t, s, a, i) {
    var c, l;
    for (e || (e = 2), t || (t = 0), s ? l = Math.min(s * e + t, r.length) : l = r.length, c = t; c < l; c += e)
      n[0] = r[c], n[1] = r[c + 1], a(n, n, i), r[c] = n[0], r[c + 1] = n[1];
    return r;
  };
})();
const rc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: gi,
  angle: Gi,
  ceil: zi,
  clone: xi,
  copy: Ai,
  create: S1,
  cross: Ei,
  dist: Hi,
  distance: C1,
  div: Qi,
  divide: j1,
  dot: Ri,
  equals: Ni,
  exactEquals: Vi,
  floor: $i,
  forEach: nc,
  fromValues: pi,
  inverse: Ci,
  len: Xi,
  length: R1,
  lerp: Fi,
  max: qi,
  min: bi,
  mul: Ki,
  multiply: O1,
  negate: ji,
  normalize: Ti,
  random: Yi,
  rotate: Pi,
  round: Si,
  scale: Ii,
  scaleAndAdd: Oi,
  set: wi,
  signedAngle: Di,
  sqrDist: Ji,
  sqrLen: ui,
  squaredDistance: T1,
  squaredLength: E1,
  str: Ui,
  sub: _i,
  subtract: I1,
  transformMat2: Li,
  transformMat2d: Bi,
  transformMat3: Wi,
  transformMat4: Zi,
  zero: ki
}, Symbol.toStringTag, { value: "Module" })), ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: Q1,
  mat2: gt,
  mat2d: Vt,
  mat3: g0,
  mat4: Pe,
  quat: La,
  quat2: oi,
  vec2: rc,
  vec3: Ds,
  vec4: Ma
}, Symbol.toStringTag, { value: "Module" })), Ur = Gr;
function Vr() {
  an.call(this), this.events = {
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
var ln = Vr.prototype = Object.create(an.prototype), cr = new Float32Array([0, 0, 0]), vr = new Float32Array(16);
ln.constructor = Vr;
ln.local = null;
ln.worldMatrix = null;
ln.worldToLocal = null;
ln.children = null;
ln.parent = null;
ln.dirtyW = !0;
ln.dirtyL = !0;
ln.onParentUpdate = null;
ln.addChild = function(n) {
  this.children[this.children.length] = n, n.setParent(this);
};
ln.removeChild = function(n) {
  this.children.splice(this.children.indexOf(n), 1), n.removeParent();
};
ln.setParent = function(n) {
  this.parent = n, n.gameObject.world !== null && n.gameObject.world.addGameObject(this.gameObject);
};
ln.setGameObject = function(n) {
  an.prototype.setGameObject.call(this, n), n.transform = this;
};
ln.unsetGameObject = function() {
  throw "Transform shouldn't be remove from gameObject";
};
ln.removeParent = function() {
  this.parent = null;
};
ln.translate = function(n, r, e, t) {
  cr[0] = n, cr[1] = r, cr[2] = e, t === "world" ? (Hr(vr), _r(vr, vr, cr), Ur(this.local, vr, this.local)) : _r(this.local, this.local, cr);
};
ln.rotate = function(n, r, e, t) {
  var s = Math.PI / 180, a = Pe;
  t === "world" ? (a.identity(vr), a.rotateZ(vr, vr, e * s), a.rotateY(vr, vr, r * s), a.rotateX(vr, vr, n * s), Ur(this.local, vr, this.local)) : (a.rotateZ(this.local, this.local, e * s), a.rotateY(this.local, this.local, r * s), a.rotateX(this.local, this.local, n * s));
};
ln.getLocalToWorld = function() {
  return this.dirtyL === !0 && (this.parent === null ? this.worldMatrix.set(this.local) : Ur(this.worldMatrix, this.parent.getLocalToWorld(), this.local)), this.worldMatrix;
};
ln.getWorldToLocal = function() {
  return this.dirtyW === !0 && je(this.worldToLocal, this.getLocalToWorld()), this.worldToLocal;
};
ln.getPosition = function(n) {
  n === void 0 && (n = []);
  var r = this.getLocalToWorld();
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
};
ln.getLocalPosition = function(n) {
  n === void 0 && (n = []);
  var r = this.local;
  return n[0] = r[12], n[1] = r[13], n[2] = r[14], n;
};
ln.getRotation = function() {
  throw "TransformComponent.getRotation not implemented yet";
};
ln.getLocalRotation = function() {
  throw "TransformComponent.getLocalRotation not implemented yet";
};
ln.setPosition = function(n, r, e) {
  cr[0] = n, cr[1] = r, cr[2] = e, this.parent !== null && Ke(cr, cr, this.parent.getWorldToLocal()), this.local[12] = cr[0], this.local[13] = cr[1], this.local[14] = cr[2];
};
ln.setLocalPosition = function(n, r, e) {
  this.local[12] = n, this.local[13] = r, this.local[14] = e;
};
ln.scale = function(n, r, e) {
  Te(this.local, this.local, [n, r, e]);
};
ln.updateWorldMatrix = function(n = !1) {
  this.parent === null ? this.worldMatrix.set(this.local) : (n && this.parent.updateWorldMatrix(n), Ur(this.worldMatrix, this.parent.worldMatrix, this.local));
};
function Xn(n) {
  this.instanceId = Xn.prototype.instanceId++, this.components = [], this.transform = this.addComponent(new Vr()), this.name = n || "gameObject";
}
var Mr = Xn.prototype;
Mr.instanceId = 0;
Mr.name = null;
Mr.layer = 0;
Mr.scene = null;
Mr.world = null;
Mr.transform = null;
Mr.components = null;
Mr.componentsCount = 0;
Mr.setScene = function(n) {
  this.scene = n;
};
Mr.addComponent = function(n) {
  return this.components[this.componentsCount++] = n, n.setGameObject(this), n;
};
Mr.removeComponent = function(n) {
  n.unsetGameObject();
};
Mr.getComponent = function(n) {
  for (var r = 0; r < this.components.length; r++) {
    var e = this.components[r];
    if (e instanceof n)
      return e;
  }
  return null;
};
const F1 = {
  NONE: "NONE",
  RADIAL: "RADIAL",
  RADIAL_FAST: "RADIAL_FAST",
  LINEAR: "LINEAR"
};
function H(n) {
  an.call(this), this.transform = n, this.projectionMatrix = new Float32Array(16), this.clipSpaceMatrix = new Float32Array(16), this.frustumSize = [
    [0, 0, 0],
    [0, 0, 0]
  ];
}
H.prototype = Object.create(an.prototype);
H.prototype.constructor = H;
H.prototype.frustumSize = null;
H.prototype.projectionMatrix = null;
H.prototype.clipSpaceMatrix = null;
H.prototype.nearClippingPane = 0;
H.prototype.farClippingPane = 1e3;
H.prototype.fogType = F1.LINEAR;
H.prototype.fogNearPane = 250;
H.prototype.fogFarPane = 750;
H.prototype.fogColor = new Uint8Array([150, 150, 150]);
H.prototype.ambientLight = 0.5;
H.prototype.setup = function(n, r) {
  this.frustumSize = [
    [-n / 2, -r / 2, 0],
    [n / 2, r / 2, length]
  ], We(this.projectionMatrix, -n / 2, n / 2, -r / 2, r / 2, this.nearClippingPane, this.farClippingPane);
};
H.prototype.setGameObject = function(n) {
  an.prototype.setGameObject.call(this, n), n.camera = this;
};
H.prototype.unsetGameObject = function() {
  this.gameObject.camera = void 0, an.prototype.unsetGameObject.call(this);
};
H.prototype.getClipSpaceMatrix = function() {
  const n = this.transform.getWorldToLocal();
  return Gr(this.clipSpaceMatrix, this.projectionMatrix, n), this.clipSpaceMatrix;
};
H.FogType = F1;
function Y1(n) {
  Xn.call(this, n || "camera"), this.addComponent(new H(this.transform));
}
Y1.prototype = Object.create(Xn.prototype);
function Tn() {
  an.call(this), this.colors = new Uint8Array([0, 0, 255]), this.faceColors = new Uint32Array([0]);
}
var Ln = Tn.prototype = Object.create(an.prototype);
Ln.constructor = Tn;
Ln.layer = 0;
Ln.vertices = null;
Ln.faces = null;
Ln.pivot = [0, 0, 0];
Ln.color = null;
Ln.colors = null;
Ln.uvs = null;
Ln._texture = null;
Ln.textureImage = null;
Object.defineProperty(Ln, "texture", {
  get: function() {
    return this._texture;
  },
  set: function(n) {
    this._texture !== n && (this._texture = n, n ? (this.textureImage || (this.textureImage = new Image()), this.textureImage.src = n) : this.textureImage = null);
  }
});
Ln.faceColors = null;
Ln.faceNormals = null;
Ln.vertexNormals = null;
Ln.bounds = null;
Ln.updateNormals = function(n = 1) {
  const r = this.faces, e = this.vertices, t = r.length;
  (!this.faceNormals || this.faceNormals.length !== t) && (this.faceNormals = new Float32Array(t)), !this.vertexNormals || this.vertexNormals.length !== e.length ? this.vertexNormals = new Float32Array(e.length) : this.vertexNormals.fill(0);
  for (let s = 0; s < t; s += 3) {
    const a = r[s] * 3, i = r[s + 1] * 3, c = r[s + 2] * 3, l = e[i] - e[a], h = e[i + 1] - e[a + 1], f = e[i + 2] - e[a + 2], v = e[c] - e[a], M = e[c + 1] - e[a + 1], d = e[c + 2] - e[a + 2];
    let y = (h * d - f * M) * n, o = (f * v - l * d) * n, m = (l * M - h * v) * n;
    const x = Math.sqrt(y * y + o * o + m * m);
    if (x > 1e-10) {
      const $ = 1 / x;
      this.faceNormals[s] = y * $, this.faceNormals[s + 1] = o * $, this.faceNormals[s + 2] = m * $, this.vertexNormals[a] += y, this.vertexNormals[a + 1] += o, this.vertexNormals[a + 2] += m, this.vertexNormals[i] += y, this.vertexNormals[i + 1] += o, this.vertexNormals[i + 2] += m, this.vertexNormals[c] += y, this.vertexNormals[c + 1] += o, this.vertexNormals[c + 2] += m;
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
Ln.setGameObject = function(n) {
  an.prototype.setGameObject.call(this, n), n.meshRenderer = this;
};
Ln.unsetGameObject = function() {
  this.gameObject.meshRenderer = void 0, an.prototype.unsetGameObject.call(this);
};
Tn.computeNormalMatrix = function(n, r) {
  const e = r[0], t = r[1], s = r[2], a = r[4], i = r[5], c = r[6], l = r[8], h = r[9], f = r[10], v = i * f - c * h, M = -(a * f - c * l), d = a * h - i * l, y = e * v + t * M + s * d;
  if (Math.abs(y) < 1e-6) return null;
  const o = 1 / y;
  n[0] = v * o, n[1] = M * o, n[2] = d * o, n[3] = -(t * f - s * h) * o, n[4] = (e * f - s * l) * o, n[5] = -(e * h - t * l) * o, n[6] = (t * c - s * i) * o, n[7] = -(e * c - s * a) * o, n[8] = (e * i - t * a) * o;
};
Tn.computeBoundsFlatArray = function(n, r, e) {
  if (e.length !== 0) {
    for (var t = e[0], s = t, a = e[1], i = a, c = e[2], l = c, h = 3; h < e.length; h += 3) {
      var f = e[h], v = e[h + 1], M = e[h + 2];
      f < t ? t = f : f > s && (s = f), v < a ? a = v : v > i && (i = v), M < c ? c = M : M > l && (l = M);
    }
    return n[r] = t, n[r + 1] = a, n[r + 2] = c, n[r + 3] = s, n[r + 4] = a, n[r + 5] = c, n[r + 6] = t, n[r + 7] = i, n[r + 8] = c, n[r + 9] = s, n[r + 10] = i, n[r + 11] = c, n[r + 12] = t, n[r + 13] = a, n[r + 14] = l, n[r + 15] = s, n[r + 16] = a, n[r + 17] = l, n[r + 18] = t, n[r + 19] = i, n[r + 20] = l, n[r + 21] = s, n[r + 22] = i, n[r + 23] = l, n;
  }
};
Tn.computeBoundingSphere = function(n, r, e) {
  let t = 1 / 0, s = 1 / 0, a = 1 / 0, i = -1 / 0, c = -1 / 0, l = -1 / 0;
  for (let m = 0; m < e.length; m += 3) {
    const x = e[m], $ = e[m + 1], w = e[m + 2];
    x < t && (t = x), x > i && (i = x), $ < s && (s = $), $ > c && (c = $), w < a && (a = w), w > l && (l = w);
  }
  const h = (t + i) * 0.5, f = (s + c) * 0.5, v = (a + l) * 0.5, M = i - h, d = c - f, y = l - v, o = Math.sqrt(M * M + d * d + y * y);
  n[r] = h, n[r + 1] = f, n[r + 2] = v, n[r + 3] = o;
};
function ce(n) {
  an.call(this), this.events = {
    ready: 0
  }, this.enabled = !1;
}
var Ar = ce.prototype = Object.create(an.prototype);
Ar.constructor = ce;
Ar.sprite = null;
Ar.pivotX = 0;
Ar.pivotY = 0;
Ar.layer = 0;
Ar.setGameObject = function(n) {
  an.prototype.setGameObject.call(this, n), n.spriteRenderer = this;
};
Ar.setSprite = function(n) {
  return this.sprite = n, this.enabled = !0, this;
};
Ar.setPivot = function(n, r) {
  return this.pivotX = n, this.pivotY = r, this;
};
Ar.unsetGameObject = function() {
  this.gameObject.spriteRenderer = void 0, an.prototype.unsetGameObject.call(this);
};
function le() {
  an.call(this), this.points = [];
}
var qr = le.prototype = Object.create(an.prototype);
qr.constructor = le;
qr.points = null;
qr.color = "white";
qr.width = 1;
qr.layer = 0;
qr.setGameObject = function(n) {
  an.prototype.setGameObject.call(this, n), n.pathRenderer = this;
};
qr.unsetGameObject = function() {
  this.gameObject.pathRenderer = void 0, an.prototype.unsetGameObject.call(this);
};
function he() {
  an.call(this);
}
var wr = he.prototype = Object.create(an.prototype);
wr.constructor = he;
wr.text = "sample text";
wr.color = "white";
wr.style = "normal 12px arial";
wr.layer = 0;
wr.align = "center";
wr.valign = "middle";
wr.setGameObject = function(n) {
  an.prototype.setGameObject.call(this, n), n.textRenderer = this;
};
wr.unsetGameObject = function() {
  this.gameObject.textRenderer = void 0, an.prototype.unsetGameObject.call(this);
};
function tc(n, r, e) {
  const t = [], s = [], a = n / 2, i = r / 2, c = n / e, l = r / e;
  for (let f = 0; f <= e; f++) {
    const v = f * l - i;
    for (let M = 0; M <= e; M++) {
      const d = M * c - a;
      t.push(d, 0, v);
    }
  }
  const h = e + 1;
  for (let f = 0; f < e; f++)
    for (let v = 0; v < e; v++) {
      const M = f * h + v, d = f * h + (v + 1), y = (f + 1) * h + v, o = (f + 1) * h + (v + 1);
      s.push(M, y, d), s.push(o, d, y);
    }
  return {
    vertices: new Float32Array(t),
    faces: new Uint16Array(s)
  };
}
const Yr = tc(1, 1, 1), fe = new Float32Array(32);
Tn.computeBoundsFlatArray(fe, 0, Yr.vertices);
Tn.computeBoundingSphere(fe, 28, Yr.vertices);
function L1() {
  Xn.call(this);
  const n = new Tn();
  n.faces = Yr.faces, n.vertices = Yr.vertices, n.bounds = fe, n.updateNormals(), this.addComponent(n);
}
L1.prototype = Object.create(Xn.prototype);
const sc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAWdSURBVHhe7d3BalVXFMfhnUolEpGKYJRAY1EQWsGh4CP4CvdZS6d10I5UEAxNhFAjiEUMiYaSDkone5DtWTaH+7/5vuECIee4f5zJXty1xWJxurb7e5vqztbtfgR8pV9+e9GPzvRNPwByCBiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCrS0Wi9MfTv7s50PPd173o3Pz8ehzPxq6euVyP1oqG+vf9qOlcnh80o9Wwvr69HNxfDz9/FXtHbzvR2fyBYZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgs28jVbZwDt4f9qOh6jZS5e+rWNVtn8r7m/NdVLaRLrXTfjRUfSbbSHCBCBiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiCCRiClZcZdven/5uqP95Mu+D9NY4+1S6hk+HJ44f9aKhy1i0zAEMChmAChmAChmAChmAChmAChmAChmAChmAChmAChmAChmCzLzNULnm//etjPxq6+d3VfvRFKr8scGfrdj8aevrsVT9iBo8e3OtHQ5WzXjnnzTIDXCwChmAChmAChmAChmAChmAChmAChmAChmAChmAChmAChmAChmAR20hTNzRaa21783o/OjdzbTC11trO/pt+xAR3t271o6HnO6/70bmZetZ9gSGYgCGYgCGYgCGYgCGYgCGYgCGYgCGYgCGYgCGYgCGYgCHYyi4zVP24fbMfDVWeqeqnu9/3o6E5L+Mvu2V/f1PPui8wBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBFvZZYYb1zb60Rd59+GwHw2t4gLE02ev+tFKePTgXj8aqiwzVH6to7XWXuy97Udn8gWGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYOVtpMqGRlVlG+n+9mY/Ojcv9w760VBlg6mqsvlU2WBqrbWd/Tf9aKnc3brVj4YqZ902EjAkYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAgmYAg2+zJD5ZL31AverbW2vXm9Hy2VyoJGKz5X5Z1XFiBacQmiepYqlv3vm3oufIEhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAh2MouM9y4ttGPVsK7D4f9aKiyADGnyoLB02ev+tEXefTgXj8a2t2f3kd1GcQyA1wgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZgAoZg5W2kyoZGK25pTN3QaK21+9ub/ejCerl30I+GqhtMlW2zypmobDBVVc565Zla4az7AkMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUMwAUOw8jLDsv+0SvUyPv+aeqn+P5X3XjkT1WWByhJEZZmhaupZ9wWGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYAKGYOVlhmW+4N1aazeubfQjZvDuw2E/GqosQFRZZgCWhoAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhmIAhWHkbadl/WuXJ44f9CEoqZ71yzlvhrPsCQzABQzABQzABQzABQzABQzABQzABQzABQzABQzABQzABQ7DZlxkqPh597kdDV69c7kfnpnJx/fD4pB8tlcozVc35LtbXp5+L4+Pp569q7+B9PzqTLzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEs8zQmfMS/1zmXBaYS/X/6e+21o+GLrXTfjRUfeeWGeACETAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEEzAEW1ssFqe7v/7cz4eOPtW2LYD/jy8wBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBBMwBPsHOi10s5+cpw4AAAAASUVORK5CYII=";
function ac(n, r, e, t) {
  const s = [], a = [], i = [];
  function c(h, f, v, M, d, y) {
    const o = `${h.toFixed(5)},${f.toFixed(5)},${v.toFixed(5)}`;
    if (y[o] !== void 0) return y[o];
    const m = s.length / 3;
    return s.push(h, f, v), a.push(M, d), y[o] = m, m;
  }
  function l(h, f, v, M, d, y, o, m, x, $) {
    const w = {}, p = o / $, z = m / $, A = o / 2, R = m / 2, E = x / 2 * y, b = [];
    for (let g = 0; g <= $; g++) {
      const j = [], O = g * z - R;
      for (let S = 0; S <= $; S++) {
        const I = S * p - A, F = [0, 0, 0];
        F[h] = I * M, F[f] = O * d, F[v] = E;
        const G = S / $, K = 1 - g / $;
        j.push(c(F[0], F[1], F[2], G, K, w));
      }
      b.push(j);
    }
    for (let g = 0; g < $; g++)
      for (let j = 0; j < $; j++) {
        const O = b[g][j], S = b[g + 1][j], I = b[g + 1][j + 1], F = b[g][j + 1];
        i.push(O, F, S), i.push(S, F, I);
      }
  }
  return l(0, 1, 2, 1, 1, 1, n, r, e, t), l(0, 1, 2, -1, 1, -1, n, r, e, t), l(2, 1, 0, -1, 1, 1, e, r, n, t), l(2, 1, 0, 1, 1, -1, e, r, n, t), l(0, 2, 1, 1, -1, 1, n, e, r, t), l(0, 2, 1, 1, 1, -1, n, e, r, t), {
    vertices: new Float32Array(s),
    uvs: new Float32Array(a),
    faces: new Uint16Array(i)
  };
}
const Cr = ac(1, 1, 1, 1), ve = new Float32Array(32);
Tn.computeBoundsFlatArray(ve, 0, Cr.vertices);
Tn.computeBoundingSphere(ve, 28, Cr.vertices);
function B1() {
  Xn.call(this);
  const n = new Tn();
  n.vertices = Cr.vertices, n.uvs = Cr.uvs, n.faces = Cr.faces, n.bounds = ve, n.updateNormals(), n.texture = sc, this.addComponent(n);
}
B1.prototype = Object.create(Xn.prototype);
function ic(n, r, e) {
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
const Lr = ic(7, 0.5, 1), Me = new Float32Array(32);
Tn.computeBoundsFlatArray(Me, 0, Lr.vertices);
Tn.computeBoundingSphere(Me, 28, Lr.vertices);
function W1() {
  Xn.call(this);
  const n = new Tn();
  n.vertices = Lr.vertices, n.faces = Lr.faces, n.bounds = Me, n.updateNormals(), this.addComponent(n);
}
W1.prototype = Object.create(Xn.prototype);
function cc(n, r, e) {
  const t = [], s = [], a = {};
  function i(l, h, f) {
    const v = `${l.toFixed(5)},${h.toFixed(5)},${f.toFixed(5)}`;
    if (a[v] !== void 0) return a[v];
    const M = t.length / 3;
    return t.push(l, h, f), a[v] = M, M;
  }
  const c = [];
  for (let l = 0; l <= n; l++) {
    const h = [], f = l * Math.PI / n, v = Math.sin(f), M = Math.cos(f);
    for (let d = 0; d <= r; d++) {
      const y = d * 2 * Math.PI / r, o = Math.cos(y) * v * e, m = M * e, x = Math.sin(y) * v * e;
      h.push(i(o, m, x));
    }
    c.push(h);
  }
  for (let l = 0; l < n; l++)
    for (let h = 0; h < r; h++) {
      const f = c[l][h], v = c[l][h + 1], M = c[l + 1][h], d = c[l + 1][h + 1];
      l !== 0 && s.push(f, v, M), l !== n - 1 && s.push(M, v, d);
    }
  return {
    vertices: new Float32Array(t),
    faces: new Uint16Array(s)
  };
}
const Br = cc(8, 8, 8), de = new Float32Array(32);
Tn.computeBoundsFlatArray(de, 0, Br.vertices);
Tn.computeBoundingSphere(de, 28, Br.vertices);
function Z1() {
  Xn.call(this);
  const n = new Tn();
  n.vertices = Br.vertices, n.faces = Br.faces, n.bounds = de, n.updateNormals(), this.addComponent(n);
}
Z1.prototype = Object.create(Xn.prototype);
function lc() {
  const n = new Array(65536);
  for (let r = 0; r < 65536; r++) {
    const e = r >> 11 & 31, t = r >> 5 & 63, s = r & 31, a = e << 3 | e >> 2, i = t << 2 | t >> 4, c = s << 3 | s >> 2;
    n[r] = "rgb(" + a + "," + i + "," + c + ")";
  }
  return n;
}
const me = k1;
function hc(n, r, e, t) {
  var s = n.transform.getLocalToWorld(), a = s[12], i = s[13], c = s[14];
  me(
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
  ], M = 0; M < 3; M++) {
    var d = v[M], y = Math.sqrt(d.x * d.x + d.y * d.y + d.z * d.z);
    y < 1e-4 && (M === 0 ? d.x = 1 : M === 1 ? d.y = 1 : d.z = 1, y = 1);
    var o = d.x / y, m = d.y / y, x = d.z / y;
    me(
      t,
      0,
      a + o * f,
      i + m * f,
      c + x * f,
      e
    ), r.beginPath(), r.lineWidth = 2, r.strokeStyle = d.col, r.moveTo(l, h), r.lineTo(t[0], t[1]), r.stroke();
  }
}
const fc = Tn.computeNormalMatrix, Xr = D1, ye = Gr, vc = hc, zr = lc();
function P1() {
  this.layerBuffers = [], this.drawCalls = 0, this.faces = 0, this.lightDirection = new Float32Array([0, 0, 0]), this.depthBuffer = new Float32Array(0), this.indexBuffer = new Uint32Array(0), this.clipGeometryBuffer = new Float32Array(0), this.colorBuffer = new Uint32Array(0), this.shaderTypeBuffer = new Uint32Array(0), this.faceNormalsBuffer = new Float32Array(0), this.vertexNormalsBuffer = new Float32Array(0), this.meshIndexBuffer = new Uint32Array(0), this.meshFaceIndexBuffer = new Uint32Array(0), this.visibleObjectsBuffer = new Uint32Array(100), this.lightsIndexBuffer = new Uint32Array(10), this.layerBuffers = [], this.layerBufferLengths = new Uint32Array(1), this.vertexBuffer = new Float32Array(0), this.vertexIndexBuffer = new Uint32Array(0);
  for (let n = 0; n < Ir.layersCount; n++)
    this.layerBuffers[n] = this.layerBuffers[n] || [];
  this.vMapping = new Int32Array(0), this.vTags = new Uint32Array(0);
}
var Sr = P1.prototype;
Sr.vec3Cache1 = new Float32Array([0, 0, 0]);
Sr.vec3Cache2 = new Float32Array([0, 0, 0]);
Sr.vec4Cache = new Float32Array([0, 0, 0]);
Sr.mat4Scratchpad1 = new Float32Array(16);
Sr.mat4Scratchpad2 = new Float32Array(16);
Sr.mat3Scratchpad1 = new Float32Array(9);
Sr.render = function(n, r, e) {
  let t = Date.now(), s = n.scene.retrieve(), a = Ir.layersCount, i = r.width, c = r.height, l, h, f, v, M, d, y = this.vec3Cache1, o = this.vec3Cache2, m = this.vec4Cache, x = this.depthBuffer, $ = this.indexBuffer, w = this.vertexIndexBuffer, p = this.vertexBuffer, z = this.clipGeometryBuffer, A = this.colorBuffer, R = this.shaderTypeBuffer, E = this.faceNormalsBuffer, b = this.vertexNormalsBuffer, g = this.meshIndexBuffer, j = this.meshFaceIndexBuffer, O = this.visibleObjectsBuffer, S = this.lightsIndexBuffer, I = this.layerBuffers, F = this.layerBufferLengths, G = this.mat4Scratchpad1, K = this.mat4Scratchpad2, T = r.getWorldToScreen(), hn = n.transform.getWorldToLocal(), xn = n.camera.getClipSpaceMatrix();
  this.vMapping, this.vTags;
  let gn = 0, pn = 0;
  const sn = n.camera, u = n.camera.fogType !== H.FogType.NONE ? sn.fogColor : sn.bgColor, Sn = u[0] & 248, En = u[1] & 252, zn = u[2] & 248, D = Sn << 8 | En << 3 | zn >> 3;
  if (r.context.fillStyle = zr[D], r.context.fillRect(0, 0, r.width, r.height), O.length < s.length) {
    const W = O;
    this.visibleObjectsBuffer = O = new Uint32Array(
      s.length
    ), O.set(W);
  }
  if (S.length < s.length) {
    const W = S;
    this.lightsIndexBuffer = S = new Uint32Array(
      s.length
    ), S.set(W);
  }
  if (Mc(
    s,
    xn,
    O,
    S
  ), dc(O, s, xn), F.length < a) {
    var nn = F;
    this.layerBufferLengths = F = new Uint32Array(a), F.set(nn);
  }
  const B = O[0] + 1;
  for (v = 1; v < B; v++) {
    const W = s[O[v]];
    if (W.meshRenderer) {
      const _ = W.meshRenderer, Q = _.layer;
      I[Q][F[Q]++] = _;
    }
  }
  for (v = 0; v < a; v++) {
    d = r.layers[v], h = I[v], f = F[v];
    let W = 0, _ = 0;
    for (let L = 0; L < f; L++) {
      W += h[L].faces.length;
      const J = h[L].vertices.length;
      J > _ && (_ = J);
    }
    W = W / 3 | 0;
    const Q = _ / 3 | 0;
    if (this.vMapping.length < Q && (this.vMapping = new Int32Array(Q), this.vTags = new Uint32Array(Q)), y.length < _ && (this.vec3Cache1 = y = new Float32Array(_), this.vec3Cache2 = o = new Float32Array(_), this.vec4Cache = m = new Float32Array(_ * 4 / 3)), x.length < W) {
      let L = new Float32Array(W);
      L.set(x), this.depthBuffer = x = L, L = new Uint32Array(W), L.set($), this.indexBuffer = $ = L, L = new Uint32Array(W), L.set(A), this.colorBuffer = A = L, L = new Uint32Array(W), L.set(R), this.shaderTypeBuffer = R = L, L = new Float32Array(W * 9), L.set(z), this.clipGeometryBuffer = z = L, L = new Float32Array(W * 3), L.set(E), this.faceNormalsBuffer = E = L, L = new Float32Array(W * 9), L.set(b), this.vertexNormalsBuffer = b = L, L = new Uint32Array(W), L.set(g), this.meshIndexBuffer = g = L, L = new Uint32Array(W), L.set(j), this.meshFaceIndexBuffer = j = L;
      let J = new Float32Array(W * 6);
      J.set(p), this.vertexBuffer = p = J;
      let An = new Uint32Array(W * 3);
      An.set(w), this.vertexIndexBuffer = w = An;
    }
    const q = mc(
      h,
      f,
      o,
      m,
      $,
      x,
      A,
      R,
      z,
      hn,
      xn,
      K,
      G,
      this.mat3Scratchpad1,
      E,
      b,
      p,
      w,
      g,
      j,
      this.vMapping,
      this.vTags
    );
    (Ir.depthSortingMask & v + 1) === v + 1 && $.subarray(0, q).sort(function(L, J) {
      return x[J] - x[L];
    });
    const k = (Ir.layerClearMask & v + 1) === v + 1;
    for (yc(
      d,
      p,
      w,
      $,
      A,
      R,
      q,
      0,
      k,
      i,
      c,
      z,
      x,
      n.camera.fogType,
      n.camera.fogColor,
      n.camera.fogNearPane,
      n.camera.fogFarPane,
      n.scene,
      this.lightDirection,
      n.camera.ambientLight,
      E,
      b,
      g,
      j,
      h,
      this.wireframe,
      S,
      s
    ), M = 0; M < f; M++)
      l = h[M], l.gameObject && l.gameObject.debug && vc(l.gameObject, d, T, y);
    r.context.drawImage(d.canvas, 0, 0), gn += q, pn += q, F[v] = 0;
  }
  e.totalObjects = s.length, e.visibleObjects = B, e.drawCalls = gn, e.faces = pn, e.dt = Date.now() - t;
};
function Mc(n, r, e, t) {
  let s = 0, a = 0;
  const i = r[0], c = r[1], l = r[2], h = r[3], f = r[4], v = r[5], M = r[6], d = r[7], y = r[8], o = r[9], m = r[10], x = r[11], $ = r[12], w = r[13], p = r[14], z = r[15];
  let A = h + i, R = d + f, E = x + y, b = z + $, g = 1 / Math.sqrt(A * A + R * R + E * E);
  A *= g, R *= g, E *= g, b *= g;
  let j = h - i, O = d - f, S = x - y, I = z - $;
  g = 1 / Math.sqrt(j * j + O * O + S * S), j *= g, O *= g, S *= g, I *= g;
  let F = h + c, G = d + v, K = x + o, T = z + w;
  g = 1 / Math.sqrt(F * F + G * G + K * K), F *= g, G *= g, K *= g, T *= g;
  let hn = h - c, xn = d - v, gn = x - o, pn = z - w;
  g = 1 / Math.sqrt(hn * hn + xn * xn + gn * gn), hn *= g, xn *= g, gn *= g, pn *= g;
  let sn = h + l, u = d + M, Sn = x + m, En = z + p;
  g = 1 / Math.sqrt(sn * sn + u * u + Sn * Sn), sn *= g, u *= g, Sn *= g, En *= g;
  let zn = h - l, D = d - M, nn = x - m, B = z - p;
  g = 1 / Math.sqrt(zn * zn + D * D + nn * nn), zn *= g, D *= g, nn *= g, B *= g;
  const W = n.length;
  for (let _ = 0; _ < W; _++) {
    const Q = n[_];
    if (Q.meshRenderer && Q.meshRenderer.enabled) {
      const q = Q.transform.worldMatrix, k = Q.meshRenderer.bounds, L = k[28], J = k[29], An = k[30], yn = q[0] * L + q[4] * J + q[8] * An + q[12], $n = q[1] * L + q[5] * J + q[9] * An + q[13], U = q[2] * L + q[6] * J + q[10] * An + q[14], In = q[0] * q[0] + q[1] * q[1] + q[2] * q[2], fn = q[4] * q[4] + q[5] * q[5] + q[6] * q[6], en = q[8] * q[8] + q[9] * q[9] + q[10] * q[10], vn = k[31] * Math.sqrt(Math.max(In, fn, en));
      if (A * yn + R * $n + E * U + b < -vn || j * yn + O * $n + S * U + I < -vn || F * yn + G * $n + K * U + T < -vn || hn * yn + xn * $n + gn * U + pn < -vn || sn * yn + u * $n + Sn * U + En < -vn || zn * yn + D * $n + nn * U + B < -vn) continue;
      e[++s] = _;
    }
    if (Q.light)
      if (Q.light.type === 1) {
        const q = Q.transform.worldMatrix, k = q[12], L = q[13], J = q[14], An = q[0] * q[0] + q[1] * q[1] + q[2] * q[2], yn = q[4] * q[4] + q[5] * q[5] + q[6] * q[6], $n = q[8] * q[8] + q[9] * q[9] + q[10] * q[10], U = Q.light.range * Math.sqrt(Math.max(An, yn, $n));
        if (A * k + R * L + E * J + b < -U || j * k + O * L + S * J + I < -U || F * k + G * L + K * J + T < -U || hn * k + xn * L + gn * J + pn < -U || sn * k + u * L + Sn * J + En < -U || zn * k + D * L + nn * J + B < -U) continue;
        t[++a] = _;
      } else
        t[++a] = _;
  }
  e[0] = s, t[0] = a;
}
function dc(n, r, e) {
  const t = e, s = t[0], a = t[1], i = t[2], c = t[3], l = t[4], h = t[5], f = t[6], v = t[7], M = t[8], d = t[9], y = t[10], o = t[11], m = t[12], x = t[13], $ = t[14], w = t[15];
  let p = 0;
  const z = n[0] + 1;
  for (let A = 1; A < z; A++) {
    const R = n[A], E = r[R], b = E.transform.worldMatrix, g = E.meshRenderer;
    if (g && g.enabled && g.bounds) {
      const j = g.bounds;
      let O = 63;
      for (let S = 0; S < 24; S += 3) {
        const I = j[S], F = j[S + 1], G = j[S + 2], K = b[0] * I + b[4] * F + b[8] * G + b[12], T = b[1] * I + b[5] * F + b[9] * G + b[13], hn = b[2] * I + b[6] * F + b[10] * G + b[14], xn = s * K + l * T + M * hn + m, gn = a * K + h * T + d * hn + x, pn = i * K + f * T + y * hn + $, sn = c * K + v * T + o * hn + w;
        let u = 0;
        xn < -sn && (u |= 1), xn > sn && (u |= 2), gn < -sn && (u |= 4), gn > sn && (u |= 8), pn < -sn && (u |= 16), pn > sn && (u |= 32), O &= u;
      }
      O === 0 && (n[++p] = R);
    } else {
      const j = b[12], O = b[13], S = b[14], I = s * j + l * O + M * S + m, F = a * j + h * O + d * S + x, G = i * j + f * O + y * S + $, K = c * j + v * O + o * S + w;
      I >= -K && I <= K && F >= -K && F <= K && G >= -K && G <= K && (n[++p] = R);
    }
  }
  n[0] = p;
}
let br = 0;
function mc(n, r, e, t, s, a, i, c, l, h, f, v, M, d, y, o, m, x, $, w, p, z) {
  let A = 0, R = 0;
  for (let E = 0; E < r; E++) {
    const b = n[E];
    if (b.constructor !== Tn) continue;
    ++br;
    const g = b.gameObject.transform.worldMatrix;
    ye(M, f, g), ye(v, h, g);
    const j = M[0], O = M[1], S = M[2], I = M[3], F = M[4], G = M[5], K = M[6], T = M[7], hn = M[8], xn = M[9], gn = M[10], pn = M[11], sn = M[12], u = M[13], Sn = M[14], En = M[15], zn = b.faces, D = b.vertices, nn = b.faceNormals, B = b.vertexNormals;
    fc(d, g);
    const W = d, _ = W[0], Q = W[1], q = W[2], k = W[3], L = W[4], J = W[5], An = W[6], yn = W[7], $n = W[8], U = zn.length;
    for (let In = 0; In < U; In += 3) {
      const fn = zn[In], en = zn[In + 1], vn = zn[In + 2], Zn = fn << 2, Pn = en << 2, Gn = vn << 2;
      if (z[fn] !== br) {
        const P = fn * 3, Y = D[P], V = D[P + 1], X = D[P + 2];
        t[Zn] = j * Y + F * V + hn * X + sn, t[Zn + 1] = O * Y + G * V + xn * X + u, t[Zn + 2] = S * Y + K * V + gn * X + Sn, t[Zn + 3] = I * Y + T * V + pn * X + En, z[fn] = br, p[fn] = -1;
      }
      if (z[en] !== br) {
        const P = en * 3, Y = D[P], V = D[P + 1], X = D[P + 2];
        t[Pn] = j * Y + F * V + hn * X + sn, t[Pn + 1] = O * Y + G * V + xn * X + u, t[Pn + 2] = S * Y + K * V + gn * X + Sn, t[Pn + 3] = I * Y + T * V + pn * X + En, z[en] = br, p[en] = -1;
      }
      if (z[vn] !== br) {
        const P = vn * 3, Y = D[P], V = D[P + 1], X = D[P + 2];
        t[Gn] = j * Y + F * V + hn * X + sn, t[Gn + 1] = O * Y + G * V + xn * X + u, t[Gn + 2] = S * Y + K * V + gn * X + Sn, t[Gn + 3] = I * Y + T * V + pn * X + En, z[vn] = br, p[vn] = -1;
      }
      const On = t[Zn], cn = t[Zn + 1], Dn = t[Zn + 2], jn = t[Zn + 3], rr = t[Pn], Mn = t[Pn + 1], Bn = t[Pn + 2], wn = t[Pn + 3], Fn = t[Gn], rn = t[Gn + 1], Cn = t[Gn + 2], on = t[Gn + 3];
      if (On < -jn && rr < -wn && Fn < -on || On > jn && rr > wn && Fn > on || cn < -jn && Mn < -wn && rn < -on || cn > jn && Mn > wn && rn > on || Dn < -jn && Bn < -wn && Cn < -on || Dn > jn && Bn > wn && Cn > on) continue;
      const bn = 1 / jn, er = 1 / wn, _n = 1 / on, Kn = On * bn, tr = cn * bn, lr = rr * er, hr = Mn * er, Qn = Fn * _n, Hn = rn * _n;
      if ((lr - Kn) * (Hn - tr) - (hr - tr) * (Qn - Kn) > 0) continue;
      const Jn = fn * 3, sr = en * 3, qn = vn * 3;
      s[A] = A, $[A] = E, w[A] = In;
      const Wn = nn[In], un = nn[In + 1], nr = nn[In + 2], mr = Wn * _ + un * k + nr * An, yr = Wn * Q + un * L + nr * yn, kn = Wn * q + un * J + nr * $n, Un = Math.sqrt(mr * mr + yr * yr + kn * kn), ar = Un > 0 ? 1 / Un : 0, fr = In / 3 | 0, ir = b.faceColors[fr % b.faceColors.length];
      if (i[A] = b.colors[ir] << 24 | b.colors[ir + 1] << 16 | b.colors[ir + 2] << 8 | 255, c[A] = b.shaderType, p[fn] === -1) {
        const P = R * 3;
        Xr(
          e,
          Jn,
          D[Jn],
          D[Jn + 1],
          D[Jn + 2],
          v
        ), m[P] = Kn, m[P + 1] = -tr, p[fn] = P, R++;
        const Y = fn * 3, V = B[Y] * _ + B[Y + 1] * k + B[Y + 2] * An, X = B[Y] * Q + B[Y + 1] * L + B[Y + 2] * yn, dn = B[Y] * q + B[Y + 1] * J + B[Y + 2] * $n, mn = Math.sqrt(V * V + X * X + dn * dn), tn = mn > 0 ? 1 / mn : 0;
        o[P] = V * tn, o[P + 1] = X * tn, o[P + 2] = dn * tn;
      }
      if (x[A * 3] = p[fn], p[en] === -1) {
        const P = R * 3;
        Xr(
          e,
          sr,
          D[sr],
          D[sr + 1],
          D[sr + 2],
          v
        ), m[P] = lr, m[P + 1] = -hr, p[en] = P, R++;
        const Y = en * 3, V = B[Y] * _ + B[Y + 1] * k + B[Y + 2] * An, X = B[Y] * Q + B[Y + 1] * L + B[Y + 2] * yn, dn = B[Y] * q + B[Y + 1] * J + B[Y + 2] * $n, mn = Math.sqrt(V * V + X * X + dn * dn), tn = mn > 0 ? 1 / mn : 0;
        o[P] = V * tn, o[P + 1] = X * tn, o[P + 2] = dn * tn;
      }
      if (x[A * 3 + 1] = p[en], p[vn] === -1) {
        const P = R * 3;
        Xr(
          e,
          qn,
          D[qn],
          D[qn + 1],
          D[qn + 2],
          v
        ), m[P] = Qn, m[P + 1] = -Hn, p[vn] = P, R++;
        const Y = vn * 3, V = B[Y] * _ + B[Y + 1] * k + B[Y + 2] * An, X = B[Y] * Q + B[Y + 1] * L + B[Y + 2] * yn, dn = B[Y] * q + B[Y + 1] * J + B[Y + 2] * $n, mn = Math.sqrt(V * V + X * X + dn * dn), tn = mn > 0 ? 1 / mn : 0;
        o[P] = V * tn, o[P + 1] = X * tn, o[P + 2] = dn * tn;
      }
      x[A * 3 + 2] = p[vn];
      const Vn = A * 9;
      l[Vn] = e[Jn], l[Vn + 1] = e[Jn + 1];
      const Z = l[Vn + 2] = e[Jn + 2];
      l[Vn + 3] = e[sr], l[Vn + 4] = e[sr + 1];
      const Rn = l[Vn + 5] = e[sr + 2];
      l[Vn + 6] = e[qn], l[Vn + 7] = e[qn + 1];
      const Nn = l[Vn + 8] = e[qn + 2];
      a[A] = (Z + Rn + Nn) * 0.33333;
      const Yn = A * 3;
      y[Yn] = mr * ar, y[Yn + 1] = yr * ar, y[Yn + 2] = kn * ar, A++;
    }
  }
  return A;
}
function yc(n, r, e, t, s, a, i, c, l, h, f, v, M, d, y, o, m, x, $, w, p, z, A, R, E, b, g, j) {
  const O = h * 0.5, S = f * 0.5, I = c + i;
  l && n.clearRect(0, 0, n.canvas.width, n.canvas.height);
  let F = -1, G = -1;
  for (let K = c; K < I; K++) {
    const T = t[K], hn = e[T * 3], xn = e[T * 3 + 1], gn = e[T * 3 + 2], pn = r[hn] * O + O, sn = r[hn + 1] * S + S, u = r[xn] * O + O, Sn = r[xn + 1] * S + S, En = r[gn] * O + O, zn = r[gn + 1] * S + S;
    switch (n.beginPath(), n.moveTo(pn, sn), n.lineTo(u, Sn), n.lineTo(En, zn), n.closePath(), b ? 3 : a[T]) {
      case 0: {
        const D = s[T];
        let nn = D >>> 24 & 255, B = D >>> 16 & 255, W = D >>> 8 & 255, _ = w / 16777215, Q = w >>> 16 & 255, q = w >>> 8 & 255, k = w & 255;
        const L = p[T * 3], J = p[T * 3 + 1], An = p[T * 3 + 2], yn = g[0] + 1;
        for (let On = 1; On < yn; On++) {
          const cn = j[g[On]];
          if (cn.light.type === 0) {
            const Dn = -cn.transform.worldMatrix[8], jn = -cn.transform.worldMatrix[9], rr = -cn.transform.worldMatrix[10], Mn = L * Dn + J * jn + An * rr;
            Mn > 0 && (_ += Mn, Q += (cn.light.color >>> 16 & 255) * Mn, q += (cn.light.color >>> 8 & 255) * Mn, k += (cn.light.color & 255) * Mn);
          }
        }
        Q *= 39215e-7, q *= 39215e-7, k *= 39215e-7, nn = nn * Q | 0, B = B * q | 0, W = W * k | 0, nn = nn > 255 ? 255 : nn, B = B > 255 ? 255 : B, W = W > 255 ? 255 : W, _ = Math.min(_, 1);
        const $n = M[T];
        let U = 0;
        if (d === H.FogType.RADIAL_FAST || d === H.FogType.RADIAL) {
          const On = v[T * 9], cn = v[T * 9 + 1], Dn = v[T * 9 + 2], jn = v[T * 9 + 3], rr = v[T * 9 + 4], Mn = v[T * 9 + 5], Bn = v[T * 9 + 6], wn = v[T * 9 + 7], Fn = v[T * 9 + 8], rn = (On + jn + Bn) * 0.33333, Cn = (cn + rr + wn) * 0.33333, on = (Dn + Mn + Fn) * 0.33333;
          if (d === H.FogType.RADIAL_FAST) {
            const bn = o * o, _n = 1 / (m * m - bn);
            U = (rn * rn + Cn * Cn + on * on - bn) * _n;
          } else
            U = (Math.sqrt(rn * rn + Cn * Cn + on * on) - o) / (m - o);
        } else d === H.FogType.LINEAR && (U = ($n - o) / (m - o));
        U > 1 && (U = 1), U > 0 && (nn = nn * (1 - U) + y[0] * U | 0, B = B * (1 - U) + y[1] * U | 0, W = W * (1 - U) + y[2] * U | 0);
        const In = A[T], fn = E[In], en = fn.textureImage;
        if (en && en.complete && en.naturalWidth > 0 && fn.uvs) {
          const On = R[T], cn = fn.uvs, Dn = fn.faces[On] * 2, jn = fn.faces[On + 1] * 2, rr = fn.faces[On + 2] * 2, Mn = cn[Dn] * en.width, Bn = cn[Dn + 1] * en.height, wn = cn[jn] * en.width, Fn = cn[jn + 1] * en.height, rn = cn[rr] * en.width, Cn = cn[rr + 1] * en.height, on = Mn * (Fn - Cn) - Bn * (wn - rn) + (wn * Cn - rn * Fn);
          if (Math.abs(on) > 1e-5) {
            const bn = 1 / on, er = (pn * (Fn - Cn) + u * (Cn - Bn) + En * (Bn - Fn)) * bn, _n = (pn * (rn - wn) + u * (Mn - rn) + En * (wn - Mn)) * bn, Kn = (pn * (wn * Cn - rn * Fn) + u * (rn * Bn - Mn * Cn) + En * (Mn * Fn - wn * Bn)) * bn, tr = (sn * (Fn - Cn) + Sn * (Cn - Bn) + zn * (Bn - Fn)) * bn, lr = (sn * (rn - wn) + Sn * (Mn - rn) + zn * (wn - Mn)) * bn, hr = (sn * (wn * Cn - rn * Fn) + Sn * (rn * Bn - Mn * Cn) + zn * (Mn * Fn - wn * Bn)) * bn;
            n.save();
            const Qn = (pn + u + En) * 0.33333, Hn = (sn + Sn + zn) * 0.33333, Jn = pn - Qn, sr = sn - Hn, qn = Math.abs(Jn), Wn = Math.abs(sr), un = qn > Wn ? qn + 0.4 * Wn : Wn + 0.4 * qn, nr = un > 0 ? 0.6 / un : 0, mr = pn + Jn * nr, yr = sn + sr * nr, kn = u - Qn, Un = Sn - Hn, ar = Math.abs(kn), fr = Math.abs(Un), ir = ar > fr ? ar + 0.4 * fr : fr + 0.4 * ar, Vn = ir > 0 ? 0.6 / ir : 0, Z = u + kn * Vn, Rn = Sn + Un * Vn, Nn = En - Qn, Yn = zn - Hn, P = Math.abs(Nn), Y = Math.abs(Yn), V = P > Y ? P + 0.4 * Y : Y + 0.4 * P, X = V > 0 ? 0.6 / V : 0, dn = En + Nn * X, mn = zn + Yn * X;
            n.beginPath(), n.moveTo(mr, yr), n.lineTo(Z, Rn), n.lineTo(dn, mn), n.closePath(), n.clip(), n.setTransform(er, tr, _n, lr, Kn, hr), n.drawImage(en, 0, 0), n.restore();
            const tn = 1 - _ * (1 - U);
            if (tn > 0.01) {
              let gr = 0, pr = 0, Nr = 0, $r = 0;
              U > 0 ? (gr = y[0] * U | 0, pr = y[1] * U | 0, Nr = y[2] * U | 0, $r = Math.max(tn, U)) : $r = 1 - _, $r > 1 && ($r = 1), n.fillStyle = `rgba(${gr},${pr},${Nr},${$r.toFixed(2)})`, n.fill();
            }
            F !== 1 && (n.lineJoin = "round", n.lineWidth = 1, F = 1), G !== -1 && (G = -1);
            break;
          }
        }
        const vn = nn & 248, Zn = B & 252, Pn = W & 248, Gn = vn << 8 | Zn << 3 | Pn >> 3;
        G !== Gn && (n.strokeStyle = n.fillStyle = zr[Gn], G = Gn), F !== 1 && (n.lineJoin = "round", n.lineWidth = 1, F = 1), n.stroke(), n.fill();
        break;
      }
      case 1: {
        const D = s[T];
        let nn = D >>> 24 & 255, B = D >>> 16 & 255, W = D >>> 8 & 255;
        const _ = M[T];
        let Q = 0;
        if (d === H.FogType.RADIAL_FAST || d === H.FogType.RADIAL) {
          const $n = v[T * 9], U = v[T * 9 + 1], In = v[T * 9 + 2], fn = v[T * 9 + 3], en = v[T * 9 + 4], vn = v[T * 9 + 5], Zn = v[T * 9 + 6], Pn = v[T * 9 + 7], Gn = v[T * 9 + 8], On = ($n + fn + Zn) * 0.33333, cn = (U + en + Pn) * 0.33333, Dn = (In + vn + Gn) * 0.33333;
          if (d === H.FogType.RADIAL_FAST) {
            const jn = o * o, Mn = 1 / (m * m - jn);
            Q = (On * On + cn * cn + Dn * Dn - jn) * Mn;
          } else
            Q = (Math.sqrt(On * On + cn * cn + Dn * Dn) - o) / (m - o);
        } else d === H.FogType.LINEAR && (Q = (_ - o) / (m - o));
        let k = Math.max(0, Q - 0);
        k > 1 && (k = 1), k > 0 && (nn = nn * (1 - k) + y[0] * k | 0, B = B * (1 - k) + y[1] * k | 0, W = W * (1 - k) + y[2] * k | 0);
        const L = nn & 248, J = B & 252, An = W & 248, yn = L << 8 | J << 3 | An >> 3;
        G !== yn && (n.strokeStyle = n.fillStyle = zr[yn], G = yn), F !== 1 && (n.lineJoin = "round", n.lineWidth = 1, F = 1), n.stroke(), n.fill();
        break;
      }
      case 2: {
        const D = s[T];
        let nn = D >>> 24 & 255, B = D >>> 16 & 255, W = D >>> 8 & 255;
        const _ = nn & 248, Q = B & 252, q = W & 248, k = _ << 8 | Q << 3 | q >> 3;
        G !== k && (n.strokeStyle = n.fillStyle = zr[k], G = k), F !== 1 && (n.lineJoin = "round", n.lineWidth = 1, F = 1), n.stroke(), n.fill();
        break;
      }
      case 3: {
        G !== -2 && (n.strokeStyle = "rgb(0,0,255)", G = -2), F !== -2 && (n.lineJoin = "miter", n.lineWidth = 0.5, F = -2), n.stroke();
        break;
      }
      case 4: {
        const D = s[T], nn = D >>> 24 & 255, B = D >>> 16 & 255, W = D >>> 8 & 255, _ = w / 16777215;
        let Q = w >>> 16 & 255, q = w >>> 8 & 255, k = w & 255, L = _, J = _, An = _, yn = Q, $n = q, U = k, In = Q, fn = q, en = k, vn = Q, Zn = q, Pn = k, Gn = z[hn], On = z[hn + 1], cn = z[hn + 2], Dn = z[xn], jn = z[xn + 1], rr = z[xn + 2], Mn = z[gn], Bn = z[gn + 1], wn = z[gn + 2];
        const Fn = g[0] + 1;
        for (let Z = 1; Z < Fn; Z++) {
          const Rn = j[g[Z]];
          if (Rn.light.type === 0) {
            const Nn = Rn.light.color >>> 16 & 255, Yn = Rn.light.color >>> 8 & 255, P = Rn.light.color & 255, Y = -Rn.transform.worldMatrix[8], V = -Rn.transform.worldMatrix[9], X = -Rn.transform.worldMatrix[10];
            let dn = Gn * Y + On * V + cn * X, mn = Dn * Y + jn * V + rr * X, tn = Mn * Y + Bn * V + wn * X;
            dn > 0 && (L += dn, yn += Nn * dn, $n += Yn * dn, U += P * dn), mn > 0 && (J += mn, In += Nn * mn, fn += Yn * mn, en += P * mn), tn > 0 && (An += tn, vn += Nn * tn, Zn += Yn * tn, Pn += P * tn);
          }
        }
        yn *= 39215e-7, $n *= 39215e-7, U *= 39215e-7, In *= 39215e-7, fn *= 39215e-7, en *= 39215e-7, vn *= 39215e-7, Zn *= 39215e-7, Pn *= 39215e-7, L = Math.min(L, 1), J = Math.min(J, 1), An = Math.min(An, 1);
        let rn = 0;
        const Cn = M[T];
        if (d === H.FogType.RADIAL_FAST || d === H.FogType.RADIAL) {
          const Z = v[T * 9], Rn = v[T * 9 + 1], Nn = v[T * 9 + 2], Yn = v[T * 9 + 3], P = v[T * 9 + 4], Y = v[T * 9 + 5], V = v[T * 9 + 6], X = v[T * 9 + 7], dn = v[T * 9 + 8], mn = (Z + Yn + V) * 0.33333, tn = (Rn + P + X) * 0.33333, gr = (Nn + Y + dn) * 0.33333;
          if (d === H.FogType.RADIAL_FAST) {
            const pr = o * o, $r = 1 / (m * m - pr);
            rn = (mn * mn + tn * tn + gr * gr - pr) * $r;
          } else
            rn = (Math.sqrt(mn * mn + tn * tn + gr * gr) - o) / (m - o);
        } else d === H.FogType.LINEAR && (rn = (Cn - o) / (m - o));
        rn > 1 && (rn = 1);
        let on = nn * yn, bn = B * $n, er = W * U, _n = nn * In, Kn = B * fn, tr = W * en, lr = nn * vn, hr = B * Zn, Qn = W * Pn;
        if (on = on > 255 ? 255 : on, bn = bn > 255 ? 255 : bn, er = er > 255 ? 255 : er, _n = _n > 255 ? 255 : _n, Kn = Kn > 255 ? 255 : Kn, tr = tr > 255 ? 255 : tr, lr = lr > 255 ? 255 : lr, hr = hr > 255 ? 255 : hr, Qn = Qn > 255 ? 255 : Qn, rn > 0) {
          const Z = 1 - rn, Rn = y[0] * rn, Nn = y[1] * rn, Yn = y[2] * rn;
          on = on * Z + Rn | 0, bn = bn * Z + Nn | 0, er = er * Z + Yn | 0, _n = _n * Z + Rn | 0, Kn = Kn * Z + Nn | 0, tr = tr * Z + Yn | 0, lr = lr * Z + Rn | 0, hr = hr * Z + Nn | 0, Qn = Qn * Z + Yn | 0;
        } else
          on |= 0, bn |= 0, er |= 0, _n |= 0, Kn |= 0, tr |= 0, lr |= 0, hr |= 0, Qn |= 0;
        const Hn = (on & 248) << 8 | (bn & 252) << 3 | (er & 248) >> 3, Jn = (_n & 248) << 8 | (Kn & 252) << 3 | (tr & 248) >> 3, sr = (lr & 248) << 8 | (hr & 252) << 3 | (Qn & 248) >> 3;
        if (F !== 1 && (n.lineJoin = "round", n.lineWidth = 1, F = 1), Hn === Jn && Jn === sr) {
          G !== Hn && (n.strokeStyle = n.fillStyle = zr[Hn], G = Hn), n.stroke(), n.fill();
          break;
        }
        let qn = pn, Wn = sn, un = u, nr = Sn, mr = En, yr = zn, kn = L, Un = J, ar = An, fr = zr[Hn], ir = zr[Jn], Vn = zr[sr];
        if (kn > Un) {
          let Z;
          Z = qn, qn = un, un = Z, Z = Wn, Wn = nr, nr = Z, Z = kn, kn = Un, Un = Z, Z = fr, fr = ir, ir = Z;
        }
        if (Un > ar) {
          let Z;
          Z = un, un = mr, mr = Z, Z = nr, nr = yr, yr = Z, Z = Un, Un = ar, ar = Z, Z = ir, ir = Vn, Vn = Z;
        }
        if (kn > Un) {
          let Z;
          Z = qn, qn = un, un = Z, Z = Wn, Wn = nr, nr = Z, Z = kn, kn = Un, Un = Z, Z = fr, fr = ir, ir = Z;
        }
        if (ar - kn < 0.01)
          G !== Hn && (n.strokeStyle = n.fillStyle = fr, G = Hn);
        else {
          const Z = (Un - kn) / (ar - kn), Rn = qn + Z * (mr - qn), Nn = Wn + Z * (yr - Wn), Yn = un - Rn, Y = -(nr - Nn), V = Yn, X = Y * Y + V * V;
          let dn, mn;
          if (X < 1e-6)
            dn = mr, mn = yr;
          else {
            const pr = ((mr - qn) * Y + (yr - Wn) * V) / X;
            dn = qn + pr * Y, mn = Wn + pr * V;
          }
          const tn = n.createLinearGradient(qn, Wn, dn, mn);
          tn.addColorStop(0, fr), tn.addColorStop(1, Vn), G = -3, n.strokeStyle = n.fillStyle = tn;
        }
        n.stroke(), n.fill();
        break;
      }
    }
  }
}
const oe = Gr;
function G1(n, r) {
  this.canvas = r || document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.context.imageSmoothingEnabled = !1, this.context.webkitImageSmoothingEnabled = !1, this.width = 0, this.height = 0, this.viewportMatrix = new Int16Array(16), this.worldToScreenMatrix = new Float32Array(16), this.renderer = new P1(), this.camera = n, this.layers = [];
  for (var e = 0; e < Ir.layersCount; e++) {
    var t = document.createElement("canvas");
    this.layers[e] = t.getContext("2d"), this.layers[e].imageSmoothingEnabled = !1, this.layers[e].webkitImageSmoothingEnabled = !1;
  }
  var s = this;
  window.addEventListener("resize", function() {
    s.setSize(s.canvas.offsetWidth, s.canvas.offsetHeight);
  });
  const a = this;
  this.startRenderLoop = function i() {
    requestAnimationFrame(() => {
      a.render(), requestAnimationFrame(i);
    });
  }, this.lastRenderStats = {};
}
var dr = G1.prototype;
dr.size = null;
dr.dpr = 1;
dr.width = null;
dr.height = null;
dr.viewportMatrix = null;
dr.camera = null;
dr.canvas = null;
dr.context = null;
dr.start = function() {
  this.setSize(this.canvas.offsetWidth, this.canvas.offsetHeight), this.startRenderLoop();
};
dr.render = function() {
  this.camera !== null && this.renderer.render(this.camera.gameObject, this, this.lastRenderStats);
};
dr.setSize = function(n, r) {
  const e = n * this.dpr, t = r * this.dpr;
  this.width = n, this.height = r, this.canvas.width = n, this.canvas.height = r, this.viewportMatrix[0] = n / 2, this.viewportMatrix[5] = -r / 2, this.viewportMatrix[12] = n / 2, this.viewportMatrix[13] = r / 2;
  for (var s = 0; s < this.layers.length; s++) {
    var a = this.layers[s];
    a.canvas.width = n, a.canvas.height = r;
  }
  this.camera.setup(e, t);
};
dr.getWorldToScreen = function() {
  return oe(
    this.worldToScreenMatrix,
    this.viewportMatrix,
    this.camera.projectionMatrix
  ), oe(
    this.worldToScreenMatrix,
    this.worldToScreenMatrix,
    this.camera.gameObject.transform.getWorldToLocal()
  ), this.worldToScreenMatrix;
};
function Tr() {
  an.call(this), this.type = Or.Type.DIRECTIONAL, this.color = 16777215, this.range = 10;
}
Tr.prototype = Object.create(an.prototype);
Tr.prototype.constructor = Tr;
Tr.prototype.setGameObject = function(n) {
  an.prototype.setGameObject.call(this, n), n.light = this;
};
function Or(n) {
  Xn.call(this, n || "light"), this.addComponent(new Tr());
}
Or.Type = {
  DIRECTIONAL: 0,
  POINT: 1,
  SPOT: 2
};
Or.prototype = Object.create(Xn.prototype);
Or.prototype.constructor = Or;
const xc = window.scaliaEngine = {
  config: Ir,
  Game: we,
  GameObject: Xn,
  Component: an,
  Camera: Y1,
  CameraComponent: H,
  MeshComponent: Tn,
  TransformComponent: Vr,
  SpriteRenderer: ce,
  glMatrix: ec,
  PathRenderer: le,
  TextRenderer: he,
  Plane: L1,
  Box: B1,
  Cone: W1,
  Ball: Z1,
  Light: Or,
  Canvas2dViewport: G1
};
export {
  xc as default
};
