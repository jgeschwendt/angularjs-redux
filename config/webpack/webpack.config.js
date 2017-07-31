const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const argv = require('minimist')(process.argv.slice(2));
const env = require('./addons/process.env');

module.exports = {
  context: process.cwd(),
  devServer: {
    contentBase: path.join(process.cwd(), "dist"),
    historyApiFallback: true,
    overlay: true,
  },
  devtool: 'source-map',
  entry: {
    app: [
      './src/index.js',
      './src/index.scss',
    ],
    vendor: [
      'angular',
      'angular-route',
      'angular-jk-rating-stars',
      'material-design-icons/iconfont/material-icons.css',
      './src/vendor/vendor.scss',
      './src/vendor/bootstrap/bootstrap.scss',
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(process.cwd(), './dist'),
    publicPath: '/angularjs-redux/',
  },
  resolve: {
    modules: [
      'packages',
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        test: /\.js$/,
        use: [
          { loader: 'eslint-loader',
            options: {
              failOnWarning: false,
              failOnError: false,
            },
          },
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'resolve-url-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },
      {
        exclude: /node_modules/,
        test: /\.html$/,
        use: [
          { loader: 'html-loader' },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name:'assets/[name].[ext]',
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(Object.keys(env).reduce((obj, key) => {
      obj[`process.env.${key}`] = JSON.stringify(env[key]);
      return obj;
    }, {})),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      allChunks: true,
      disable: (argv.hot),
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new StyleLintPlugin({
      emitErrors: false,
      failOnError: false,
      files: 'src/**/*.scss',
    }),
  ],
};
