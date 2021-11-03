// app.ts 에서처럼 req, res, next 전부 따로 타입을 설정해도 되지만..
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).json({ message: err.message });
// });
// 이렇게 처리히면 너무 조잡하기 때문에 express 에서 아래와 같이 RequestHandler 로 타입을 정해줄 수 있다.
// (RequestHandler 내부에서 input의 순서대로 해당 타입을 정해준다)  npm type express 을 설치했으므로 해당 타입이 읽힌다.
import { RequestHandler } from "express"; // Express에서 제공하는 Request함수의 인터페이스 타입이다.
import { Todo } from "../models/todo";

const ToDos: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text; // 기존의 req.body.text 를  이와같이 타입캐스팅을(as {}) 통해 타입을 정해줄 수 있다!.
  // 여기서 req.body 로 인식되기 위해선 app.ts 에서 bodyParser 의 json() 함수를 use() 를 사용한 미들웨어로 연결해준다!
  const newTodo = new Todo(Math.random().toString(), text);
  console.log("newTodo: ", newTodo);

  ToDos.push(newTodo);

  res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: ToDos });
};

// <<쿼리스트링 타입설정방법>>
// ?id  같이 queryString 으로 받을땐 아래의 주석처럼 queryString의 id 타입을 설정하면 된다.
// app.use(express.query({}));    를 app.ts 에서 설정해주고,
// 해당 라우터.ts 의 라우터메서드에서 아래와 같이 query의 타입을 설정해준다.
// router.get('/:foo', (req: express.Request<{}>, res, next, {id: string}) => {const id = req.query.id})  //req.query.id 로 접근하면 된다!
// <<동적라우팅 params 타입설정방법>>
// :id  같이 dynamic route로 받을땐 아래와 같이 params의 타입을 설정하면 된다.
// router.get('/:foo/:bar', (req: express.Request<{foo: string, bar: number}> ,any, any) => {const foo = req.params.foo}) //req.params.foo 로 접근하면 된다!
// <<RequestHandler 를 사용하여 라우트핸들러의 타입을 설정할 경우>>
// export const someHandler: express.RequestHandler<{}, any, any, {foo: string}> = (req, res, next) => next();
// RequestHandler에 들어가는
//    1번째인자: dynamic route의 params 변수 타입 설정,
//    2번째인자: ResBody 타입설정
//    3번째인자: ReqBody 타입설정
//    4번째인자: ReqQuery 의 쿼리 변수 타입 설정
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const updatedText = (req.body as { text: string }).text;

  const todoIndex = ToDos.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find todo!");
  }

  ToDos[todoIndex] = new Todo(ToDos[todoIndex].id, updatedText);

  res.status(201).json({ message: "Updated", updatedTodo: ToDos[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = ToDos.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find todo!");
  }

  ToDos.splice(todoIndex, 1);

  res.json({ message: "Todo deleted!" });
};
