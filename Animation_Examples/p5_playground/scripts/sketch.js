var blocks = [];

function Block() {
  this.blockW = random(2, 20);
  this.blockH = random(2, 20);

  this.posX = random(0, width);
  this.posY = random(0, height);

  this.speedX = random(-2, 2);
  this.speedY = random(-2, 2);

  this.r = random(200, 255);
  // this.g = random(0, 255);
  // this.b = random(0, 255);

  this.display = function() {
    fill(this.r, this.r, this.r);
    rect(this.posX, this.posY, this.blockW, this.blockH);
  };

  this.update = function() {
    this.posX += this.speedX;
    this.posY += this.speedY;
  }

  this.run = function() {
    this.update();
    this.display();
  }
}

function setup() {
	console.log("Setup");
	createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 1000 ; i++) {
    blocks.push(new Block());
  }
}

function draw() {
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].run();
  }
}