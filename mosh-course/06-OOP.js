


/*
duration  =0
start() chiama solo una volta
stop() chiama solo una volta
reset() resetta
*/


function Stopwatch () {

  this.duration = JSON.parse(localStorage.getItem('duration')) || 0;
  this.timelapse;

  this.start = () => {
    if (this.duration === 0){
      this.duration = Date.now();
      console.log('stopwatch started!')
      localStorage.setItem('duration', this.duration);
    } else {
      console.log('it already started!')
    }
    
  };

  this.stop = () => {
    if (this.duration !== 0) {
      this.timelapse = Number((Date.now() - this.duration)/1000)
      console.log(this.timelapse);
      this.duration = 0;
      localStorage.setItem('duration', this.duration);
    } else {
      console.log('start the stopwatch!')
    }
  };

  this.reset = () => {
    this.duration = 0;
    localStorage.setItem('duration', this.duration)
    console.log('sw reset!')
  }
}

const sw = new Stopwatch()


sw.start()

