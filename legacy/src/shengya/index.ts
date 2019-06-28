import { LitElement, html, customElement, property, query } from 'lit-element';
const style = require('./style').toString();

import { shengya, stageMap, typeMap } from '../shengya/edit';

import axios from '../base/axios';
import '../components/pager';
import { Pager7 } from '../components/pager';
import '../components/avatar';
import Router from '../base/router';
import './page';

const stageFilter = [
  {text: '全部', value: ''},
  {text: stageMap['doing'], value: 'doing'},
  {text: stageMap['finished'], value: 'finished'},
  {text: stageMap['nostart'], value: 'nostart'}
]

const subTypeFilter = {
  game: [
    {text: '全部', value: ''},
    {text: '单机', value: '单机'},
    {text: '网游', value: '网游'},
    {text: '垃圾游戏', value: '垃圾游戏'}
  ],
  video: [
    {text: '全部', value: ''},
    {text: '动漫', value: '动漫'},
    {text: '国产', value: '国产'},
    {text: '日剧', value: '日剧'},
    {text: '韩剧', value: '韩剧'},
    {text: '游戏', value: '游戏'},
    {text: '垃圾', value: '垃圾'}
  ]
}

@customElement('shengya-7')
export class Shengya7 extends LitElement {

  @property({type: String}) selectType = 'life';
  @property({type: String}) selectStage = '';
  @property({type: String}) selectSubType = '';

  @property({type: Object}) selectOne: shengya = null;

  @property({type: Object}) list: shengya[] = [];
  @property({type: Number}) total = 0;
  @query('#pager') $pager: Pager7;
  @query('#message') $message: HTMLTextAreaElement;

  @property({type: Object}) current = {};

  // 常量
  pagesize = 20;
  page = 1;

  constructor () {
    super();
    // 用于监听/取消popstate
    this.closeDetail = this.closeDetail.bind(this);
    // 监听popstate
    window.addEventListener('popstate', this.closeDetail);
  }

  disconnectedCallback () {
    // 取消监听popstate
    window.removeEventListener('popstate', this.closeDetail);
  }

  async firstUpdated () {
    await this.reloadData();
  }

  async loadData (page = 1) {
    this.page = page;
    const params: any = {
      offset: (page - 1) * this.pagesize,
      count: this.pagesize,
      'order.order': -1,
      type: this.selectType,
      status: 1
    };
    if (this.selectStage) {
      params.stage = this.selectStage;
    }
    if (this.selectSubType) {
      params.subType = this.selectSubType;
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

  changeType (item: string) {
    this.selectType = item;
    this.selectStage = '';
    this.selectSubType = '';
    this.reloadData();
  }

  changeStage (value: string) {
    this.selectStage = value;
    this.reloadData();
  }

  changeSubtype (value: string) {
    this.selectSubType = value;
    this.reloadData();
  }

  // 不使用router，自己控制页面展示，为了返回时还是原来的状态
  enterShengya (item: shengya) {
    window.history.pushState(null, '', '/shengya/' + item._id);
    this.selectOne = item;
  }

  // 自己控制返回键
  closeDetail (e: any) {
    this.selectOne = null;
  }

  render () {
    const subTypeList = (<any>subTypeFilter)[this.selectType] || [];
    return html `
      ${this.myStyles}
      ${this.selectOne ? html `
      <shengyap-7 .current=${this.selectOne}></shengyap-7>
    ` : html `
      <div class="home">
        <div class="classes">
          ${['life', 'game', 'video', 'read'].map(item => html `
            <a href="javascript:;" class="class-item ${this.selectType === item ? 'active' : ''}"
              @click=${() => this.changeType(item)}>${(<any>typeMap)[item]}</a>
          `)}
        </div>
        <div class="filter">
          <div class="stage filter-unit">
            ${stageFilter.map(item => html `
              <a href="javascript:;" class="filter-item ${this.selectStage === item.value ? 'active' : ''}"
                @click=${() => this.changeStage(item.value)}>${item.text}</a>
            `)}
          </div>
          <div class="subtype filter-unit">
            ${subTypeList.map((item: any) => html `
              <a href="javascript:;" class="filter-item ${this.selectSubType === item.value ? 'active' : ''}"
                @click=${() => this.changeSubtype(item.value)}>${item.text}</a>
            `)}
          </div>
        </div>
        <div class="sy-list">
          ${this.list.map(item => html `
            <div class="sy-item" @click=${() => this.enterShengya(item)}>
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
    `}`;
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }
}