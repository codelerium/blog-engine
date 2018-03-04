const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node',
  node: {
    __dirname: true,
  },
  externals: [nodeExternals()],
  entry: ['babel-polyfill', './api/api.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-0'],
          plugins: [
            'transform-async-to-generator',
            'syntax-async-functions',
          ],
        }
      }
    ]
  }
}
