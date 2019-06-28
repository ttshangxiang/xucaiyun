const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const src = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './dist');

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
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.js', '.scss', '.css'],
    alias: {
      src: src
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [babelLoader]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [babelLoader]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      // css
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader', 'postcss-loader']
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
    ])
  ]
};