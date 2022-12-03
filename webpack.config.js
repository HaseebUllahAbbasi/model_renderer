const MiniHtmlWebpackPlugin = require("mini-html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.gltf$/,
        loader: "@vxna/gltf-loader",
        options: { inline: true }
      },
      {
        test: /\.(bin|png|jpe?g)$/,
        loader: "file-loader",
        options: {
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: {
        title: "@vxna/gltf-loader example",
        container: "root"
      },
      template: require("@vxna/mini-html-webpack-template")
    })
  ]
};
