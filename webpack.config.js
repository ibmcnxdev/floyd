const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

config = {
  entry: './src/com_appfusions/floyd_core/core.global.js',
  output: {
    filename: 'core.global.js',
    path: path.resolve(__dirname, 'com_appfusions/floyd_core')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ]
};

module.exports = config;