const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: ['./server.js'],
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'server.bundle.js',
  },
  node: {
    __dirname: false,
    __filename: false,
  }
}
