let linhaElls = 10
let diametro = 30

let som;
let play = false;

let amp;


function preload() {

  som = loadSound('./bruninho.mp3')
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  amp = new p5.Amplitude()
}

function draw() {
  background(0);



  let level = amp.getLevel();
  level = map(level, 0, 1, 0, 200);

  let cor = map(level, 0, 1, 50, 255);



  linhaElls = width / diametro;

  for (i = 0; i < linhaElls; i++) {
    for (j = 0; j < height; j += diametro) {
      fill(cor)
      ellipse(0 + i * diametro + random(-1, 10), 0 + j + random(-1, 10), diametro + level, diametro + level)
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

