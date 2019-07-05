module.exports = function (api) {
  api.cache(false);
  // var env = api.cache(() => process.env.NODE_ENV);
  const presets = [
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'usage',
      corejs: 2
    }],
    '@babel/preset-typescript'
  ];
  const plugins = [
    '@babel/plugin-transform-typescript',
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
    ['@babel/plugin-proposal-class-properties', { 'loose' : true }],
    ['@babel/plugin-transform-runtime', { corejs: 2, useESModules: true }]
  ];

  return {
    presets,
    plugins
  };
}