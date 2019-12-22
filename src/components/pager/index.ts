
import { LitElement, html, customElement, property } from 'lit-element';

const styles = require('./style').toString();

@customElement('pager-7')
export class Pager7 extends LitElement {

  @property ({type: Number}) pagesize = 2;
  @property ({type: Number}) current = 1;
  @property ({type: Number}) total = 0;

  change (type: (string | number)) {
    let next = this.current;
    if (type === 'prev') {
      if (this.current === 1) {
        return;
      }
      next = this.current - 1;
    }
    if (type === 'next') {
      if (this.current >= Math.ceil(this.total / this.pagesize)) {
        return;
      }
      next = this.current + 1;
    }
    if (typeof type === 'number') {
      next = type;
    }
    let myEvent = new CustomEvent('change', {
      detail: { message: next },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
  }

  render () {
    const pagenum = Math.ceil(this.total / this.pagesize);
    if (pagenum <= 1) {
      return html``;
    }
    return html `
      <style>${styles}</style>
      <div class="pager" style="${this.total ? '' : 'display: none;'}">
        <ul class="page-btn-list">
          <li class="page-btn" @click=${() => this.change('prev')}>
            <a href="javascript:;"><</a>
          </li>
          ${'a'.repeat(pagenum).split('').map((item, index) => {
            return html `
              <li class="page-btn ${this.current === index + 1 ? 'active' : ''}"
                @click=${() => this.change(index + 1)}>
                <a href="javascript:;">${index + 1}</a>
              </li>
            `;
          }) }
          <li class="page-btn" @click=${() => this.change('next')}>
            <a href="javascript:;">></a>
          </li>
        </ul>
      </div>
    `
  }
}