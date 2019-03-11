
import { LitElement, html, customElement, property } from 'lit-element';

const styles = require('./style').toString();

@customElement('dialog-7')
export class Dialog7 extends LitElement {

  @property({type: Boolean, reflect: true}) isShow = false;
  @property({type: String}) text = '标题';
  
  close () {
    this.isShow = false;
    let myEvent = new CustomEvent('close', {
      detail: { message: 'close' },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
  }

  show () {
    this.isShow = true;
  }

  done () {
    let myEvent = new CustomEvent('done', {
      detail: { message: 'done' },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
  }

  render () {
    return html `
      <style>${styles}</style>
      <div class="dialog-main" style="${this.isShow ? '': 'display: none;'}">
        <div class="dialog-scrim" @click=${this.close}></div>
        <div class="dialog-box">
          <div class="dialog-header">
            <slot name="header">
              <span class="dialog-title" title=${this.text}>${this.text}</span>
              <a href="javascript:;" class="material-icons dialog-btn" style="font-size: 22px;" @click=${this.close}>close</a>
            </slot>
          </div>
          <div class="dialog-content">
            <slot></slot>
          </div>
          <div class="dialog-footer">
            <slot name="footer">
              <span class="dialog-footer-text"></span>
              <a href="javascript:;" class="material-icons dialog-btn" style="font-size: 22px;" @click=${this.close}>close</a>
              <a href="javascript:;" class="material-icons dialog-btn" style="width: 96px;" @click=${this.done}>done</a>
            </slot>
          </div>
        </div>
      </div>
    `
  }
}
