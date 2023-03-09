const r = document.createElement("template");
r.innerHTML = '<iframe frameborder="0" width="100%"></iframe><style>:host{width:100%;display: block}:host iframe{height:inherit}</style>';
class i extends HTMLElement {
  constructor() {
    super(), this.attachShadow({ mode: "open" }).appendChild(r.content.cloneNode(!0));
  }
  static get observedAttributes() {
    return ["src", "viewer-path"];
  }
  connectedCallback() {
    this.hasAttribute("viewer-path") || this.setAttribute("viewer-path", "/pdfjs"), this.updateIframe();
  }
  attributeChangedCallback(e) {
    ["src", "viewer-path"].includes(e) && this.updateIframe();
  }
  updateIframe() {
    var e, t;
    (t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("iframe")) == null || t.setAttribute(
      "src",
      `${this.getAttribute("viewer-path")}/web/viewer.html?file=${this.getAttribute("src") || ""}`
    );
  }
}
window.customElements.get("pdfjs-viewer-element") || (window.PdfjsViewerElement = i, window.customElements.define("pdfjs-viewer-element", i));
export {
  i as PdfjsViewerElement,
  i as default
};