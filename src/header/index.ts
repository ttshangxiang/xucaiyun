import { LitElement, html, customElement, property } from 'lit-element';
import { MDCTopAppBar } from '@material/top-app-bar/index';
import { getIns, setIns } from '../base/c';

const style = require('./style').toString();

@customElement('xcy-header')
export class Header extends LitElement {
  @property({type: String,reflect: true}) mytitle = 'Xcy';
  @property({type: String, reflect: true}) button: ('menu' | 'back') = 'menu';

  constructor () {
    super();
    setIns(this.id, this);
  }

  render(){
    return html `
    ${this.myStyles}
    <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          ${this.button === 'menu' ? html `
            <a href="javascript:;" class="material-icons mdc-top-app-bar__action-item" @click=${this.drawer}>menu</a>
          ` : ''}
          ${this.button === 'back' ? html `
            <a href="javascript:;" class="material-icons mdc-top-app-bar__action-item" @click=${() => window.history.back()}>arrow_back</a>
          ` : ''}
          <span class="mdc-top-app-bar__title">${this.mytitle}</span>
        </section>
        <!-- <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
          <a href="javascript:;" class="material-icons mdc-top-app-bar__action-item" aria-label="Download" alt="Download">file_download</a>
          <a href="javascript:;" class="material-icons mdc-top-app-bar__action-item" aria-label="Print this page" alt="Print this page">print</a>
          <a href="javascript:;" class="material-icons mdc-top-app-bar__action-item" aria-label="Bookmark this page" alt="Bookmark this page">bookmark</a>
        </section> -->
      </div>
    </header>
    `;
  }

  updated () {
    // Instantiation
    const topAppBarElement = this.shadowRoot.querySelector('.mdc-top-app-bar');
    const topAppBar = new MDCTopAppBar(topAppBarElement);
  }

  drawer () {
    const drawer = (<any>getIns('xcy-drawer')).mdcDrawer;
    drawer.open = !drawer.open;
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }
}
