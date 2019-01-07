
import { LitElement, html, customElement } from '@polymer/lit-element';

import '../drawer';
import '../header';
const style = require('./style').toString();

@customElement('c-layout')
export class Layout extends LitElement {

  render(){
    return html `
      ${this.myStyles}
      <c-header hidden></c-header>
      <c-drawer id="c-drawer" hidden></c-drawer>
    `;
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }
}
