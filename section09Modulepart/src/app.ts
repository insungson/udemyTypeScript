import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

// 이렇게 처리하면 역시  tsconfig.json 에서 "module": "es2015"   로 바꿔줘야 한다
// 모듈에선 index.html 에서 <script type="module" src="dist/app.js"></script> 이렇게 처리해줘야 한다!

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
