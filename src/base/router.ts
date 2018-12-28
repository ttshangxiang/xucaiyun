
import * as queryString from 'query-string';
import {getIns} from './c';

import { LitElement, html, property, customElement } from '@polymer/lit-element';

/**路由静态方法 */
interface route {
  path: string,
  component: any,
  tag?: string
}
interface conf {
  routes: route[]
}
export class Router {

  /**保存路由标签 */
  static routes: Route[] = [];
  /**路由的query */
  static query: {[index: string]: string | string[]} = {};
  /**路由的params */
  static params: {[index: string]: string} = {};
  /**path */
  static path: string = '/';
  /**paths */
  static paths: string[] = [];
  /**conf */
  private static conf: conf;
  /**oldPath */
  static oldPath: string;

  /**初始化 */
  static init (conf: conf) {
    this.conf = conf;
    window.onpopstate = e => {
      if (window.location.pathname === this.oldPath) {
        return;
      }
      this.render();
    }
    setTimeout(() => this.render(), 0);
  }

  /**添加路由 */
  static push (path: string, title: string = '') {
    if (path === this.path) return;
    window.history.pushState(null, title, path);
    this.render();
  }

  /**路由切碎 */
  private static splitPath (path: string): string[] {
    if (path[0] === '/') {
      path = path.slice(1);
    }
    return path.split('/');
  }

  /**加载页面 */
  static render () {
    const {search, pathname} = window.location;
    this.oldPath = pathname;
    this.path = pathname;
    this.query = queryString.parse(search);
    this.paths = this.splitPath(pathname);
    const matchRoute = this.match();
    const ins = getIns('c-drawer');
    if (!matchRoute) {
      console.log('路由错误');
      ins.innerHTML = '路由错误';
      return;
    }
    if (typeof matchRoute.component === 'function') {
      matchRoute.component();
      ins.innerHTML = matchRoute.tag;
    } else {
      ins.innerHTML = matchRoute.component;
    }
    // 路由选中状态修改
      this.routes.forEach(o => {
      if (pathname === o.href || pathname !== '/' && pathname.includes(o.href)) {
        o.classList.add('mdc-list-item--activated');
        o.setAttribute('aria-selected', 'true');
        o.focus();
      } else {
        o.classList.remove('mdc-list-item--activated');
        o.setAttribute('aria-selected', 'false');
        o.blur();
      }
    });
  }

  /**匹配 */
  private static match (): route {
    const {routes} = this.conf;
    let route;
    let count = 0;
    this.params = {};
    routes.forEach(o => {
      const p = this.splitPath(o.path);
      if (p.length > this.paths.length) {
        return;
      }
      const result = p.every((s, i) => {
        if (s[0] === ':') {
          this.params[s.slice(1)] = this.paths[i];
          return true;
        }
        return s === this.paths[i];
      });
      if (result && count < p.length) {
        route = o;
        count = p.length;
      }
    });
    return route;
  }
}

/**路由标签 */
@customElement('c-route')
export class Route extends LitElement {

  @property({type: String}) href = '/';

  constructor () {
    super();
    Router.routes.push(this);
    this.addEventListener('click', e => {
      Router.push(this.href, this.title);
    });
  }
  render () {
    return html `<slot></slot>`;
  }
}
