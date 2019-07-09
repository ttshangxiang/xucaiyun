import { LitElement, customElement, html, css, unsafeCSS } from "lit-element";
import { MDCRipple } from '@material/ripple';
const styles = require('./style')

@customElement('word-card-7')
export default class WordCard extends LitElement {
  
  static get styles() {
    return css`
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
      ${unsafeCSS(styles)}
    `
  }

  firstUpdated () {
    const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
    const ripples = [].map.call(this.shadowRoot.querySelectorAll(selector), (el: HTMLElement) => {
      return new MDCRipple(el).unbounded = true;
    });
  }

  render () {
    return html `
      <div class="mdc-card">
        <div class="mdc-card__primary-action">
          <div class="demo-card__primary">
            <h2 class="demo-card__title mdc-typography mdc-typography--headline6">Our Changing Planet</h2>
            <h3 class="demo-card__subtitle mdc-typography mdc-typography--subtitle2">by Kurt Wagner</h3></div>
          <div class="demo-card__secondary mdc-typography mdc-typography--body2">Visit ten places on our planet that are undergoing the biggest changes today.</div>
        </div>
        <div class="mdc-card__actions">
          <div class="mdc-card__action-buttons">
            <button class="mdc-button mdc-card__action mdc-card__action--button">
              <span class="mdc-button__label">Read</span>
            </button>
            <button class="mdc-button mdc-card__action mdc-card__action--button">
              <span class="mdc-button__label">BOOKMARK</span>
            </button>
          </div>
          <div class="mdc-card__action-icons">
            <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Share">share</button>
            <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="More options">more_vert</button>
          </div>
        </div>
      </div>
    `
  }
}