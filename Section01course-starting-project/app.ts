//unknown 타입: 타입이 정해지지 않은 것으로 어떤 타입이든 한번 더 체크해주는 코드가 있어야 에러가 발생하지 않기 때문에.. any 보단 안전하다고 볼 수 있다.
//        (예시를 살펴보자!!)
//any 타입: 어떤 타입이든 그냥 넘어간다..
//never 타입: 일반적으로 함수의 리턴 타입으로 사용되며, 함수의 리턴 타입으로 never가 사용될 경우, 항상 오류를 출력하거나 리턴 값을 절대로 내보내지 않음을 의미합니다
// (void 타입보다 좀더 명확하게 타입을 구분한 것이다)

// 상세 설명 링크
// https://xo.dev/typescript-unknown-any-never/
// never 의 활용  https://simsimjae.medium.com/typescript%EC%9D%98-never%EC%99%80-unknown-f4b9a9270f78

let userInput: unknown;
let userAny: any;
let userName: string;

userInput = 3;
userInput = "Max";

userAny = 3;
userAny = "Max";

userName = userAny;
//any 는 어떤 타입이든 flexable 하게 통과하기 때문에 에러가 발생하지 않는다..

//조건문으로 타입을 지정해주지 않는다면 아래의 주석과 같은 에러가 발생한다.
//(이렇게 조건문이 한번 더 들어가기 때문에 좀 더 안전하다고 볼 수 있다.)
if (typeof userInput === "string") {
  userName = userInput; //'unknown' 형식은 'string' 형식에 할당할 수 없습니다.
}

//오류나 무한루프 같은 코드가 들어간 함수라면 never를 리턴 타입으로 설정하여 어떤 값도 리턴하지않음을 알려줄 수 있다.
function gererateError(message: string, code: number): never {
  throw { message, errorCode: code };
}

const result = gererateError("An Error occured", 500);
console.log("result: ", result);

//아래와 같이 특정 타입의 값을 할당 받지 못하게 하는것도 가능하다!
//string 타입일 경우만 never로 추론하여 string 타입의 값이 할당되지 못하게 막아준다!!
type NonString<T> = T extends string ? never : T;
