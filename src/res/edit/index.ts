
import { LitElement, html, customElement, property, query } from 'lit-element';
import axios from '../../base/axios';
import { file } from '../interface';

const styles = require('./style').toString();

@customElement('res-edit-7')
export class ResEdit7 extends LitElement {

  @property ({type: Boolean, reflect: true}) show = false;
  @property ({type: Object}) file: file;
  @query('#f-description') Fdescription: HTMLTextAreaElement;
  @query('#f-group') Fgroup: HTMLSelectElement;

  closeEdit () {
    this.show = false;
  }

  changeFile (type: string) {
    let myEvent = new CustomEvent('change', {
      detail: { message: type },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
  }

  async saveChange () {
    if (!this.file._id) {
      alert('_id为空');
      return;
    }
    const data = {
      description: this.Fdescription.value
    }
    await axios({
      method: 'put',
      url: '/res/' + this.file._id,
      data: data
    }).catch(e => {
      console.log(e);
      alert(e.message);
    });
    this.closeEdit();
  }

  render () {
    return html `
      <style>${styles}</style>
      <div class="dialog-main" style="${this.show ? '': 'display: none;'}">
        <div class="dialog-scrim"></div>
        <div class="dialog-box">
          <div class="dialog-header">
            <span class="dialog-title">附件详情</span>
            <a href="javascript:;" class="material-icons dialog-btn" @click=${() => this.changeFile('prev')}>keyboard_arrow_left</a>
            <a href="javascript:;" class="material-icons dialog-btn" @click=${() => this.changeFile('next')}>keyboard_arrow_right</a>
            <a href="javascript:;" class="material-icons dialog-btn" style="font-size: 22px;" @click=${this.closeEdit}>close</a>
          </div>
          ${this.file ? html `
          <div class="dialog-content file-info">
            <div class="file-preview">
              <div class="file-img ${this.file.width < this.file.height ? 'vertical' : ''}">
                ${this.file.type && this.file.type.slice(0, 5) === 'image' ? html `
                  <img src="${this.file.normal || this.file.path}">
                ` : html `
                  <img src="/assets/imgs/commons/file.png" style="padding-top: 20px;">
                `}
              </div>
            </div>
            <div class="file-detail">
              <ul class="file-detail-readonly">
                <li class="file-detail-item">
                  <label>文件名</label>：<span>${this.file.filename}</span>
                </li>
                <li class="file-detail-item">
                  <label>文件类型</label>：<span>${this.file.type}</span>
                </li>
                <li class="file-detail-item">
                  <label>上传于</label>：<span>${this.file.ctime}</span>
                </li>
                <li class="file-detail-item">
                  <label>文件大小</label>：<span>${this.file.size}</span>
                </li>
                <li class="file-detail-item">
                  <label>修改日期</label>：<span>${this.file.utime}</span>
                </li>
                <li class="file-detail-item">
                  <label>文件地址</label>：<span>${this.file.path}</span>
                </li>
              </ul>
              <div class="file-detail-writeable">
                <label class="file-detail-item">
                  <span class="name">说明</span>
                  <textarea id="f-description">${this.file.description}</textarea>
                </label>
              </div>
            </div>
          </div>
          ` : ''}
          <div class="dialog-footer">
            <span class="dialog-footer-text"></span>
            <a href="${this.file && this.file.path ? this.file.path : 'javascript:;'}"
              target="_blank" download="${this.file && this.file.filename}"
              class="material-icons dialog-btn" style="font-size: 22px;">arrow_downward</a>
            <a href="javascript:;" class="material-icons dialog-btn" style="font-size: 22px;" @click=${this.closeEdit}>close</a>
            <a href="javascript:;" class="material-icons dialog-btn" style="width: 96px;" @click=${this.saveChange}>done</a>
          </div>
        </div>
      </div>
    `
  }
}