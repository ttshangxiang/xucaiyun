
import { LitElement, html, customElement, property, query } from 'lit-element';
import axios from '../../base/axios';
import '../pager';
import { Pager7 } from '../pager';

const styles = require('./style').toString();

const storageKey = 'ttsx_reply_info';

interface comment {
  _id?: string
  affiliated?: string
  content: string
  nickname: string
  email: string
  replyTo?: string
  reply?: comment[]
  utime?: string
}

@customElement('comment-7')
export class Comment7 extends LitElement {

  @property({type: String}) nickname = '';
  @property({type: String}) email = '';
  @property({type: String}) message = '';
  @property({type: String}) error = '';
  @property({type: Array}) list: comment[] = [];
  @property({type: Number}) total = 0;
  @property({type: Object}) replyParam: any = {};

  @property({type: String}) maxw = '';

  @query('#pager') $pager: Pager7;
  @query('#message') $message: HTMLTextAreaElement;

  @property({type: Boolean}) show = false;

  // 常量
  pagesize = 7;
  page = 1;

  _affiliated = '';
  static get properties() {
    return {
      affiliated: { type: String }
    };
  }
  set affiliated (value) {
    if (this._affiliated !== value) {
      this._affiliated = value;
      this.firstUpdated();
    }
  }

  get affiliated () {
    return this._affiliated;
  }

  async firstUpdated () {
    if (!this.affiliated || this.affiliated[this.affiliated.length - 1] === '-') {
      return;
    }

    try {
      const json = JSON.parse(localStorage.getItem(storageKey));
      if (json) {
        this.nickname = json.nickname;
        this.email = json.email;
      }
    } catch (error) {
    }
    await this.reloadMsg();
    this.show = true;
  }

  async loadMsg (page = 1) {
    this.page = page;
    const params: any = {
      offset: (page - 1) * this.pagesize,
      count: this.pagesize,
      affiliated: this.affiliated
    };
    return await axios({
      method: 'get',
      url: '/comments',
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

  async reloadMsg (page = 1) {
    const data = await this.loadMsg(page)
    this.total = data.total;
    this.list = data.data;
  }

  async changePage (e: CustomEvent) {
    const newpage = e.detail.message;
    await this.reloadMsg(newpage);
    this.$pager.setAttribute('current', newpage);
  }

  async postMessage () {
    let error = '';
    const {nickname, email, message} = this;
    if (nickname === '') {
      error += '昵称不能为空；';
    }
    if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+[\.][a-zA-Z0-9_-]+$/.test(email)) {
      error += '邮箱不正确；';
    }
    if (message === '') {
      error += '留言内容为空无意义；';
    }
    if (error !== '') {
      this.error = error;
      return;
    } else {
      this.error = '';
    }
    // save
    localStorage.setItem(storageKey, JSON.stringify({nickname, email}));

    if (this.replyParam.id) {
      await this.postReply();
      this.reloadMsg(this.page);
    } else {
      await this.postNormal();
      this.reloadMsg(1);
      this.$pager.setAttribute('current', '1');
    }
    this.resetMessage();
  }

  postNormal () {
    const {nickname, email, message} = this;
    return axios({
      url: '/comments',
      method: 'post',
      data: {
        affiliated: this.affiliated,
        content: message,
        nickname,
        email
      }
    })
  }

  postReply () {
    const {nickname, email, message, replyParam} = this;
    const data: comment = {
      content: message,
      nickname,
      email
    }
    if (replyParam.show) {
      data.replyTo = replyParam.to;
    }
    return axios({
      url: '/comments/reply/' + replyParam.id,
      method: 'post',
      data: data
    })
  }

  replyIt (replyId: string, replyTo: string, showReply = false) {
    this.replyParam = {
      id: replyId,
      to: replyTo,
      show: showReply
    }
    document.body.scrollTop = 0;
    document.scrollingElement && (document.scrollingElement.scrollTop = 0);
    document.documentElement && (document.documentElement.scrollTop = 0);
    this.message = '';
    this.$message.setAttribute('placeholder', `回复@${replyTo}：`);
    this.$message.focus();
  }

  change (e: any, key: ('nickname' | 'email' | 'message')) {
    this[key] = e.target.value;
  }

  resetMessage () {
    this.message = '';
    this.replyParam = {};
    this.$message.setAttribute('placeholder', '新留言...');
  }

  render () {
    return html `
      <style>${styles}</style>
      ${this.show ? html `
      <div class="message" style=${this.maxw ? 'max-width: ' + this.maxw + 'px;' : ''}>
        <div class="post card">
          <label class="input-item">
            <span>昵称</span>
            <input .value=${this.nickname} @change=${(e: any) => this.change(e, 'nickname')} type="text" />
          </label>
          <label class="input-item">
            <span>邮箱</span>
            <input .value=${this.email} @change=${(e: any) => this.change(e, 'email')} type="email" />
          </label>
          <div class="input-item">
            <textarea id="message" .value=${this.message} @change=${(e: any) => this.change(e, 'message')}
              placeholder="新留言..." rows="3"></textarea>
            <div class="input-right">
              <a href="javascript:;" class="input-btn" @click=${this.postMessage}>提交</a>
              <a href="javascript:;" class="cancel-btn" @click=${this.resetMessage}>重置回复</a>
            </div>
          </div>
          <div class="input-error">${this.error}</div>
        </div>
        <ul class="msg-list card ${this.list && this.list.length > 0 ? '' : 'hide'}">
          ${this.list.map((item, index) => html `
            <li class="msg-item">
              <div class="msg-main">
                <div class="msg-user">
                  ${item.nickname}
                  <span class="msg-index">#${this.total - (this.page - 1) * this.pagesize - index}</span>
                </div>
                <div class="msg-content">${item.content}</div>
                <div class="msg-more">
                  <span class="msg-date">${item.utime}</span>
                  <a class="msg-reply" href="javascript:;" @click=${() => this.replyIt(item._id, item.nickname)}>回复</a>
                </div>
                <ul class="reply">
                  ${item.reply && item.reply.map(ii => html `
                    <li class="reply-item">
                      <div class="reply-content">
                        <span class="reply-user">${ii.nickname}</span>
                        <span class="reply-to">${ii.replyTo ? ' 回复 ' + ii.replyTo : ''}</span>：${ii.content}
                      </div>
                      <div class="reply-more">
                        <span class="msg-date">${ii.utime}</span>
                        <a class="reply-reply" href="javascript:;" @click=${() => this.replyIt(item._id, ii.nickname, true)}>回复</a>
                      </div>
                    </li>
                  `)}
                </ul>
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
      ` : ''}
    `
  }
}