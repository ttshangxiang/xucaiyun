
import { LitElement, html, customElement, property, query } from 'lit-element';
import '../../components/dialog';
import { Dialog7 } from '../../components/dialog';
import axios from '../../base/axios';

const styles = require('./style').toString();

export const typeMap = {
  'life': '生活',
  'video': '影视',
  'game': '游戏',
  'read': '阅读'
}

export const stageMap = {
  'doing': '进行中',
  'finished': '已结束',
  'nostart': '未开始'
}

export interface shengya {
  _id?: string
  name: string
  description: string
  type: string
  subType: string
  status: number
  ctime?: string
  utime?: string
  stage: string
  link: string
  order: number
  progress: string
  avatar: string
}

type inKeys = '_id' | 'name' | 'description' | 'type' | 'subType' | 'status' | 'stage' | 'link' | 'order' | 'progress' | 'avatar';
const keys = ['_id', 'name', 'description', 'type', 'subType', 'status', 'stage', 'link', 'order', 'progress', 'avatar'];

@customElement('shengya-edit-7')
export class ShengyaEdit7 extends LitElement {

  @query('#dialog') dialog: Dialog7;
  @property({type: Object}) showData: any = {};

  @property({type: String}) _id = '';
  @property({type: String}) name = '';
  @property({type: String}) description = '';
  @property({type: String}) type = '';
  @property({type: String}) subType = '';
  @property({type: Number}) status = 0;
  @property({type: String}) stage = '';
  @property({type: String}) link = '';
  @property({type: Number}) order = 0;
  @property({type: String}) progress = '';
  @property({type: String}) avatar = '';

  static get properties() {
    return {
      current: { type: Object }
    };
  }
  _current: shengya = null;
  set current (value) {
    keys.forEach((item: inKeys) => {
      let v;
      value && (v = value[item]);
      if (v === undefined) {
        if (item === 'status') {
          v = 1;
        } else {
          v = '';
        }
      }
      this[item] = v;
    });
    this._current = value;
  }

  get current () {
    return this._current;
  }

  getParam () {
    const param: any = {};
    keys.forEach((item: inKeys) => {
      if (item === '_id') {
        return;
      }
      param[item] = this[item];
    });
    if (!param.order) {
      param.order = new Date().getTime();
    }
    if (param.name === '') {
      return false;
    }
    return param;
  }

  async done () {
    const param = this.getParam();
    if (!param) {
      alert('名称都没输');
      return;
    }
    let message = 'add';
    if (!this.current || !this.current._id) {
      // 新建
      await axios({
        method: 'post',
        url: '/shengya',
        data: param
      });
    } else {
      message = 'update';
      // 修改
      await axios({
        method: 'put',
        url: '/shengya/' + this.current._id,
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
      url: '/shengya/' + this.current._id
    });
    this.close();
  }

  show () {
    this.dialog.show();
  }

  close () {
    this.dialog.close();
  }
  
  afterClose () {
    this.current = this._current;
  }

  change (e: any, key: inKeys) {
    let value = e.target.value;
    if (key === 'status' || key === 'order') {
      value = +value;
    }
    this[key] = value;
  }

  render () {
    return html `
      <style>${styles}</style>
      <dialog-7 id="dialog" text="${this._id ? '修改生涯信息-' + this.name : '新增生涯'}" @done=${this.done} @close=${this.afterClose}>
        <div class="group-details">
          <label class="group-item">
            <span class="name">名称</span>
              <input type="text" @change=${(e: any) => this.change(e, 'name')} .value=${this.name} />
          </label>
          <label class="group-item">
            <span class="name">类型</span>
            <select @change=${(e: any) => this.change(e, 'type')} .value="${this.type}">
              <option value="">无</option>
              ${Object.entries(typeMap).map(t => html `
                <option value=${t[0]}>${t[1]}</option>
              `)}
            </select>
          </label>
          <label class="group-item">
            <span class="name">子类型</span>
            <input type="text" @change=${(e: any) => this.change(e, 'subType')} .value=${this.subType} />
          </label>
          <label class="group-item">
            <span class="name">状态</span>
            <select @change=${(e: any) => this.change(e, 'stage')} .value="${this.stage}">
              <option value="">无</option>
              ${Object.entries(stageMap).map(t => html `
                <option value=${t[0]}>${t[1]}</option>
              `)}
            </select>
          </label>
          <label class="group-item">
            <span class="name">说明</span>
            <textarea @change=${(e: any) => this.change(e, 'description')} .value=${this.description}></textarea>
          </label>
          <label class="group-item">
            <span class="name">进度</span>
            <input type="text" @change=${(e: any) => this.change(e, 'progress')} .value=${this.progress} />
          </label>
          <label class="group-item">
            <span class="name">图片</span>
            <input type="text" @change=${(e: any) => this.change(e, 'avatar')} .value=${this.avatar} />
          </label>
          <label class="group-item">
            <span class="name">外链</span>
            <input type="text" @change=${(e: any) => this.change(e, 'link')} .value=${this.link} />
          </label>
          <label class="group-item">
            <span class="name">排序</span>
            <input type="text" @change=${(e: any) => this.change(e, 'order')} .value=${this.order} />
          </label>
          <label class="group-item">
            <span class="name">是否展示</span>
            <label class="radio-label">
              <span>是</span><input type="radio" name="ishidden" value="1" .checked=${this.status === 1}
                @change=${(e: any) => this.change(e, 'status')}>
            </label>
            <label class="radio-label">
              <span>否</span><input type="radio" name="ishidden" value="0" .checked=${this.status !== 1}
                @change=${(e: any) => this.change(e, 'status')}>
            </label>
          </label>
        </div>
      </dialog-7>
    `
  }
}
