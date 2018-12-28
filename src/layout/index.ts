
import { LitElement, html, customElement } from '@polymer/lit-element';
import './style';

import '../drawer';
import '../header';

@customElement('c-layout')
export class Layout extends LitElement {

  render(){
    return html `
      <link rel="stylesheet" href="/layout/style.css">
      <style>
        c-header {
          color: #fff;
        }
      </style>
      <c-header></c-header>
      <c-drawer>
        <div>声明东西</div>
      </c-drawer>
    `;
  }
}
