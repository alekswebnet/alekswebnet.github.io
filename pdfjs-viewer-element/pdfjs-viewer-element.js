const g = (l, e) => new Promise((t, n) => {
  let r = e.querySelector(l);
  if (r) {
    t(r);
    return;
  }
  new MutationObserver((h, o) => {
    Array.from(e.querySelectorAll(l)).forEach((s) => {
      t(s), o.disconnect();
    });
  }).observe(e, {
    childList: !0,
    subtree: !0
  });
}), b = {
  trailing: !0
};
function y(l, e = 25, t = {}) {
  if (t = { ...b, ...t }, !Number.isFinite(e))
    throw new TypeError("Expected `wait` to be a finite number");
  let n, r, h = [], o, s;
  const d = (a, c) => (o = A(l, a, c), o.finally(() => {
    if (o = null, t.trailing && s && !r) {
      const u = d(a, s);
      return s = null, u;
    }
  }), o);
  return function(...a) {
    return o ? (t.trailing && (s = a), o) : new Promise((c) => {
      const u = !r && t.leading;
      clearTimeout(r), r = setTimeout(() => {
        r = null;
        const w = t.leading ? n : d(this, a);
        for (const p of h)
          p(w);
        h = [];
      }, e), u ? (n = d(this, a), c(n)) : h.push(c);
    });
  };
}
async function A(l, e, t) {
  return await l.apply(e, t);
}
const i = {
  viewerPath: "/pdfjs",
  viewerEntry: "/web/viewer.html",
  src: "",
  page: "",
  search: "",
  phrase: "",
  zoom: "auto",
  pagemode: "none",
  locale: "",
  textLayer: ""
}, f = document.createElement("template");
f.innerHTML = `
  <iframe frameborder="0" width="100%"></iframe>
  <style>:host{width:100%;display:block;overflow:hidden}:host iframe{height:100%}</style>
`;
class m extends HTMLElement {
  constructor() {
    super(), this.debouncedRenderIframe = y(async () => {
      await g("iframe", this.shadowRoot), this.renderViewer(this.getIframeSrc());
    }, 0, { leading: !0 }), this.attachShadow({ mode: "open" }).appendChild(f.content.cloneNode(!0));
  }
  static get observedAttributes() {
    return ["src", "viewer-path", "locale", "page", "search", "phrase", "zoom", "pagemode", "text-layer"];
  }
  connectedCallback() {
    this.iframe = this.shadowRoot.querySelector("iframe"), this.setEventListeners();
  }
  attributeChangedCallback() {
    this.debouncedRenderIframe();
  }
  getIframeSrc() {
    const e = this.getFullPath(this.getAttribute("src") || i.src), t = this.getFullPath(this.getAttribute("viewer-path") || i.viewerPath), n = this.getAttribute("page") || i.page, r = this.getAttribute("search") || i.search, h = this.getAttribute("phrase") || i.phrase, o = this.getAttribute("zoom") || i.zoom, s = this.getAttribute("pagemode") || i.pagemode, d = this.getAttribute("locale") || i.locale, a = this.getAttribute("text-layer") || i.textLayer, c = `${t}${i.viewerEntry}?file=${e}#page=${n}&zoom=${o}&pagemode=${s}&search=${r}&phrase=${h}&textLayer=${a}${d ? "&locale=" + d : ""}`;
    return c !== this.iframe.getAttribute("src") ? c : "";
  }
  renderViewer(e) {
    e && (this.shadowRoot.replaceChild(this.iframe.cloneNode(), this.iframe), this.iframe = this.shadowRoot.querySelector("iframe"), this.iframe.contentWindow.location.href = e);
  }
  setEventListeners() {
    document.addEventListener("webviewerloaded", () => {
      var e, t, n, r;
      this.getAttribute("src") !== i.src && ((e = this.iframe.contentWindow.PDFViewerApplicationOptions) == null || e.set("defaultUrl", "")), (t = this.iframe.contentWindow.PDFViewerApplicationOptions) == null || t.set("disablePreferences", !0), (n = this.iframe.contentWindow.PDFViewerApplicationOptions) == null || n.set("pdfBugEnabled", !0), (r = this.iframe.contentWindow.PDFViewerApplicationOptions) == null || r.set("eventBusDispatchToDOM", !0);
    });
  }
  getFullPath(e) {
    return e.startsWith("/") ? `${window.location.origin}${e}` : e;
  }
}
window.customElements.get("pdfjs-viewer-element") || (window.PdfjsViewerElement = m, window.customElements.define("pdfjs-viewer-element", m));
export {
  m as PdfjsViewerElement,
  m as default
};
