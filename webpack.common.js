const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const resolve = path.resolve;

const resolve = function (s) {
  return path.resolve(__dirname, s);
}

const src = resolve('./src');
const dist = resolve('./dist');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    configFile: resolve('babel.config.js')
  }
};

module.exports = {
  entry: {
    load: './src/load.ts'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: dist,
    publicPath: '/'
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.js', '.scss'],
    alias: {
      src: src
    }
  },
  resolveLoader:{
    // 去哪些目录下寻找 Loader，有先后顺序之分
    modules: ['node_modules','utils'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-html|@polymer|@vaadin|@material)\/).*/,
        use: [babelLoader],
        include: [
          resolve('src'),
          resolve('node_modules/lit-html'),
          resolve('node_modules/@polymer'),
          resolve('node_modules/@material')
        ]
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [babelLoader]
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      // css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      // scss
      {
        test: /\.scss$/,
        use: [
          { loader: 'to-string-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            }
          }
        ]
      },
      // images
      {
        test: /\.(?:png|jpe?g|gif|ico)$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'images/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(?:woff2?|eot|ttf|otf|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([dist]),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      {from: 'node_modules/@webcomponents/webcomponentsjs/**/*', to: dist},
      {from: 'src/assets', to: path.resolve(dist, 'assets'), toType: 'dir'},
      {from: 'manifest', to: path.resolve(dist, 'manifest'), toType: 'dir'},
      {from: 'manifest.json', to: dist},
    ]),
    new ProgressBarPlugin()
  ]
};