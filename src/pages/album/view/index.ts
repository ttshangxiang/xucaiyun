import { LitElement, html, customElement, css, unsafeCSS, property, query } from "lit-element";
import axios from 'axios'
import { MDCList } from '@material/list'
import { MDCRipple } from '@material/ripple'
import page from 'page'
const styles = require('./style')
interface res {
  _id: string;
  path: string;
  filename: string;
  description: string;
  thumb: string;
  width: number;
  height: number;
  normal?: number;
}

@customElement('album-view-7')
export default class albumView7 extends LitElement {
  static tagName = 'albumView7'

  @property({ type: Array }) list: res[] = [];
  @property({ type: Number }) total = 0;
  @property({ type: String }) albumId = '';
  @property({type: Object}) ctx: PageJS.Context;
  @property({type: Object}) imgDetailItem: any = null;

  @query('#img-detail') imgDetail: HTMLDivElement;

  static get styles() {
    return css`
      ${unsafeCSS(styles) }
    `
  }

  // 常量
  pagesize = 16;
  pagenum = 1;
  mdcList: MDCList;

  async firstUpdated() {
    this.albumId = this.ctx.params.id;
    this.changePage(this.getCurrentPage());
  }

  connectedCallback () {
    super.connectedCallback()
    const cpage = this.getCurrentPage()
    if (this.ctx.params.id !== this.albumId || cpage != this.pagenum) {
      this.albumId = this.ctx.params.id;
      this.changePage(cpage);
    }
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

  async loadRes(page = 1) {
    this.pagenum = page
    const params: any = {
      offset: (page - 1) * this.pagesize,
      count: this.pagesize,
      groups: 'includes.' + this.albumId
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
    const data = await this.loadRes(page) || [];
    this.list = data.data;
    this.total = data.total;
  }

  async changePage(newpage: number) {
    page('/album/' + this.albumId + '?p=' + newpage);
    this.shadowRoot.querySelectorAll('pager-7').forEach(o => {
      o.setAttribute('current', newpage + '');
    });
    this.list = [];
    await this.reloadRes(newpage);
  }

  enterImg(item: res, e: any) {
    this.imgDetailItem = item;
  }

  render() {
    return html`
    <div class="album-view7">
      <ul class="mdc-image-list mdc-image-list--masonry my-masonry-image-list">
        ${this.list.map((item: res, index: number) => html`
          <li class="mdc-image-list__item">
            <img class="mdc-image-list__image" src=${item.thumb} @click=${(e: any) => this.enterImg(item, e)}>
            ${item.description ? html `
              <div class="mdc-image-list__supporting">
                <span class="mdc-image-list__label">${item.description}</span>
              </div>
            ` : ''}
          </li>
        `) }
      </ul>
      <pager-7 id="pager" current="1"
        total="${this.total }"
        pagesize="${this.pagesize }"
        @change=${(e: CustomEvent) => this.changePage(e.detail.message) }
        style="padding: 12px 0;"></pager-7>
      ${this.imgDetailItem ? html `
        <div class="img-detail" id="img-detail">
          <img src=${this.imgDetailItem.normal} alt="">
          <div class="img-detail-buttons">
            <a href=${this.imgDetailItem.path} target="_blank">原图</a>
            <button class="mdc-icon-button material-icons" @click=${() => {this.imgDetailItem = null}}>close</button>
          </div>
        </div>
      `: ''}
    </div>
    `
  }
}