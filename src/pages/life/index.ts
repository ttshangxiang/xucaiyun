import { LitElement, html, customElement } from "lit-element";

@customElement('life-7')
export default class Life extends LitElement {
  static tagName = 'Life'
  render () {
    return html `<div>此人无趣</div>`
  }
}