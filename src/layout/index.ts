
import { LitElement, html, customElement } from '@polymer/lit-element';
import './style';
import '../base/icon';

import '../drawer';
import '../header';

@customElement('c-layout')
export class Layout extends LitElement {

  render(){
    return html `
      <style>
        :host {
          display: block;
          width: 100%;
        }
      </style>
      <link rel="stylesheet" href="/layout/style.css">
      <c-header hidden></c-header>
      <c-drawer id="c-drawer" hidden></c-drawer>
    `;
  }
}
