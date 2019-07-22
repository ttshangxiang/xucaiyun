import { LitElement, css, unsafeCSS, html, query, customElement } from "lit-element";
const styles = require('./edit.scss')

import Editor from 'tui-editor'

@customElement('word-edit-7')
export default class wordEdit extends LitElement {

  @query('#editSection') $edit: HTMLElement

  static get styles() {
    return css`
      ${unsafeCSS(styles)}
    `
  }

  firstUpdated () {
    const editor = new Editor({
      el: this.$edit,
      initialEditType: 'markdown',
      previewStyle: 'tab',
      height: '300px'
    });
  }

  render () {
    return html `
      <div id="editSection"></div>
    `
  }

}