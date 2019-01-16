import { LitElement, html, property, customElement } from 'lit-element';
import {setIns} from '../base/c';


import '../common/linear-progress'
import {MDCList} from '@material/list/index';
import {MDCDrawer} from '@material/drawer/index';

const style = require('./style').toString();

const classMap: any = {
  fixed: 'mdc-top-app-bar--fixed-adjust mdc-drawer--open',
  modal: 'mdc-drawer--modal'
}

@customElement('xcy-drawer')
export class Drawer extends LitElement {

  @property()
  mode: ('modal' | 'fixed') = 'fixed';

  mdcList: any;
  mdcDrawer: any;

  constructor () {
    super();
    setIns(this.id, this);
    this.resize();
    window.onresize = () => {
      this.resize()
    };
  }

  render(){
    return html `
    ${this.myStyles}
    <div>
      <aside class="mdc-drawer mdc-drawer--dismissible ${classMap[this.mode]}"
        style="position: fixed${this.mode === 'modal' ? ';z-index: 9;': ';'}">
        <div class="mdc-drawer__header">
          <h3 class="mdc-drawer__title">Xcy</h3>
          <h6 class="mdc-drawer__subtitle">ttshangxiang@qq.com</h6>
        </div>
        <div class="mdc-drawer__content">
          <nav class="mdc-list">
            <a href="javascript:;">
              <xcy-route class="mdc-list-item " href="/what"  role="nav">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
                <span class="mdc-list-item__text">Inbox</span>
              </xcy-route>
            </a>
            <a href="javascript:;">
              <xcy-route class="mdc-list-item" href="/jj" role="nav">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">send</i>
                <span class="mdc-list-item__text">Outgoing</span>
              </xcy-route>
            </a>
            <a href="javascript:;">
              <xcy-route class="mdc-list-item" href="/albums" role="nav">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">photo</i>
                <span class="mdc-list-item__text">我的相册</span>
              </xcy-route>
            </a>
          </nav>
        </div>
      </aside>
      <!-- mdc-drawer-scrim的点击事件库报错，复制样式自己写事件，等待修复 -->
      ${this.mode === 'modal' ? html`
          <div class="mdc-drawer-scrim" style="display: none;"></div>
          <div class="mdc-drawer-scrim-fake" @click=${() => this.mdcDrawer.open = false}></div>` : ''}
      <!-- end -->
      <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
        <main class="main-content">
          <xcy-linear-progress id="linear-progress"></xcy-linear-progress>
          <slot></slot>
        </main>
      </div>
    </div>
    `;
  }

  updated () {
    // Instantiation
    this.mdcList = MDCList.attachTo(this.shadowRoot.querySelector('.mdc-list'));
    this.mdcList.wrapFocus = true;
    this.mdcDrawer = MDCDrawer.attachTo(this.shadowRoot.querySelector('.mdc-drawer'));
  }

  resize () {
    const w = window.innerWidth;
    if (w > 599) {
      this.mode = 'fixed';
    } else {
      this.mode = 'modal';
    }
  }
  
  get myStyles () {
    return html `<style>${style}</style>`;
  }
}
