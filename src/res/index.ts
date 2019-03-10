import { LitElement, html, customElement, property, query } from 'lit-element';
import axios from '../base/axios';
import './edit';
import './group';
import '../components/pager';

const styles = require('./style').toString();

export interface file {
  type: string,
  filename: string,
  size: string,
  path: string,
  ctime?: string,
  utime?: string,
  description?: string,
  percent?: number,
  file?: File,
  thumb?: string,
  normal?: string,
  _id?: string,
  groups?: string,
  width?: number,
  height?: number
}

@customElement('res-7')
export class Res7 extends LitElement {
  @property ({type: Array}) list: file[] = [];
  @property ({type: Array}) res: file[] = [];
  @property ({type: Number}) currentIndex = -1;
  @property ({type: Number}) total = 0;
  @property ({type: Boolean}) grouping = false;
  @property ({type: Array}) groupSelected: file[] = [];
  @property ({type: Array}) groupList: [] = [];

  @query('#file-input') $fileInput: HTMLInputElement;
  @query('#res-edit') $resEdit: LitElement;
  @query('#grouping-select') $groupingSelect: HTMLSelectElement;
  @query('#filter-type') $filterType: HTMLSelectElement;
  @query('#filter-group') $filterGroup: HTMLSelectElement;
  @query('#group-edit') $groupEdit: any;

  // 常量
  pagesize = 32;

  async loadFiles () {
    let fileList: file[] = [];
    for (const f of this.$fileInput.files) {
      let img = '';
      if (f.type.slice(0, 5) === 'image') {
        try {
          const url = await this.loadDataURL(f);
          img = url.toString();
        } catch (err) {
          console.log(err);
        }
      }
      fileList.push({
        type: f.type,
        filename: f.name,
        path: img,
        size: f.size + '',
        file: f,
        percent: 0
      });
    }
    this.list = fileList.concat(this.list);
    // 启动上传
    this.upload();
  }

