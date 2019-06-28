
import { LitElement, html, customElement, property } from 'lit-element';

const styles = require('./style').toString();

@customElement('example-7')
export class Example extends LitElement {
  render () {
    return html `
      <style>${styles}</style>
      <div></div>
    `
  }
}

// let myEvent = new CustomEvent('drawer', {
//   detail: { message: 'drawer' },
//   bubbles: true,
//   composed: true
// });
// this.dispatchEvent(myEvent);
