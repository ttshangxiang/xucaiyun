import { LitElement, html, property, customElement } from 'lit-element';
import { setIns } from '../../base/c';

const style = require('./style').toString();

@customElement('xcy-linear-progress')
export class LinearProgress extends LitElement {
  @property()
  bbbb = true;

  constructor () {
    super();
  }

  xix () {
    this.bbbb = !this.bbbb;
    console.log(this.bbbb)
  }

  render () {
    console
    return html `
      <div @click=${this.xix}>
        ${this.bbbb ? 'true' : 'false'}
      </div>
    `


    return html `
      ${this.myStyles}
      ${this.bbbb ? html`
        <div role="progressbar" class="mdc-linear-progress mdc-linear-progress--indeterminate" @click=${this.xix}>
          <div class="mdc-linear-progress__buffering-dots"></div>
          <div class="mdc-linear-progress__buffer"></div>
          <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
            <span class="mdc-linear-progress__bar-inner"></span>
          </div>
          <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
            <span class="mdc-linear-progress__bar-inner"></span>
          </div>
        </div>
      `: html`
        <div style="height: 4px;"></div>
      `}
    `;
  }

  get myStyles () {
    return html `<style>${style}</style>`;
  }
}
