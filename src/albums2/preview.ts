import { LitElement, customElement, property, html, query } from 'lit-element';

@customElement('xcy-photo-preview')
export class Preview extends LitElement {
  @property({type: String}) src = '';
  @property({type: Boolean}) fixed = false;
  @property({type: Boolean, reflect: true}) show = false;
  
  @query('img') img: HTMLImageElement;
  render () {
    return html`
      ${this.myStyles}
      ${this.show ? html`
        <div class="photo-preview ${this.fixed ? 'photo-preview-fixed' : ''}">
            <div class="preview-mask" @click=${this.hide}></div>
            <div class="preview-body">
              <div class="preview-close-wrap">
                <a class="preview-close ${this.fixed ? 'preview-close-fixed' : ''}"
                  href="javascript:;" @click=${this.hide}>x</a>
              </div>
              <img src="${this.src}" @load=${this.load} />
            </div>
        </div>
      `: ''}
    `;
  }

  load () {
    this.fixed = this.img.clientHeight > window.innerHeight - 24;
  }

  hide () {
    this.show = false;
  }

  get myStyles () {
    return html `
      <style>
        a {
          text-decoration: none;
        }
        .photo-preview {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 8;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow-y: auto;
        }
        .photo-preview-fixed {
          align-items: flex-start;
        }
        .preview-mask {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition-property: opacity;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          background-color: rgba(0, 0, 0, 0.32);
          z-index: 1;
        }
        .preview-close-wrap {
          height: 24px;
          width: 24px;
          position: absolute;
          right: 16px;
          top: 16px;
        }
        .preview-close {
          font-size: 18px;
          width: 24px;
          text-align: center;
          line-height: 24px;
          color: #000;
          display: block;
          background: #fff;
          opacity: 0.4;
          border-radius: 50%;
        }
        .preview-close-fixed {
          position: fixed;
          z-index: 2;
        }
        .preview-body {
          position: relative;
          z-index: 2;
          max-width: 94%;
          overflow-y: auto;
          box-sizing: border-box;
          padding: 12px;
          border-radius: 4px;
          background: #fff;
        }
        .preview-body img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      </style>
    `;
  }
}