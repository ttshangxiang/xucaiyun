import { LitElement, html, customElement, css, unsafeCSS, property } from "lit-element";
import axios from 'axios'
import { MDCList } from '@material/list'
import { MDCRipple } from '@material/ripple'
import page from 'page'
const styles = require('./style')
interface res {
  _id: string;
  path: string;
  filename: string;
  discription: string;
}

@customElement('words-7')
export default class Words7 extends LitElement {

  @property({ type: Array }) list: res[] = [];
  @property({ type: Number }) total = 0;
  @property({ type: String }) wordsId = '';
  @property({type: Object}) ctx: PageJS.Context

  static get styles() {
    return css`
      ${unsafeCSS(styles) }
    `
  }

  // 常量
  pagesize = 7;
  pagenum = 1;
  mdcList: MDCList;

  async firstUpdated() {
    const list = await this.loadWords();
    if (list.length > 0) {
      this.wordsId = list[0]._id;
      this.changePage(this.getCurrentPage());
    }
  }

  connectedCallback () {
    super.connectedCallback()
    const cpage = this.getCurrentPage()
    if (this.wordsId && cpage != this.pagenum) {
      this.changePage(cpage);
    }
  }

  updated () {
    if (!this.mdcList) {
      this.mdcList = new MDCList(this.shadowRoot.querySelector('.mdc-list'))
    }
    this.mdcList.listElements.map((listItemEl) => new MDCRipple(listItemEl))
  }

  getCurrentPage () {
    const arr = this.ctx.querystring.split('&')
    let page = 1
    arr.forEach(item => {
      const s: string[] = item.split('=')
      if (s[0] == 'p' && s[1]) {
        page = +s[1];
      }
    })
    return page
  }

  async loadWords() {
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

  async loadRes(page = 1) {
    this.pagenum = page
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

  async reloadRes(page = 1) {
    const data = await this.loadRes(page);
    this.list = data.data || [];
    this.total = data.total;
  }

  async changePage(newpage: number) {
    page('/words?p=' + newpage);
    this.shadowRoot.querySelectorAll('pager-7').forEach(o => {
      o.setAttribute('current', newpage + '');
    });
    await this.reloadRes(newpage);
  }

  enterWord(item: res) {
    page('/words/' + item._id)
  }

  render() {
    return html`
    <div class="words7">
      <ul class="mdc-list mdc-list--two-line">
      ${this.list.map((item: res, index: number) => html`
        <li class="mdc-list-item" tabindex="0" @click=${() => this.enterWord(item)}>
          <span class="mdc-list-item__text">
            <span class="mdc-list-item__primary-text">${item.filename }</span>
            <span class="mdc-list-item__secondary-text">${item.discription}</span>
          </span>
        </li>
      `) }
      </ul>
      <pager-7 id="pager" current="1"
        total="${this.total }"
        pagesize="${this.pagesize }"
        @change=${(e: CustomEvent) => this.changePage(e.detail.message) }
        style="padding: 12px 0;"></pager-7>
    </div>
    `
  }
}