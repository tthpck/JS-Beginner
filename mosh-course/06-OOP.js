


/*
duration  =0
start() chiama solo una volta
stop() chiama solo una volta
reset() resetta
*/






/*

console.log(Object.keys(Object.getPrototypeOf(sw)))

let newArray = []

const proto1 = Object.getPrototypeOf(newArray)
console.log(proto1) // prototype delle array


const proto2 = Object.getPrototypeOf(proto1)
console.log(proto2) //questo è il root object

const proto3 = Object.getPrototypeOf(proto2)
console.log(proto3) //questo null







function ObjectCreator(){
  this.name = 'name test'
}

ObjectCreator.prototype.newFunction= () => {console.log('ciao')}

const objectOne = new ObjectCreator

console.log(ObjectCreator.prototype === Object.getPrototypeOf(objectOne))

const root = Object.getPrototypeOf(Object.getPrototypeOf(objectOne))

for (let key in (objectOne)) console.log(key)

  console.log(Object.keys(objectOne))



  console.log(Object.getOwnPropertyDescriptor(objectOne, 'name'));
*/

//shape
function Shape(color){
  this.color = color;
  };

Shape.prototype.duplicate = function(){
  console.log('duplicate')
}

//extends function
function extend(Child, Parent){
  Child.prototype = Object.create(Parent.prototype)
  Child.prototype.constructor = Child;
}

//circle
function Circle(radius, color){
  Shape.call(this,color)        //super constructor
  this.radius = radius
}

extend(Circle, Shape);

Circle.prototype.duplicate = function(){
  Shape.prototype.duplicate.call(this)
  console.log('duplicate Circle')
}

//square
function Square(size, color){
  this.size = size;
  Shape.call(this, color)
}
extend(Square, Shape)

Square.prototype.duplicate = function(){
  Shape.prototype.duplicate.call(this);
  console.log('Square')
}


const c = new Circle(10, 'red')

const sq = new Square(11, 'blue')



function mixin(target, ...sources){
  Object.assign(target, ...sources)
}


const canEat = {
  eat: function(){
    this.hunger--;
    console.log('eating');
  }
}

const canWalk = {
  walk: function(){
    console.log('walking');
  }
}

function Person() {
}

mixin(Person.prototype,canEat,canWalk)

const human = new Person();
console.log(human)




const e = new HTMLElement()


const s = new HTMLSelectElement()