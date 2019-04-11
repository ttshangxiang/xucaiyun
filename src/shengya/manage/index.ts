
import { LitElement, html, customElement, property, query } from 'lit-element';
import '../edit';
import axios from '../../base/axios';
import { ShengyaEdit7, shengya, stageMap, typeMap } from '../edit';
import '../../components/pager';
import { Pager7 } from '../../components/pager';
import '../../components/avatar';


const styles = require('./style').toString();

@customElement('shengyaa-7')
export class Shengyaa7 extends LitElement {

  @property({type: Object}) list: shengya[] = [];
  @property({type: Number}) total = 0;
  @query('#pager') $pager: Pager7;
  @query('#message') $message: HTMLTextAreaElement;

  @property({type: Object}) current = {};
  @query('#shengya-edit') $shengyaEdit: ShengyaEdit7;
  
  @query('#filter-type') $filterType: HTMLSelectElement;
  @query('#filter-stage') $filterStage: HTMLSelectElement;

  // 常量
  pagesize = 20;
  page = 1;

  async firstUpdated () {
    await this.reloadData();
  }

  async loadData (page = 1) {
    this.page = page;
    const params: any = {
      offset: (page - 1) * this.pagesize,
      count: this.pagesize,
      'order.order': -1
    };
    if (this.$filterType.value !== '') {
      params.type = this.$filterType.value;
    }
    if (this.$filterStage.value !== '') {
      params.stage = this.$filterStage.value;
    }
    return await axios({
      method: 'get',
      url: '/shengya',
      params: params
    }).then(res => {
      const { data = {} } = res;
      if (data.code === 0) {
        return data.data;
      } else {
        throw Error(data.msg);
      }
    });
  }

  async reloadData (page = 1) {
    const data = await this.loadData(page)
    this.total = data.total;
    this.list = data.data;
  }

  async changePage (e: CustomEvent) {
    const newpage = e.detail.message;
    await this.reloadData(newpage);
    this.$pager.setAttribute('current', newpage);
  }

  // 添加一个生涯
  addShengya () {
    this.current = {};
    this.$shengyaEdit.show();
  }

  eidtThis (item: shengya) {
    this.current = item;
    this.$shengyaEdit.show();
  }

  updateAfter () {
    this.reloadData();
  }

  render () {
    return html `
      <style>${styles}</style>
      <div class="shengya">
        <div class="tool-top">
          <a href="javascript:;" class="tool-btn" @click=${this.addShengya}>
            <i class="material-icons">add</i>
            <span>添加</span>
          </a>
        </div>
        <div class="filter">
          <div class="filter-item">
            <select id="filter-type" @change=${() => this.reloadData()}>
              <option value="">所有类型</option>
              ${Object.entries(typeMap).map(t => html `
                <option value=${t[0]}>${t[1]}</option>
              `)}
            </select>
          </div>
          <div class="filter-item">
            <select id="filter-stage" @change=${() => this.reloadData()}>
              <option value="">所有状态</option>
              ${Object.entries(stageMap).map(t => html `
                <option value=${t[0]}>${t[1]}</option>
              `)}
            </select>
          </div>
        </div>
        <div class="sy-list">
          ${this.list.map(item => html `
            <div class="sy-item" @click=${() => this.eidtThis(item)}>
              <div class="item-spacing">
                <div class="text-area">
                  <div class="name">
                    ${item.name}
                    <span class="stage">${(<any>stageMap)[item.stage]}</span>
                  </div>
                  <div class="type">${(<any>typeMap)[item.type] + (item.subType ? ' - ' + item.subType : '')}</div>
                  ${item.progress ? html `<div class="progress">进度：${item.progress}</div>` : ''}
                  <div class="description">${item.description}</div>
                </div>
                ${item.avatar ? html `
                  <div class="avatar-area">
                    <avatar-7 src=${item.avatar}></avatar-7>
                  </div>
                ` : ''}
              </div>
            </div>
          `)}
        </div>
        <pager-7 id="pager" current="1"
          total="${this.total}"
          pagesize="${this.pagesize}"
          @change=${this.changePage}
          style="padding: 12px 0;"></pager-7>
      </div>
      <shengya-edit-7 id="shengya-edit" .current=${this.current} @updateafter=${this.updateAfter}></shengya-edit-7>
    `
  }
}
