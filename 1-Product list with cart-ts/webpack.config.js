// eslint-disable-next-line @typescript-eslint/no-require-imports
const { resolve } = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "public", "assets", "js"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig-front.json",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devtool: "source-map",
};
