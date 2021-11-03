const path = require("path"); // 노드의 경로 관련 라이브러리 사용!

//웹팩의 export import 는 NodeJS 방식을 따른다
// package.json 에서 "start": "webpack-dev-server",  로 바꿔서 할 경우 localhost: 8080 으로 접근해야 한다
module.exports = {
  mode: "development", // 개발모드로 디버깅이나 다른 개발에 필요한 정보들을 많이 제공해준다
  entry: "./src/app.ts",
  output: {
    filename: "bundle.js", // 'bundle.[contenthash].js' // 로 정의하면 빌드할때 다이네믹한 파일명을 가져갈 수 있다.
    path: path.resolve(__dirname, "dist"), // dist 는 tsconfig.json 에서 설정한 폴더명이다, __dirname 는 현재 폴더라는 의미이다.
    publicPath: "dist", // dist로 설정해줘야 한다.
  },
  devtool: "inline-source-map", //개발자모드에서 해당 파일의 번들링 된 소스맵을 보여줄수 있게 해준다.
  module: {
    rules: [
      {
        test: /\.ts$/, // 정규식으로 ts 파일을 찾는다
        use: "ts-loader", // ts-loader 라이브러리를 사용한다는 의미
        exclude: /node_modules/, // node_modules 폴더에는 적용시키지 않는다는 의미
      },
    ],
  },
  resolve: {
    // 해당 파일을 import 할때 파일확장자를 없애도 동작하게 해준다.
    extensions: [".ts", ".js"],
  },
};

// 아래의 웹팩링크 참조!
// https://webpack.js.org/

// 아래의 라이브러리로 webpack 설정을 하였다.
// "webpack": "^4.41.2",  // 번들링 및 타입스크립트 -> 자바스크립트(버전설정 가능!) 로 변경해준다
// "webpack-cli": "^3.3.10",  // 웹팩의 커맨드 입력이 가능하게 만들어준다.
// "webpack-dev-server": "^3.9.0" // 웹팩을 통해 컴파일 파일을 바꿔준다
