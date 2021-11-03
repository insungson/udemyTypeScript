// interface 를 통해 클래스를 선언하면..  변수명과 함수명은 그대로 써야한다.
// interface VS abstract 의 차이는 abstract 는 기존 함수의 오버라이트가 가능하고, 가져다가 그대로 쓰는것도 가능하다.
// ? 는 일수도 있고 아닐수도 있고,   ! 는 확정적으로 있다는 의미이다. (변수 뿐 아니라 메서드에서도 사용 가능하다!!)
// JS 파일로  컴파일된 dist 폴더를 보면 interface, type 으로 선언된 변수는 컴파일되지 않은 것을 확인할 수 있다.
// (타입스크립트에서만 존재하는 것이기 때문이다!!)

// type 과 interface의  함수정의 방법
type addFamilyAge = (a: number, b: number) => number;
interface addFamilyAge1 {
  //이렇게 타입만 정해주면.. 걍 타입처럼 사욛됨
  (a: number, b: number): number;
}
//이렇게 메서드 명까지 지정을 하게 되면 implements 나 다른 interface로 상속 가능!
interface mulFamilyAge {
  multi_X_n(n: number): number;
}
let add: addFamilyAge = (n1, n2) => n1 + n2;
let add1: addFamilyAge1 = (n1, n2) => n1 + n2;
// 이런식으로 처리

interface familyNamed {
  readonly familyName: string;
}

interface Named {
  name: string;
}

// class 는 1개만 상속이 가능하지만 interface 는 다중 상속이 가능하다!!
interface Greetable extends Named, familyNamed {
  greet(phrase: string): void;
}

class Person implements Greetable, mulFamilyAge {
  secondName?: string; //? 를 사용한 옵셔널 변수이기 때문에 사용을 안해도 에러가 안뜸!

  constructor(
    public name: string,
    public age: number = 30,
    public familyName: string
  ) {} // 변수 추가

  setSecondName(name: string) {
    this.secondName = name;
  }

  greet(n: string) {
    if (this.secondName) {
      console.log(
        n + " " + this.name + " " + this.familyName + " " + this.secondName
      );
    } else {
      console.log(
        n +
          " " +
          this.name +
          " " +
          this.familyName +
          " And there is No secondName"
      );
    }
  }

  addAge: addFamilyAge = (a: number, b: number) => {
    return a * b;
  };

  multi_X_n(num: number) {
    return this.age * num;
  }
}

// 만약 새로 만든 객체에 greet 메서드가 반드시!! 포함되어야 한다면!!
// Greetable 인터페이스를 타입으로 지정하여 가이드라인을 제시한다!!
// Greetable 인터페이스의 가이드라인만 지킨다면 클래스에서 어떤 작업을 하든 상관없는 것이다.
// 단점은 Greetable 의 속성만 들어간다는 점이다.
let user1: Greetable = new Person("Max", 29, "Angle");
// user1.familyName = 'nono';
// 읽기 전용 속성이므로 'familyName'에 할당할 수 없습니다.ts(2540)  readonly 로 인터페이스에서 설정했기 때문이다.
// user1.name = "ohoh?"; // readonly 가 아니기에 가능!

user1.greet("Hi there - I am");
console.log(user1);

let user2: Person = new Person("Insung", 36, "Son");
user2.greet("Hello! My Name is");
console.log(user2);
user2.setSecondName("awesome");
user2.greet("Hello! My Name is");
console.log("after setSecondName", user2);

//Type VS Interface 차이
// https://yceffort.kr/2021/03/typescript-interface-vs-type
//1. 확장하는 방법
interface PeopleInterface {
  name: string;
  age: number;
}
interface StudentInterface extends PeopleInterface {
  school: string;
}
type PeopleType = {
  name: string;
  age: number;
};
type StudentType = PeopleType & {
  school: string;
};
//2. 선언적 확장 (interface 는 가능, type 은 불가능)
interface Home {
  title: string;
}
interface Home {
  price: number;
}
const deco: Home = {
  //확장이 되었다.
  title: "sofa",
  price: 5,
};
type Home1 = {
  title: string;
};
// type Home1 = {price: number;}
// 'Home1' 식별자가 중복되었습니다.ts(2300)   //에러 발생

// 더 많은 자바스크립트의 class 개념을 알고 싶다면 아래 참조
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// 더 많은 타입스크립트의 Object type 개념을 알고 싶다면 아래 참조
// https://www.typescriptlang.org/docs/handbook/2/objects.html
