
import { LitElement, html, customElement, property } from 'lit-element';
import Router from '../base/router';
import '../components/button';

import './header';
import './drawer';

const styles = require('./style').toString();

@customElement('layout-7')
export class Layout7 extends LitElement {

  @property ({type: Boolean}) drawerOpen = true;
  @property ({type: Object}) route = {content: ''};
  @property ({type: String}) routeName = '';

  firstUpdated () {
    Router.root = this;
    Router.activeClass = 'active';
    Router.dynamic = {
      'albums-7': () => import('../albums'),
      'album-7': () => import('../albums'),
      'res-7': () => import('../res')
    };
    Router.after = (route) => {
      this.routeName = route.name;
    }
  }

  get router () {
    return html `
      <router-7 id="router-7">
        <route-7 path="/" tag="home-7" name="T_T"></route-7>
        <route-7 path="/albums" tag="albums-7" name="相册"></route-7>
        <route-7 path="/albums/:albumId"
          tag="album-7"
          button="back" name="相册"></route-7>
        <route-7 path="/res" tag="res-7" name="资源"></route-7>
        <route-7 path="/words" tag="words-7" name="文章"></route-7>
      </router-7>
    `;
  }

  render(){
    const route: any = this.route;
    return html `
      <style>${styles}</style>
      <header-7 class="header" @drawer=${() => this.drawerOpen = !this.drawerOpen} name="${this.routeName}"></header-7>
      <drawer-7 ?drawer="${this.drawerOpen}" @drawer=${() => this.drawerOpen = !this.drawerOpen}></drawer-7>
      <div id="content" class="content ${this.drawerOpen ? 'drawer' : ''}">
        ${route.error ? html `错误：${route.error.message}` : route.content}
      </div>
      ${this.router}
    `;
  }
}
