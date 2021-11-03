import axios from "axios";
// axios 라이브러리는 types 로 타입스크립트와 연결하는 라이브러리를 따로 설치할 필요가 없다

const form = <HTMLFormElement>document.querySelector("form")!;
const addressInput = document.querySelector("#address")! as HTMLInputElement;

// https://developers.google.com/maps/documentation/geocoding/start
// 위의 링크에 API 키를 던저주면 JSON 형식으로 해당 주소가 뜨는것을 확인할 수 있다.

const GOOGLE_API_KEY = "AIzaSyBvZuWc7EclFAKtLOs_i6snDDFlwW-GuPQ";

// // 아래와 같이 declare var google: any;  아래의 코드를 입력시 typeScript 에서 읽지 못하기 때문에 cors 문제가 발생한다.
// declare var google: any;

// 아래의 다른 무료 api 사용을 위한 선언이다
declare var ol: any;

// 아래와 같이 axios 로 받는 JSON 데이터의 타입을 미리 지정해주고,
// 아래의 axios.get<>  처럼 제네릭으로 처리해 주면 res로 받을때 자동으로 해당 타입이 뜬다
type GoogleFeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();

  const enteredAddress = addressInput.value;
  console.log("enteredAddress: ", enteredAddress);
  // send this to Google's API
  // 문자열을 URL로 보낼땐 encodeURL() 함수에 해당 문자열을 넣어줘서 URI 로 변환해줘야 한다
  axios
    .get<GoogleFeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((res) => {
      console.log("res: ", res);
      if (res.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
      // 위에서 generic 으로 타입을 설정했다면 아래의 해당 타입이 자동으로 뜰 것이다.
      const coordinates = res.data.results[0].geometry.location;
      console.log("coordinates: ", coordinates);

      // 아래의 링크에서 구글 맵 sdk 에 해당하는 script 태그를 index.html에 붙여널는다
      // https://developers.google.com/maps/documentation/javascript/overview#maps_map_simple-javascript
      // 그리고 붙여넣은 sdk 의 변수를 불러오는 방법은 (SDK 를 웹의 script 태그로 연결했기 때문에 아래처럼 변수만 선언하여 연결하면 매서드를 사용할 수 있다.)
      // 1) declare var google: any;     를 통해 불러와도 되고! (이렇게 하면 타입스크립트에서 변수를 잘 못읽어와 실행이 안된다... cors 에러뜸..)
      // 2) types google maps 를 통해 찾은 https://www.npmjs.com/package/@types/google.maps   npm 구글맵 타입을 설치하면 된다.
      const map = new google.maps.Map(
        <HTMLElement>document.getElementById("map"),
        {
          center: coordinates,
          zoom: 16,
        }
      );

      console.log("map: ", map);

      // 아래의 구글맵 마커는 참조 링크에 해당 sdk 사용방법이 나와있다.
      // https://developers.google.com/maps/documentation/javascript/adding-a-google-map
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch((err) => {
      alert(err.message);
      console.log("err", err);
    });

  // // 구글맵과 동시에 실행이 되지 않기 때문에..(cors 문제도 섞여 있음..) 아래의 코드를 사용하려면 기존의 axios 를 비릇한 구글 맵의 코드를 전부 주석처리해줘야 한다.
  // // 구글 맵이 아닌 https://openlayers.org/en/latest/doc/quickstart.html 를 활용하여 추가해보자
  // // 아래의 스크립트 SDK 를 index.html 에 붙여넣고
  // // <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/css/ol.css" type="text/css">
  // // <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/build/ol.js"></script>

  // const coordinates = { lat: 40.41, lng: -73.99 }; // Can't fetch coordinates from Google API, use dummy ones
  // document.getElementById("map")!.innerHTML = "";
  // new ol.Map({
  //   target: "map",
  //   layers: [
  //     new ol.layer.Tile({
  //       source: new ol.source.OSM(),
  //     }),
  //   ],
  //   view: new ol.View({
  //     center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
  //     zoom: 16,
  //   }),
  // });
}

form.addEventListener("submit", searchAddressHandler);
