let rings= []; let n =9;
let xPos=0;
let yPos=0;
let easing=0.005;

function setup(){
   canvas=createCanvas(windowWidth,windowHeight);
   canvas.position(0,0);
   canvas.style("z-index", -2);//doesnt overlay on words
   angleMode(DEGREES);

   for(let i=0;i<n;i++)
   rings[i]= r= new Ring(150-i*10,50-i*5,6-i*0.5);

}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    clear();
    xPos=xPos+((mouseX-xPos)+easing);
    yPos=yPos+((mouseY-yPos)+easing);

    drawThing(mouseX,mouseY);
    background(133, 15, 115);
    translate(width/2,height/2);

    for(let i=0;i<n;i++){
    rings[i].display();
     rings[i].move();
 }
}


function drawThing(_x,_y){
        fill(0);
        ellipse(_x, _y, 30, 70, 5);
    }