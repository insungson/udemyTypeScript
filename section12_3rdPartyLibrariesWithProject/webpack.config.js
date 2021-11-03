const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  // devServer: {
  //   proxy: {
  //     "/": {
  //       target: "http://localhost:8080",
  //       changeOrigin: true,
  //     },
  //   },
  //   // https: true,
  //   // headers: {
  //   //   "Access-Control-Allow-Origin": "*",
  //   //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  //   //   "Access-Control-Allow-Headers":
  //   //     "X-Requested-With, content-type, Authorization",
  //   // },
  // },
};
