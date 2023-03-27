const w = (s, e) => new Promise((r, n) => {
  let i = e.querySelector(s);
  if (i) {
    r(i);
    return;
  }
  new MutationObserver((c, o) => {
    Array.from(e.querySelectorAll(s)).forEach((a) => {
      r(a), o.disconnect();
    });
  }).observe(e, {
    childList: !0,
    subtree: !0
  });
}), t = {
  viewerPath: "/pdfjs",
  viewerEntry: "/web/viewer.html",
  src: "",
  page: "",
  search: "",
  phrase: "",
  zoom: "",
  pagemode: "",
  locale: "",
  textLayer: ""
}, m = document.createElement("template");
m.innerHTML = `
  <iframe frameborder="0" width="100%"></iframe>
  <style>:host{width:100%;display:block;overflow:hidden}:host iframe{height:100%}</style>
`;
class d extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }).appendChild(m.content.cloneNode(!0));
  }
  static get observedAttributes() {
    return ["src", "viewer-path", "locale", "page", "search", "phrase", "zoom", "pagemode", "text-layer"];
  }
  connectedCallback() {
    this.iframe = this.shadowRoot.querySelector("iframe"), this.setEventListeners();
  }
  attributeChangedCallback() {
    w("iframe", this.shadowRoot).then(() => this.setProps());
  }
  setProps() {
    const e = this.getFullPath(this.getAttribute("src") || t.src), r = this.getFullPath(this.getAttribute("viewer-path") || t.viewerPath), n = this.getAttribute("page") || t.page, i = this.getAttribute("search") || t.search, c = this.getAttribute("phrase") || t.phrase, o = this.getAttribute("zoom") || t.zoom, a = this.getAttribute("pagemode") || t.pagemode, h = this.getAttribute("locale") || t.locale, p = this.getAttribute("text-layer") || t.textLayer, l = `${r}${t.viewerEntry}?file=${e}#page=${n}&zoom=${o}&pagemode=${a}&search=${i}&phrase=${c}&textLayer=${p}${h ? "&locale=" + h : ""}`;
    l !== this.iframe.getAttribute("src") && this.rerenderIframe(l);
  }
  rerenderIframe(e) {
    this.shadowRoot.replaceChild(this.iframe.cloneNode(), this.iframe), this.iframe = this.shadowRoot.querySelector("iframe"), this.iframe.contentWindow.location.href = e;
  }
  setEventListeners() {
    document.addEventListener("webviewerloaded", () => {
      this.getAttribute("src") !== t.src && this.iframe.contentWindow.PDFViewerApplicationOptions.set("defaultUrl", ""), this.iframe.contentWindow.PDFViewerApplicationOptions.set("disablePreferences", !0), this.iframe.contentWindow.PDFViewerApplicationOptions.set("pdfBugEnabled", !0);
    });
  }
  getFullPath(e) {
    return e.startsWith("/") ? `${window.location.origin}${e}` : e;
  }
}
window.customElements.get("pdfjs-viewer-element") || (window.PdfjsViewerElement = d, window.customElements.define("pdfjs-viewer-element", d));
export {
  d as PdfjsViewerElement,
  d as default
};
