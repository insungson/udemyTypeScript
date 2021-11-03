function Logger(constructor: Function) {
  //데코레이터를 클래스 바깥에서 처리할 경우 클래스의 생성자를 인자로 설정해야 한다.
  console.log("Logging...");
  console.log(constructor);
}
//** 데코레이터는 클래스가 실행되기 전에 미리 실행된다!!
// (콘솔을 찍어보면 데코레이터가 먼저 찍히고 나중에 클래스가 찍히고 쨀 나중에 인스턴스가 찍힌다.)

@Logger
class Person {
  name = "Max";

  constructor() {
    console.log("Creating person object...");
  }
}

const pers = new Person();

console.log(pers);

// 아래의 데코레이터 링크에서 보면.. tsconfig.json 에서 데코레이터 설정을 해놔야 한다.
// https://www.typescriptlang.org/docs/handbook/decorators.html

// 아래와 같이 return 에서 function을 처리할 경우 데코레이터를 사용할 경우 데코레이터에 input parameter 까지 추가할 수 있다.
function Logger1(logString: string) {
  console.log("Logger Factory");
  return function (constructor: Function) {
    console.log("logString: ", logString);
    console.log("constructor: ", constructor);
  };
}
// // * 아래와 같이 _  언더스코어를 사용하면 인풋 인자로는 존재는 하지만 사용하지 않는다는 뜻과 같다
// // 아래와 같이 클래스의 인자를 템플릿으로 적용시켜 넝을 수도 있다..
// // (angular 에서 클래스에서 데이터를 처리하고 데이터를 아래의 방식을 사용하여 템플릿화 하여 적용시킨다..)
// // https://angular.io/guide/migration-undecorated-classes   앵귤러에선 이런식으로 탬플릿화 하여 사용한다.
// function WithTemplate(template: string, hookId: string) {
//   console.log("TEMPALTE Factory");
//   return function (constructor: any) {
//     console.log("Rendering Template");
//     const hookEl = document.getElementById(hookId);
//     const p = new constructor();
//     if (hookEl) {
//       hookEl.innerHTML = template;
//       hookEl.querySelector("h2")!.textContent = p.name;
//     }
//   };
// }

// * 클래스 안의 클래스 데코레이터 (위의 함수를 개량해서 넣었다)
function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function <T extends { new (...args: any[]): { name: string } }>(
    // ...args 는 어떤 input parameter 든 상관없다는 것이고 any[] 역시 같은 의미이다.
    // new 는 typeScript 에서 생성자가 어떤 속성을 가졌을지를 표현해주는 것이다. (클래스를 input으로 받으므로 이렇게 클래스를 받는걸 표현함)
    // {name: string} 은 input으로 받을 클래스의 속성을 리턴해준다는 뜻이다.
    // https://stackoverflow.com/questions/50726326/how-to-go-about-understanding-the-type-new-args-any-any 참조
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        // _ 언더스코어를 사용하여 이건 사용안할 것이고 무시할 타입이란걸 명시한다. (타입스크립트에서 이렇게 타입 처리) 아래는 참조
        // https://newbedev.com/using-underscore-variable-with-arrow-functions-in-es6-typescript
        super(); // 이렇게 input 으로 받을 클래스를 상속한다
        console.log("Rendering template");
        const hookE1 = document.getElementById(hookId);
        if (hookE1) {
          hookE1.innerHTML = template;
          hookE1.querySelector("h2")!.textContent = this.name;
        }
      }
    };
  };
}

// * 아래와 같이 데코레이터를 이중으로 쓴다면 아래의 데코레이터 부터 실행된다(return 이 밑에서 부터됨)
// (리턴 이전의 실행은 자바스크립트의 규칙인 위에서 아래로 되기 때문에 순서대로 된다.)
@Logger1("Logging-PERSON!!")
@WithTemplate("<h1>My Person Object</h1><br/><h2>This Will Change</h2>", "app")
class Person1 {
  name = "Max1";
  constructor() {
    console.log("Creating person object...1");
  }
}

const pers1 = new Person1(); //이렇게 처리해 줘야 위의 클래스 데코레이터가 동작한다!!
console.log("pers1: ", pers1);

// --- ** 클래스 내부의 프로퍼티에 데코레이터를 적용시킬때의 input parameter 들!!
// * 이렇게 데코레이터를 사용하는 이유는!!! 클래스나 메서드가 정의되기 전에 데코레이터가 먼저 실행되기 떄문에
//   메타 데이터 처리가 가능해진다!!
// 콘솔로 찍으면.. 데코레이터를 적용시킬떄 인풋에 들어가는 정보를 사용하여 데코레이터를 적용시키면 된다.

// 1. 클래스 내부의 변수에 데코레이터를 적용시킬때..
function Log1(target: any, propertyName: string | symbol) {
  console.log("Property decorator!");
  console.log("target: ", target);
  console.log("propertyName: ", propertyName);
}

