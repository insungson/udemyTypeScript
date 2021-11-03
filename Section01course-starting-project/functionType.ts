//함수형 타입의 리턴 타입 설정 void 사용법!
// void we say that there is no return value expected from that function.
// void 는 함수의 리턴 값이 없는것을 예상하고 넣은 것이고, (하지만 void 로 하고 return 값을 줘도 에러가 뜨진 않는다.리턴의 타입 예상이기 때문이다.)
// any we can circumvent TS' type checking mechanism (so that it works like normal JS). In this case you say that the type of the return value doesn't matter.
// any 는 보통 JS 처럼 타입을 처리한다는 뜻이다.
//함수 타입의 처리법
function add2(n1: number, n2: number): number {
  return n1 + n2;
}

function printResult1(num: number): void {
  console.log("Result : " + num);
}

function typeUndefinedReturn(num: number): undefined {
  //undefined 는 거의 안쓰인다
  return;
}

printResult1(add2(5, 12)); //Result : 17

// 함수형 타입 선언법
let combineValues: (a: number, b: number) => number;

combineValues = add2;
// combineValues = printResult1;
// //동작은 되지만.. printResult1 함수의 return 이 없기 때문에 에러가 뜬다

console.log(combineValues(8, 8)); //16

// 콜백 타입 설정
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
  return cb(result);
}
let test = addAndHandle(10, 20, (result) => {
  console.log("ADDAND", result); //30
  return result; //cb의 return 이 없으면 당연히 undefined 가 뜬다..
});
console.log("test: ", test);
// ADDAND 30
// ADDAND 30
// test:  30
