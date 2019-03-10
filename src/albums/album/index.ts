
import { LitElement, html, customElement, property } from 'lit-element';
import axios from '../../base/axios';
import Router from '../../base/router';
import '../../components/pager';
const styles = require('./style').toString();

@customElement('album-7')
export class Album7 extends LitElement {

  @property({type: Array}) list: any = [];
  @property ({type: Number}) currentIndex = -1;
  @property ({type: Number}) total = 0;

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

  render () {
    return html `
      <style>${styles}</style>
      <div class="photo">
        <ul class="photo-list">
          ${this.list.map((item: any) => html `
            <li class="photo-item">
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
    `
  }
}
