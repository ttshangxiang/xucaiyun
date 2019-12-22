import { LitElement, html, customElement, css, unsafeCSS, property } from "lit-element";
import '../../components/cards/albumCard'
import axios from 'axios'
import page from 'page'
const styles = require('./style')

@customElement('album-7')
export default class Album extends LitElement {
  static tagName = 'Album'

  @property({ type: Array }) list: any[] = [];

  static get styles() {
    return css`
      ${unsafeCSS(styles)}
    `
  }

  async loadRes() {
    return await axios({
      method: 'get',
      url: '/albums'
    }).then(res => {
      const { data = {} } = res;
      if (data.code === 0) {
        return data.data;
      } else {
        throw Error(data.msg);
      }
    });
  }

  async firstUpdated() {
    const data = await this.loadRes();
    this.list = data || [];
  }

  enterAlbum(item: any) {
    page('/album/' + item._id)
  }
  
  render () {
    return html `
      <div class="album7">
        <div class="mdc-layout-grid">
          <div class="mdc-layout-grid__inner">
            ${this.list.map(item => html`
              <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4" @click=${() => this.enterAlbum(item)}>
                <album-card-7 img=${item.thumb} title=${item.name} subTitle=${item.description || ''}></album-card-7>
              </div>
            `)}
          </div>
        </div>
      </div>
    `
  }
}