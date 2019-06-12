const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: ['./server.js'],
  output: {
    path: path.resolve(__dirname, '.server'),
    filename: 'server.bundle.js',
  },
}
