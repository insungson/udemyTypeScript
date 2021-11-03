/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

// 위와 같이 /// 3개를 하고 < />  이렇게 브라켓을 처리하고, 가져올 파일의 path 를 설정해주면 된다
// 그리고 namespace 를 전부 같게 처리해야하고 다른곳에서 사용된다면 export 를 앞에 붙여주면 된다
// 참고로 namespace 를 사용하기 전에 tsconfig.json 에서   "module": "amd"  로 바꿔줘야 한다.
// 참고로 namespace 에서 index.html 은 <script src="dist/bundle.js" defer></script> 가 들어가야 한다.

namespace App {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
