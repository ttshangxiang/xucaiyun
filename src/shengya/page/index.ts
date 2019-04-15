
import { LitElement, html, customElement, property } from 'lit-element';
import '../../components/comment';
import axios from '../../base/axios';
import Router from '../../base/router';
const styles = require('./style').toString();
import { shengya, typeMap, stageMap } from '../edit';

@customElement('shengyap-7')
export class Shengyap7 extends LitElement {
  @property({type: Object}) current: shengya;
  @property({type: String}) shengyaId = '';

  async firstUpdated () {
    if (this.current) {
      this.shengyaId = this.current._id;
    } else {
      const result = await this.loadShengya(Router.params.shengyaId);
      this.shengyaId = Router.params.shengyaId;
      const {data = [], total = 0} = result;
      if (total > 0 && data[0]) {
        this.current = data[0];
      }
    }
  }

  async loadShengya (shengyaId: string) {
    return await axios({
      method: 'get',
      url: '/shengya',
      params: {
        _id: shengyaId
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
  render () {
    const item = this.current;
    return html `
      <style>${styles}</style>
      ${item ? html `
        <div class="sy-page">
          <div class="name">
            ${item.name || '--'}
            <span class="stage">${(<any>stageMap)[item.stage]}</span>
          </div>
          <div class="type">${(<any>typeMap)[item.type] + (item.subType ? ' - ' + item.subType : '')}</div>
          ${item.progress ? html `<div class="progress">进度：${item.progress}</div>` : ''}
          ${item.avatar ? html `<div class="avatar"><img src=${item.avatar}></div>` : ''}
          <div class="description">${(item.description + '').split('\n').map(ii => html `<div class="p">${ii}</div>`)}</div>
          ${item.link ? html `<a href=${item.link} class="link">链接：${item.link}</a>` : ''}
        </div>
        <comment-7 affiliated="shengya-${this.shengyaId}" maxw="960"></comment-7>
      ` : ''}
    `
  }
}
