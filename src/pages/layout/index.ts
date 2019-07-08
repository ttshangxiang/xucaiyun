import { LitElement, customElement, html, css, unsafeCSS, query, property } from 'lit-element'

import { MDCTopAppBar } from '@material/top-app-bar'
import { MDCDrawer } from '@material/drawer'
const styles = require('./style')

@customElement('layout-7')
export default class Layout extends LitElement {

  @query('#content') $content: HTMLElement

  @property({type: Boolean}) isModal = window.innerWidth <= 720;
  @property({type: Boolean, reflect: true}) isShow = !this.isModal;

  async setContent (element: HTMLElement) {
    await this.updateComplete;
    this.$content.childNodes.forEach(value => {
      this.$content.removeChild(value)
    })
    this.$content.appendChild(element)
  }

  static get styles() {
    return css `
      ${unsafeCSS(styles)}
    `
  }

  drawer: MDCDrawer;

  firstUpdated () {
    const topAppBarElement = this.shadowRoot.querySelector('.mdc-top-app-bar')
    MDCTopAppBar.attachTo(topAppBarElement)

    const drawer = MDCDrawer.attachTo(this.shadowRoot.querySelector('.mdc-drawer'))
    drawer.open = this.isShow
    this.drawer = drawer
  }

  toggleDrawer () {
    this.isShow = !this.isShow
  }

  attributeChangedCallback (name: string, oldval: string, newval: string) {
    if (name === 'isshow' && this.drawer) {
      this.drawer.open = newval !== null;
    }
    super.attributeChangedCallback(name, oldval, newval);
  }

  render () {
    return html `
      <aside class="mdc-drawer ${this.isModal ? 'mdc-drawer--modal' : 'mdc-drawer--dismissible'}">
        <div class="mdc-drawer__header">
          <h3 class="mdc-drawer__title">Mail</h3>
          <h6 class="mdc-drawer__subtitle">email@material.io</h6>
        </div>
        <div class="mdc-drawer__content">
          <div class="mdc-list">
            <a class="mdc-list-item mdc-list-item--activated" href="#" aria-current="page">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">inbox</i>
              <span class="mdc-list-item__text">Inbox</span>
            </a>
            <a class="mdc-list-item" href="#">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">send</i>
              <span class="mdc-list-item__text">Outgoing</span>
            </a>
            <a class="mdc-list-item" href="#">
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">drafts</i>
              <span class="mdc-list-item__text">Drafts</span>
            </a>
          </div>
          <!-- Uncaught Error: You can't have a focus-trap without at least one focusable element -->
          <a href="#"></a>
          <!-- work -->
        </div>
      </aside>
      ${ this.isModal ? html `<div class="mdc-drawer-scrim" @click=${this.toggleDrawer}></div>` : ''}
      <div class="mdc-drawer-app-content">
        <header class="mdc-top-app-bar app-bar" id="app-bar">
          <div class="mdc-top-app-bar__row">
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
              <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button" @click=${this.toggleDrawer}>menu</button>
              <span class="mdc-top-app-bar__title">Dismissible Drawer</span>
            </section>
          </div>
        </header>
        <main class="main-content" id="main-content">
          <div class="mdc-top-app-bar--fixed-adjust" id="content">
            App Content
          </div>
        </main>
      </div>
    `
  }
}