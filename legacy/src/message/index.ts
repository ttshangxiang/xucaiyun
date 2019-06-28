
import { LitElement, html, customElement, property, query } from 'lit-element';
import '../components/comment';
const styles = require('./style').toString();

@customElement('message-7')
export class Message7 extends LitElement {

  render () {
    return html `
      <style>${styles}</style>
      <comment-7 affiliated="message"></comment-7>
    `
  }
}