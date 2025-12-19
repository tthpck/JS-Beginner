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




const _side = new WeakMap();

class Square {
  constructor(side){
    _side.set(this, side)
  };

  draw(){
    console.log(_side.get(this))
  }
}


const s = new Square(5)

s.draw()



