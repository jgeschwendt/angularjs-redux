const path = require('path');
const WebpackConfig = require('./webpack.config');

module.exports = {
  node: {
    __dirname: true,
    __filename: true,
  },
  devtool: 'source-map',
  module: {
    rules: WebpackConfig.module.rules,
  },
  resolve: {
    alias: {
      '@testing': path.resolve(process.cwd(), 'testing'),
      'the-cat-api': path.resolve(process.cwd(), 'packages/the-cat-api'),
    },
    modules: [
      'node_modules',
      'packages',
    ],
  },
};
