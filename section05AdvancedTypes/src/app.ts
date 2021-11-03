type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date; //이 타입은 자바스크립트 빌트인
};

//interface 는 아래와 같이 합성을 한다. (interface Intersection)
// interface ElevatedEmployee extends Employee, Admin {}

//아래와 같이 타입의 합성을 한다! (Type Intersection)
type ElevatedEmployee = Admin & Employee;

//객체형으로 합성할 경우 Admin, Employee 모든 속성이 전부 포함되어야 한다!!
const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

// | 로 설정된 단일 타입을 &을 사용하여 합성할 경우 교집합으로 공통된 타입이 설정이된다!
type Universal = Combinable & Numeric; //number 타입으로 설정된다

//** Funtion Overload  함수 오버로드  input parameter & output 타입 정하기!!
function add(a: number, b: string): [];
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" && typeof b === "string") {
    return a.toString() + b.toString();
  }
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  if (typeof a === "number" && typeof b === "string") {
    let tempNum = parseInt(b);
    return [a, tempNum];
  }
  return "sorry nothing matched...";
}
const result = add("Max", "Schwarz");
console.log("result: ", result.split(" "));
const numResult = add(11, 1);
console.log("numResult: ", numResult);
const arrResult = add(11, "1");
console.log(
  "arrResult: ",
  arrResult.reduce((prev, curr) => prev + curr, 0)
);
// add 함수에서 input parameter들을 조건문을 통해 문자열로 처리했기 때문에 실행은 되지만..
// 타입스크립트상으로 확실한 output 타입이 없기 때문에 에러가 뜬다.
//형변환을  const result = add('Max', 'Schwarz') as string;  사용하여 string 으로 바꾸면 에러가 안나지만..
// 이건 옳은 방법이 아니다..
// * 이럴땐 기존의 add 함수위에 여기서 사용할 모든 타입의 경우를

//** 아래와 같이 타입을 조건문으로 나눠서 처리할 수 있다!!
type UnknownEmployee = Employee | Admin;
// * 단순 타입 합성의 속성을 나눈다!
// * 공통된 타입을 타입의 속성을 기준으로 조건문을 통해 해당 타입만 뽑을 수 있다.
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name", emp.name); //* emp.  을 하면 공통으로(Employee | Admin) 포함된게 name 뿐이므로 name만 찍힌다
  if ("privileges" in emp) {
    console.log("Privileges: " + emp.privileges); //* emp.  을 하면 Admin 의 속성인 name, privileges 두개가 뜨는것 확인할 수 있다.
  }
  if ("startDate" in emp) {
    console.log("Start Date: " + emp.startDate); //* emp.  을 하면 Employee의 속성인 name, startDate 두개가 뜨는것 확인할 수 있다.
  }
}

printEmployeeInformation({ name: "Manu", startDate: new Date() });

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }
  loadCargo(amount: number) {
    console.log("Loading cargo ..." + amount);
  }
}

// 클래스 합성을 타입으로 설정하고 조건문으로 나눈다!!
type Vihicle = Car | Truck; // 위의 클래스 매서드 타입을 이렇게 설정하고!!

const v1 = new Car();
const v2 = new Truck();

function useVihicle(vihicle: Vihicle) {
  vihicle.drive(); // * Car,  Truck 클래스의 공통 메서드가 drive 이므로 vihicle.   시 drive() 메서드만 뜬다
  if (vihicle instanceof Truck) {
    // 자바스크립트 생성자의 프로토타입을 확인한다!!  자바스크립트 클래스 함수
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/instanceof
    vihicle.loadCargo(1000);
  }
}

useVihicle(v1);
useVihicle(v2);

//** literal 타입을 사용한 분기처리!!
interface Bird {
  type: "bird"; // 이런걸 literal 타입이라 한다!
  flyinfSpeed: number;
}
interface Horse {
  type: "horse";
  runningSpeed: number;
}
type Animal = Bird | Horse;
// 이렇게 둘중 하나를 선택해야할 경우
function moveAnimal(animal: Animal) {
  let speed;
  // // 같은 속성을 가졌기 때문에 literal 타입이 아닌 아래처럼 속성으로 구분은 불가능하다.
  // if ( 'runningSpeed' in animal) {}
  switch (animal.type) {
    case "bird": //animal.   시 bird에 해당하는 속성이 뜬다
      speed = animal.flyinfSpeed;
      break;
    case "horse": //animal.   시 horse에 해당하는 속성이 뜬다
      speed = animal.runningSpeed;
      break;
    default:
      break;
  }
  console.log("Moving at speed: " + speed);
}

// 아래에서 함수를 사용할때 속성을 입력할때도 타입스크립트에 의해 속성에 대한 가이드를 준다!!
moveAnimal({ type: "bird", flyinfSpeed: 10 });

// ** Type Casting  하나의 타입을 다른 타입으로 변환해주는 것이다. (자바스크립트는 동적타입이기 때문에 형변환이 없다)
// Type Casting은 2가지 방법이 있다 tsconfig.json 에서 lib 폴더에 dom 이 들어가 있기 때문에 가능한 것이다!!
//1. <> 을 해당 변수의 앞에서 선언하는 방법
//2. as 로 해당 변수의 뒤에서 선언하는 방법
const userInputElementFF = <HTMLInputElement>(
  document.getElementById("user-input")
);
const userInputElementFR = document.getElementById(
  "user-input"
)! as HTMLInputElement;
//위와 같이 ! 을통해 존재의 확정을 하고 접근하는게 아니라면 아래와 같이 if 문을 사용해야 한다.

// if (userInputElementFR) {
//   (userInputElementFR as HTMLInputElement).value = 'yo!';
// }

userInputElementFR.value = "Hi There!"; //위에서 !을 통해 존재를 확정했으므로 바로 값을 넣어도 된다.

// ** Index Properties  아래와 같이 객체 속성의 타입도 정할 수 있다.
interface ErrorContainer {
  // { email: 'Not a valid email', username: 'Must start with a character!' }
  [prop: string]: string;
  // id: number; // 위와 같이 Index Properties 타입을 string으로 할 경우 다른 속성들도 string으로 맞춰야 한다!!
  // [prop1: number]: number;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
  username: "Must start with a character!",
};

// Optional Chaining
const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: { title: "CEO", description: "My Own Company" },
};
console.log(fetchedUserData?.job?.title);

//Nullish Coalescing //
const userInput = "";
const storeData = userInput || "DEFAULT"; //이건 ''을 찍을 수 없다.
const storeData1 = userInput ?? "DEFAULT"; // nullish 는 가능하다
console.log("storeData: ", storeData);
console.log("storeData1: ", storeData1);
