const loaderUtils = require('loader-utils');

module.exports = function(content, map, meta) {
  const options = loaderUtils.getOptions(this);
  Object.keys(options).forEach(o => {
    const reg = new RegExp(o, 'gi');
    content = content.replace(reg, options[o]);
  });
  return content;
};
