// 아래는 유효성 검사를 해주는 라이브러리이다. 데커레이터를 통해 사용 할 수 있다.
// tsconfig.json 에서 experimentalDecorators: "true", 로 바꿔주는걸 잊지 말자
// https://www.npmjs.com/package/class-validator

import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class Product {
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  getInformation() {
    return [this.title, `${this.price}`];
  }
}
