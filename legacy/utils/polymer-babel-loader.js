const jsTransform = require('polymer-build').jsTransform;
const loaderUtils = require('loader-utils');

module.exports = function(content, map, meta) {
  // 获取到用户给当前 Loader 传入的 options
  const options = loaderUtils.getOptions(this);
  return jsTransform(content, options);
  // return content;
};