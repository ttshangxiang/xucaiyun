
import { LitElement, html, customElement } from '@polymer/lit-element';

import '../drawer';
import '../header';

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
    return html `
      <style>
        :host {
          display: block;
          width: 100%;
        }
      </style> 
    `
  }
}
