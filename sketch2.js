let canvas;

let fontTitle;

let t = 0;
let num = 40;
let cells = [];

let previousTime = 0; 

function windowResized(){
  resizeCanvas(windowWidth, 2000);
}

function setup(){
  
  canvas = createCanvas(windowWidth, 2000);
  canvas.position(0,0);
  canvas.style('z-index',-1);
  
  for(let i=0; i<num; i++){
    cells[i] = new Cells();
  }
  
}

function draw(){
  
  let currentTime = millis();
  
  background(255);
  
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
    
class Cells {
  
  constructor(x,y,r){
    this.x = random(50, width);
    this.y = random(50, height);
    this.r = random(20,30);
  }
  
  display(){
    noFill();
    stroke(255,70,110,100);
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
