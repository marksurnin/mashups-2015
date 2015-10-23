var img;

function preload() {
  img = loadImage('./photo.jpg');
}

function filterImage() {
  loadPixels();
  for (var i = 0; i < pixels.length; i+=4) {
    pixels[i] = (pixels[i] * 2) % 255;
    pixels[i+2] = (pixels[i] * 4) % 255;
  }
  updatePixels();
}

function setup() {
  createCanvas(800, 600);
  image(img, 0, 0, 800, 600);
}

$("#button").click(function() {
  filterImage();
});