import page from 'page'
import { LitElement, customElement } from 'lit-element'
import layout from './pages/layout'

interface Constructable<T> {
  new() : T;
}

interface LitElementE extends LitElement {
  setContent: (element: HTMLElement) => void;
}

@customElement('route-7')
export class Route extends LitElement {

  // 挂载page
  page = page

  // wrappers 缓存框架
  wrappers: ({[index: string]: LitElementE}) = {}

  // caches 缓存页面
  caches: ({[index: string]: LitElement}) = {}

  firstUpdated() {
    // 路由表
    const routes = [{
      path: '/app', component: require('./pages/app'), wrapper: layout
    }, {
      path: '/page2', component: import('./pages/page2')
    }, {
      path: '*', component: require('./pages/404')
    }]

    // 遍历路由
    routes.forEach(({path, component, wrapper}) => {
      page(path, ctx => {
        new Promise((resolve, reject) => {
          if (component instanceof Promise) {
            component.then(value => {
              resolve(value.default)
            })
          } else {
            resolve(component.default)
          }
        }).then((Ele: Constructable<LitElement>) => {
          if (!this.caches[Ele.name]) {
            this.caches[Ele.name] = new Ele()
          }
          const element = this.caches[Ele.name]
          if (wrapper) {
            if (!this.wrappers[wrapper.name]) {
              this.wrappers[wrapper.name] = new wrapper()
            }
            if (!this.shadowRoot.querySelector(wrapper.name)) {
              this.setContent(this.wrappers[wrapper.name])
            }
            this.wrappers[wrapper.name].setContent(element)
            this.wrappers[wrapper.name]
          } else {
            this.setContent(element)
          }
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
