import { LitElement, html, customElement } from 'lit-element';
const style = require('./style').toString();

import '../components/img';
@customElement('home-7')
export class Home7 extends LitElement {
  render () {
    return html `
      ${this.myStyles}
      <div style="height: 200px;">
        <img-7 src="/uploads/res/20190316/5c8cbd4cbcdd483104606b61-1280.jpg"
          thumb="/uploads/res/20190316/5c8cbd4cbcdd483104606b61-360.jpg"></img-7>
      </div>
    `;
  }
  get myStyles () {
    return html`<style>${style}</style>`;
  }
}