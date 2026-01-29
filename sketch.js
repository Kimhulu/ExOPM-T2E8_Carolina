let linhaElls = 10
let diametro = 30

let som;
let play = false;

let amp;


function preload() {

  // MUSICAS 
  // brunão.mp3
  // bruninho.mp3
  // golden.mp3
  // hell.mp3
  // infinita.mp3
  // mine.mp3
  // mujeriego.mp3
  // ophelia.mp3
  // sina.mp3
  // sugar.mp3
  // sweaterweather.mp3
  // takitaki.mp3
  // vagalumes.mp3

  //mudar a musica no final do './playlist/musica'
  som = loadSound('./playlist/bruninho.mp3')
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  amp = new p5.Amplitude()
}

function draw() {
  background(0);

  linhaElls = width / diametro;

  let level = amp.getLevel();
  level = map(level, 0, 2.5, 0, 150);

  let cor = map(level, 0, 20, 50, 255);


  for (i = 0; i < linhaElls; i++) {
    for (j = 0; j < height; j += diametro) {
      fill(cor)
      ellipse(0 + i * diametro + random(-1, 2), 0 + j + random(-1, 2), diametro + level, diametro + level)
    }
  }
}

function mousePressed() {
  if (!play) {
    som.loop();
    play = true;
  } else {
    som.pause();
    play = false;
  }
}

