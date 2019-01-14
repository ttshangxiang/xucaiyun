
import { LitElement, html, property, customElement } from '@polymer/lit-element';
import {MDCTextField} from '@material/textfield/index';
import {MDCTextFieldHelperText} from '@material/textfield/helper-text';
import {MDCNotchedOutline} from '@material/notched-outline/index';
import {MDCRipple} from '@material/ripple/index';
import axios from '../base/axios';

const style = require('./addAlbum.scss').toString();

@customElement('xcy-album-add')
export class AddAlbum extends LitElement {
  render () {
    return html `
      ${this.myStyles}
      <div class="text-field-row">
        <div class="text-field-container">
          <div class="mdc-text-field mdc-text-field--fullwidth mdc-text-field--with-trailing-icon">
            <input class="mdc-text-field__input"
              id="title"
              type="text"
              autocomplete="off"
              placeholder="相册名称"
              aria-label="相册名称">
              <i class="material-icons mdc-text-field__icon">delete</i>
          </div>
          <p class="mdc-text-field-helper-text" aria-hidden="true">
            一些提示
          </p>
        </div>
        <div class="text-field-container">
          <div class="mdc-text-field mdc-text-field--outlined mdc-text-field--fullwidth mdc-text-field--textarea">
            <textarea id="description" class="mdc-text-field__input" rows="4"></textarea>
            <div class="mdc-notched-outline">
              <div class="mdc-notched-outline__leading"></div>
              <div class="mdc-notched-outline__notch">
                <label for="tf-outlined" class="mdc-floating-label">描述</label>
              </div>
              <div class="mdc-notched-outline__trailing"></div>
            </div>
          </div>
          <p class="mdc-text-field-helper-text" aria-hidden="true">
            一些提示
          </p>
        </div>
        <div class="text-field-container button-group">
          <a href="javascript:;" class="mdc-fab mdc-fab--extended">
            <span class="material-icons mdc-fab__icon">cancel</span>
            <span class="mdc-fab__label">取消</span>
          </a>
          <a href="javascript:;" class="mdc-fab mdc-fab--extended" @click=${this.save}>
            <span class="material-icons mdc-fab__icon">add</span>
            <span class="mdc-fab__label">添加</span>
          </a>
        </div>
      </div>
    `;
  }

  updated () {
    this.shadowRoot.querySelectorAll('.mdc-text-field').forEach(o => new MDCTextField(o));
    const helperText = new MDCTextFieldHelperText(this.shadowRoot.querySelector('.mdc-text-field-helper-text'));
    const notchedOutline = new MDCNotchedOutline(this.shadowRoot.querySelector('.mdc-notched-outline'));

    this.shadowRoot.querySelectorAll('.mdc-fab').forEach(o => new MDCRipple(o));
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }

  validate () {
    let title = (<HTMLInputElement>this.shadowRoot.querySelector('#title')).value;
    const description = (<HTMLTextAreaElement>this.shadowRoot.querySelector('#description')).value;
    title = title.replace(/(^[\s]*)|([\s]*$)/g, '');
    if (title === '') {
      console.log('未填标题')
      return false;
    }
    return {title, description};
  }

  save () {
    const data = this.validate();
    if (!data) {
      return;
    }
    axios({
      method: 'post',
      url: '/t2/xucaiyun/albums',
      data: data
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => console.log(err));
  }
}