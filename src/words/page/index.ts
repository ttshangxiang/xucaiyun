
import { LitElement, html, customElement, property } from 'lit-element';
import axios from '../../base/axios';
import '../../components/markdown';
import '../../components/comment';
import Router from '../../base/router';

const styles = require('./style').toString();

@customElement('page-7')
export class Page7 extends LitElement {
  @property ({type: String}) content = '';

  async firstUpdated () {
    const result = await this.loadWord(Router.params.wordsId);
    const {data = [], total = 0} = result;
    if (total > 0 && data[0]) {
      this.content = await this.loadMD(data[0].path);
    }
  }

  async loadWord (wordsId: string) {
    return await axios({
      method: 'get',
      url: '/res',
      params: {
        _id: wordsId
      }
    }).then(res => {
      const { data = {} } = res;
      if (data.code === 0) {
        return data.data;
      } else {
        throw Error(data.msg);
      }
    });
  }

  async loadMD (url: string) {
    return await axios({
      method: 'get',
      url: url,
      baseURL: ''
    }).then(res => res.data);
  }

  render () {
    return html `
      <style>${styles}</style>
      ${this.content ? html `
      <div class="page7">
        <markdown-7 content=${this.content}></markdown-7>
      </div>
      <comment-7 affiliated="words-${Router.params.wordsId}"></comment-7>
      `: ''}
    `
  }
}
