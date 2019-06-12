const path = require('path');

module.exports = {
  target: 'node',
  entry: ['./server.js'],
  output: {
    path: path.resolve(__dirname, '.server'),
    filename: 'server.bundle.js',
  },
}
