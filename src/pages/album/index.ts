import { LitElement, html, customElement, css, unsafeCSS } from "lit-element";
import '../../components/cards/wordCard'
const styles = require('./style')

@customElement('album-7')
export default class Album extends LitElement {

  static get styles() {
    return css`
      ${unsafeCSS(styles)}
    `
  }
  
  render () {
    return html `
      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
            <word-card-7></word-card-7>
          </div>
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
            <word-card-7></word-card-7>
          </div>
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
            <word-card-7></word-card-7>
          </div>
        </div>
      </div>
    `
  }
}