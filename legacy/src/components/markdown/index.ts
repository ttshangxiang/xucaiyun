/**
 * markdown
 */

import { LitElement, html, customElement, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import * as MarkdownIt from 'markdown-it';
import * as hljs from 'highlight.js';

const md: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

const styles = require('./style').toString();

@customElement('markdown-7')
export class Markdown7 extends LitElement {
  @property({type: String}) content = '';

  get html () {
    return md.render(this.content);
  }

  render () {
    return html `
      <style>${styles}</style>
      <div class="markdown-body">${unsafeHTML(this.html)}</div>
    `
  }
}
