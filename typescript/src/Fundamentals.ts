export {}

let sales = 123_454_056;
let course: string = 'Typescript';
let is_published: boolean = true;


//infere --> intuisce da solo il type in base al valore assegnato

// se non si dichiara nulla assegna da solo any. Ma any si dovrebbe evitare

function render(document) { //in questo caso implicitly any
  console.log(document)
}

function renderTwo(document:any) { //si puo anche dichiarare in caso
  console.log(document)
}


//ARRAYS

let numbers = [1, 2, 3, '4'] // valido in JS


let numbersTwo: number = [1, 2, 3, '4'] // in TS da errore

let numbersThree: number[] = [];
numbersThree[0] = 1;
numbersThree[1] = '2'; //qui da errore


//TUPLES


let user : [number, string] = [1, 'marco']    //Tuples sono array con struttura fissa di types. Consigliato per 2/3 values max, tipo key value pairs


//ENUMS

// const small = 1;
// const medium = 2;
// const large = 3;

const enum Size  {
  Small = 1, Medium, Large   //assegna in automatico gli altri numeri con +1. Non si usa piu tanto, meglio fare con literal union types  
}

let mySize: Size.Medium


//FUNCTIONS

function calculateTax(income: number, taxYear: number): number{
  if (taxYear < 2022)
    return income * 1.2;
  return income * 1.3;
}

calculateTax(10000, 2021) // anche se in JS sarebbe valido, si devono passare esattamente 2 arguments solo, altrimenti si passano i question mark oppure si da un default value

function calculateTaxTwo(income: number, taxYear = 2022): number{
  if (taxYear < 2022)
    return income * 1.2;
  return income * 1.3;
}

calculateTaxTwo(15000)


//OBJECTS

let employee: {id: number, name: string} = {id: 1, name: 'marco'}

//readonly modifier

let employee2: {readonly id: number, name: string} = {id: 1, name: 'marco'}
employee2.id = 2 //questo da errore perche dovrebbe essere solo read only

let employee3: {readonly id: number, name: string, retire: (date: Date) => void} = {id: 1, name: 'marco', retire: (date)=> console.log(date)}



//TYPE ALIASES

type Employee = {
  id: number;
  name: string;
  retire: (date: Date) => void
}


let employee4: Employee = {id: 1, name: 'marco', retire: (date)=> console.log(date)}

//UNION TYPES

function KgToLbs(weight: number | string): number{

    if (typeof weight === 'number')
    return weight * 2.2; else 
  return parseInt(weight) * 2.2
}

//INTERSECTION TYPES

type Draggable = {
  drag: ()=> void
}

type Resizable = {
  resize: () => void
}


type UiWidget = Draggable & Resizable   // in pratica si possono unire due types diversi

let textBox: UiWidget = {
  drag: ()=> console.log('dragged'),
  resize: ()=> console.log('resized')
}


//LITERAL TYPES - gli si da dei valori specifici

let quantity: 50 | 100 = 50;

type Quantity = 50 | 100;
let quantityTwo: Quantity = 100;

type Measure = 'cm' | 'inch'
let size: Measure = 'cm'


//NULLABLE TYPES

function greet(name: string | null | undefined) {
  if (name) return `hello ${name}`;
  if (!name) return 'hola'
}

greet(undefined)


type Customer = {
  birthday: Date
}

function getCustomer (id: number):  Customer | null{
  return id===0? null : {birthday: new Date()}
}

let customer = getCustomer(0);
console.log(customer?.birthday.getFullYear())


//NULLISH coalescing operator. Controlla se un valore e' null o undefined (invece che falsy)

let speed : number | null = null;

let ride = {
  speed: speed?? 30 //se speed non e' null o undefined allora considera speed. cosi prende anche lo 0 che invece sarebbe falsy
}

//TYPE assertion

let phone = <HTMLInputElement> document.getElementById('phone')  // in pratica dico nello specifico che type sara' la const



//UNKNOWN TYPE -- meglio che usare ANY perche' almeno ti forza a controllare

function check ( value: unknown){
  console.log(value.qualsiasiMethod()) // da errore perche' dice che il type e' unknown. quindi meglio fare type narrowing

  if (typeof value === 'string')
    console.log(value.toUpperCase()) // in quqesto caso va bene xk ho validato prima il type

}



