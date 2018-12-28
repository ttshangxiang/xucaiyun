
import { LitElement, html, property, customElement } from '@polymer/lit-element';

@customElement('c-photos')
export class Photos extends LitElement {

  constructor () {
    super();
  }
  render () {
    return html `相册`;
  }
}
