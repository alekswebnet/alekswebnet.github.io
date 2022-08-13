/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const N = window, V = N.ShadowRoot && (N.ShadyCSS === void 0 || N.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = Symbol(), K = /* @__PURE__ */ new WeakMap();
class nt {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== W)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = K.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && K.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const dt = (n) => new nt(typeof n == "string" ? n : n + "", void 0, W), ct = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((i, s, o) => i + ((r) => {
    if (r._$cssResult$ === !0)
      return r.cssText;
    if (typeof r == "number")
      return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + n[o + 1], n[0]);
  return new nt(e, n, W);
}, ut = (n, t) => {
  V ? n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet) : t.forEach((e) => {
    const i = document.createElement("style"), s = N.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = e.cssText, n.appendChild(i);
  });
}, Z = V ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return dt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var k;
const T = window, J = T.trustedTypes, pt = J ? J.emptyScript : "", F = T.reactiveElementPolyfillSupport, I = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? pt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, rt = (n, t) => t !== n && (t == t || n == n), L = { attribute: !0, type: String, converter: I, reflect: !1, hasChanged: rt };
class f extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var e;
    (e = this.h) !== null && e !== void 0 || (this.h = []), this.h.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((e, i) => {
      const s = this._$Ep(i, e);
      s !== void 0 && (this._$Ev.set(s, i), t.push(s));
    }), t;
  }
  static createProperty(t, e = L) {
    if (e.state && (e.attribute = !1), this.finalize(), this.elementProperties.set(t, e), !e.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return { get() {
      return this[e];
    }, set(s) {
      const o = this[t];
      this[e] = s, this.requestUpdate(t, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || L;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const e = this.properties, i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
      for (const s of i)
        this.createProperty(s, e[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i)
        e.unshift(Z(s));
    } else
      t !== void 0 && e.push(Z(t));
    return e;
  }
  static _$Ep(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$ES) !== null && e !== void 0 ? e : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Ei.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return ut(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) === null || i === void 0 ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EO(t, e, i = L) {
    var s;
    const o = this.constructor._$Ep(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const r = (((s = i.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? i.converter : I).toAttribute(e, i.type);
      this._$El = t, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$El = null;
    }
  }
  _$AK(t, e) {
    var i;
    const s = this.constructor, o = s._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const r = s.getPropertyOptions(o), d = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((i = r.converter) === null || i === void 0 ? void 0 : i.fromAttribute) !== void 0 ? r.converter : I;
      this._$El = o, this[o] = d.fromAttribute(e, r.type), this._$El = null;
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 && (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || rt)(this[t], e) ? (this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, i))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, o) => this[o] = s), this._$Ei = void 0);
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var o;
        return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s);
      }), this.update(i)) : this._$Ek();
    } catch (s) {
      throw e = !1, this._$Ek(), s;
    }
    e && this._$AE(i);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$ES) === null || e === void 0 || e.forEach((i) => {
      var s;
      return (s = i.hostUpdated) === null || s === void 0 ? void 0 : s.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 && (this._$EC.forEach((e, i) => this._$EO(i, this[i], e)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
f.finalized = !0, f.elementProperties = /* @__PURE__ */ new Map(), f.elementStyles = [], f.shadowRootOptions = { mode: "open" }, F == null || F({ ReactiveElement: f }), ((k = T.reactiveElementVersions) !== null && k !== void 0 ? k : T.reactiveElementVersions = []).push("1.4.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var z;
const R = window, m = R.trustedTypes, G = m ? m.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, v = `lit$${(Math.random() + "").slice(9)}$`, ot = "?" + v, $t = `<${ot}>`, y = document, w = (n = "") => y.createComment(n), C = (n) => n === null || typeof n != "object" && typeof n != "function", lt = Array.isArray, vt = (n) => lt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", S = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Q = /-->/g, X = />/g, _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Y = /'/g, tt = /"/g, ht = /^(?:script|style|textarea|title)$/i, _t = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), ft = _t(1), g = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), et = /* @__PURE__ */ new WeakMap(), At = (n, t, e) => {
  var i, s;
  const o = (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0 ? i : t;
  let r = o._$litPart$;
  if (r === void 0) {
    const d = (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0 ? s : null;
    o._$litPart$ = r = new U(t.insertBefore(w(), d), d, void 0, e != null ? e : {});
  }
  return r._$AI(n), r;
}, A = y.createTreeWalker(y, 129, null, !1), mt = (n, t) => {
  const e = n.length - 1, i = [];
  let s, o = t === 2 ? "<svg>" : "", r = S;
  for (let l = 0; l < e; l++) {
    const h = n[l];
    let $, a, c = -1, p = 0;
    for (; p < h.length && (r.lastIndex = p, a = r.exec(h), a !== null); )
      p = r.lastIndex, r === S ? a[1] === "!--" ? r = Q : a[1] !== void 0 ? r = X : a[2] !== void 0 ? (ht.test(a[2]) && (s = RegExp("</" + a[2], "g")), r = _) : a[3] !== void 0 && (r = _) : r === _ ? a[0] === ">" ? (r = s != null ? s : S, c = -1) : a[1] === void 0 ? c = -2 : (c = r.lastIndex - a[2].length, $ = a[1], r = a[3] === void 0 ? _ : a[3] === '"' ? tt : Y) : r === tt || r === Y ? r = _ : r === Q || r === X ? r = S : (r = _, s = void 0);
    const H = r === _ && n[l + 1].startsWith("/>") ? " " : "";
    o += r === S ? h + $t : c >= 0 ? (i.push($), h.slice(0, c) + "$lit$" + h.slice(c) + v + H) : h + v + (c === -2 ? (i.push(void 0), l) : H);
  }
  const d = o + (n[e] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [G !== void 0 ? G.createHTML(d) : d, i];
};
class P {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let o = 0, r = 0;
    const d = t.length - 1, l = this.parts, [h, $] = mt(t, e);
    if (this.el = P.createElement(h, i), A.currentNode = this.el.content, e === 2) {
      const a = this.el.content, c = a.firstChild;
      c.remove(), a.append(...c.childNodes);
    }
    for (; (s = A.nextNode()) !== null && l.length < d; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const a = [];
          for (const c of s.getAttributeNames())
            if (c.endsWith("$lit$") || c.startsWith(v)) {
              const p = $[r++];
              if (a.push(c), p !== void 0) {
                const H = s.getAttribute(p.toLowerCase() + "$lit$").split(v), O = /([.?@])?(.*)/.exec(p);
                l.push({ type: 1, index: o, name: O[2], strings: H, ctor: O[1] === "." ? gt : O[1] === "?" ? St : O[1] === "@" ? bt : M });
              } else
                l.push({ type: 6, index: o });
            }
          for (const c of a)
            s.removeAttribute(c);
        }
        if (ht.test(s.tagName)) {
          const a = s.textContent.split(v), c = a.length - 1;
          if (c > 0) {
            s.textContent = m ? m.emptyScript : "";
            for (let p = 0; p < c; p++)
              s.append(a[p], w()), A.nextNode(), l.push({ type: 2, index: ++o });
            s.append(a[c], w());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === ot)
          l.push({ type: 2, index: o });
        else {
          let a = -1;
          for (; (a = s.data.indexOf(v, a + 1)) !== -1; )
            l.push({ type: 7, index: o }), a += v.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const i = y.createElement("template");
    return i.innerHTML = t, i;
  }
}
function E(n, t, e = n, i) {
  var s, o, r, d;
  if (t === g)
    return t;
  let l = i !== void 0 ? (s = e._$Cl) === null || s === void 0 ? void 0 : s[i] : e._$Cu;
  const h = C(t) ? void 0 : t._$litDirective$;
  return (l == null ? void 0 : l.constructor) !== h && ((o = l == null ? void 0 : l._$AO) === null || o === void 0 || o.call(l, !1), h === void 0 ? l = void 0 : (l = new h(n), l._$AT(n, e, i)), i !== void 0 ? ((r = (d = e)._$Cl) !== null && r !== void 0 ? r : d._$Cl = [])[i] = l : e._$Cu = l), l !== void 0 && (t = E(n, l._$AS(n, t.values), l, i)), t;
}
class yt {
  constructor(t, e) {
    this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var e;
    const { el: { content: i }, parts: s } = this._$AD, o = ((e = t == null ? void 0 : t.creationScope) !== null && e !== void 0 ? e : y).importNode(i, !0);
    A.currentNode = o;
    let r = A.nextNode(), d = 0, l = 0, h = s[0];
    for (; h !== void 0; ) {
      if (d === h.index) {
        let $;
        h.type === 2 ? $ = new U(r, r.nextSibling, this, t) : h.type === 1 ? $ = new h.ctor(r, h.name, h.strings, this, t) : h.type === 6 && ($ = new wt(r, this, t)), this.v.push($), h = s[++l];
      }
      d !== (h == null ? void 0 : h.index) && (r = A.nextNode(), d++);
    }
    return o;
  }
  m(t) {
    let e = 0;
    for (const i of this.v)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class U {
  constructor(t, e, i, s) {
    var o;
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = s, this._$C_ = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o;
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && e !== void 0 ? e : this._$C_;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = E(this, t, e), C(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== g && this.$(t) : t._$litType$ !== void 0 ? this.T(t) : t.nodeType !== void 0 ? this.k(t) : vt(t) ? this.O(t) : this.$(t);
  }
  S(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  $(t) {
    this._$AH !== u && C(this._$AH) ? this._$AA.nextSibling.data = t : this.k(y.createTextNode(t)), this._$AH = t;
  }
  T(t) {
    var e;
    const { values: i, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = P.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === o)
      this._$AH.m(i);
    else {
      const r = new yt(o, this), d = r.p(this.options);
      r.m(i), this.k(d), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = et.get(t.strings);
    return e === void 0 && et.set(t.strings, e = new P(t)), e;
  }
  O(t) {
    lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, s = 0;
    for (const o of t)
      s === e.length ? e.push(i = new U(this.S(w()), this.S(w()), this, this.options)) : i = e[s], i._$AI(o), s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$C_ = t, (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class M {
  constructor(t, e, i, s, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const o = this.strings;
    let r = !1;
    if (o === void 0)
      t = E(this, t, e, 0), r = !C(t) || t !== this._$AH && t !== g, r && (this._$AH = t);
    else {
      const d = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++)
        h = E(this, d[i + l], e, l), h === g && (h = this._$AH[l]), r || (r = !C(h) || h !== this._$AH[l]), h === u ? t = u : t !== u && (t += (h != null ? h : "") + o[l + 1]), this._$AH[l] = h;
    }
    r && !s && this.P(t);
  }
  P(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class gt extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }
  P(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
const Et = m ? m.emptyScript : "";
class St extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }
  P(t) {
    t && t !== u ? this.element.setAttribute(this.name, Et) : this.element.removeAttribute(this.name);
  }
}
class bt extends M {
  constructor(t, e, i, s, o) {
    super(t, e, i, s, o), this.type = 5;
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = E(this, t, e, 0)) !== null && i !== void 0 ? i : u) === g)
      return;
    const s = this._$AH, o = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== u && (s === u || o);
    o && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function" ? this._$AH.call((i = (e = this.options) === null || e === void 0 ? void 0 : e.host) !== null && i !== void 0 ? i : this.element, t) : this._$AH.handleEvent(t);
  }
}
class wt {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    E(this, t);
  }
}
const it = R.litHtmlPolyfillSupport;
it == null || it(P, U), ((z = R.litHtmlVersions) !== null && z !== void 0 ? z : R.litHtmlVersions = []).push("2.3.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var j, D;
class b extends f {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (t = (e = this.renderOptions).renderBefore) !== null && t !== void 0 || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = At(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return g;
  }
}
b.finalized = !0, b._$litElement$ = !0, (j = globalThis.litElementHydrateSupport) === null || j === void 0 || j.call(globalThis, { LitElement: b });
const st = globalThis.litElementPolyfillSupport;
st == null || st({ LitElement: b });
((D = globalThis.litElementVersions) !== null && D !== void 0 ? D : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ct = (n) => (t) => typeof t == "function" ? ((e, i) => (customElements.define(e, i), i))(n, t) : ((e, i) => {
  const { kind: s, elements: o } = i;
  return { kind: s, elements: o, finisher(r) {
    customElements.define(e, r);
  } };
})(n, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Pt = (n, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(e) {
  e.createProperty(t.key, n);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(e) {
  e.createProperty(t.key, n);
} };
function at(n) {
  return (t, e) => e !== void 0 ? ((i, s, o) => {
    s.constructor.createProperty(o, i);
  })(n, t, e) : Pt(n, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var B;
((B = window.HTMLSlotElement) === null || B === void 0 ? void 0 : B.prototype.assignedElements) != null;
var xt = Object.defineProperty, Ut = Object.getOwnPropertyDescriptor, q = (n, t, e, i) => {
  for (var s = i > 1 ? void 0 : i ? Ut(t, e) : t, o = n.length - 1, r; o >= 0; o--)
    (r = n[o]) && (s = (i ? r(t, e, s) : r(s)) || s);
  return i && s && xt(t, e, s), s;
};
let x = class extends b {
  constructor() {
    super(...arguments), this.src = "", this.height = "600px";
  }
  render() {
    return ft`
      <iframe
        frameborder="0"
        width="100%"
        style="height: ${this.height}"
        src="/pdfjs-2.15.349-dist/web/viewer.html?file=${this.src}"
      >
    `;
  }
};
x.styles = ct`
    :host {
      width: 100%
    }
  `;
q([
  at()
], x.prototype, "src", 2);
q([
  at()
], x.prototype, "height", 2);
x = q([
  Ct("pdfjs-viewer-element")
], x);
export {
  x as PdfjsViewerElement
};
