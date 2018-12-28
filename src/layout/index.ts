
import { LitElement, html, customElement } from '@polymer/lit-element';
import './style';

import '../drawer';
import '../header';

@customElement('c-layout')
export class Layout extends LitElement {

  render(){
    return html `
      <link rel="stylesheet" href="/layout/style.css">
      <c-header></c-header>
      <c-drawer id="c-drawer"></c-drawer>
    `;
  }
}
