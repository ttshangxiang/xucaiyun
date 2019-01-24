module.exports = function (api) {
  api.cache(false);
  // var env = api.cache(() => process.env.NODE_ENV);
  const presets = [
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'usage',
      exclude: ['babel-plugin-transform-classes']
    }],
    // '@babel/preset-typescript'
  ];
  const plugins = [
    'dynamic-import-webpack',
    // '@babel/plugin-syntax-dynamic-import',
    // '@babel/plugin-syntax-typescript',
    // ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    // ['@babel/plugin-proposal-class-properties', { 'loose' : true }],
    '@babel/plugin-transform-classes',
    ['@babel/plugin-transform-runtime', {
      corejs: 2
    }]
  ];

  return {
    presets,
    plugins
  };
}