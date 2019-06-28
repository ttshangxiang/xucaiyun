const path = require('path');

const resolve = function (s) {
  return path.resolve(__dirname, s);
}
const src = resolve('../src');
const glob = require('glob');

var entry = glob.sync(src + '/**/*.scss');

module.exports = {
  mode: 'production',
  entry: entry,
  output: {
    path: src
  },
  resolve: {
    extensions: ['.scss'],
    alias: {
      src: src
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: function (file) {
                return path.relative(src, file).replace('.scss', '-css.ts');
              }
            }
          },
          { loader: resolve('../utils/lit-style-loader.js') },
          // { loader: 'extract-loader' },
          // { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            }
          },
        ]
      },
      // images
      {
        test: /\.(?:png|jpe?g|gif|ico)$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'dist/images/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(?:woff2?|eot|ttf|otf|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'dist/images/[name].[hash:8].[ext]'
        }
      }
    ]
  }
}