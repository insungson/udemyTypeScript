const userName = "Sonny1212";
console.log("userName: ", userName);
// tsc app.ts -w
// 위의 명령어처럼 -w  는 watch 모드로 파일을 저장하면 자동으로 ts -> js 파일로 컴파일 해준다!
// tsc --init
// 위의 명령어는 tsconfig.json 파일을 만들어준다
// tsc
// tsc --watch
// tsc --init 명령어로 tsconfig.json 파일을 만들고 위의 두 명령어를 입력하면 해당 폴더의 모든 ts 파일을 컴파일 해준다!

const button = document.querySelector("button")!; // 버튼이 있다는게 확실하면 !
button.addEventListener("click", () => {
  // 아리까리하면 button?.addEventListener() 로 처리해준다
  console.log("Clicked");
});

// tsconfig.json 의 다른 참조 링크
// https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
// ts컴파일러 config 에 대한 참조 링크 (커맨드로 하는 컴파일러)
// https://www.typescriptlang.org/docs/handbook/compiler-options.html
// VScode 툴을 사용한 디버깅 참조 링크
// https://code.visualstudio.com/docs/typescript/typescript-debugging
