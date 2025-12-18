function User(name){
  this.name = name;
}

User.prototype.sayHi = function(){
  return `Hi, ${this.name}`
};

const u1 = new User('marco');
const u2 = new User('fabri');

console.log(u2.sayHi())
console.log(u1.sayHi())

console.log(u1.sayHi === u2.sayHi)


Object.defineProperty(User.prototype,'sayHi',{enumerable: false})

for (let key in u1)console.log(key);


function Animal(name,size){
  this.name = name;
  this.size = size;
}

Animal.prototype.eat = function(){
  return `${this.name} is eating`
}

function Dog(name, size){
    Animal.call(this, name, size)
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog

Dog.prototype.eat = function(){
  const prototypeEat = Animal.prototype.eat.call(this)
  return `${prototypeEat} he is a dog, his size is ${this.size}`
}


function Cat(name, size){
  Animal.call(this, name, size)
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat

Cat.prototype.eat = function(){

  return `The Cat ${this.name} is eating, he weights ${this.size}`
}


const animals = [
    new Dog('fido', 55),  
    new Cat('gordo', 13)
]


animals.forEach(animal =>{
  console.log(animal.eat())
})




function Shape(){}


Shape.prototype.draw = function(){
  return 'draw shape';
};

function Circle(radius){
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function(){
  return 'Drawing a circle';
}


const c1 = new Circle(10)

console.log(c1.draw())