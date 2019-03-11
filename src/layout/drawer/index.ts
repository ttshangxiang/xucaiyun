
import { LitElement, html, customElement, property, query } from 'lit-element';

const styles = require('./style').toString();

@customElement('drawer-7')
export class Drawer7 extends LitElement {
  
  @property({type: Boolean}) drawer = false;
  
  @query('.drawer-scrim') scrim: HTMLElement;

  closeDrawer() {
    var style = window.getComputedStyle ?
      window.getComputedStyle(this.scrim, '') : (<any>this.scrim).currentStyle;
    if (style.display === 'none') {
      return;
    }
    let myEvent = new CustomEvent('drawer', {
      detail: { message: 'drawer' },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
  }

  render () {
    return html `
      <style>${styles}</style>
      <aside style="${this.drawer ? '' : 'transform: translateX(-100%);'}"
        @click=${this.closeDrawer}>
        <div class="drawer-header">
          <div class="drawer-title">Xcy</div>
          <div class="drawer-subtitle">ttshangxiang@qq.com</div>
        </div>
        <div class="drawer-content">
          <nav class="nav-list">
            <a href="javascript:;">
              <link-7 class="nav-item" path="/" role="nav">
                <i class="material-icons">inbox</i>
                <span>首页</span>
              </link-7>
            </a>
            <a href="javascript:;">
              <link-7 class="nav-item" path="/words" role="nav">
                <i class="material-icons">send</i>
                <span>文章</span>
              </link-7>
            </a>
            <a href="javascript:;">
              <link-7 class="nav-item" path="/albums" role="nav">
                  <i class="material-icons">photo</i>
                  <span>相册</span>
              </link-7>
            </a>
            <a href="javascript:;">
              <link-7 class="nav-item" path="/res" role="nav">
                <i class="material-icons">folder</i>
                <span>资源</span>
              </link-7>
            </a>
          </nav>
        </div>
      </aside>
      <div class="drawer-scrim" style="${this.drawer ? '' : 'display: none;'}"
        @click=${this.closeDrawer}></div>
    `;
  }
}
