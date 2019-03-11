
import { LitElement, html, customElement, property, query } from 'lit-element';
import axios from '../../base/axios';
import Router from '../../base/router';
import '../../components/pager';
import '../photo';
import { Photo7 } from '../photo';
import { file } from '../../res/interface';
const styles = require('./style').toString();

@customElement('album-7')
export class Album7 extends LitElement {

  @property({type: Array}) list: file[] = [];
  @property ({type: Number}) currentIndex = 0;
  @property ({type: Number}) total = 0;

  @query('#photo') $photo: Photo7;

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

  enterPhoto (item: file, index: number) {
    window.history.pushState(null, '', `/albums/${Router.params.albumId}?p=${index}`);
    this.currentIndex = index;
    this.$photo.show();
  }

  render () {
    return html `
      <style>${styles}</style>
      <div class="album">
        <ul class="photo-list">
          ${this.list.map((item: file, index: number) => html `
            <li class="photo-item" @click=${() => this.enterPhoto(item, index)}>
              <div class="file-wrap">
                <div class="file-abs">
                  <div class="centered">
                    <img src="${item.thumb}" />
                  </div>
                </div>
              </div>
            </li>
          `)}
        </ul>
        <pager-7 current="1"
          total="${this.total}"
          pagesize="${this.pagesize}"
          @change=${this.changePage}
          style="padding: 12px 0;"></pager-7>
      </div>
      <photo-7 id="photo" .current=${this.currentIndex} .files=${this.list}></photo-7>
    `
  }
}
