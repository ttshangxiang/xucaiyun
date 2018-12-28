
import * as queryString from 'query-string';
import * as URL from 'url-parse';

import { LitElement, html, property, customElement } from '@polymer/lit-element';

@customElement('c-route')
export class Route extends LitElement {

  @property({type: String}) href = '';

  constructor () {
    super();
    this.addEventListener('click', e => {
      console.log(this.href)
    })
  }
  render () {
    return html `<slot></slot>`;
  }
}
