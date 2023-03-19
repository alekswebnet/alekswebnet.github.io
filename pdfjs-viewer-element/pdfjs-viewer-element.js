const d = (i, e = 300) => {
  let t;
  return function(...s) {
    clearTimeout(t), t = setTimeout(() => i.apply(this, s), e);
  };
}, n = document.createElement("template");
n.innerHTML = '<iframe frameborder="0" width="100%"></iframe><style>:host{width:100%;display:block;overflow:hidden}:host iframe{height:100%}</style>';
class r extends HTMLElement {
  constructor() {
    super(), this.onAttrsChanged = d(async () => {
      var s;
      const t = (s = this.iframe) == null ? void 0 : s.getAttribute("src");
      t && t.split("&locale=")[1] !== this.getAttribute("locale") ? (await this.setProps(), this.iframe.contentWindow.location.reload()) : await this.setProps();
    }), this.attachShadow({ mode: "open" }).appendChild(n.content.cloneNode(!0));
  }
  static get observedAttributes() {
    return ["src", "viewer-path", "locale", "page", "search", "phrase", "zoom", "pagemode"];
  }
  connectedCallback() {
    this.iframe = this.shadowRoot.querySelector("iframe"), this.setEventListeners();
  }
  attributeChangedCallback() {
    this.onAttrsChanged();
  }
  async setProps() {
    const e = this.getAttribute("viewer-path") || "/pdfjs", t = this.getFileSrc(this.getAttribute("src") || ""), s = this.getAttribute("page") || "", a = this.getAttribute("search") || "", c = this.getAttribute("phrase") || "", l = this.getAttribute("zoom") || "", h = this.getAttribute("pagemode") || "", o = this.getAttribute("locale");
    this.iframe.setAttribute(
      "src",
      `${e}/web/viewer.html#file=${t}&page=${s}&zoom=${l}&pagemode=${h}&search=${a}&phrase=${c}${o ? "&locale=" + o : ""}`
    );
  }
  setEventListeners() {
    document.addEventListener("webviewerloaded", async () => {
      var e, t;
      (e = this.iframe.contentWindow) == null || e.PDFViewerApplicationOptions.set("disablePreferences", !0), (t = this.iframe.contentWindow) == null || t.PDFViewerApplicationOptions.set("pdfBugEnabled", !0);
    });
  }
  getFileSrc(e) {
    return e.startsWith("/") ? `${window.location.origin}${e}` : e;
  }
}
window.customElements.get("pdfjs-viewer-element") || (window.PdfjsViewerElement = r, window.customElements.define("pdfjs-viewer-element", r));
export {
  r as PdfjsViewerElement,
  r as default
};
