import { LitElement, html, property, customElement } from 'lit-element';
/**
 * querystring to object
 * @param s querystring
 */
function queryString (s: string) {
  const result: any = {};
  if (!s) {
    return result;
  }
  s = s.replace(/[\#\?]/g, '');
  s.split('&').forEach(a => {
    const r = a.split('=');
    const k = r[0];
    const v = r[1] || '';
    if (result[k]) {
      result[k] = [].concat(result[k]).concat(v);
    } else {
      result[k] = v;
    }
  });
  return result;
}

/**
 * 分割path
 * @param path 
 */
function splitPath (path: string): string[] {
  if (path[0] === '/') {
    path = path.slice(1);
  }
  return path.split('/');
}

/**
 * 匹配路由
 * @param path 
 * @param routes 
 * @returns route: 匹配到的路由, params: 模糊匹配参数
 */
function matchPath (path: string, routes: Route[]): {route: Route, params: any} {
  const result: any = {
    route: null,
    params: {}
  };
  const paths = splitPath(path);
  // 当前最大匹配值
  let max = 0;
  routes.forEach(o => {
    const p = splitPath(o.url);
    // 当前路径比路由长
    if (p.length > paths.length) {
      return;
    }
    // 精确匹配，但长度不一样
    if (o.exact && p.length !== paths.length) {
      return;
    }
    // 匹配数值
    let heavy = 0;
    const r = p.every((s, i) => {
      // 模糊匹配，匹配数值为0.99
      if (s[0] === ':') {
        result.params[s.slice(1)] = paths[i];
        heavy += 0.99;
        return true;
      }
      // 精确匹配，匹配数值1
      if (s === paths[i]) {
        heavy += 1;
        return true;
      }
      return false;
    });
    if (r && max < heavy) {
      result.route = o;
      max = heavy;
    }
  });
  return result;
}

@customElement('router-7')
class Router extends LitElement {
  // root
  static root: any = document.body;
  // 存储路由
  static routes: Route[] = [];
  // 存储link
  static links: Link[] = [];
  // query
  static query: any = {};
  // params
  static params: any = {};
  // path
  static get path () {
    const href = window.location.href;
    const origin = window.location.origin;
    return href.replace(origin, '');
  }
  // dynamic
  static dynamic: {[index: string]: () => Promise<any>} = {};
  // unique
  static unique: number;
  // activeClass
  static activeClass: string = 'actived';
  static before: (path: string) => boolean = () => true;
  static after: (route: Route) => any = () => null;

  firstUpdated () {
    Router.renderRoute();
  }
  static push (path: string, title: string = '') {
    if (!this.before(path)) return;
    if (path === this.path) return;
    window.history.pushState(null, title, path);
    this.renderRoute();
  }
  static replace (path: string, title: string = '') {
    if (!this.before(path)) return;
    if (path === this.path) return;
    window.history.replaceState(null, title, path);
    this.renderRoute();
  }
  static back () {
    window.history.back();
  }
  static async renderRoute () {
    // 匹配路径
    const {route, params} = matchPath(this.path, this.routes);
    if (!route) {
      this.root.route = {content: '404'};
      return;
    }
    // 路由params
    this.params = params;
    // 路由query
    const {search} = window.location;
    this.query = queryString(search);
    // 多次异步时，判定执行最后一次
    const unique = new Date().getTime();
    this.unique = unique;
    // 结果
    let result: any = {};
    const tagElement = document.createElement(route.tag);
    tagElement.setAttribute('hidden', '');
    result.content = tagElement;
    // 异步路由加载状态
    this.root.pedding = false;
    if (this.dynamic[route.tag]) {
      this.root.pedding = true;
      try {
        await this.dynamic[route.tag]();
      } catch (error) {
        console.error(error);
        result.error = error;
      } finally {
        // 多次异步时，只执行最新的
        if (this.unique === unique) {
          this.root.pedding = false;
        } else {
          return;
        }
      }
    }
    this.root.route = result;
    this.selected();
    this.after(route);
  }
  static selected () {
    // 路由选中状态修改
    this.links.forEach(o => {
      if (!o.path || o.getAttribute('role') !== 'nav') return;
      const n = o.path.length;
      const pathname = window.location.pathname;
      if (pathname === o.path || (o.path !== '/' && pathname.slice(0, n) === o.path)) {
        o.classList.add(Router.activeClass);
        o.focus();
      } else {
        o.classList.remove(Router.activeClass);
        o.blur();
      }
    });
  }
  render () {
    return html `<slot></slot>`;
  }
}
// 监听popstate
window.addEventListener('popstate', () => {
  Router.renderRoute();
});

@customElement('route-7')
class Route extends LitElement {
  @property({type: String}) path = '';
  @property({type: String}) tag = '';
  @property({type: Boolean}) exact = false;
  @property({type: String, reflect: true}) base = '';
  @property({type: Boolean}) dynamic = false;
  // 最终url
  url = '';
  constructor () {
    super();
    Router.routes.push(this);
  }
  updated () {
    this.url = (this.base + '/' + this.path).replace(/\/+/g, '/');
    for (const child of this.children) {
      child instanceof Route && (child.base = this.url);
    }
  }
  render () {
    return html `<slot></slot>`;
  }
}

@customElement('link-7')
class Link extends LitElement {
  @property({type: String}) path = '';
  constructor () {
    super();
    Router.links.push(this);
    this.addEventListener('click', this.click.bind(this));
  }
  render () {
    return html `<slot></slot>`;
  }
  click () {
    if (!this.path) {
      return;
    }
    if (this.path === 'outside') {
      Router.root.route = {content: '跳转中...'};
      return;
    }
    Router.push(this.path);
  }
}

export default Router;
