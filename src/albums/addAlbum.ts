
import { LitElement, html, property, customElement } from '@polymer/lit-element';
import {MDCFormField} from '@material/form-field/index';
import {MDCCheckbox} from '@material/checkbox/index';

import './addAlbum.scss';

@customElement('c-album-add')
export class AddAlbum extends LitElement {
  render () {
    return html `
      <link rel="stylesheet" href="/albums/addAlbum.css">
      <div class="mdc-form-field mdc-form-field--align-end">
      </div>
    `;
  }

  updated () {
    const formField = new MDCFormField(this.shadowRoot.querySelector('.mdc-form-field'));
    const checkbox = new MDCCheckbox(this.shadowRoot.querySelector('.mdc-checkbox'));
    formField.input = checkbox;
  }
}