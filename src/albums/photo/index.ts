
import { LitElement, html, customElement, property, query } from 'lit-element';
import '../../components/dialog';
import { Dialog7 } from '../../components/dialog';
import * as Hammer from 'hammerjs';
import { file } from '../../res/interface';

const styles = require('./style').toString();

interface _file extends file {
  imgStyle?: string
}

@customElement('photo-7')
export class Photo7 extends LitElement {

  @property ({type: Number}) current: number = 0;
  @property ({type: Array}) files: _file[] = [];
  @property ({type: Boolean}) hideDetail = false;
  @property ({type: String}) imgStyle = '';
  @property ({type: Number}) panOffset = 0;

  @query('#dialog') $dialog: Dialog7;
  @query('#photo-show') $photoShow: HTMLDivElement;
  @query('#photo') $photo: HTMLDivElement;

  // 图片的偏移屏幕数量
  @property ({type: Number}) offset = 0;

  constructor () {
    super();
    // 用于监听/取消popstate
    this.close = this.close.bind(this);
    this.resize = this.resize.bind(this);
    // 监听popstate
    window.addEventListener('popstate', this.close);
    window.addEventListener('resize', this.resize);
  }

  disconnectedCallback () {
    // 取消监听popstate
    window.removeEventListener('popstate', this.close);
    window.removeEventListener('resize', this.resize);
  }

  close () {
    // this.$dialog.close(true);
    // 为了不重复触发onClose里面的back
    this.$dialog.isShow = false;
  }

  show () {
    this.$dialog.show();
    setTimeout(() => this.resize, 1);
  }

  onClose () {
    window.history.back();
  }

  toggleDetail () {
    this.hideDetail = !this.hideDetail;
  }

  resize () {
    const {clientWidth, clientHeight} = this.$photoShow;
    if (clientWidth === 0 || clientHeight === 0) {
      return;
    }
    this.files = this.files.map(item => {
      const {width, height} = item;
      if (!width || !height || !this.$photoShow) {
        item.imgStyle = '';
        return item;
      }
      const {clientWidth, clientHeight} = this.$photoShow;
      if (width < clientWidth && height < clientHeight) {
        item.imgStyle = '';
        return item;
      }
      if (width / height > clientWidth / clientHeight) {
        item.imgStyle = 'width: 100%;height: auto;';
      } else {
        item.imgStyle = 'width: auto;height: 100%;';
      }
      return item;
    });
    this.requestUpdate();
  }

  firstUpdated () {
    this.swiper();
  }

  swiper () {
    const manager = new Hammer.Manager(this.$photo);
    const Swipe = new Hammer.Swipe();
    const Pan = new Hammer.Pan();
    manager.add(Pan);
    let usePan = false; // 使用pan跳转时，swipe禁止
    manager.on('pan', (e: any) => {
      if (this.files.length === 1) {
        return;
      }
      this.panOffset = e.deltaX / this.$photoShow.clientWidth * 100;
    });
    manager.on('panend', (e: any) => {
      if (this.files.length === 1) {
        return;
      }
      const {clientWidth} = this.$photoShow;
      if (e.deltaX > clientWidth / 2) {
        this.prev();
        usePan = true;
      } else if (e.deltaX < clientWidth / -2) {
        this.next();
        usePan = true;
      }
      this.panOffset = 0;
    });
    manager.add(Swipe);
    manager.on('swipe', (e: any) => {
      if (this.files.length === 1) {
        return;
      }
      if (usePan) {
        usePan = false;
        return;
      }
      const {clientWidth} = this.$photoShow;
      if (e.deltaX > clientWidth / 2) {
        this.prev();
      }
      if (e.deltaX < clientWidth / -2) {
        this.next();
      }
    });
    Swipe.recognizeWith(Pan);

    const Tap = new Hammer.Tap();
    manager.add(Tap);
    manager.on('tap', e => {
      this.toggleDetail();
    })
  }

  // 供滚动的图片，三张
  get swipeImgs () {
    if (this.files.length < 2) {
      return this.files;
    }
    const arr: _file[] = [];
    arr[1] = this.files[this.current];
    if (this.current === 0) {
      arr[0] = this.files[this.files.length - 1];
    } else {
      arr[0] = this.files[this.current - 1];
    }
    if (this.current === this.files.length - 1) {
      arr[2] = this.files[0];
    } else {
      arr[2] = this.files[this.current + 1];
    }
    return arr;
  }

  prev () {
    this.offset --;
    if (this.current === 0) {
      this.current = this.files.length - 1;
    } else {
      this.current --;
    }
  }

  next () {
    this.offset ++;
    if (this.current === this.files.length - 1) {
      this.current = 0;
    } else {
      this.current ++;
    }
  }

  renderItem (item: _file, index: number) {
    let style = 'left: ' + (this.offset + index - 1) * 100 + '%';
    if (this.files.length === 1) {
      style = '';
    }
    return html `
      <div class="photo-item" style="${style}">
        <img @mousedown =${(e: any) => e.preventDefault()} style="${item.imgStyle}" src="${item.normal}" />
      </div>
    `;
  }

  render () {
    let currentImg: any = this.files[this.current] || {};
    return html `
      <style>${styles}</style>
      <dialog-7 id="dialog" @close=${this.onClose} text="${currentImg.filename || ''}">
        <div class="photo" id="photo">
          <div id="photo-show" class="photo-show">
            <div id="photo-wrap" class="photo-wrap"
              style=${'transform: translateX(' + (this.offset * -100 + this.panOffset) + '%)'}>
              ${this.swipeImgs.map((item, index) => this.renderItem(item, index))}
            </div>
            <div class="prev-btn">
              <a href="javascript:;" class="material-icons prev-btn" 
                @click=${(e: Event) => {e.stopPropagation();this.prev();}}>keyboard_arrow_left</a>
            </div>
            <div class="next-btn">
              <a href="javascript:;" class="material-icons next-btn"
                @click=${(e: Event) => {e.stopPropagation();this.next();}}>keyboard_arrow_right</a>
            </div>
          </div>
          <div class="photo-detail ${this.hideDetail ? 'hide' : ''}">
            <ul class="photo-detail-readonly">
              <li class="photo-detail-item">
                <label>描述：</label><span>${currentImg.description}</span>
              </li>
            </ul>
          </div>
        </div>
        <div slot="footer"></div>
      </dialog-7>
    `
  }
}
