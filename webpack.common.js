const path = require('path');

module.exports = {
  entry: {
    app: './src/math.ts',
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        exclude: [/node_modules/],
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
        }],
      },
    ],
  },
  output: {
    filename: 'danehansen-math.min.js',
    globalObject: 'this',
    library: ['danehansen', 'math'],
    libraryTarget: 'umd',
    path: __dirname,
  },
}
