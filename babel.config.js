module.exports = function (api) {
  api.cache(false);
  // var env = api.cache(() => process.env.NODE_ENV);
  const presets = [
    '@babel/preset-env',
    '@babel/preset-typescript'
  ];
  const plugins = [
    '@babel/plugin-transform-typescript'
  ];

  return {
    presets,
    plugins
  };
}