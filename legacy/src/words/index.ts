
import { LitElement, html, customElement, property } from 'lit-element';
import axios from '../base/axios';
import { file } from '../res/interface';
import '../components/pager';

const styles = require('./style').toString();

@customElement('words-7')
export class Words extends LitElement {
  @property ({type: Array}) list: file[] = [];
  @property ({type: Number}) total = 0;
  @property ({type: String}) wordsId = '';
  @property ({type: Object}) selectOne: file = null;

  // 常量
  pagesize = 7;

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
    const list = await this.loadWords();
    if (list.length > 0) {
      this.wordsId = list[0]._id;
      await this.reloadRes();
    }
  }

  async loadWords () {
    return await axios({
      method: 'get',
      url: '/words'
    }).then(res => {
      const { data = {} } = res;
      if (data.code === 0) {
        return data.data;
      } else {
        throw Error(data.msg);
      }
    });
  }

  async loadRes (page = 1) {
    const params: any = {
      offset: (page - 1) * this.pagesize,
      count: this.pagesize,
      groups: 'includes.' + this.wordsId
    };
    return await axios({
      method: 'get',
      url: '/res',
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

  async reloadRes (page = 1) {
    const data = await this.loadRes(page);
    this.list = data.data || [];
    this.total = data.total;
  }

  async changePage (e: CustomEvent) {
    const newpage = e.detail.message;
    await this.reloadRes(newpage);
    this.shadowRoot.querySelectorAll('pager-7').forEach(o => {
      o.setAttribute('current', newpage);
    });
  }

  // 不使用router，自己控制页面展示，为了返回时还是原来的状态
  enterWord (item: file) {
    window.history.pushState(null, '', '/words/' + item._id);
    this.selectOne = item;
  }

  // 自己控制返回键
  closeDetail (e: any) {
    this.selectOne = null;
  }

  render () {
    return html `
      <style>${styles}</style>
      ${this.selectOne ? html `
        <page-7 .current=${this.selectOne}></page-7>
      ` : html `
        <div class="words7">
          <ul class="word-list">
            ${this.list.map((item: file, index: number) => html `
              <li class="word-item">
                <a href="javascript:;" @click=${() => this.enterWord(item)}>${item.filename}</a>
              </li>
            `)}
          </ul>
          <pager-7 id="pager" current="1"
            total="${this.total}"
            pagesize="${this.pagesize}"
            @change=${this.changePage}
            style="padding: 12px 0;"></pager-7>
        </div>
      `}
    `
  }
}
