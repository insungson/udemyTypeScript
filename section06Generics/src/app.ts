// * Generic Function 만들기!!
// const names: Array<string> = []; //string[]
// // names[0].split(' ');

// // * 아래와 같이 Promise 객체의 내부 인자를 이렇게 설정해 줄 수 있다!!
// const promise: Promise<string> = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('ho hello');
//   }, 2000);
// });

// promise.then(data => {
//   data.split(' ');
//   // 위에서 promise 객체의 인자를 string 으로 설정했기 때문에 여기서 문자열을 처리하는 함수인 split 를 사용할 수 있다!!
// });

// //두개의 객체를 merge 해서 하나의 객체를 만드는 함수에 generic 을 처리해보자
// function merge(objA: object, objB: object) {
//   return Object.assign(objA, objB);
// }

// const mergeObj = merge({ name: "Max" }, { age: 30 });
// console.log("mergeObj", mergeObj.age);
// //타입스크립트는 return 방식이 object 로만 인식이 되기 때문에 위의 age 는 에러가 뜬다..
// // const mergeObj = merge({name: 'Max'}, {age: 30}) as {name: string, age: number};
// // 위처럼 type casting 을 통해 타입을 지정해줄 수 있지만.. 너무 번잡한 작업이다..

// 그래서 아래와 같이 generic function 을 만들어보자
function merge1<T, U>(objA: T, objB: U) {
  //리턴 타입을 굳이 정하지 않더라도 타입스크립트가 알아서 리턴 타입을 정해준다.
  return Object.assign(objA, objB);
}
// const mergeObj1 = merge1<{name: string, hobbies: Array<string>}, {age: number}>({name: 'Max', hobbies: ['sports']}, {age: 30});
// Generic 함수를 사용한다면... 위와 같이 함수 실행시 타입을 일일이 정해줄 필요가 없다...
const mergeObj1 = merge1({ name: "Max", hobbies: ["sports"] }, { age: 30 });
console.log("mergeObj1: ", mergeObj1.age);

// * extends 를 사용하여 객체가 아닌 constrain 까지 type을 지정해 줄 수 있다.
// (|) 파이프를 사용하여 다른 종류의 타입도 지정할 수 있다.
function merge2<T extends object, U extends object | number>(a: T, b: U) {
  if (typeof b === "number") {
    return Object.assign(a, { fakeAge: b });
  } else {
    return Object.assign(a, b);
  }
}
const mergeObj2 = merge2({ name: "Max", hobbies: ["sports"] }, 30);
console.log("mergeObj2: ", mergeObj2);

// * generic 함수의 다른 예시
interface lengthy {
  length: number;
}

function countAndDescribe<T extends lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hello"));
console.log(countAndDescribe(["Hi", "Hello"]));

// * generic 에서 keyOf Constrain 사용법!
// 객체의 key 속성 검사가능! (아래에선 두번째 input 값을 자동으로 보여준다)
function extractAndCover<T extends object, U extends keyof T>(obj: T, key: U) {
  return "Value: " + obj[key];
}

console.log(extractAndCover({ name: "Max" }, "name"));

// * class 에서도 generic 을 사용하여 쉽게 타입을 설정할 수 있다.
// (타입 확장도 가능하고 선택을 할 수도 있다. _ 아래의 예시에서는 원시적 타입만 다룬다.)
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// 객체는 원시적 타입이 아니기 때문에 삭제시 다른 로직으로 처리해 줘야 한다.
// 아래처럼 처리하면 에러가 뜬다..
// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());
