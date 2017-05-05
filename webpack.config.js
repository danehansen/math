module.exports = {
  entry: {
    app: './src/math.js',
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
    ],
  },
  output: {
    filename: 'danehansen-math.min.js',
    library: ['danehansen', 'math'],
    libraryTarget: 'umd',
  },
}
