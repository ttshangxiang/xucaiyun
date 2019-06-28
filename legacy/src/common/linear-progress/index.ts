import { LitElement, html, property, customElement } from 'lit-element';
import { setIns } from '../../base/c';

const style = require('./style').toString();

@customElement('xcy-linear-progress')
export class LinearProgress extends LitElement {
  @property({
    type: Boolean,
    reflect: true
  })
  show = false;

  constructor () {
    super();
    setIns(this.id, this);
  }

  render () {
    return html `
      ${this.myStyles}
      ${this.show ? html`
        <div role="progressbar" class="mdc-linear-progress mdc-linear-progress--indeterminate">
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
