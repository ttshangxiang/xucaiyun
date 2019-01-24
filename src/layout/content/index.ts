import { LitElement, html, customElement, property } from 'lit-element';
import {getIns} from '../../base/c';

@customElement('content-7')
class Test7 extends LitElement {
  @property({type: Object}) route: any = {};
  @property({type: Boolean}) pedding = false;
  render () {
    if (this.pedding) {
      getIns('linear-progress').setAttribute('show', 'true');
      return html ``;
    }
    getIns('linear-progress').removeAttribute('show');
    const {error, content} = this.route;
    return html `
      ${error ? html `错误：${error.message}` : content}
    `;
  }
}