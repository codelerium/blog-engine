const path = require('path');

module.exports = {
  entry: ['./frontend/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            'transform-async-to-generator',
            'syntax-async-functions',
            'babel-plugin-styled-components',
          ],
        }
      },
    ]
  }
}
