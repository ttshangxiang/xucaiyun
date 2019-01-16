
import { LitElement, html, property, customElement } from 'lit-element';
import {MDCRipple} from '@material/ripple/index';
import { Router } from '../base/router';
import axios from '../base/axios';
import { getIns, setState, getState } from '../base/c';

const style = require('./style').toString();

interface album {
  ctime: string
  description: string
  status: number
  title: string
  utime: string
  _id: string
}

interface photo {
  albumId: string
  ctime: string
  description: string
  filename: string
  normal: string
  origin: string
  status: number
  thumb: string
  utime: string
  _id: string
}

@customElement('xcy-albums')
export class Albums extends LitElement {

  @property ({type: Array}) list: album[] = []
  @property ({type: String}) error = '';
  @property ({type: Boolean}) pedding = false;

  render () {
    if (this.pedding) {
      getIns('linear-progress').setAttribute('show', 'true');
      return html ``;
    }
    getIns('linear-progress').removeAttribute('show');
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
                  <img class="mdc-image-list__image" src="/assets/imgs/albums/1.jpg">
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
      this.pedding = true;
      this.list = await this.loadAlbums();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.pedding = false;
    }
  }

  updated () {
    const fab = this.shadowRoot.querySelector('.mdc-fab');
    fab && new MDCRipple(fab);
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
    if (getState('albums')) {
      return getState('albums');
    }
    return axios({
      url: '/albums'
    })
    .then(res => {
      const { data = {} } = res;
      if (data.code === 0) {
        const result = data.data.data || [];
        setState('albums', result);
        return result;
      } else {
        throw Error(data.msg);
      }
    })
  }
}

@customElement('xcy-album')
export class Album extends LitElement {
  @property ({type: Array}) list: photo[] = []
  @property ({type: String}) error = '';
  @property ({type: Boolean}) pedding = false;

  constructor () {
    super();
  }
  render () {
    if (this.pedding) {
      getIns('linear-progress').setAttribute('show', 'true');
      return html ``;
    }
    getIns('linear-progress').removeAttribute('show');
    return html `
      ${this.myStyles}
      <div style="padding: 8px; position: relative;">
        ${this.error ? 
        html `
          ${this.error}
        ` :
        html `
          <ul class="mdc-image-list mdc-image-list--masonry my-masonry-image-list">
            ${this.list.map((o, i) => {
              return html `
                <li class="mdc-image-list__item" @click=${() => this.enterPhoto(o)}>
                  <img class="mdc-image-list__image" src="${o.thumb}">
                  <div class="mdc-image-list__supporting">
                    <span class="mdc-image-list__label">${o.description}</span>
                  </div>
                </li>
              `;
            })}
          </ul>
        `}
      </div>
      <a class="mdc-fab app-fab--absolute" href="javascript:;" aria-label="Add" @click="${this.enterAddPhoto}">
        <span class="mdc-fab__icon material-icons">add</span>
      </a>
    `;
  }

  async firstUpdated () {
    try {
      this.pedding = true;
      this.list = await this.loadPhotos();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.pedding = false;
    }
  }

  /**进入照片 */
  enterPhoto (o: photo) {
    const {albumId} = Router.params;
    const key = 'photo-' + o._id;
    setState(key, o);
    Router.push(`/albums/${albumId}/${o._id}`);
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }

  /**
   * 进入上传图片
   */
  enterAddPhoto () {
    const {albumId} = Router.params;
    Router.push(`/albums/${albumId}/add`);
  }

  /**
   * 读取图片
   */
  async loadPhotos () {
    const { albumId } = Router.params;
    const key = 'photos-' + albumId;
    const cache = getState(key);
    if (cache) {
      return cache;
    }
    return axios({
      url: `/photos?albumId=${albumId}`
    })
    .then(res => {
      const { data = {} } = res;
      if (data.code === 0) {
        const result = data.data.data || [];
        setState(key, result);
        return result;
      } else {
        throw Error(data.msg);
      }
    })
  }
}

@customElement('xcy-photo')
export class Photo extends LitElement {
  @property ({type: Object}) data: photo = null;
  @property ({type: String}) error = '';
  @property ({type: Boolean}) pedding = false;
  constructor () {
    super();
  }
  render () {
    return html `
      ${this.myStyles}
      ${this.data ? html`
        <div style="padding: 8px; position: relative;">
          <ul class="mdc-image-list my-mdc-image-detail">
            <li class="mdc-image-list__item">
              <img class="mdc-image-list__image" src="${this.data.normal}">
              <div class="mdc-image-list__supporting">
                <span class="mdc-image-list__label">${this.data.description}</span>
              </div>
            </li>
          </ul>
        </div>
      ` : ``}
    `;
  }

  async firstUpdated () {
    try {
      this.pedding = true;
      this.data = await this.loadPhoto();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.pedding = false;
    }
  }

  loadPhoto () {
    const { photoId } = Router.params;
    const key = 'photo-' + photoId;
    const cache = getState(key);
    if (cache) {
      return cache;
    }
    return axios({
      url: `/photos/${photoId}`
    })
    .then(res => {
      const { data = {} } = res;
      if (data.code === 0) {
        const result = data.data || {};
        setState(key, result);
        return result;
      } else {
        throw Error(data.msg);
      }
    })
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }
}
