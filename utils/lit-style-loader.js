const loaderUtils = require('loader-utils');

module.exports = function(content, map, meta) {
  const options = loaderUtils.getOptions(this);
  return [
    "import {html} from '@polymer/lit-element/lit-element.js';",
    "",
    "export const style = html`<style>",
    content,
    "</style>`"
  ].join('\n');
};