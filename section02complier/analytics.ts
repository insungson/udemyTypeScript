let logged;

// 변수는 나중에 넣는것에 따라 타입이 변하기 때문에 타입 선언은 굳이 안해도 되지만..
//함수의 parameter는 뭐가 들어갈지 모르기 때문에 아래와 같이 타입을 정해줘야 한다.
function sendAnalytics(data: string) {
  console.log(data);
  logged = true;
}

sendAnalytics("The Data");
