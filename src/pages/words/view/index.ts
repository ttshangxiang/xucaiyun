
import { LitElement, html, customElement, property } from 'lit-element';
import axios from 'axios';
import '../../../components/markdown';
import '../../../components/comment';

interface res {
  _id: string;
  path: string;
}

const styles = require('./style').toString();

@customElement('article-view-7')
export default class ArticleView7 extends LitElement {
  @property ({type: Object}) current: res = null;
  @property ({type: String}) wordsId = '';
  @property ({type: String}) content = '';
  @property({type: Object}) ctx: PageJS.Context;

  async connectedCallback () {
    super.connectedCallback()
    let path = '';
    if (this.current) {
      this.wordsId = this.current._id;
      path = this.current.path;
    } else {
      this.wordsId = this.ctx.params.id;
      const result = await this.loadWord(this.wordsId);
      const {data = [], total = 0} = result;
      if (total > 0 && data[0]) {
        path = data[0].path
      }
    }
    path && (this.content = await this.loadMD(path));
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
      <comment-7 affiliated="words-${this.wordsId}" maxw="940"></comment-7>
      `: ''}
    `
  }
}
