import { LitElement, html, customElement, css, unsafeCSS } from "lit-element";
import '../../components/cards/wordCard'
const styles = require('./style')

@customElement('words-7')
export default class Words extends LitElement {

  static get styles() {
    return css`
      ${unsafeCSS(styles)}
    `
  }

  list = [{
    title: '哈哈哈',
    subTitle: '茜茜',
    profile: '大苏打大所'
  }, {
    title: '哈哈哈',
    subTitle: '茜茜',
    profile: '大苏打大所'
  }]

  render() {
    return html`
      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
          ${this.list.map(item => html `
            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
              <word-card-7 title=${item.title} subTitle=${item.subTitle} profile=${item.profile}></word-card-7>
            </div>
          `)}
        </div>
      </div>
    `
  }
}