// 2. 클래스 내부의 메서드에 데코레이터를 적용시킬때..
// 변수 타켓, 변수 이름, 변수의 요소들이다.
// PropertyDescriptor  의 개념은 자바스크립트의 해당객체속성에 대한것으로 자세한건 아래의 참조를 살펴보면 된다
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// 아래는 Accessor 즉 set, get 으로 접근하는 메서드에 붙인 데코레이터이다.
function Log2(target: any, name: string, description: PropertyDescriptor) {
  console.log("Accessor decorator!");
  console.log("target: ", target);
  console.log("name: ", name);
  console.log("description: ", description);
}
function Log3(
  target: any,
  name: string | symbol,
  description: PropertyDescriptor
) {
  console.log("Method decorator!");
  console.log("target: ", target);
  console.log("name: ", name);
  console.log("description: ", description);
}

//3. 메서드의 input parameters에 데코레이터를 적용시킬때..
function Log4(target: any, name: string | symbol, position: number) {
  console.log("Parameter decorator!");
  console.log("target: ", target);
  console.log("name: ", name);
  console.log("position: ", position);
}

class Product {
  @Log1
  title: string;
  @Log1
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid price - should be positive!");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("book", 19);
const p2 = new Product("book 2", 29);

// * 클래스 내부의 메서드에 데코레이터를 처리하여 해당 클래스 객체의 메서드 속성을 바꿔보자!!
// 메서드 데코레이터는 input parameter 들은 인자의 순서에 따라 정해진 값이 있다.
function Autobind(_: any, _2: string, descripter: PropertyDescriptor) {
  const originalMethod = descripter.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      //Accessor 로 접근하는 메서드의 속성을 변경시켜준다.
      const boundFn = originalMethod.bind(this); // this 는 메서드를 가르키기 때문에 this는 해당 클래스를 가르킨다.
      return boundFn;
    },
  };
  return adjDescriptor; // 위에서 설정한 메서드의 속성을 리턴으로 내보내서 메서드의 속성을 바꿔준다
}

class Printer {
  message = "This Works!!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p3 = new Printer();

const button = document.querySelector("button");

// button!.addEventListener("click", p3.showMessage.bind(p3)); // 데커레이터로 bind처리하지 않는다면 이렇게 해줘야 한다.
// button!.addEventListener("click", () => p3.showMessage()); //bind 가 아니면 이렇게 처리해도 된다!

button!.addEventListener("click", p3.showMessage); // bind를 하지 않는다면 클릭의 시점에서 해당 메서드가 실행되지 않기 때문에 undefined 가 뜬다.
// auto데코레이터를 만들어서 위처럼 사용해주면 위와 같이 사용해도 된다!!

// -- **  데코레이터를 이용한 유효성 검사
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registoredValidators: ValidatorConfig = {};
console.log("registoredValidators11: ", registoredValidators); // {} 당연 이게 찍히고..

//아래의 데코레이터를 거치면 {Course: title: ['required']}  가 찍힌다. title 은 Course클래스의 속성변수이름!
function Required(target: any, propName: string) {
  registoredValidators[target.constructor.name] = {
    // target.constructor.name 는 해당 클래스의 이름이 찍힌다. 여기선 Course
    ...registoredValidators[target.constructor.name], //기존의 배열에 추가해야하기 때문에 이렇게 처리!!
    [propName]: ["required"],
  };
}

//아래의 데코레이터를 거치면 {Course: price: ['positive']}  가 찍힌다. price 는 Course클래스의 속성변수이름!
function PositiveNumber(target: any, propName: string) {
  registoredValidators[target.constructor.name] = {
    ...registoredValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

// 이함수를 사용하는 곳에서 true 값으로 될땐 통과! false 일때 경고or에러 발생시킴!
function validate(obj: any) {
  const objValidatorConfig = registoredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true; // 이렇게 처리하는 이유는 아래 switch 문에서 둘다 체크해야하기 떄문!!
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form");
courseForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleE1 = document.getElementById("title") as HTMLInputElement;
  const priceE1 = document.getElementById("price") as HTMLInputElement;

  const title = titleE1.value;
  const price = +priceE1.value;

  const createdCourse = new Course(title, price);
  console.log("createdCourse: ", createdCourse);
  console.log("registoredValidators22: ", registoredValidators);
  // {Course: {price:['positive'], title: ['required']} }   가 찍힌다!!

  // * 클래스의 데코레이터를 통해 만들어진 validate 함수는 아래처럼 쉽게 적용이 가능하다!
  // 또한 데코레이터 코드는 노출되지 않기 때문에 런타임도 줄어드는 이점도 있다.
  if (!validate(createdCourse)) {
    alert("Invalid input, please try again!");
    return;
  }
  console.log("createdCourse!!!!: ", createdCourse);
});
