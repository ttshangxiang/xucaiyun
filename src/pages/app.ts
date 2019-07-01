import { LitElement, html, customElement, property } from 'lit-element'

@customElement('app-7')
export class MyElement extends LitElement {

  @property()
  foo = 'foo'
  render() {
    return html`
      <a href="javascript:;" @click=${() => page('/page1')}>page1</a>
      <a href="javascript:;" @click=${() => page('/page2?dad=dsa')}>page2</a>
      <a href="javascript:;" @click=${() => page('/page3')}>page3</a>
    `
  }
}