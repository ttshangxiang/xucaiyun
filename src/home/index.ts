import { LitElement, html, customElement } from 'lit-element';
const style = require('./style').toString();

@customElement('home-7')
export class Home7 extends LitElement {
  render () {
    return html `
      ${this.myStyles}
      <div>
        稍候
      </div>
    `;
  }
  get myStyles () {
    return html`<style>${style}</style>`;
  }
}