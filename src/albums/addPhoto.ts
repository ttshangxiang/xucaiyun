
import { LitElement, html, property, customElement, query } from 'lit-element';
import { MDCTextField } from '@material/textfield/index';
import { MDCRipple } from '@material/ripple/index';
import axios from '../base/axios';
import { getIns, setState } from '../base/c';
import { Router } from '../base/router';
import './preview';

const style = require('./addPhoto.scss').toString();

interface photo {
  base64: string
  filename: string,
  description?: string,
  file: File,
  percent?: number
  pedding: boolean
}

@customElement('xcy-photo-add')
export class AddPhoto extends LitElement {
  @property ({type: Array}) list: photo[] = [];

  @query('xcy-photo-preview') preview: HTMLElement;
  @query('#file-input') fileInput: HTMLInputElement;
  render () {
    return html `
      ${this.myStyles}
      <div class="button-group">
        <a href="javascript:;" class="mdc-fab mdc-fab--extended upload-btn">
          <span class="material-icons mdc-fab__icon">add</span>
          <span class="mdc-fab__label">添加</span>
          <input type="file" id="file-input" multiple="multiple" @change=${this.loadFiles}>
        </a>
        <a href="javascript:;" class="mdc-fab mdc-fab--extended" @click=${this.upload}>
          <span class="material-icons mdc-fab__icon">backup</span>
          <span class="mdc-fab__label">执行上传</span>
        </a>
      </div>
      <ul class="mdc-image-list my-image-list mdc-image-list--with-text-protection">
        ${this.list.map((o, i) => html `
          <li class="mdc-image-list__item">
            <div class="mdc-image-list__image-aspect-container" @click=${() => this.showPreview(o)}>
              <img class="mdc-image-list__image" src="${o.base64}">
            </div>
            <div class="mdc-image-list__supporting">
              <span class="mdc-image-list__label" title=${o.filename}>${o.filename}</span>
            </div>
            <div style="height: 56px; overflow: hidden;">
              <div class="mdc-text-field mdc-text-field--fullwidth mdc-text-field--with-trailing-icon">
                <input class="mdc-text-field__input"
                  type="text"
                  autocomplete="off"
                  placeholder="描述"
                  aria-label="描述" @change=${(e: Event) => this.changeDescription(e, o)}>
              </div>
            </div>
            <!-- 进度 -->
            ${o.percent ? html`
              <div class="percent-progress" style="width:${o.percent}%;"></div>
              <div class="percent-text">${o.percent}%</div>
            ` : ''}
            <!-- 删除按钮，提交时不显示 -->
            ${!o.pedding ? html`
              <a class="mdc-icon-button material-icons update-delete" href="javascript:;" @click=${() => this.removePhoto(o)}>close</a>
            ` : ''}
          </li>
        `)}
      </ul>
      <xcy-photo-preview></xcy-photo-preview>
    `;
  }

  updated () {
    this.shadowRoot.querySelectorAll('.mdc-text-field').forEach(o => new MDCTextField(o));
    this.shadowRoot.querySelectorAll('.mdc-fab').forEach(o => new MDCRipple(o));
    this.shadowRoot.querySelectorAll('.mdc-icon-button').forEach(o => new MDCRipple(o).unbounded = true);
  }

  showPreview (photo: photo) {
    this.preview.setAttribute('src', photo.base64.toString());
    this.preview.setAttribute('show', null);
  }

  async loadFiles () {
    let imgList: photo[] = [];
    for (const f of this.fileInput.files) {
      if (f.type.slice(0, 5) !== 'image') {
        console.log('忽略'+f.name)
        continue;
      }
      try {
        const url = await this.loadDataURL(f);
        imgList.push({
          base64: url.toString(),
          filename: f.name,
          file: f,
          pedding: false
        });
      } catch (err) {
        console.log(err);
        continue;
      }
    }
    this.list = this.list.concat(imgList);
  }

  loadDataURL (file: File) {
    return new Promise ((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const target: any = e.target;
        resolve(target.result);
      }
      reader.onerror = (e) => {
        reject(e);
      }
      reader.readAsDataURL(file);
    });
  }

  changeDescription (e: Event, o: photo) {
    o.description = (<HTMLInputElement>e.target).value;
  }

  async upload () {
    for (const o of this.list) {
      if (o.percent === 100) {
        continue;
      }
      try {
        o.pedding = true;
        await this.uploadOne(o);
      } catch (error) {
        console.log(error);
      } finally {
        o.pedding = false;
        this.requestUpdate();
        const { albumId } = Router.params;
        const key = 'photos-' + albumId;
        // 清缓存
        setState(key, null);
      }
    }
  }

  async uploadOne (o: photo) {
    const formData = new FormData;
    formData.append('file', o.file);
    formData.append('description', o.description || '');
    formData.append('filename', o.filename);
    formData.append('albumId', Router.params.albumId);
    await axios({
      method: 'post',
      url: '/photos',
      data: formData,
      onUploadProgress: (e: ProgressEvent) => {
        o.percent = +(e.loaded / e.total * 100).toFixed(2);
        this.requestUpdate();
      }
    });
  }

  removePhoto (o: photo) {
    const index = this.list.indexOf(o);
    index > -1 && this.list.splice(index, 1);
    this.requestUpdate();
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }
}