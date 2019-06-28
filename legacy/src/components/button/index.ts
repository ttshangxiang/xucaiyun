
import { LitElement, html, customElement, property } from 'lit-element';

const styles = require('./style').toString();

@customElement('button-7')
export class Button7 extends LitElement {
  @property ({type: String}) icon = 'menu';

  render () {
    return html `
      <style>${styles}</style>
      <a href="javascript:;" class="material-icons">${this.icon}</a>
    `;
  }
}
