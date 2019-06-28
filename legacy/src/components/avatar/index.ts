
import { LitElement, html, customElement, property, query } from 'lit-element';

const styles = require('./style').toString();

@customElement('avatar-7')
export class Avatar7 extends LitElement {
  @property ({type: Boolean}) isicon = false;
  @property ({type: String}) src = '';
  @query('#avatar7') $avatar: HTMLDivElement;

  load (e: any) {
    const img: HTMLImageElement = e.target;
    if (this.isicon) {
      img.setAttribute('style', '');
      return;
    }
    const { naturalWidth, naturalHeight } = img;
    const { clientWidth, clientHeight } = this.$avatar;
    const rate = clientWidth / clientHeight;
    let style = '';
    if (naturalWidth / naturalHeight < rate) {
      style = 'width: 100%; height: auto;';
    } else {
      style = 'width: auto; height: 100%;';
    }
    img.setAttribute('style', style);
  }

  render () {
    return html `
      <style>${styles}</style>
      <div class="avatar7" id="avatar7">
        <div class="centered">
          <img src="${this.src}" style="width: 0;" @load="${this.load}" />
        </div>
      </div>
    `
  }
}
