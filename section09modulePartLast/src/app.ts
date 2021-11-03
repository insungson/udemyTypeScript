import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

new ProjectInput();
new ProjectList("active");
new ProjectList("finished");

// project-input.ts 에서 export default 로 보낸걸 import 로 받은 것, as 를 사용하여 변수명을 바꾼것
