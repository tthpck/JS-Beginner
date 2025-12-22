//Symbol

const _radius = Symbol()
const _draw = Symbol();

class Circle {
  constructor(radius){
    this[_radius] = radius;
  };
 
  

  [_draw](){
   console.log('draw') 
  }

  static parse(str){
    const radius  = JSON.parse(str).radius;
    return new Circle(radius)
  }
}


//WeakMap

const _side = new WeakMap();
const _move = new WeakMap();

class Square {
  constructor(side){
    _side.set(this, side)

    _move.set(this, () => {
    console.log('move', this)
  })
  };

  draw(){
    console.log(_side.get(this))
  }

}


const s = new Square(5)

s.draw()





class Animal {
  constructor(name){
    this.name = name;
  }
  move(){
    console.log('move')
  }
}

class Dog extends Animal {
  constructor(name){
    super(name)
  };

  walks() {
    console.log('walkds')
  };

  move(){
    super.move()
    console.log('the Dog moves')
  }
}


const d = new Dog('fido');

console.log(d)



const _arr = new WeakMap()

class Stack {
  constructor(){
    _arr.set(this, [])
  }

  peek(){
    if(_arr.get(this).length > 0){
      return _arr.get(this)[_arr.get(this).length-1]
    } else {
      throw new Error('Add an element first!')    }
    
  };

  pop(){
    if (_arr.get(this).length > 0){
      return _arr.get(this).pop()
    } else {
      throw new Error('This stack is empty')
    }
  };

  push(x){
    _arr.get(this).push(x)
  };

  get count(){
    if (_arr.get(this).length <= 0 ) {
      return 'the stack is empty'
    } else {
    return _arr.get(this).length
    }
  }
}


const stack  = new Stack()
