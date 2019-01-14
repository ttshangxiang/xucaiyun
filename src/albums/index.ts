
import { LitElement, html, property, customElement } from '@polymer/lit-element';
import {MDCRipple} from '@material/ripple/index';
import { Router } from '../base/router';
import axios from '../base/axios';

const style = require('./style').toString();

@customElement('xcy-albums')
export class Albums extends LitElement {

  list: string[] | Error;
  constructor () {
    super();
  }
  render () {
    const data = [];
    let i = 1;
    while (i <= 15) {
      data.push(`/assets/imgs/albums/${i}.jpg`);
      i++;
    }
    return html `
      ${this.myStyles}
      <div style="padding: 8px; position: relative;">
        <ul class="mdc-image-list my-image-list mdc-image-list--with-text-protection">
          ${data.map((o, i) => html `
            <li class="mdc-image-list__item" @click=${() => this.enterAlbum(i + 1)}>
              <div class="mdc-image-list__image-aspect-container">
                <img class="mdc-image-list__image" src="${o}">
              </div>
              <div class="mdc-image-list__supporting">
                <span class="mdc-image-list__label">Text label</span>
              </div>
            </li>
          `)}
        </ul>
      </div>
      <a class="mdc-fab app-fab--absolute" href="javascript:;" aria-label="Add" @click="${this.enterAddAlbum}">
        <span class="mdc-fab__icon material-icons">add</span>
      </a>
    `;
  }

  async initialize () {
    try {
      console.log(await this.loadAlbums());
    } catch (error) {
      console.log(error);
    }
  }

  updated () {
    new MDCRipple(this.shadowRoot.querySelector('.mdc-fab'));
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }

  /**
   * 进入相册
   * @param i id
   */
  enterAlbum (i: any) {
    Router.push(`/albums/${i}`);
  }

  /**
   * 进入新增相册页面
   */
  enterAddAlbum () {
    Router.push(`/albums/add`);
  }

  /**
   * 加载相册
   */
  async loadAlbums () {
    return axios({
      url: '/albumss'
    })
    // .then(response => {
    //   console.log(response)
    // })
    .catch(err => {
      throw err;
    });
  }
}

@customElement('xcy-album')
export class Album extends LitElement {

  constructor () {
    super();
  }
  render () {
    const data = [];
    let i = 1;
    while (i <= 15) {
      data.push(`/assets/imgs/photos/${i}.jpg`);
      i++;
    }
    return html `
      ${this.myStyles}
      <div style="padding: 8px; position: relative;">
        <ul class="mdc-image-list mdc-image-list--masonry my-masonry-image-list">
          ${data.map((o, i) => {
            return html `
              <li class="mdc-image-list__item" @click=${() => this.enterPhoto(i + 1)}>
                <img class="mdc-image-list__image" src="${o}">
                <div class="mdc-image-list__supporting">
                  <span class="mdc-image-list__label">Text label</span>
                </div>
              </li>
            `;
          })}
        </ul>
      </div>
    `;
  }

  /**进入照片 */
  enterPhoto (i: any) {
    const {albumId} = Router.params;
    Router.push(`/albums/${albumId}/${i}`);
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }
}

@customElement('xcy-photo')
export class Photo extends LitElement {

  constructor () {
    super();
  }
  render () {
    const {photoId} = Router.params;
    const src = `/assets/imgs/photos/${photoId}.jpg`;
    return html `
      ${this.myStyles}
      <div style="padding: 8px; position: relative;">
        <ul class="mdc-image-list my-mdc-image-detail">
          <li class="mdc-image-list__item">
            <img class="mdc-image-list__image" src="${src}">
            <div class="mdc-image-list__supporting">
              <span class="mdc-image-list__label">Text label</span>
            </div>
          </li>
        </ul>
      </div>
    `;
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }
}
