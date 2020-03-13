let canvas;

let c1, c2;
let fontTitle;

let t = 0;
let num = 40;
let cells = [];

let previousTime = 0; 

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function setup(){
  
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index',-1);
  
  c1 = color(255, 87, 69);
  c2 = color(194, 37, 196);  
  
}

function draw(){
  
  //background color
  gradientBG(0, 0, width, height, c1, c2);
  
}


function gradientBG(x,y,w,h,c1,c2){
  noFill();
  for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
}
  

function gradientBG(x, y, w, h, c1, c2) {
  noFill();
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i); 
  }
}
