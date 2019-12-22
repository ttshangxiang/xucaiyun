import { LitElement, html, customElement, property } from 'lit-element'

import '../../components/comment';
const styles = require('./style').toString();

@customElement('messages-7')
export default class Message7 extends LitElement {
  static tagName = 'Message7'
  render () {
    return html `
      <style>${styles}</style>
      <comment-7 affiliated="message"></comment-7>
    `
  }
}