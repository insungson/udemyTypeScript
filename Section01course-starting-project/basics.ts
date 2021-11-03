// 모든 타입들 정리해 놓음
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  const result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
    //이렇게 할 경우 Result is: 7.8
  }
  return n1 + n2;
}

function add1(n1: number, n2: number, showResult: boolean, phrase: string) {
  if (showResult) {
    console.log(phrase + n1 + n2);
    //이렇게 할 경우 Result is: 52.8  가 나온다.
  }
  return n1 + n2;
}

//아래와 같이 미리 변수의 타입을 정하면 사전에 에러를 발견할 수 있다.
let number1: number;
number1 = 5;
const number2 = 2.8;
const printResult = true;
let resultPrase = "Result is: ";
// resultPrase = 4;
// 변수선언하면서 값을 넣을땐 이미 그 타입으로 인식이 되기 때문에 다른 타입을 넣으면 에러가 뜬다!

add(number1, number2, printResult, resultPrase);
add1(number1, number2, printResult, resultPrase);
