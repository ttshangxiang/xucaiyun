
import { LitElement, html, customElement } from "lit-element";

@customElement('notfound-7')
export default class Notfound extends LitElement {
  static tagName = 'Notfound'
  render () {
    return html `<div>not found</div>`
  }
}
