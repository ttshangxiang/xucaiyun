import { LitElement, html, customElement } from 'lit-element';
const style = require('./style').toString();

@customElement('home-7')
class Home7 extends LitElement {
  render () {
    return html `
      ${this.myStyles}
      什么都没
    `;
  }
  get myStyles () {
    return html`<style>${style}</style>`;
  }
}