(function(t,e){typeof exports=="object"&&typeof module<"u"?module.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self,t.PdfjsViewerElement=e())})(this,function(){"use strict";const t=document.createElement("template");t.innerHTML=`
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
`;class e extends HTMLElement{static get observedAttributes(){return["src","viewerPath"]}constructor(){super(),this.attachShadow({mode:"open"}).appendChild(t.content.cloneNode(!0))}connectedCallback(){this.hasAttribute("viewerPath")||this.setAttribute("viewerPath","/pdfjs-3.4.120-dist"),this.updateIframeSrc()}attributeChangedCallback(i){["src","viewerPath"].includes(i)&&this.updateIframeSrc()}updateIframeSrc(){var i,s;(s=(i=this.shadowRoot)==null?void 0:i.querySelector("iframe"))==null||s.setAttribute("src",`${this.getAttribute("viewerPath")}/web/viewer.html?file=${this.getAttribute("src")||""}`)}}return window.customElements.get("pdfjs-viewer-element")||(window.PdfjsViewerElement=e,window.customElements.define("pdfjs-viewer-element",e)),e});
