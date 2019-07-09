import { LitElement, customElement, html, css, unsafeCSS, query, property } from 'lit-element'
import { MDCRipple } from '@material/ripple'
import page from 'page'
import * as pathToRegexp from 'path-to-regexp'

import { MDCTopAppBar } from '@material/top-app-bar'
import { MDCDrawer } from '@material/drawer'
const styles = require('./style')

interface link {
  path: string;
  name: string;
  icon: string;
  active: boolean;
}

@customElement('layout-7')
export default class Layout extends LitElement {

  @query('#content') $content: HTMLElement

  @property({type: Boolean}) isModal = window.innerWidth <= 720;
  @property({type: Boolean, reflect: true}) isShow = !this.isModal;
  @property({type: Object}) ctx: PageJS.Context

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

  drawer: MDCDrawer

  firstUpdated () {
    const topAppBarElement = this.shadowRoot.querySelector('.mdc-top-app-bar')
    MDCTopAppBar.attachTo(topAppBarElement)

    this.shadowRoot.querySelectorAll('.mdc-list-item').forEach(el => {
      new MDCRipple(el).unbounded = true;
    })

    const drawer = MDCDrawer.attachTo(this.shadowRoot.querySelector('.mdc-drawer'))
    drawer.open = this.isShow
    this.drawer = drawer

    this.matchLinks()
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

  @property()
  links: link[] = [
    {
      path: '/', name: 'T_T', icon: 'inbox', active: false
    }, {
      path: '/life', name: '生涯', icon: 'inbox', active: false
    }, {
      path: '/words', name: '发言', icon: 'inbox', active: false
    }, {
      path: '/abouts', name: '关于', icon: 'inbox', active: false
    }
  ]

  matchLinks () {
    const temps: any = []
    this.links.forEach((item, index) => {
      let path = item.path
      let ii = item.path.indexOf('?')
      if (ii > -1) {
        path = path.substr(0, ii)
      }
      ii = item.path.indexOf('#')
      if (ii > -1) {
        path = path.substr(0, ii)
      }
      const re = pathToRegexp(path, [], {end: false})
      const result = this.ctx.canonicalPath.match(re)
      temps[index] = result ? result[0].length : 0
    })
    const iii = temps.indexOf(Math.max(...temps))
    if (iii > -1) {
      this.links = this.links.map((item, index) => {
        item.active = index === iii
        return item
      })
    }
  }

  render () {
    return html `
      <aside class="mdc-drawer ${this.isModal ? 'mdc-drawer--modal' : 'mdc-drawer--dismissible'}">
        <div class="mdc-drawer__header">
          <h3 class="mdc-drawer__title">tsx</h3>
          <h6 class="mdc-drawer__subtitle">ttshangxiang@qq.com</h6>
        </div>
        <div class="mdc-drawer__content">
          <div class="mdc-list">
            ${this.links.map(item => html `
              <a class="mdc-list-item ${item.active ? 'mdc-list-item--activated' : ''}" href="javascript:;" @click=${() => page(item.path)}>
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">${item.icon}</i>
                <span class="mdc-list-item__text">${item.name}</span>
              </a>
            `)}
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