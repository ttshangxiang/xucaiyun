import { LitElement, customElement, html, css, unsafeCSS } from 'lit-element'
import { MDCMenu } from '@material/menu'
const styles = require('./style')

@customElement('card-menu-7')
export default class CardMenu extends LitElement {

  menu: MDCMenu
  firstUpdated () {
    const menu = new MDCMenu(this.shadowRoot.querySelector('.mdc-menu'));
    this.menu = menu
  }

  static get styles () {
    return css `
      ${unsafeCSS(styles)}
    `
  }

  render () {
    return html `
      <div class="mdc-menu-surface--anchor">
        <div class="mdc-menu mdc-menu-surface">
          <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
            <li class="mdc-list-item" role="menuitem">
              <span class="mdc-list-item__text">A Menu Item</span>
            </li>
            <li class="mdc-list-item" role="menuitem">
              <span class="mdc-list-item__text">Another Menu Item</span>
            </li>
          </ul>
        </div>
      </div>
    `
  }
}