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
  
  for(let i=0; i<num; i++){
    cells[i] = new Cells();
  }
  
}

function draw(){
  
  let currentTime = millis();  
  
  //background color
  gradientBG(0, 0, width, height, c1, c2);
  
  //squiggly connected balls
  for (let i=0; i<cells.length; i++){
  cells[i].display();
  cells[i].wiggle();
  cells[i].moveAway();
  }
  
  for (let c1 of cells){
    for (let c2 of cells){
      let d = dist(c1.x, c1.y, c2.x, c2.y);
      if (d < 100){
        line(c1.x, c1.y, c2.x, c2.y);        
        if (currentTime - previousTime >= 1000){
          previousTime = currentTime;
          let nc = new Cells();
          cells.push(nc);
        }
      }
    }
  }
  
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
    
class Cells {
  
  constructor(x,y,r){
    this.x = random(50, width);
    this.y = random(50, height);
    this.r = random(20,30);
  }
  
  display(){
    noFill();
    stroke(255,255,255,100);
    strokeWeight(1);
    ellipse(this.x, this.y, this.r);
  }
  
  wiggle(){ 
    t += 0.0001;
    let m1 = noise(t);
    let m2 = noise(t+5);
    // m1 = map(m1,0,1,0, width);
    // m2 = map(m2,0,1,0, height);
    
    this.x += random(-3,3); //width * m1 - this.x;
    this.y += random(-3,3); //height * m2 - this.y;

  }

  
  born(){
     let nc = new Cells();
     cells.push(nc);
  }
  
  moveX = random (-3,3);
  moveY = random (-3,3);
  
  moveAway(){
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 75){      
      this.x += this.moveX;
      this.y += this.moveY;
    }
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
