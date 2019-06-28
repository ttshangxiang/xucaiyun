
import { LitElement, html, customElement, property } from 'lit-element';

const styles = require('./style').toString();

@customElement('me-7')
export class Me7 extends LitElement {
  render () {
    return html `
      <style>${styles}</style>
      <div class="me">
        很普通的一个人，<br>
        但也可能志同道合。<br>
        <a href="https://github.com/ttshangxiang">github</a><br>
        <a href="https://music.163.com/#/user/home?id=93828616">网易云音乐</a><br>
        <a href="https://space.bilibili.com/4208428">Bilibili</a><br>
      </div>
    `
  }
}
