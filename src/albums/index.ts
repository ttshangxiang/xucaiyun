
import { LitElement, html, property, customElement } from 'lit-element';
import {MDCRipple} from '@material/ripple/index';
import { Router } from '../base/router';
import axios from '../base/axios';
import { getIns } from '../base/c';

const style = require('./style').toString();

interface album {
  ctime: string
  description: string
  status: number
  title: string
  utime: string
  _id: string
}

@customElement('xcy-albums')
export class Albums extends LitElement {

  list: album[];
  error: string;
  pedding: boolean;
  constructor () {
    super();
    this.error = 'caaa'
    this.list = [];
    this.pedding = false;
  }
  render () {
    if (this.pedding) {
      // getIns('linear-progress').setAttribute('show', 'true');
      return html ``;
    }
    // getIns('linear-progress').setAttribute('show', 'false');
    return html `
      ${this.myStyles}
      <div style="padding: 8px; position: relative;">
        ${this.error ? 
        html `
          ${this.error}
        ` :
        html `
          <ul class="mdc-image-list my-image-list mdc-image-list--with-text-protection">
            ${this.list.map((o, i) => html `
              <li class="mdc-image-list__item" @click=${() => this.enterAlbum(o._id)}>
                <div class="mdc-image-list__image-aspect-container">
                  <img class="mdc-image-list__image" src="${o}">
                </div>
                <div class="mdc-image-list__supporting">
                  <span class="mdc-image-list__label">${o.title}</span>
                </div>
              </li>
            `)}
          </ul>
        `}
      </div>
      <a class="mdc-fab app-fab--absolute" href="javascript:;" aria-label="Add" @click="${this.enterAddAlbum}">
        <span class="mdc-fab__icon material-icons">add</span>
      </a>
    `;
  }

  async firstUpdated () {
    try {
      this.list = await this.loadAlbums();
    } catch (err) {
      this.error = err.message;
    }
  }

  updated () {
    // new MDCRipple(this.shadowRoot.querySelector('.mdc-fab'));
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
      url: '/albums'
    })
    .then(res => {
      const { data = {} } = res;
      if (data.code === 0) {
        return data.data || [];
      } else {
        throw Error(data.msg);
      }
    })
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
