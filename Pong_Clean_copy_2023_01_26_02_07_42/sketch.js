let horBolinha = 300;
let verBolinha = 200;
let diaBolinha=20;
let raio=diaBolinha/2;
let velHorBolinha = 6;
let velVerBolinha = 6;
let xRkt = 5;
let yRkt = 150;
let wRkt=10;
let hRkt=100;
let xOpRkt = 580;
let yOpRkt = 150;
let col=false;
let velVerOp;
let myPt = 0;
let opPt = 0;
let raquetada;
let ponto;
let trilha;
let erroChance=0;
let trava=false;

function setup() {
  createCanvas(600, 400);
  //trilha.loop();
  
}

function draw() {
  background(0);
  placar();
  marcaPonto();
  criaBolinha();
  criaRect(xRkt, yRkt);
  criaRect(xOpRkt, yOpRkt);
  movimentaBolinha();
  colisaoBolinha();
  movRkt();
  colisaoLib(xRkt, yRkt);
  colisaoLib(xOpRkt, yOpRkt);
  //movRktOp(); // CPU move raquete adversaria;
  movRktManual(); // Raquete adversária manual movida no W e S;
  //colisaoRkt(); Formula sem a Library, programa está usando a colisaoLib;
}

function criaBolinha(){
  circle(horBolinha,verBolinha,diaBolinha)
}

function movimentaBolinha(){
  horBolinha += velHorBolinha
  verBolinha += velVerBolinha
}

function colisaoBolinha(){
  if(horBolinha+raio> width || horBolinha-raio<0){
    velHorBolinha *= -1
  }
  if(verBolinha+raio> height || verBolinha-raio<0){
    velVerBolinha *= -1
  }
}

function criaRect(x, y){
  rect(x,y,wRkt,hRkt)
}

function movRkt(){
  if(keyIsDown(UP_ARROW) && yRkt-wRkt>=5){
    yRkt-=10;
  }
  if(keyIsDown(DOWN_ARROW) && wRkt+yRkt<=295){
    yRkt+=10;
  }
}



function colisaoRkt(){
 if(horBolinha-raio<xRkt+wRkt && verBolinha-raio<yRkt+hRkt && verBolinha+raio>yRkt){
   velHorBolinha *= -1
 }
}

function colisaoLib(x, y){
  col=collideRectCircle(x, y, wRkt, hRkt, horBolinha, verBolinha, raio)
  if (col){
    velHorBolinha *= -1
    raquetada.play();
  }
}

function movRktOp(){
  velVerOp = verBolinha - yOpRkt - wRkt /2-30;
  yOpRkt += velVerOp + erroChance
  calcErroChance();
}

function movRktManual(){
  if(keyIsDown(87) && yOpRkt-wRkt>=5){
    yOpRkt-=10;
  }
  if(keyIsDown(83) && wRkt+yOpRkt<=295){
    yOpRkt+=10;
  }
}

function placar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(0,0,205));
  rect(150,10,40,20);
  fill(255);
  text(myPt, 170,26);
  fill(color(139,0,0));
  rect(450,10,40,20);
  fill(255);
  text(opPt, 470,26);
}

function marcaPonto(){
  if(horBolinha>590){
    myPt += 1
    ponto.play();
    horBolinha=580
  }
  if(horBolinha<10){
    opPt +=1
    ponto.play();
    horBolinha=20
  }
}

function preload(){
  trilha=loadSound("trilha.mp3");
  ponto=loadSound("ponto.mp3");
  raquetada=loadSound("raquetada.mp3");
}

function calcErroChance(){
  if (myPt < opPt){
    erroChance+=1
    if(erroChance>=39){
      erroChance=40
    }
  } else {
    erroChance-=1
    if (erroChance<=35){
      erroChance=35
    }
  }
}

function travaOp(){
  return yOpRkt
}

