
import { LitElement, html, customElement, property } from 'lit-element';
import axios from '../base/axios';
import Router from '../base/router';
import './album';

const styles = require('./style').toString();

@customElement('albums-7')
export class Albums7 extends LitElement {
  
  @property({type: Array}) list: any = [];

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
    console.log(this.list)
    return html `
      <style>${styles}</style>
      <div class="albums">
        <ul class="albums-list">
          ${this.list.map((item: any) => html `
            <li class="albums-item" @click=${() => this.enterAlbum(item._id)}>
              <div class="file-wrap">
                <div class="file-abs">
                  <div class="centered">
                    <img src="${item.thumb}" />
                  </div>
                </div>
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

// let myEvent = new CustomEvent('drawer', {
//   detail: { message: 'drawer' },
//   bubbles: true,
//   composed: true
// });
// this.dispatchEvent(myEvent);
