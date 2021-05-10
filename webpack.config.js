const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: "development", // "production",
  entry: path.resolve(__dirname, './src/index.ts'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  // plugins: [
  //   new webpack.SourceMapDevToolPlugin({}),
  // ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'turn-on.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
