import { LitElement, customElement, html, css, unsafeCSS, property } from 'lit-element'
import { MDCRipple } from '@material/ripple'
import '../menus/cardMenu'
import CardMenu from '../menus/cardMenu'
const styles = require('./style')

@customElement('word-card-7')
export default class WordCard extends LitElement {

  @property() title: string = ''
  @property() subTitle: string = ''
  @property() profile: string = ''
  @property() img: string = ''
  
  static get styles() {
    return css`
      ${unsafeCSS(styles)}
      .demo-card__primary {
        padding: 1rem;
      }
      .demo-card__title {
        margin: 0;
      }
      .demo-card__subtitle {
        margin: 0;
      }
      .demo-card__secondary {
        padding: 0 1rem 8px;
      }
      .demo-card__secondary, .demo-card__subtitle {
        color: rgba(0,0,0,.54);
        color: var(--mdc-theme-text-secondary-on-background,rgba(0,0,0,.54));
      }
      .demo-card-shaped {
        border-radius: 24px 8px;
      }
      .mdc-card__primary-action {
        height: 132px;
      }
      .mdc-card__primary-action:first-child {
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
      }
      .mdc-button {
        font-size: 1rem;
      }
      .mdc-button:not(:disabled) {
        font-weight: 500;
        color: var(--mdc-theme-secondary, #009688);
      }
    `
  }

  firstUpdated () {
    const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
    const ripples = [].map.call(this.shadowRoot.querySelectorAll(selector), (el: HTMLElement) => {
      return new MDCRipple(el).unbounded = true;
    });
  }

  showMenu (event: MouseEvent) {
    const btn = <HTMLElement>event.composedPath()[0]
    const card = <CardMenu>(btn.nextElementSibling)
    card.menu.open = !card.menu.open
  }

  render () {
    return html `
      <div class="mdc-card demo-card-shaped">
        ${ this.img ? html `
          <div class="mdc-card__primary-action" .style="${`background-image: url("${this.img}");`}">
            <div style="width:100%;height:100%;position:absolute;top:0;left:0;background: rgba(0,0,0,0.5);"></div>
            <div class="demo-card__primary" style="position:relative;">
              <h2 class="demo-card__title mdc-typography mdc-typography--headline6" style="color:#eee;">${this.title}</h2>
              <h3 class="demo-card__subtitle mdc-typography mdc-typography--subtitle2" style="color:#eee;">${this.subTitle}</h3></div>
            <div class="demo-card__secondary mdc-typography mdc-typography--body2" style="position:relative;color:#eee;">${this.profile}</div>
          </div>
        ` : html `
          <div class="mdc-card__primary-action">
            <div class="demo-card__primary">
              <h2 class="demo-card__title mdc-typography mdc-typography--headline6">${this.title}</h2>
              <h3 class="demo-card__subtitle mdc-typography mdc-typography--subtitle2">${this.subTitle}</h3></div>
            <div class="demo-card__secondary mdc-typography mdc-typography--body2">${this.profile}</div>
          </div>
        `}
        <div class="mdc-card__actions">
          <div class="mdc-card__action-buttons">
            <button class="mdc-button mdc-card__action mdc-card__action--button">
              <span class="mdc-button__label">进入</span>
            </button>
            <button class="mdc-button mdc-card__action mdc-card__action--button">
              <span class="mdc-button__label">指点</span>
            </button>
          </div>
          <div class="mdc-card__action-icons" style="position: relative;">
            <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="More options" @click=${this.showMenu}>more_vert</button>
            <card-menu-7></card-menu-7>
          </div>
        </div>
      </div>
    `
  }
}