
import { LitElement, html, customElement, property, query } from 'lit-element';
import axios from '../../base/axios';
import Router from '../../base/router';
import '../../components/pager';
import { Pager7 } from '../../components/pager';
import '../photo';
import '../../components/avatar';
import { Photo7 } from '../photo';
import { file } from '../../res/interface';
const styles = require('./style').toString();

@customElement('album-7')
export class Album7 extends LitElement {

  @property({type: Array}) list: file[] = [];
  @property ({type: Number}) currentIndex = -1;
  @property ({type: Number}) total = 0;
  @property ({type: Array}) all: file[] = [];

  @query('#photo') $photo: Photo7;
  @query('#pager') $pager: Pager7;

  // 常量
  pagesize = 32;

  async firstUpdated () {
    await this.reloadRes();
  }

  async loadRes (page = 1) {
    const params: any = {
      offset: (page - 1) * this.pagesize,
      count: this.pagesize,
      groups: 'includes.' + Router.params.albumId
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
    const offset = (page - 1) * this.pagesize;
    if (!this.all[offset]) {
      const data = await this.loadRes(page);
      this.list = data.data || [];
      this.list.forEach((item, index) => {
        this.all[(page - 1) * this.pagesize + index] = item;
      });
      this.total = data.total;
      this.all.length = this.total;
      this.$photo.forceUpdate();
    } else {
      this.list = this.all.slice(offset, offset + this.pagesize);
    }
  }

  async preloadRes (page = 1) {
    const offset = (page - 1) * this.pagesize;
    if (!this.all[offset]) {
      const data = await this.loadRes(page);
      const list: file[] = data.data || [];
      list.forEach((item, index) => {
        this.all[(page - 1) * this.pagesize + index] = item;
      });
      this.total = data.total;
      this.all.length = this.total;
      this.$photo.forceUpdate();
    }
  }

  async changePage (e: CustomEvent) {
    const newpage = e.detail.message;
    await this.reloadRes(newpage);
    this.shadowRoot.querySelectorAll('pager-7').forEach(o => {
      o.setAttribute('current', newpage);
    });
  }

  async loadPage (e: CustomEvent) {
    const offset = e.detail.offset;
    const page = Math.floor(offset / this.pagesize) + 1;
    await this.preloadRes(page);
  }

  enterPhoto (item: file, index: number) {
    window.history.pushState(null, '', `/albums/${Router.params.albumId}?p=${index}`);
    this.currentIndex = index + this.pagesize * (this.$pager.current - 1);
    setTimeout(() => {
      this.$photo.show();
    }, 1);
  }

  render () {
    return html `
      <style>${styles}</style>
      <div class="album">
        <ul class="photo-list">
          ${this.list.map((item: file, index: number) => html `
            <li class="photo-item${item.width && item.width < item.height ? ' vertical' : ' '}"
              @click=${() => this.enterPhoto(item, index)}>
              <div class="file-wrap">
                <avatar-7 src="${item.thumb}"></avatar-7>
              </div>
            </li>
          `)}
        </ul>
        <pager-7 id="pager" current="1"
          total="${this.total}"
          pagesize="${this.pagesize}"
          @change=${this.changePage}
          style="padding: 12px 0;"></pager-7>
      </div>
      <photo-7 id="photo" pagesize="${this.pagesize}" .current=${this.currentIndex} .files=${this.all}
        @loadpage=${this.loadPage}
        @changepage=${this.changePage}></photo-7>
    `
  }
}
