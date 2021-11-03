const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

// webpack 의 디폴트는 webpack.config.json 이므로, 현재 파일의 webpack 설정을 사용하기 위해선
// package.json 에서 "build": "webpack --config webpack.config.prod.js"  로 설정하여
// --config 해당 파일   로 설정하여 해당 파일을 실행시켜주면 된다.
module.exports = {
  mode: "production", // 배포이므로 production 으로 바꿔준다
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "none", //
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new CleanPlugin.CleanWebpackPlugin()], // 액스트라 extension 이라 생각하면 된다.
  // https://www.npmjs.com/package/clean-webpack-plugin   에서 참조하듯 npm i clean-webpack-plugin  로 설치해줘야한다.
  // 해당 라이브러리는 웹팩으로 리빌드 해줄때 기존의 빌드된 파일을 삭제해준다.
  // 위의 output 속성으로 나오는 부분의 파일을 깨끗하게 처리해준다.
};
