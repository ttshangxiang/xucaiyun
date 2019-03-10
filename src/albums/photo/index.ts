
import { LitElement, html, customElement, property } from 'lit-element';

const styles = require('./style').toString();

@customElement('photo-7')
export class Photo7 extends LitElement {
  render () {
    return html `
      <style>${styles}</style>
      <div></div>
    `
  }
}
