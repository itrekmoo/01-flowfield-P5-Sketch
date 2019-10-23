// copied from Shiffman github and notated
// This sketch creates a grid filled with vectors.  Every cell contains a vector.
// Create a flowfield and fill with perlin noise

var particles = []; // array called particles

var flowfield; // array to hold the values of the vectors in the flowfield

// IMPORTANT: defining our "matrix" is done by taking the width and height of canvas in pixels
// then dividing it by a "scale" value.  That basically creates how wide our rows and columns are
var scl = 20;  // scaling variable
var cols, rows; // important to define how many rows and columns we'll have
				// cols = width/scl   rows = height/scl
var inc = 0.20; // increment along perlin noise axis
var zoff = 0; // THIRD DIMENSION (time) OFFSET for Perlin Noise

// SLIDERS!! //////////////////////
var sliderThick; // slider for thickness
var sliderFollow; // slider for how closely we follow vector's magnitudes
var sliderSway; // speed of flow field "sway" = zoff speed
//var sliderScale; // slider for adjusting scale (size) of vectors in flowfield


var counter = 0; // timer for wiping the screen

// SETUP
function setup() {
  var myCanvas = createCanvas(windowWidth * 0.8, windowWidth * 0.5);
// Move the canvas so it's inside a div.
  myCanvas.parent('sketch');  
  colorMode(HSB, 255);

//////////////////////////////////////////////////////////////////
// INTERACTIVE ELEMENT.  TO CONTROL ELEMENTS OF FLOW FIELD DRAWING
// DISABLING THIS FOR NOW BECAUSE POSITIONING SLIDERS IF ELUSIVE
//////////////////////////////////////////////////////////////////
//  createP('sway');
  sliderSway = createSlider(0.0001, 0.0009, 0.0001, 0.0001);
  sliderSway.parent('sketch');
  sliderSway.position(10,10);
  sliderSway.style('width', '80px');

//   createP(''); //skip a line

//  createP('thickness');
  sliderThick = createSlider(1, 4, 1, 0.5);
  sliderThick.parent('sketch');
  sliderThick.position(10,30);
  sliderThick.style('width', '80px');

//  createP('fidelity');
  sliderFollow = createSlider(.02, 5, 0.2, 0.1);
  sliderFollow.parent('sketch');
  sliderFollow.position(10,50);
  sliderFollow.style('width', '80px');
  // As mentioned above, we create the column and row (cell) sizes by dividing the canvas' height & width by a "scale" value
  cols = floor(width / scl);  // floor gets rid of decimal place
  rows = floor(height / scl); // floor gets rid of decimal place 


  flowfield = new Array(cols * rows); // create an array that stores all the flowfield values so you can compare
  			// particle positions to them.  we set the array's size to rows * columns.

// POPULATE THE PARTICLES ARRAY (declared above)
//
  for (var i = 0; i < 500; i++) {
    particles[i] = new Particle();
  }

  background(50);
}

/////////////////
//  DRAW LOOP  //
/////////////////

function draw() {

  // slider text
//   stroke(255);
//    strokeWeight(0.5);
    fill(177);
    noStroke();
    text('sway', 100, 20);
    text('thickness', 100, 42);
    text('fidelity', 100, 62);

  var yoff = 0;
  for (var y = 0; y < rows; y++) {  // y goes through every row
    var xoff = 0;
    for (var x = 0; x < cols; x++) {  // x goes through every column
      var index = x + y * cols;

      // ANGLE OF VECTORS IN FLOW FIELD
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 2; // variable that holds perline noise value
      		    // angle contains noise values in THREE DIMENSIONS!!  THIRD DIMENSION IS TIME!
      // This is a cool P5 functions which creates a vector _From An Angle_!
      var v = p5.Vector.fromAngle(angle);

// INTERACTIVE SLIDER
      // Magnitude of v controls how tightly the particles will follow the path created by vectors
      v.setMag(sliderFollow.value());  // slow down the vector magnitude so that particles, who follow these vectors, don't get all crazy fast

      flowfield[index] = v; // load the v vector's values into flowfield array.  we track every single vector's value
      			// SO THAT we can compare the particle's proximity to it and "steer" the particle inside the flowfield

      xoff += inc; // x offset gets incremented

// DRAW THE FLOW FIELD
   //  stroke(127);
   //  strokeWeight(1);
   //  push();
   //  translate(x * scl, y * scl); // tranlate to x times scale, y times scale (basically a point in the grid)
   //  rotate(v.heading()); // rotate by vector v's heading
   //  strokeWeight(1);
   //  // DRAW THE VECTORS
   // line(0, 0, scl, 0);  // now draw a line from 0, 0  to scale, 0. Meaning with ENTIRE SIZE of the grid.  
   //              // cell size = scale
   //  pop();


      } // END OF INNER FOR LOOP

  	yoff += inc; // y off set increments outside the "for x" columns loop.  at the end of each pass through width


// INTERACTIVE SLIDER
// zoff controls flow field "sway" speed
    zoff += sliderSway.value();


  counter += 1;
      if (counter > 35000) {
        background(50);
        counter = 0;
     } 

	 } // END OF OUTER FOR LOOP


// CALL ALL THE METHODS OF THE PARTICLE OBJECT FOR EACH ITEM IN THE particles ARRAY
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield); // tell each particle to follow the vector direction stored in flowfield array
    particles[i].update();
    particles[i].edges();
    particles[i].show();
   }

}
