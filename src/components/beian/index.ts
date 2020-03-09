
import { LitElement, customElement, html, css, unsafeCSS } from 'lit-element'

@customElement('beian-7')
export default class Beian7 extends LitElement {

  static get styles () {
    return css `
      .beian {
        text-align: center;
        font-size: 14px;
        line-height: 26px;
      }
      .beian a {
        color: var(--mdc-theme-secondary);
        text-decoration: none;
      }
    `
  }

  render () {
    return html `
      <div class="beian">
        <a href="http://www.beian.miit.gov.cn">湘ICP备15002852号</a>
      </div>
    `
  }
}