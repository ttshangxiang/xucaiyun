import { LitElement, html, property, customElement } from '@polymer/lit-element';
import c, {setIns} from '../base/c';

import {MDCList} from '@material/list/index';
import {MDCDrawer} from '@material/drawer/index';

import './style';

const classMap: any = {
  fixed: 'mdc-top-app-bar--fixed-adjust mdc-drawer--open',
  modal: 'mdc-drawer--modal'
}

@customElement('c-drawer')
export class Drawer extends LitElement {

  @property()
  mode: ('modal' | 'fixed') = 'fixed';

  constructor () {
    super();
    setIns(this, this.id);
    this.resize();
    window.onresize = () => {
      this.resize()
    };
  }

  render(){
    return html `
    <link rel="stylesheet" href="/drawer/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <div>
      <aside class="mdc-drawer mdc-drawer--dismissible ${classMap[this.mode]}"
        style="position: fixed${this.mode === 'modal' ? ';z-index: 9;': ';'}">
        <div class="mdc-drawer__header">
          <h3 class="mdc-drawer__title">Mail</h3>
          <h6 class="mdc-drawer__subtitle">email@material.io</h6>
        </div>
        <div class="mdc-drawer__content">
          <nav class="mdc-list">
            <a href="javascript:;">
              <c-route class="mdc-list-item " href="/what"  role="nav">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
                <span class="mdc-list-item__text">Inbox</span>
              </c-route>
            </a>
            <a href="javascript:;">
              <c-route class="mdc-list-item" href="/jj" role="nav">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">send</i>
                <span class="mdc-list-item__text">Outgoing</span>
              </c-route>
            </a>
            <a href="javascript:;">
              <c-route class="mdc-list-item" href="/albums" role="nav">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">photo</i>
                <span class="mdc-list-item__text">我的相册</span>
              </c-route>
            </a>
          </nav>
        </div>
      </aside>
      <!-- mdc-drawer-scrim的点击事件库报错，复制样式自己写事件，等待修复 -->
      ${this.mode === 'modal' ? html`
          <div class="mdc-drawer-scrim" style="display: none;"></div>
          <div class="mdc-drawer-scrim-fake" @click=${() => c.drawer.open = false}></div>` : ''}
      <!-- end -->
      <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
        <main class="main-content">
          <slot></slot>
        </main>
      </div>
    </div>
    `;
  }

  updated () {
    // Instantiation
    c.list = MDCList.attachTo(this.shadowRoot.querySelector('.mdc-list'));
    c.list.wrapFocus = true;
    c.drawer = MDCDrawer.attachTo(this.shadowRoot.querySelector('.mdc-drawer'));
  }

  resize () {
    const w = window.innerWidth;
    if (w > 599) {
      this.mode = 'fixed';
    } else {
      this.mode = 'modal';
    }
  }
  
}
