
import { LitElement, html, customElement, property } from 'lit-element';

const styles = require('./style').toString();

@customElement('dialog-7')
export class Dialog7 extends LitElement {

  @property({type: Boolean, reflect: true}) isShow = false;
  @property({type: String}) title = '标题';
  
  close () {
    this.isShow = false;
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
        <div class="dialog-scrim"></div>
        <div class="dialog-box">
          <div class="dialog-header">
            <span class="dialog-title">${this.title}</span>
            <a href="javascript:;" class="material-icons dialog-btn" style="font-size: 22px;" @click=${this.close}>close</a>
          </div>
          <div class="dialog-content">
            <slot></slot>
          </div>
          <div class="dialog-footer">
            <span class="dialog-footer-text"></span>
            <a href="javascript:;" class="material-icons dialog-btn" style="font-size: 22px;" @click=${this.close}>close</a>
            <a href="javascript:;" class="material-icons dialog-btn" style="width: 96px;" @click=${this.done}>done</a>
          </div>
        </div>
      </div>
    `
  }
}
