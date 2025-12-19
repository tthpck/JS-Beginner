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



function mixin(targetObject, ...members){
  Object.assign(targetObject, ...members)
}

const canEat = {
  eat: function(){
    console.log('is eating');
  }
};

const canWalk = {
  walk: function(){
    console.log('walks');
  }
};

const canSwim = {
  swim: function(){
    console.log(`${this.name} swims`);
  }
};

function Person(name){
  this.name = name;
};

function Fish(name){
  this.name = name;
};

mixin(Person.prototype, canEat, canWalk, canSwim);

mixin(Fish.prototype, canEat, canSwim);

const p1 = new Person('marco');
const f1 = new Fish('nemo');

p1.walk();
p1.swim();
p1.eat();

f1.swim()



const creation = {
  createdAt: function(){
    console.log(`created on ${Date.now()}`)
  }
}
function Note(){};

Object.assign(Note.prototype, creation);

const n1 = new Note();

n1.createdAt();




function HasScore(targetObject){
  let score = 0;
  let isSet = false

  Object.defineProperty(targetObject, 'score', {
    get(){
      return score;
  }, set(newScore){
    if(!isSet)
    {score = newScore;
    isSet = true};
  }})
};

function Game(){
  HasScore(this)
};

function Match(){
  HasScore(this)
};

const g = new Game();

const m = new Match();

g.score = 10;
console.log(g.score)

g.score = 5;
console.log(g.score)

m.score = 10;
console.log(m.score)

m.score = 5;
console.log(m.score)



const canSave = {
  save: function(){
    console.log(`saved ${this.id}`)
  }
}

function Note(id){
  this.id = id
}

Object.assign(Note.prototype, canSave)

const n3 = new Note('id123');
const n4 = new Note('id124');

n3.save();
n4.save();
