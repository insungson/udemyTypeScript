// // 로데쉬 자바스크립트 라이브러리이다
// // https://lodash.com/
// // 타입스크립트는 자바스크립트를 인식하지 못하기 때문에 그냥 lodash 만 설치하면 에러가 뜰 것이다.
// // 그래서 아래와 같이 lodash 와 타입스크립트를 연결해주는 라이브러리를 설치해야 한다.
// // https://www.npmjs.com/package/@types/lodash
// // 타입스크립트에서 자바스크립트 라이브러리를 사용하기 위해선
// // "해당 자바스크립트 라이브러리 types" 로 검색하여 연결시켜주는 라이브러리를 설치해주면 된다.
// // (보통 타입스크립트에서도 사용가능하도록 자동 데커레이터로 자바스크립트 라이브러리를 타입스크립트에서도 사용할 수 있도록 만들어준다.)
// // (만약 제이쿼리를 사용하고 싶다면.. jquery types 로검색하면 해당 연결 라이브러리가 있을 것이다)

// import _ from "lodash";

// console.log(_.shuffle([1, 2, 3]));

// // index.html 에서 body 태그 내부에서 var GLOBAL 변수를 선언하였는데 아래의 콘솔에서 에러가 뜬다.
// declare var GLOBAL: string;
// // 위와 같이 declare 로  어딘가에 저 변수가 있다고 선언해 줄 경우 index.html 에서 선언한 THIS IS SET 이 아래의 콘솔에 찍히게 된다!
// console.log("GLOBAL", GLOBAL);

// 아래와 같이 클래스를 불러와서 사용해도 되지만.. 큰 단위의 프로젝트에선 굉장히 귀찮은 작업이 된다.
// 그래서 아래의 라이브러리를 사용해보자
// https://www.npmjs.com/package/class-transformer

// 위의 링크에 따르면 아래의 부분을 import 해야 해당 라이브러리를 사용할 수 있다.
import "reflect-metadata";
import { plainToClass } from "class-transformer";

import { validate } from "class-validator";
// validate 메서드는 promise 객체를 리턴해준다

import { Product } from "./product.model";

// 아래와 같은 JSON 데이터를 서버에서 받았다고 생각하자
const products = [
  { title: "A Carpet", price: 20.99 },
  { title: "A Book", price: 10.99 },
];

// // 원랜 아래의 주석처럼 서버에서 받은 JSON 데이터 파일을 클래스 생성을 통해 사용한다.
// const loadedProducts = products.map((prod) => {
//   return new Product(prod.title, prod.price);
// });

// 위의 라이브러리를 사용한다면 아래와 같이 간단하게 사용할 수 있다.
const loadedProducts = plainToClass(Product, products);

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

const newProd = new Product("", -5.99);
console.log("newProd: ", newProd.getInformation());

validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log("VALIDATION ERRORS!");
    console.log("Error: ", errors);
  } else {
    console.log(newProd.getInformation());
  }
});
