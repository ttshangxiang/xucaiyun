
import { LitElement, html, customElement, property, query } from 'lit-element';
import '../../components/dialog';
import { Dialog7 } from '../../components/dialog';
import axios from '../../base/axios';
import { group } from '../interface';

const styles = require('./style').toString();

@customElement('group-edit-7')
export class GroupEdit7 extends LitElement {

  @query('#dialog') dialog: Dialog7;
  @property({type: Object}) current: group = null;
  @property({type: Object}) showData: any = {};

  @query('#group-name') $groupName: HTMLInputElement;
  @query('#group-type') $groupType: HTMLSelectElement;
  @query('#group-description') $groupDescription: HTMLTextAreaElement;

  getParam () {
    const param: any = {};
    if (this.$groupName.value !== '') {
      param.name = this.$groupName.value;
    }
    if (this.$groupType.value !== '') {
      param.type = this.$groupType.value
    }
    if (this.$groupDescription.value !== '') {
      param.description = this.$groupDescription.value
    }
    const radio = <any>(this.shadowRoot.querySelectorAll('input[name=ishidden]'))
    radio.forEach((item: HTMLInputElement) => {
      if (item.checked) {
        param.status = +item.value;
      }
    });
    return param;
  }

  async done () {
    const param = this.getParam();
    let message = 'add';
    if (!this.current || !this.current._id) {
      // 新建
      await axios({
        method: 'post',
        url: '/resgroup',
        data: param
      });
    } else {
      message = 'update';
      // 修改
      await axios({
        method: 'put',
        url: '/resgroup/' + this.current._id,
        data: param
      });
    }
    let myEvent = new CustomEvent('updateafter', {
      detail: { message: message },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
    this.close();
  }

  async delete () {
    if (!this.current || !this.current._id) {
      return;
    }
    await axios({
      method: 'delete',
      url: '/resgroup/' + this.current._id
    });
    this.close();
  }

  show () {
    this.dialog.show();
    this.showData = this.current || {};
  }

  close () {
    this.dialog.close();
  }
  
  afterClose () {
    this.showData = {};
  }

  change (e: any, key: ('name' | 'description' | 'type' | 'status')) {
    let value = e.target.value;
    if (key === 'status') {
      value = +value;
    }
    if (this.current) {
      this.current[key] = value;
    }
  }

  render () {
    const { type, _id, name, description, status } = this.showData;
    return html `
      <style>${styles}</style>
      <dialog-7 id="dialog" header="${_id ? '修改分组信息-' + name : '新增分组'}" @done=${this.done} @close=${this.afterClose}>
        <div class="group-details">
          <label class="group-item">
            <span class="name">名称</span>
            <input type="text" @change=${(e: any) => this.change(e, 'name')} id="group-name" .value="${name || ''}"/>
          </label>
          <label class="group-item">
            <span class="name">类型</span>
            <select id="group-type" @change=${(e: any) => this.change(e, 'type')} .value="${type}">
              <option value="">无</option>
              <option value="albums">相册</option>
              <option value="words">文章</option>
              <option value="files">文件</option>
            </select>
          </label>
          <label class="group-item">
            <span class="name">说明</span>
            <textarea id="group-description" @change=${(e: any) => this.change(e, 'description')} .value="${description || ''}"></textarea>
          </label>
          <label class="group-item">
            <span class="name">是否展示</span>
            <label class="radio-label">
              <span>是</span><input type="radio" name="ishidden" value="1" .checked="${status == '1'}"
                @change=${(e: any) => this.change(e, 'status')}>
            </label>
            <label class="radio-label">
              <span>否</span><input type="radio" name="ishidden" value="0" .checked="${status != '1'}"
                @change=${(e: any) => this.change(e, 'status')}>
            </label>
          </label>
        </div>
      </dialog-7>
    `
  }
}
