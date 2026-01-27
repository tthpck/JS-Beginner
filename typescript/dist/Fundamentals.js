"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let sales = 123_454_056;
let course = 'Typescript';
let is_published = true;
//infere --> intuisce da solo il type in base al valore assegnato
// se non si dichiara nulla assegna da solo any. Ma any si dovrebbe evitare
function render(document) {
    console.log(document);
}
function renderTwo(document) {
    console.log(document);
}
//ARRAYS
let numbers = [1, 2, 3, '4']; // valido in JS
let numbersTwo = [1, 2, 3, '4']; // in TS da errore
let numbersThree = [];
numbersThree[0] = 1;
numbersThree[1] = '2'; //qui da errore
//TUPLES
let user = [1, 'marco']; //Tuples sono array con struttura fissa di types. Consigliato per 2/3 values max, tipo key value pairs
//ENUMS
// const small = 1;
// const medium = 2;
// const large = 3;
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large"; //assegna in automatico gli altri numeri con +1. Non si usa piu tanto, meglio fare con literal union types  
})(Size || (Size = {}));
let mySize;
//FUNCTIONS
function calculateTax(income, taxYear) {
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.3;
}
calculateTax(10000, 2021); // anche se in JS sarebbe valido, si devono passare esattamente 2 arguments solo, altrimenti si passano i question mark oppure si da un default value
function calculateTaxTwo(income, taxYear = 2022) {
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.3;
}
calculateTaxTwo(15000);
//OBJECTS
let employee = { id: 1, name: 'marco' };
//readonly modifier
let employee2 = { id: 1, name: 'marco' };
employee2.id = 2; //questo da errore perche dovrebbe essere solo read only
let employee3 = { id: 1, name: 'marco', retire: (date) => console.log(date) };
let employee4 = { id: 1, name: 'marco', retire: (date) => console.log(date) };
//UNION TYPES
function KgToLbs(weight) {
    if (typeof weight === 'number')
        return weight * 2.2;
    else
        return parseInt(weight) * 2.2;
}
let textBox = {
    drag: () => console.log('dragged'),
    resize: () => console.log('resized')
};
//LITERAL TYPES - gli si da dei valori specifici
let quantity = 50;
let quantityTwo = 100;
let size = 'cm';
//NULLABLE TYPES
function greet(name) {
    if (name)
        return `hello ${name}`;
    if (!name)
        return 'hola';
}
greet(undefined);
function getCustomer(id) {
    return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(0);
console.log(customer?.birthday.getFullYear());
//# sourceMappingURL=Fundamentals.js.map