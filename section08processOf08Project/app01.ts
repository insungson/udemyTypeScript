// // input form
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    // 해당 template 태그에 접근하기 위한 코드 마지막 ! 는 존재한다는 확신의 타입스크립트
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    // app div 태그에 접근하기 위한 코드
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    // this.hostElement = <HTMLDivElement>document.getElementById('app')!; // 이렇게 처리해도 된다.

    //importNode 는 해당 노드를 import 해준다.
    const importedNode = document.importNode(
      this.templateElement.content, // content 는 해당 HTML element 이다.
      true
    );
    // project-input 탬플릿 태그의 첫번쨰 element 는 form 태그이다. (그래서 위에 타입이 form 이다)
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
  }

  private attach() {
    // insertAdjacentElement  는 지정한 element에 element 를 넣어준다.
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
