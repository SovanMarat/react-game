const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
devtool: 'eval-source-map',
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index-bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(jpg|png|gif|svg|wav|mp3)$/i,
       use: ['file-loader'],
       },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};