  loadDataURL (file: File) {
    return new Promise ((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const target: any = e.target;
        resolve(target.result);
      }
      reader.onerror = (e) => {
        reject(e);
      }
      reader.readAsDataURL(file);
    });
  }

  upload () {
    this.list.forEach((item, index) => {
      if (item.percent === 100) {
        return;
      }
      this.uploadOne(item, index);
    });
  }

  uploadOne (o: file, index: number) {
    const formData = new FormData;
    formData.append('file', o.file);
    formData.append('filename', o.filename);
    formData.append('type', o.type);
    formData.append('size', o.size);
    axios({
      method: 'post',
      url: '/res',
      data: formData,
      onUploadProgress: (e: ProgressEvent) => {
        o.percent = +(e.loaded / e.total * 100).toFixed(2);
        this.requestUpdate();
      }
    })
    .then(res => {
      const data = res.data;
      data.insert._id = data._id;
      this.list[index] = Object.assign(o, data.insert);
      this.requestUpdate();
    })
    .catch(function (error) {
      console.log(error);
      alert(error.message);
    });
  }

  async loadRes (page = 1) {
    const params: any = {
      offset: (page - 1) * this.pagesize,
      count: this.pagesize
    };
    if (this.$filterType.value !== '') {
      params.type = 'like.' + this.$filterType.value;
    }
    if (this.$filterGroup.value !== '') {
      params.groups = 'includes.' + this.$filterGroup.value;
    }
    return axios({
      url: '/res',
      params: params
    })
    .then(res => {
      const { data = {} } = res;
      if (data.code === 0) {
        return data.data;
      } else {
        throw Error(data.msg);
      }
    })
  }

  async reloadRes (page = 1) {
    const data = await this.loadRes(page);
    this.res = data.data || [];
    this.total = data.total;
  }

  async firstUpdated () {
    await this.reloadRes();
    const groupRes = await this.loadGroup();
    this.groupList = groupRes.data;
  }

  editRes (item: file, index: number) {
    // 分组的部分
    if (this.grouping) {
      if (this.groupSelected.includes(item)) {
        this.groupSelected.splice(this.groupSelected.indexOf(item), 1);
        this.requestUpdate();
      } else {
        this.groupSelected = this.groupSelected.concat(item);
      }
      return;
    }
    // 编辑的部分
    this.currentIndex = index;
    this.$resEdit.setAttribute('show', 'show');
  }

  changeFileIndex (e: any) {
    const message = e.detail.message;
    const max = this.list.length + this.res.length - 1;
    if (message === 'prev') {
      if (this.currentIndex === 0) {
        this.currentIndex = max;
      } else {
        this.currentIndex--;
      }
    }
    if (message === 'next') {
      if (this.currentIndex === max) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    }
  }

  async changePage (e: CustomEvent) {
    const newpage = e.detail.message;
    await this.reloadRes(newpage);
    this.shadowRoot.querySelectorAll('pager-7').forEach(o => {
      o.setAttribute('current', newpage);
    });
  }

  enterGroup () {
    this.groupSelected = [];
    this.grouping = !this.grouping;
    this.groupingChange(this.$groupingSelect.value);
  }

  loadGroup () {
    return axios({
      url: '/resgroup'
    })
    .then(res => {
      const { data = {} } = res;
      if (data.code === 0) {
        return data.data;
      } else {
        throw Error(data.msg);
      }
    })
  }

  groupingChange (id: string) {
    this.groupSelected = [];
    this.res.forEach(o => {
      if (o.groups && o.groups.includes(id)) {
        this.groupSelected.push(o);
      }
    });
  }

  async saveGroupChange () {
    const id = this.$groupingSelect.value;
    if (!id) {
      alert('请先新建组');
      return;
    }
    this.grouping = false;
    // 没在组里面，添加的
    const adds: string[] = [];
    this.groupSelected.forEach(o => {
      (!o.groups || !o.groups.includes(id))
      && adds.push(o._id);
    });
    // 在组里面，被取消的
    const subs: string[] = [];
    this.res.forEach(o => {
      o.groups && o.groups.includes(id)
      && !this.groupSelected.includes(o)
      && subs.push(o._id);
    });
    await axios({
      method: 'put',
      url: '/res/group/' + id,
      data: {adds, subs}
    });
    await this.reloadRes();
    this.refreshAvatar(id);
  }

  // 新建组信息
  newGroup () {
    this.$groupEdit.current = {};
    this.$groupEdit.show();
  }

  // 新增组信息后
  async newGroupAfter (e: any) {
    const groupRes = await this.loadGroup();
    this.groupList = groupRes.data;
    if (e.detail.message === 'add') {
      this.groupSelected = [];
    }
  }

  // 编辑组信息
  editGroupDetail () {
    const index = this.$groupingSelect.selectedIndex;
    this.$groupEdit.current = this.groupList[index];
    this.$groupEdit.show();
  }

  // 刷新封面
  refreshAvatar (id: string) {
    axios({
      method: 'put',
      url: '/resgroup/refresh/' + id,
    });
  }

  renderPercent (percent: any) {
    return html `<div class="file-percent" style="width: ${percent}%"></div>`
  }

  render () {
    const list = this.list.concat(this.res);
    return html `
      <style>${styles}</style>
      <div style="padding: 8px; position: relative;" class="${this.grouping ? 'grouping' : ''}">
        <div class="button-list">
          <a href="javascript:;" class="upload-btn top-btn">
            <i class="material-icons">add</i>
            <span>添加</span>
            <input type="file" id="file-input" multiple="multiple" @change=${this.loadFiles}>
          </a>
          <a href="javascript:;" class="top-btn" @click=${this.enterGroup}>
            <i class="material-icons">playlist_add</i>
            <span>分组</span>
          </a>
        </div>
        <div class="filter">
          <div class="filter-item">
            <select id="filter-type" @change=${() => this.reloadRes()}>
              <option value="">所有媒体</option>
              <option value="image">图片</option>
            </select>
          </div>
          <div class="filter-item">
            <select id="filter-group" @change=${() => this.reloadRes()}>
              <option value="">所有分组</option>
              ${this.groupList.map((item: any)=> html`
                <option value="${item._id}">${item.name}</option>
              `)}
            </select>
          </div>
        </div>
        <div class="group-wrap">
          <div class="group-box">
            <select id="grouping-select" @change=${(e: any) => this.groupingChange(e.target.value)}>
              ${this.groupList.map((item: any)=> html`
                <option value="${item._id}">${item.name}</option>
              `)}
            </select>
            <a href="javascript:;" class="group-btn" @click=${() => this.groupSelected = list}>全选</a>
            <a href="javascript:;" class="group-btn" @click=${this.newGroup}>新建</a>
            <a href="javascript:;" class="group-btn" @click=${this.editGroupDetail}>编辑</a>
            <a href="javascript:;" class="group-btn" @click=${this.saveGroupChange}>确定</a>
            <a href="javascript:;" class="group-btn" @click=${() => this.grouping = false}>取消</a>
          </div>
        </div>
        <ul class="file-list">
          ${list.map((item, index) => html `
            <li class="file-item 
              ${this.groupSelected.includes(item) ? 'group-selected' : ' '}
              ${item.width && item.width < item.height ? 'vertical' : ' '}
            " title="${item.filename}" @click=${() => this.editRes(item, index)}>
              <div class="file-wrap">
                <div class="file-abs">
                  <div class="centered">
                  ${item.type && item.type.slice(0, 5) === 'image' ? html `
                    <img src="${item.thumb || item.path}">
                  ` : html `
                    <img src="/assets/imgs/commons/file.png">
                  `}
                  </div>
                </div>
                ${item.type && item.type.slice(0, 5) === 'image' ? '' : html `
                  <div class="file-name">${item.filename}</div>
                `}
                ${item.percent > 0 && item.percent < 100 ? this.renderPercent(item.percent) : ''}
              </div>
            </li>
          `)}
        </ul>
        <pager-7 current="1"
          total="${this.total}"
          pagesize="${this.pagesize}"
          @change=${this.changePage}
          style="padding: 12px 0;"
          class="${this.grouping ? 'hide': ' '}"></pager-7>
      </div>
      <res-edit-7 id="res-edit" .file=${list[this.currentIndex]} @change=${this.changeFileIndex}></res-edit-7>
      <group-edit-7 id="group-edit" @updateafter=${this.newGroupAfter}></group-edit-7>
    `;
  }
}