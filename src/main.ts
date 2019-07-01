
import { LitElement } from 'lit-element'
import page from './route'

// declare var window: Window & { isWeixin: boolean }
declare global {
  interface LitElement {
    $page: PageJS.Static
  }
}
Object.defineProperty(LitElement.prototype, '$page', {
  value: page
})

document.body.append(document.createElement('main-7'))
page();
