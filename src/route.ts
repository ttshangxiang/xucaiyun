import page from 'page'
import { LitElement, customElement } from 'lit-element'
import layout from './pages/layout'
import ErrorPage from './pages/error'

interface Constructable<T> {
  new() : T;
}

interface LitElementE extends LitElement {
  setContent: (element: HTMLElement) => void;
  ctx?: PageJS.Context;
}

interface requireElement {
  default: Constructable<LitElement>
}

interface route {
  path: string;
  component: requireElement | Promise<requireElement>;
  wrapper?: Constructable<LitElementE>;
  noWapper?: Boolean;
  noCache?: boolean;
}

@customElement('route-7')
export class Route extends LitElement {

  // 挂载page
  page = page

  // wrappers 缓存框架
  wrappers: ({[index: string]: LitElementE}) = {}

  // caches 缓存页面
  caches: ({[index: string]: LitElementE}) = {}

  firstUpdated() {
    // 路由表
    const routes: route[] = [{
      path: '/', component: require('./pages/words')
    }, {
      path: '/words', component: import('./pages/words')
    }, {
      path: '/words/:id', component: import('./pages/words/view'), noCache: true
    }, {
      path: '/album', component: import('./pages/album')
    }, {
      path: '/album/:id', component: import('./pages/album/view'),
    }, {
      path: '/life', component: import('./pages/life')
    }, {
      path: '/messages', component: import('./pages/messages')
    }, {
      path: '/abouts', component: import('./pages/abouts')
    }, {
      path: '*', component: require('./pages/404')
    }]

    // 遍历路由
    routes.forEach(({path, component, wrapper, noWapper, noCache}) => {
      page(path, ctx => {
        new Promise((resolve, reject) => {
          if (component instanceof Promise) {
            component.then(value => {
              resolve(value.default)
            })
          } else {
            resolve(component.default)
          }
        }).then((Ele: Constructable<LitElementE>) => {
          if (noCache || !this.caches[Ele.name]) {
            this.caches[Ele.name] = new Ele()
          }
          const element = this.caches[Ele.name]
          // 传入路由对象
          element.ctx = ctx
          // 默认包裹
          if (!noWapper && !wrapper) {
            wrapper = layout;
          }
          if (wrapper) {
            if (!this.wrappers[wrapper.name]) {
              this.wrappers[wrapper.name] = new wrapper()
            }
            if (!this.shadowRoot.querySelector(this.wrappers[wrapper.name].tagName)) {
              this.setContent(this.wrappers[wrapper.name])
            }
            this.wrappers[wrapper.name].setContent(element)
            this.wrappers[wrapper.name].ctx = ctx
          } else {
            this.setContent(element)
          }
        }).catch(err => {
          console.log(err)
          this.setContent(new ErrorPage())
        })
      })
    })

    // 执行路由
    page()
  }
  
  setContent (element: HTMLElement) {
    this.renderRoot.childNodes.forEach(value => {
      this.renderRoot.removeChild(value)
    })
    this.renderRoot.appendChild(element)
  }
}

export default document.createElement('route-7');
