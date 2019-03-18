
import { LitElement, html, customElement, property, query } from 'lit-element';
import '../../components/dialog';
import { Dialog7 } from '../../components/dialog';
import * as Hammer from 'hammerjs';
import { file } from '../../res/interface';
import '../../components/img';

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
  @property ({type: Number}) pagesize = 0;

  @query('#dialog') $dialog: Dialog7;
  @query('#photo-show') $photoShow: HTMLDivElement;
  @query('#photo') $photo: HTMLDivElement;
  @query('#current-img') $currentImg: HTMLImageElement;

  // 图片的偏移屏幕数量
  @property ({type: Number}) offset = 0;
  @property ({type: Boolean}) mobile = window.innerWidth <= 599;
  
  // 普通变量
  offsetY = 0;

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
    this.checkLoad(this.current);
    this.resetProp();
    setTimeout(() => this.requestUpdate(), 1);
  }

  onClose () {
    window.history.back();
  }

  resetProp () {
    this.hideDetail = false;
    this.offsetY = 0;
    const $img = this.shadowRoot.querySelector('#current-img');
    $img && ($img.scrollTop = 0);
  }

  toggleDetail () {
    this.hideDetail = !this.hideDetail;
  }

  resize () {
    this.mobile = window.innerWidth <= 599;
  }

  firstUpdated () {
    this.swiper();
  }

  // 滑动部分
  swiper () {
    const manager = new Hammer.Manager(this.$photo);
    const Swipe = new Hammer.Swipe();
    const Pan = new Hammer.Pan();
    manager.add(Pan);
    let usePan = false; // 使用pan跳转时，swipe禁止
    let direction: (null | 'horizontal' | 'vertical') = null;
    manager.on('pan', (e: any) => {
      // 判断方向
      const absx = Math.abs(e.deltaX);
      const absy = Math.abs(e.deltaY);
      if (!direction && absx + absy > 50) {
        if (absx > absy) {
          direction = 'horizontal';
        } else {
          direction = 'vertical';
        }
      }

      // 左右偏移
      this.panOffset = e.deltaX / this.$photoShow.clientWidth * 100;

      // 左右极限
      if ((this.current === this.files.length - 1 && e.deltaX < 0) || (
        this.current === 0 && e.deltaX > 0)) {
        this.panOffset = 0;
      }

      // 上下偏移
      let offsetY = e.deltaY;

      // 方向禁止
      if (direction === 'horizontal') {
        offsetY = 0;
      }
      if (direction === 'vertical') {
        this.panOffset = 0;
      }

      // 上下偏移
      if (this.$currentImg && this.mobile) {
        this.$currentImg.scrollTop = this.offsetY - offsetY;
      }

    });
    manager.on('panstart', (e: any) => {
    });
    manager.on('panend', (e: any) => {
      // 移动结束时重置direction;
      direction = null;
      // 移动结束时记录scrollTop
      this.offsetY = this.$currentImg.scrollTop;

      if ((this.current === this.files.length - 1 && e.deltaX < 0) || (
        this.current === 0 && e.deltaX > 0)) {
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
    manager.on('swiperight', (e: any) => {
      if (this.current === 0) {
        return;
      }
      if (usePan) {
        usePan = false;
        return;
      }
      this.prev();
    })
    manager.on('swipeleft', (e: any) => {
      if (this.current === this.files.length - 1) {
        return;
      }
      if (usePan) {
        usePan = false;
        return;
      }
      this.next();
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
    if (this.current === -1) {
      return [];
    }
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
    if (this.current > 0) {
      this.offset --;
      this.current --;
      this.resetProp();
      this.checkLoad(this.current);
      if (this.current % this.pagesize === this.pagesize - 1) {
        this.changePage(this.current);
      }
    }
  }

  next () {
    if (this.current < this.files.length - 1) {
      this.offset ++;
      this.current ++;
      this.resetProp();
      this.checkLoad(this.current);
      if (this.current % this.pagesize === 0) {
        this.changePage(this.current);
      }
    }
  }

  checkLoad (offset: number) {
    // 缺货补充
    if (offset % this.pagesize <= 1 && offset >= this.pagesize) {
      this.loadPage(offset - 2);
    }
    const lastPagePrev = this.files.length - this.files.length % this.pagesize - 1;
    if (offset % this.pagesize >= this.pagesize - 2  && offset <= lastPagePrev) {
      this.loadPage(offset + 2);
    }
  }

  loadPage (offset: number) {
    let myEvent = new CustomEvent('loadpage', {
      detail: { offset },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
  }

  changePage (offset: number) {
    const page = Math.floor(offset / this.pagesize) + 1;
    let myEvent = new CustomEvent('changepage', {
      detail: { message: page },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(myEvent);
  }

  forceUpdate () {
    this.requestUpdate();
  }

  renderItem (item: _file, index: number) {
    if (!item) {
      return html ``;
    }
    let style = 'left: ' + (this.offset + index - 1) * 100 + '%';
    if (this.files.length === 1) {
      style = '';
    }
    const rate = item.width / item.height;
    const width = Math.max(item.width / item.height * this.$photoShow.clientHeight, 420);
    const realWidth = Math.min(this.$photoShow.clientWidth, width);
    const realHeight = 1 / rate * realWidth;
    // 判断是否有滑动条
    let top = '';
    if (realHeight > this.$photoShow.clientHeight) {
      top = 'top';
    }
    return html `
      <div id="${item === this.files[this.current] ? 'current-img' : 'current-img' + index}"
        class="photo-item ${top}" style="${style}">
        <img-7 style="width: ${width}px" src="${item.normal || ''}" thumb="${item.thumb || ''}"></img-7>
      </div>
    `;
  }

  render () {
    let currentImg: any = this.files[this.current] || {};
    let offsetStyle = 'transform: translateX(' + (this.offset * -100 + this.panOffset) + '%)';
    if (this.files.length === 1) {
      offsetStyle = '';
    }
    return html `
      <style>${styles}</style>
      <dialog-7 id="dialog" @close=${this.onClose} text="${currentImg.filename || ''}">
        ${this.mobile ? html `
          <div slot="header"></div>
          <div class="header">
            <a href="javascript:;" class="material-icons dialog-btn" style="font-size: 22px;"
              @click=${() => this.$dialog.close()}>close</a>
          </div>
        `: ''}
        <div class="photo" id="photo">
          <div id="photo-show" class="photo-show">
            <div id="photo-wrap" class="photo-wrap"
              style=${offsetStyle}>
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
              ${currentImg.description ? html `
                <li class="photo-detail-item">
                  <label>描述：</label><span>${currentImg.description}</span>
                </li>
              ` : ''}
            </ul>
          </div>
        </div>
        <div slot="footer"></div>
      </dialog-7>
    `
  }
}
