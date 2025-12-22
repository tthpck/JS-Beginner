const _id = new WeakMap()

class Person {
  constructor(name, id){
    this.name = name;
    _id.set(this, id)
  }

  getId(){
    return _id.get(this)
  }

  greet(){
    return  `hi! ${_id.get(this)}`
  }

  static parse(str){
    return new Person(str)
  }
}


const p = new Person('marco', 1234)
console.log(p.getId())






//static method da chiarire


