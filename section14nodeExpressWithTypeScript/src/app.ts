// ts-node (노드에서 타입스크립트 사용하기 위해 쓰이는 라이브러리)
// https://www.npmjs.com/package/ts-node

// tsconfig.json 에서  "moduleResolution": "node",   로 node 로 설정하면, import 등 노드로 import export 할 수 있다.
// body-parser 는 http post 방식으로 요청이 올때 req.body 를 파싱해준다.

// 아래의 import 방식에서 에러 발생을 막기 위해  npm types node 로, npm types express  해당 노드 타입, express 타입에 대한 라이브러리를 설치해줘야 한다.
// https://www.npmjs.com/package/@types/node
// https://www.npmjs.com/package/@types/express
import express, { Request, Response, NextFunction } from "express"; //import syntax 는 es module 브라우저에서 적용되는건데 node 에서도 사용할 수 있다.
// 앞서 말한듯이... ts 파일이 실행되는게 아니라 ts 파일을 컴파일한 js 파일이 실행되는 것이다.
import { json } from "body-parser";
import todoRoutes from "./routes/todos";

// 위에서 express 의 타입을 불러와서 express().use() 를 사용한 미들웨어의 타입으로 사용이 가능하다!!
const app = express();

app.use(json());

app.use("/todos", todoRoutes);

// 아래의 4개 인자를 받는 함수는 express 에서 에러핸들링하는 방법의 미들웨어이다.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
// Express의 미들웨어 핸들링은 아래의 링크를 참조하면 된다.
// http://expressjs.com/en/guide/using-middleware.html

app.listen(3000);
