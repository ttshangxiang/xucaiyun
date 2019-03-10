
import { LitElement, html, customElement, property } from 'lit-element';

const styles = require('./style').toString();

@customElement('header-7')
export class Header7 extends LitElement {

  @property({ type: Number }) top = 0;
  @property({ type: String}) name = '';

  constructor() {
    super();
    // 滚动隐藏/显示topbar功能
    let scrollTop = window.scrollY;
    window.addEventListener('scroll', e => {
      const diff = window.scrollY - scrollTop;
      const height = this.shadowRoot.querySelector('header').clientHeight;
      let top = this.top - diff;
      if (diff > 0) {
        this.top = Math.max(-1 * height, top);
      }
      if (diff < 0) {
        this.top = Math.min(0, top);
      }
      scrollTop = window.scrollY;
    });
  }

  toggleDrawer() {
    let myEvent = new CustomEvent('drawer', {
      detail: { message: 'drawer' },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
  }

  render() {
    return html`
      <style>${styles}</style>
      <header style="top: ${this.top}px;">
        <div class="header-content">
          <button-7 icon="menu" @click=${() => this.toggleDrawer()}></button-7>
          <span>${this.name}</span>
        </div>
      </header>
    `;
  }
}
