// Code goes here!
class Department {
  // private readonly id: string;
  // private name: string; // name: sting = 'Hellow!';  처럼 default 로 처리해도 됨
  // private employees: string[] = []; //객체.employees[]  로 접근이 안됨!!

  // constructor(id: string, n: string) {
  //   this.id = id;
  //   this.name = n;
  // // this.employees = [];  // 위에선 private employees: sring[];  로 타입만 선언하고 생성자에서 만들어도 된다!
  // }

  // //위의 변수 선언은 아래와 같이 줄일 수 있다.
  protected employees: string[] = []; // 자식클래스에선 접근 가능 인스턴스에선 불가!
  constructor(private readonly id: string, public name: string) {}

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
    // this.id = 'not working'; //readonly 로 선언했기 때문에 바꾸는게 안된다!
  }

  printEmployeeInformation(this: Department) {
    console.log("employees length: ", this.employees.length);
    console.log("employees name: ", this.employees);
  }
}

const accounting = new Department("1", "Accounting");

accounting.addEmployee("Max");
accounting.addEmployee("Any");

// accounting.employees[2] = "Anna"; //private 추가시 접근이 안됨!
// employees name:  (3) ['Max', 'Any', 'Anna'] // Anna 가 추가됨...;;

accounting.describe();
console.log("accounting: ", accounting, accounting.describe());
accounting.printEmployeeInformation();
// const accountingCopy = { name: "Dummy", describe: accounting.describe };
// accountingCopy.describe();

// static 은 클래스에서 직접 접근해야 한다!!  (변수, 함수 전부 이렇게 처리)
class ITDepartment extends Department {
  static ITAccessKey = "s1";

  constructor(id: string, public admins: string[]) {
    super(id, "IT");
    // this.ITAccessKey; // static 변수는 생성자에선  this. 로접근이 안되지만..
    // ITDepartment.ITAccessKey // static 변수는 클래스로 직접 접근하는 방식으로는 접근이 가능하다!
  }
  static changeAccessKey(newKey: string) {
    this.ITAccessKey = newKey;
  }
}

const ITSRKEY = new ITDepartment("IT1", ["Insung", "Dongrul"]);
console.log("ITSRKEY: ", ITSRKEY);
console.log("before Change IT_ACCESS: ", ITDepartment.ITAccessKey);
ITDepartment.changeAccessKey("SS1");
console.log("after Change IT_ACCESS: ", ITDepartment.ITAccessKey);

class AccountingDepartment extends Department {
  private lastReport: string;
  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    this.addReport(value);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  addEmployee(name: string): void {
    if (name === "Max") {
      return;
    }
    this.employees.push(name + " accountTeam!");
    //protected 로 선언했기 때문에 자식에선 접근 가능!
  }

  printReports() {
    console.log("Reports: ", this.reports);
  }
}

const accountingDep = new AccountingDepartment("a1", []);
accountingDep.addEmployee("Natale");
accountingDep.addEmployee("Max"); //조건문에 따라 접근 안됨
accountingDep.addReport("Something went wrong...");
// get set 함수는 아래와 같이 () 함수처럼 사용하지 않고 변수처럼 사용한다!!
console.log("mostRecentReport: ", accountingDep.mostRecentReport);
accountingDep.mostRecentReport = "another things";
console.log("mostRecentReport: ", accountingDep.mostRecentReport);
accountingDep.printEmployeeInformation();
accountingDep.printReports();

//abstract 연습
abstract class abstractClassTest {
  constructor(protected val: string) {}

  abstract describe(): void;
}
// const newAbstractTest = new abstractClassTest('hello');
// 추상 클래스의 인스턴스를 만들 수 없습니다.ts(2511) 에러가 뜬다.

//추상 메서드는 자식 클래스에서 반드시!! 만들어줘야 한다!
class testExtend extends abstractClassTest {
  constructor(newVal: string) {
    super(newVal);
  }
  describe() {
    console.log(`yoyo! ${this.val}`);
  }
}
const newTest = new testExtend("hello");
newTest.describe();

// //singleton pattern 메서드를 통한 객체 생성
class SalesDepartmentCreate extends Department {
  private static instance: SalesDepartmentCreate;
  private constructor(id: string, manager: string) {
    super(id, "Sales");
    this.employees.push(manager);
  }

  static getInstance(manager: string) {
    if (SalesDepartmentCreate.instance) {
      return this.instance;
    }
    this.instance = new SalesDepartmentCreate("S1", manager);
    return this.instance;
  }
}

//이렇게 클래스.메서드 (ststic 메서드 설정)   로 접근하여 객체를 만든다!!
const salesTeam1 = SalesDepartmentCreate.getInstance("Sonny");
const salesTeam2 = SalesDepartmentCreate.getInstance("Herry"); // 조건문에 의해 이건 안만들어진다. (주의!!)
//왜냐하면 싱글톤 클래스는 새로 인스턴스를 생성하는게 아니라.. 기존에 존재하는 1개의 인스턴스를 메서드를 통해 계속 생성하는것이다.
// A singleton class is configured such that you don't create it with "new" but by calling a method which then ensures that only one instance of the class exists at any given time.
console.log("Singleton with SalesTeams: ", salesTeam1, salesTeam2);
