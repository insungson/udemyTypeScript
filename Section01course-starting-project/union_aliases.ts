//Union 타입을 알아보자 (파이프처리)
//Literal 타입을 알아보자 (3번째 인자 처리)
//Type Aliases / Custom Types 처리를 알아보자
type NumText = number | string;
type Converse = "as-number" | "as-text";

function combine(input1: NumText, input2: NumText, resultConversion: Converse) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversion === "as-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combineAges = combine(30, 26, "as-number");
console.log("combineAges: ", combineAges);

const combineNames = combine("Son", "Ham", "as-text");
console.log("combineNames: ", combineNames);

////Object Type 으로 정할 경우!!
function greet(user: { name: string; age: number }) {
  console.log("Hi, I am " + user.name);
}

function isOlder(user: { name: string; age: number }, checkAge: number) {
  return checkAge > user.age;
}

/// 아래와 같이 바꿀 수 있다.
type User = {
  name: string;
  age: number;
};

function greet1(user: User) {
  console.log("Hi, I am " + user.name);
}
function isOlder1(user: User, checkAge: number) {
  return checkAge > user.age;
}
