//Called once when the page is ready
function setup() {
	console.log("Setup");
	createCanvas(windowWidth, windowHeight);
  x = windowWidth/2;
  y = 10;
  g = 9.8;
  v = 2;
}

//Called every frame after setup is called
function draw() {
  background(0,0,0);
  ellipse(x, y, 50, 50);
  y = y*1.5 g;
}

//Called every time the mouse if pressed
function mousePressed(){
	console.log("X:" + mouseX + " Y:" + mouseY);
}

//Called every time the window is resized
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}