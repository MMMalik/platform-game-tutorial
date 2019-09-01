const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.ts",
  mode: isProd ? "production" : "development",
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{ loader: "awesome-typescript-loader" }],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: "app.[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html")
    }),
    // Pixi will manage game asset loading, so we just need to copy them.
    // Webpack will not be involved in bundling.
    new CopyPlugin([{ from: "src/assets", to: "assets" }])
  ]
};
