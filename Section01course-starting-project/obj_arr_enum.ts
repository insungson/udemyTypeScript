// const person: Object = {
//   name: 'Max',
//   age: 28
// };
// //위와 같이 단순 Object로 선언하면 아래에서 person.name 으로 접근할때
// //에러가 발생한다..
// console.log(person.name);

//그래서 아래와 같이 객체 타입선언은 내부 속성까지 다 해줘야한다.
const person: {
  name: string;
  age: number;
  hobbies: string[];
} = {
  name: "Max",
  age: 28,
  hobbies: ["Sports", "Cooking"],
};
console.log(person.name);

//Enum 의 타입 설정 (변수가 많은 곳에서 실수를 줄이기 위해 사용)
enum grade {
  FIRST = "num1",
  SECOND = 2,
  ThIRD = "num2",
}
// 특정 변수에 접근할때 문자열이나 숫자로 쉽게 접근하기 위해 사용!!
// ex) 복잡한 문자열값에 접근해야하는데.. 하나다로 틀리면 에러가 나므로
//     객체로 . 을찍어서 쉽게 접근할 수 있는 enum 을 사용한다. key-value의 맵핑!

//Object 의 타입 설정
const product: {
  id: string;
  price: number;
  tags: string[]; //Array 타입은 이렇게 설정해준다
  details: {
    //객체 타입은 이렇게 설정해준다.
    title: string;
    description: string;
  };
  role: [number, string]; //튜플 타입은 이런식으로 타입을 설정해준다.
  grade: grade; //enum 타입은 이렇게 설정하면 된다.
  etc: any; //타입이 정해지지 않을때 any 를 사용한다!
} = {
  id: "abc1",
  price: 12.99,
  tags: ["great-offer", "hot-and-new"],
  details: {
    title: "Red Carpet",
    description: "A great carpet - almost brand-new!",
  },
  role: [2, "desk"],
  grade: grade.FIRST,
  etc: "soso",
};

//Array 의 타입 설정
for (const tag of product.tags) {
  console.log(tag.toUpperCase());
  //product.tags 의 타입을 string[] 로 지정했기 때문에
  // . 을 찍으면 문자열 함수들이 자동으로 뜬다
  // console.log(tag.map);
  //타입이 string 이기 때문에 map 함수를 사용할 수 없다.
}
