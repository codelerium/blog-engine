const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './frontend/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-async-to-generator', 'syntax-async-functions',],
        }
      }
    ]
  }
}
