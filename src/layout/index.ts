
import { LitElement, html, customElement, property } from 'lit-element';
import Router from '../base/router';
import '../components/button';

import './header';
import './drawer';
import '../home';
import axios from '../base/axios';

const styles = require('./style').toString();

@customElement('layout-7')
export class Layout7 extends LitElement {

  @property ({type: Boolean}) drawerOpen = document.body.clientWidth > 599;
  @property ({type: Object}) route = {content: ''};
  @property ({type: String}) routeName = '';

  firstUpdated () {
    Router.root = this;
    Router.activeClass = 'active';
    Router.dynamic = {
      'albums-7': () => import(/* webpackChunkName: "albums" */'../albums'),
      'album-7': () => import(/* webpackChunkName: "albums" */'../albums'),
      'res-7': () => import(/* webpackChunkName: "res" */'../res'),
      'words-7': () => import(/* webpackChunkName: "words" */'../words'),
      'page-7': () => import(/* webpackChunkName: "page" */'../words/page'),
      'message-7': () => import(/* webpackChunkName: "message" */'../message'),
      'me-7': () => import(/* webpackChunkName: "me" */'../me'),
      'shengya-7': () => import(/* webpackChunkName: "shengya" */'../shengya'),
      'shengyap-7': () => import(/* webpackChunkName: "shengyap" */'../shengya/page'),
      'shengyaa-7': () => import(/* webpackChunkName: "shengyaa" */'../shengya/manage')
    };
    Router.before = (path) => {
      // 加锁
      if (path === '/res' || path === '/shengyaa') {
        return new Promise(resolve => {
          const password = prompt('密码');
          axios({
            method: 'post',
            url: '/res/password',
            data: {password}
          }).then(res => {
            resolve(res.data.code === 0);
          }).catch(e => {
            resolve(false);
          });
        });
      }
      return true;
    }
    Router.after = (route) => {
      this.routeName = route.name;
    }

    // 提前加载
    setTimeout(() => {
      import(/* webpackChunkName: "page" */'../words/page');
    }, 500);
  }

  get router () {
    return html `
      <router-7 id="router-7">
        <route-7 path="/" tag="shengya-7" name="T_T"></route-7>
        <route-7 path="/albums" tag="albums-7" name="相册"></route-7>
        <route-7 path="/albums/:albumId"
          tag="album-7"
          button="back" name="相册"></route-7>
        <route-7 path="/res" tag="res-7" name="资源"></route-7>
        <route-7 path="/words" tag="words-7" name="文章"></route-7>
        <route-7 path="/words/:wordsId" tag="page-7" name="文章"></route-7>
        <route-7 path="/message" tag="message-7" name="留言"></route-7>
        <route-7 path="/me" tag="me-7" name="我"></route-7>
        <route-7 path="/shengya" tag="shengya-7" name="生涯"></route-7>
        <route-7 path="/shengya/:shengyaId" tag="shengyap-7" name="生涯"></route-7>
        <route-7 path="/shengyaa" tag="shengyaa-7" name="生涯a"></route-7>
      </router-7>
    `;
  }

  render(){
    const route: any = this.route;
    return html `
      <style>${styles}</style>
      <header-7 class="header" @drawer=${() => this.drawerOpen = !this.drawerOpen} name="${this.routeName}"></header-7>
      <drawer-7 ?drawer="${this.drawerOpen}" @drawer=${() => this.drawerOpen = !this.drawerOpen} name="${this.routeName}"></drawer-7>
      <div id="content" class="content ${this.drawerOpen ? 'drawer' : ''}">
        ${route.error ? html `错误：${route.error.message}` : route.content}
      </div>
      ${this.router}
    `;
  }
}
