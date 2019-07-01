import page from 'page'
import { LitElement } from 'lit-element'

page('/page1', ctx => {
  document.querySelector('#app').innerHTML = ctx.path
})
page('/page2', ctx => {
  document.querySelector('#app').innerHTML = ctx.path
})
page('/page3', ctx => {
  document.querySelector('#app').innerHTML = ctx.path
})

Object.defineProperty(LitElement.prototype, '$page', {
  value: page
})

// declare namespace cats {
//   interface LitElement {
//     page: PageJS.Static
//   }
// }

export default page
