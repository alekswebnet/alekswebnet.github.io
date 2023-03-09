const r = document.createElement("template");
r.innerHTML = `
  <iframe
    frameborder="0"
    width="100%">
  </iframe>
  <style>
    :host {
      width: 100%;
      display: block;
    }
    :host iframe {
      height: inherit;
    }
  </style>
`;
class i extends HTMLElement {
  static get observedAttributes() {
    return ["src", "viewerPath"];
  }
  constructor() {
    super(), this.attachShadow({ mode: "open" }).appendChild(r.content.cloneNode(!0));
  }
  connectedCallback() {
    this.hasAttribute("viewerPath") || this.setAttribute("viewerPath", "/pdfjs-3.4.120-dist"), this.updateIframeSrc();
  }
  attributeChangedCallback(e) {
    ["src", "viewerPath"].includes(e) && this.updateIframeSrc();
  }
  updateIframeSrc() {
    var e, t;
    (t = (e = this.shadowRoot) == null ? void 0 : e.querySelector("iframe")) == null || t.setAttribute(
      "src",
      `${this.getAttribute("viewerPath")}/web/viewer.html?file=${this.getAttribute("src") || ""}`
    );
  }
}
window.customElements.get("pdfjs-viewer-element") || (window.PdfjsViewerElement = i, window.customElements.define("pdfjs-viewer-element", i));
export {
  i as default
};