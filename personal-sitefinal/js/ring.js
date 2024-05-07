class Ring {
    constructor(r, num, d) {
      this.r = r;
      this.num = num;
      this.d = d;
      
      this.angle = 0;
      this.amt = 0;
      this.min = 0;
    }
    
    display() {
      // fill(255);
      noStroke();
      for (let i=0; i<this.num; i++) {
        let startingAngle = 360/this.num * i; 
        let x = this.r*cos(startingAngle + this.angle);
        let y = this.r*sin(startingAngle + this.angle);
        ellipse(x, y, this.d, this.d);
      }
    }
    
    move() {
      // this.angle += 1;
      // Linear Interpolation eqn: y = min + amt * (max - min)
      this.angle = (this.amt) * 360/this.num;
      if (this.amt > 1) {
        this.amt = 0;
        this.min += 360/this.num;
      } else {
        this.amt += 0.01;
      }
      
    }
  }