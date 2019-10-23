function Particle() { // constructor
  this.pos = createVector(random(width), random(height));  // the current position of the particle
  this.vel = createVector(0,0);  // velocity is the change in position over time
  this.acc = createVector(0,0);  // acceleration is the change in velocity over time
  this.maxspeed = 2;
  this.h = 0;

  this.prevPos = this.pos.copy();

  this.update = function() {
    this.vel.add(this.acc); // acceleration gets added to velocity
    this.vel.limit(this.maxspeed); // throttle it to a max speed limit
    this.pos.add(this.vel); // velocity gets added to position
    this.acc.mult(0);  // zero out accelerattion each time
  }

// I'm a particle.  Based on my x, y position store myself in an array. look up that position in the 1D array where
// vector values are stored.  compare me to the vector value in the same area,
// then apply that vector's value to force -- moving me congruently with the vector
this.follow = function(vectors) {
  var x = floor(this.pos.x / scl); //determine the x position in the grid
  var y = floor(this.pos.y/scl); //determine the y position in the grid
  var index = x + y * cols; // formula that translates a 1d array into the correct spot in a 2d array
  var force = vectors[index];
  this. applyForce(force);
}

  this.applyForce = function(force) { // this accepts an argument which is applied to acceleration
    this.acc.add(force);
  }

  this.show = function() {
    stroke(this.h, 255, 255, 25); // vary the red component with green and blue on full.  alpha is low
    this.h = this.h + 0.5;
    if (this.h > 255) {
      this.h = 0;
    }
  // INTERACTIVE SLIDER
    strokeWeight(sliderThick.value());

    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
//    point(this.pos.x, this.pos.y);

    this.updatePrev();  
  }

    this.updatePrev = function() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

 this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }

} // END OBJECT
