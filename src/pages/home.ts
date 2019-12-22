import { LitElement, html, customElement, property } from 'lit-element'
import page from 'page'

@customElement('app-7')
export default class Home7 extends LitElement {
  static tagName = 'Home7'
  @property()
  foo = 'foo'
  
  render() {
    return html`
      <div>
        webgl学习之路<br>
        webgl - 地球<br>
        webgl - 水池<br>
        webgl - 蜡烛<br>
        webgl - 噪声<br>
      </div>
    `
  }
}
