const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const src = path.resolve(__dirname, '../src');
const dist = path.resolve(__dirname, '../dist');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    configFile: path.resolve(__dirname, '..', 'babel.config.js')
  }
};

module.exports = {
  entry: {
    main: './src/main.ts'
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: dist,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.scss', '.css'],
    alias: {
      src: src
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [babelLoader],
        include: [
          src,
          path.resolve(__dirname, '../node_modules/lit-html'),
          path.resolve(__dirname, '../node_modules/lit-element'),
          path.resolve(__dirname, '../node_modules/@material')
        ]
      },
      {
        test: /\.ts$/,
        use: [babelLoader],
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules/
      },
      // css
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      },
      // sass
      {
        test: /\.scss$/,
        use: [
          'to-string-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '../node_modules/')]
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([
      {from: 'src/assets/fonts', to: path.resolve(dist, 'assets', 'fonts'), toType: 'dir'},
      {from: 'src/assets/styles', to: path.resolve(dist, 'assets', 'styles'), toType: 'dir'},
    ])
  ]
};