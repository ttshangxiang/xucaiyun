
import { LitElement, html, customElement, property } from 'lit-element';
import axios from '../base/axios';
import Router from '../base/router';
import { file } from '../res/interface';
import './album';
import '../components/avatar';

const styles = require('./style').toString();

@customElement('albums-7')
export class Albums7 extends LitElement {
  
  @property({type: Array}) list: file[] = [];

  firstUpdated () {
    this.loadAblums();
  }

  loadAblums () {
    axios({
      method: 'get',
      url: '/albums'
    }).then(res => {
      if (res.data && res.data.code === 0) {
        this.list = res.data.data || [];
      }
    });
  }

  enterAlbum (i: any) {
    Router.push(`/albums/${i}`);
  }

  render () {
    return html `
      <style>${styles}</style>
      <div class="albums">
        <ul class="albums-list">
          ${this.list.map((item: any) => html `
            <li class="albums-item${item.width && item.width < item.height ? ' vertical' : ' '}"
              @click=${() => this.enterAlbum(item._id)}>
              <div class="file-wrap">
                <avatar-7 src="${item.thumb}"></avatar-7>
                <div class="albums-info">
                  <span class="albums-name">${item.name}</span>
                </div>
              </div>
            </li>
          `)}
        </ul>
      </div>
    `
  }
}
