
import { LitElement, html, property, customElement } from 'lit-element';
import { MDCTextField } from '@material/textfield/index';
import { MDCTextFieldHelperText } from '@material/textfield/helper-text';
import { MDCNotchedOutline } from '@material/notched-outline/index';
import { MDCRipple } from '@material/ripple/index';
import axios from '../base/axios';
import { getIns, setState } from '../base/c';
import { Router } from '../base/router';

const style = require('./addAlbum.scss').toString();

@customElement('xcy-album-add')
export class AddAlbum extends LitElement {
  @property ({type: Boolean}) pedding = false;

  render () {
    if (this.pedding) {
      getIns('linear-progress').setAttribute('show', 'true');
      return html ``;
    }
    getIns('linear-progress').removeAttribute('show');
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
          <a href="javascript:;" class="mdc-fab mdc-fab--extended" @click=${() => window.history.back()}>
            <span class="material-icons mdc-fab__icon">close</span>
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
    this.shadowRoot.querySelectorAll('.mdc-text-field-helper-text').forEach(o => new MDCTextFieldHelperText(o));
    this.shadowRoot.querySelectorAll('.mdc-notched-outline').forEach(o => new MDCNotchedOutline(o));
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

  async save () {
    const data = this.validate();
    if (!data) {
      return;
    }
    try {
      this.pedding = true;
      const code = await axios({
        method: 'post',
        url: '/albums',
        data: data
      })
      .then(response => {
        return response.data.code;
      })
      if (code === 0) {
        // 清除缓存
        setState('albums', null);
        Router.replace('/albums');
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.pedding = false;
    }
  }
}