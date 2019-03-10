
import { LitElement, html, customElement, property, query } from 'lit-element';
import '../../components/dialog';
import axios from '../../base/axios';

const styles = require('./style').toString();

@customElement('group-edit-7')
export class GroupEdit7 extends LitElement {

  @query('#dialog') dialog: any;
  @property({type: Object}) current: any = {};

  @query('#group-name') $groupName: any;
  @query('#group-type') $groupType: any;
  @query('#group-description') $groupDescription: any;

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
    radio.forEach((item: any) => {
      if (item.checked) {
        param.status = +item.value;
      }
    });
    return param;
  }

  async done () {
    const param = this.getParam();
    let message = 'add';
    if (!this.current._id) {
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
    await axios({
      method: 'delete',
      url: '/resgroup/' + this.current._id
    });
    this.close();
  }

  show () {
    this.dialog.show();
  }

  close () {
    this.dialog.close();
  }

  render () {
    const { type, _id, name, description, status } = this.current;
    return html `
      <style>${styles}</style>
      <dialog-7 id="dialog" title="${_id ? '修改分组信息-' + name : '新增分组'}" @done=${this.done}>
        <div class="group-details">
          <label class="group-item">
            <span class="name">名称</span>
            <input type="text" id="group-name" value="${this.current.name || ''}"/>
          </label>
          <label class="group-item">
            <span class="name">类型</span>
            <select id="group-type">
              <option value="">无</option>
              <option value="albums" ?selected="${type === 'albums'}">相册</option>
              <option value="words" ?selected="${type === 'words'}">文章</option>
              <option value="files" ?selected="${type === 'files'}">文件</option>
            </select>
          </label>
          <label class="group-item">
            <span class="name">说明</span>
            <textarea id="group-description">${description}</textarea>
          </label>
          <label class="group-item">
            <span class="name">是否展示</span>
            <label class="radio-label">
              <span>是</span><input type="radio" name="ishidden" value="1" ?checked="${status === 1}">
            </label>
            <label class="radio-label">
              <span>否</span><input type="radio" name="ishidden" value="0" ?checked="${status === undefined || status === 0}">
            </label>
          </label>
        </div>
      </dialog-7>
    `
  }
}
