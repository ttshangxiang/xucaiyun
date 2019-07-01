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
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose' : true }],
    ['@babel/plugin-transform-runtime', { corejs: 2, useESModules: true }]
  ];

  return {
    presets,
    plugins
  };
}