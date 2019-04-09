import { LitElement, html, customElement } from 'lit-element';
const style = require('./style').toString();

@customElement('home-7')
export class Home7 extends LitElement {
  render () {
    return html `
      ${this.myStyles}
      <div class="home">
        建设中
      </div>
    `;
  }
  get myStyles () {
    return html`<style>${style}</style>`;
  }
}