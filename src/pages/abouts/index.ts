
import { LitElement, html, customElement, property } from 'lit-element';

const styles = require('./style').toString();

@customElement('me-7')
export default class Me7 extends LitElement {
  static tagName = 'Me7'
  render () {
    return html `
      <style>${styles}</style>
      <div class="me">
        <div style="color: #444444; font-size: 14px;">
          联系方式：<br>
          邮箱：ttshangxiang@qq.com <br>
          QQ：463406391 <br>
          微信：ttshangxiang <br>
        </div>
        <br>
        1991年<br>
        湖南，宁乡<br>
        <a href="https://github.com/ttshangxiang">github</a><br>
        <a href="https://music.163.com/#/user/home?id=93828616">网易云音乐</a><br>
        <a href="https://space.bilibili.com/4208428">Bilibili</a><br>
      </div>
    `
  }
}
