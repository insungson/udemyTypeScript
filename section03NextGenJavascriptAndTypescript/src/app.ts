// Code goes here!
let age = 30;

age = 29;

function add(a: number, b: number) {
  let result;
  result = a + b;
  return result;
}

if (age > 20) {
  var isOld = true;
}

// console.log(isOld);
// // var 은 자바스크립트에서 전역으로 정의되기 때문에
// 스코프에 상관없이 코드가 동작하지만..
// typeScript 에선 위와 같이 에러가 뜨게 된다!

// // 화살표 함수 사용법
const add1 = (a: number, b: number = 1) => a + b; //defaultvalue 넣음
const printOutPut: (a: number | string) => void = (output) =>
  console.log(output);
const button = document.querySelector("button");

if (button) {
  button.addEventListener("click", (event) => console.log(event));
}

printOutPut(add1(5));

// // 한번에 input parameters 을 받는 함수의 처리방법
// input parameter 타입을 아래와 같이 처리하는게 신기했다..
// number[] 숫자로 이뤄진 배열을 ... 했으니 당연한거다...
const add2 = (...numbers: number[]) => {
  // input parameter를 튜플타입으로 받을 수도 있다!!!
  // ...numbers: [number, string, string]]  이런식으로 처리해도 된다!
  return numbers.reduce((prevVal, curVal) => {
    return prevVal + curVal;
  }, 0);
};

const addedNumbers = add2(5, 10, 2, 3.7);
console.log("addedNumbers: ", addedNumbers);

// 재밌는 점은 tsconfig.json 에서 es5 로 바꾸면 spread 형식이나 다른 방법들이
// es5에 맞게 자바스크립트 코드가 생성된다는 것이다..
