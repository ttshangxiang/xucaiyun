import { LitElement, html, customElement } from '@polymer/lit-element';
import { MDCTopAppBar } from '@material/top-app-bar/index';
import c from '../base/c';

import './style';

@customElement('c-header')
export class Header extends LitElement {

  render(){
    return html `
    <style>
      .material-icons {
        width: 48px;
        height: 48px;
      }
      :host {
        position: absolute;
        z-index: 7;
      }
    </style>
    <link rel="stylesheet" href="/header/style.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <header class="mdc-top-app-bar mdc-top-app-bar--fixed">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
          <a href="javascript:;" class="material-icons mdc-top-app-bar__navigation-icon" @click=${this.drawer}>menu</a>
          <span class="mdc-top-app-bar__title">Title</span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
          <a href="javascript:;" class="material-icons mdc-top-app-bar__action-item" aria-label="Download" alt="Download">file_download</a>
          <a href="javascript:;" class="material-icons mdc-top-app-bar__action-item" aria-label="Print this page" alt="Print this page">print</a>
          <a href="javascript:;" class="material-icons mdc-top-app-bar__action-item" aria-label="Bookmark this page" alt="Bookmark this page">bookmark</a>
        </section>
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
    c.drawer.open = !c.drawer.open;
  }
}
