class Car {
  #brand;
  #model;
  speed = 15;
  isTrunkOpen = false;

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  go(){
    this.speed = this.speed + 2;
  }

  brake(){
    this.speed = this.speed - 5;
  }

  displayInfo() {
    console.log(`${this.#brand} , ${this.#model} ${this.speed} km/h ${this.isTrunkOpen}`)
  }

  closeTrunk() {
    this.isTrunkOpen = false; 
  }

  openTrunk() {
    if (!(this.speed > 0)) this.isTrunkOpen = true
    
  }
}



const toyota = new Car({brand: 'toyota', model: 'corolla'});
toyota.displayInfo();

class RaceCar extends Car {
  
  acceleration;
  
  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed = this.speed + this.acceleration; 
  }

}

const superCar = new RaceCar ({brand: 'mclaren', model: 'f1', acceleration: 20});


superCar.go()
superCar.displayInfo()