const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    stats: {colors: true},
    host: 'localhost',
    historyApiFallback: true, // 配合BrowserRouter
    proxy: {
      '/api': {
          target: 'http://localhost:3000',
          secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});