module.exports = function (api) {
  api.cache(false);
  // var env = api.cache(() => process.env.NODE_ENV);
  const presets = [
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'usage',
      exclude: ['babel-plugin-transform-classes']
    }],
  ];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
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