const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index_bundle.js"
  },
  optimization: {
    splitChunks: {
      minSize: 10000
    }
  },
  stats: { children: false },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    watchContentBase: true,
    //compress: true,
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(?:sass|scss)$/,
        use: [
          "style-loader",
          //MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            query: {
              includePaths: [
                path.resolve(__dirname, "node_modules/foundation-sites/scss")
              ]
            }
          },
          "postcss-loader",
          "sass-loader?outputStyle=compressed"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "app.css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
