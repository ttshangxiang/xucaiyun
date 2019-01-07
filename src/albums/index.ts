
import { LitElement, html, property, customElement } from '@polymer/lit-element';
import {MDCRipple} from '@material/ripple/index';
import { Router } from '../base/router';

@customElement('c-albums')
export class Albums extends LitElement {

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
      <link rel="stylesheet" href="/albums/style.css">
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
      <button class="mdc-fab app-fab--absolute" aria-label="Add" @click="${this.enterAddAlbum}">
        <span class="mdc-fab__icon material-icons">add</span>
      </button>
    `;
  }

  /**进入相册 */
  enterAlbum (i: any) {
    Router.push(`/albums/${i}`);
  }

  /**新增相册 */
  enterAddAlbum () {
    Router.push(`/albums/add`);
  }

  updated () {
    new MDCRipple(this.shadowRoot.querySelector('.mdc-fab'));
  }
}

@customElement('c-album')
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
      <link rel="stylesheet" href="/albums/style.css">
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
}

@customElement('c-photo')
export class Photo extends LitElement {

  constructor () {
    super();
  }
  render () {
    const {photoId} = Router.params;
    const src = `/assets/imgs/photos/${photoId}.jpg`;
    return html `
      <link rel="stylesheet" href="/albums/style.css">
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
}
