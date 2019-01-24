
import { LitElement, html, customElement } from 'lit-element';
import Router from '../base/router';

import './drawer';
import './header';
import './content';
import '../home';
import { getIns } from '../base/c';
const style = require('./style').toString();


@customElement('layout-7')
export class Layout extends LitElement {

  render(){
    return html `
      ${this.myStyles}
      ${this.router}
      <xcy-header id="header-7"></xcy-header>
      <xcy-drawer id="drawer-7">
        <content-7 id="content-7"></content-7>
      </xcy-drawer>
    `;
  }

  get myStyles () {
    return html`<style>${style}</style>`;
  }

  firstUpdated () {
    Router.root = this.shadowRoot.getElementById('content-7');
    Router.activeClass = 'mdc-list-item--activated';
    Router.dynamic = {
      'albums-7': () => import('../albums'),
      'album-7': () => import('../albums'),
      'photo-7': () => import('../albums'),
      'album-add-7': () => import('../albums/addAlbum'),
      'photo-add-7': () => import('../albums/addPhoto')
    };
    Router.after = (route) => {
      const button = route.getAttribute('button') || 'menu';
      getIns('header-7').button = button;
      const drawer = getIns('drawer-7');
      if (drawer.mode === 'modal') {
        drawer.mdcDrawer.open = false;
      }
    }
  }

  get router () {
    return html `
      <router-7 id="router-7">
        <route-7 path="/" tag="home-7"></route-7>
        <route-7 path="/albums" tag="albums-7"></route-7>
        <route-7 path="/albums/:albumId"
          tag="album-7"
          button="back"></route-7>
        <route-7 path="/albums/:albumId/:photoId"
          tag="photo-7"
          button="back"></route-7>
        <route-7 path="/albums/add"
          tag="album-add-7"
          button="back"></route-7>
        <route-7 path="/albums/:albumId/add"
          tag="photo-add-7"
          button="back"></route-7>
      </router-7>
    `;
  }
}
