import { LitElement, customElement, html, css, query } from "lit-element";

@customElement('layout-7')
export default class Layout extends LitElement {

  @query('#content') $content: HTMLElement

  async setContent (element: HTMLElement) {
    await this.updateComplete;
    this.$content.childNodes.forEach(value => {
      this.$content.removeChild(value)
    })
    this.$content.appendChild(element)
  }

  static get styles() {
    return css `
      :host {
        display: block;
      }
      .header, .bottom {
        height: 20px;
        background: #ccc;
        text-align: center;
      }
    `
  }

  render () {
    return html `
      <div class="header">header</div>
      <div id="content">content</div>
      <div class="bottom">bottom</div>
    `
  }
}