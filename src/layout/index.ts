
import { LitElement, html, customElement } from 'lit-element';

import '../drawer';
import '../header';
const style = require('./style').toString();

@customElement('xcy-layout')
export class Layout extends LitElement {

  render(){
    return html `
      ${this.myStyles}
      <xcy-header id="xcy-header" hidden></xcy-header>
      <xcy-drawer id="xcy-drawer" hidden></xcy-drawer>
    `;
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }
}
