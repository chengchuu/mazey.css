const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENTRY = process.env.ENTRY || 'unknown';
console.log(`ENTRY: ${ENTRY}`);

module.exports = {
  mode: 'production',
  entry: {
    [ENTRY]: `./src/z-temporary/${ENTRY}.js`
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // https://webpack.js.org/loaders/style-loader/#recommend
          // Do not use together style-loader and mini-css-extract-plugin.
          // https://stackoverflow.com/questions/52571793/error-in-using-the-webpack-mini-css-extract-plugin-plugin
          // mini-css-extract-plugin's loader only takes the output of css-loader as its input. 
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            // https://segmentfault.com/q/1010000009000432/a-1020000009000931
          },
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `${ENTRY}.css`,
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `lib/${ENTRY}.html`),
      template: path.resolve(__dirname, 'src/z-template/index.html'),
      inject: true,
      chunksSortMode: 'auto'
    }),
    new webpack.DefinePlugin({
      ENTRY: JSON.stringify(ENTRY),
    }),
  ],
};
