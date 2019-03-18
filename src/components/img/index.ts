
import { LitElement, html, customElement, property, query } from 'lit-element';

const styles = require('./style').toString();

@customElement('img-7')
export class Example extends LitElement {
  @query('#thumb') $thumb: HTMLDivElement;
  @query('#normal') $normal: HTMLDivElement;

  @property ({type: String}) src = '';
  @property ({type: String}) thumb = '';

  // 普通变量
  timer: any = null;

  attributeChangedCallback(name: any, oldval: any, newval: any) {
    this.freshImg(name, newval);
    super.attributeChangedCallback(name, oldval, newval);
  }

  freshImg (name: string, value: string) {
    if (name === 'src' && this.$normal) {
      if (!value) {
        this.$normal.innerHTML = '';
        return;
      }
      const image = document.createElement('img');
      image.src = value;
      image.onmousedown = e => e.preventDefault();
      this.$normal.innerHTML = '';
      this.$normal.appendChild(image);

      // 保持thumb和normal一样大
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        // 等到image的宽度和缩略图的dom时，结束循环
        if (image.naturalHeight > 0 && this.$thumb) {
          clearInterval(this.timer);
          this.querySelectorAll('img').forEach(item => {
            item.setAttribute('style', `width: ${image.naturalHeight}px`);
          });
        }
      }, 100);
    }
    if (name === 'thumb' && this.$thumb) {
      if (!value) {
        this.$thumb.innerHTML = '';
        return;
      }
      const image = document.createElement('img');
      image.setAttribute('style', '');
      image.src = value;
      image.onmousedown = e => e.preventDefault();
      this.$thumb.innerHTML = '';
      this.$thumb.appendChild(image);
    }
  }

  firstUpdated () {
    this.freshImg('src', this.src);
    this.freshImg('thumb', this.thumb);
  }

  render () {
    return html `
      <style>${styles}</style>
      <div class="img-7">
        <div class="thumb" id="thumb"></div>
        <div class="normal" id="normal"></div>
      </div>
    `
  }
}
