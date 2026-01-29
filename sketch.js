let linhaElls = 10;
let diametro = 30;

let playlist = [
  "brunão.mp3",
  "bruninho.mp3",
  "golden.mp3",
  "hell.mp3",
  "infinita.mp3",
  "mine.mp3",
  "mujeriego.mp3",
  "ophelia.mp3",
  "sina.mp3",
  "sugar.mp3",
  "sweaterweather.mp3",
  "takitaki.mp3",
  "vagalumes.mp3"
];

let musicaAtual = 1;
let som;
let play = false;

let amp;

let fade = 0;
let fading = false;

function preload() {
  som = loadSound(`./playlist/${playlist[musicaAtual]}`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  amp = new p5.Amplitude();
}

function draw() {
  background(0, 40);

  linhaElls = width / diametro;

  let level = amp.getLevel();
  level = map(level, 0, 0.3, 0, 150);

  let centroX = width / 2;
  let centroY = height / 2;

  for (let i = 0; i < linhaElls; i++) {
    for (let j = 0; j < height; j += diametro) {

      let x = i * diametro;
      let y = j;

      // distância ao centro
      let distCentro = dist(x, y, centroX, centroY);

      // força da pulsação (mais forte no meio)
      let influencia = map(
        distCentro,
        0,
        dist(0, 0, centroX, centroY),
        1,
        0
      );

      let tamanho = diametro + level * influencia;

      let cor = map(level * influencia, 0, 150, 50, 255);

      fill(cor);
      ellipse(
        x + random(-1, 1),
        y + random(-1, 1),
        tamanho,
        tamanho
      );
    }
  }

  mostrarNomeMusica();

  // Fade in
  if (fading) {
    fade += 0.02;
    som.setVolume(fade);
    if (fade >= 1) fading = false;
  }
}

function mostrarNomeMusica() {
  fill(255);
  textSize(16);
  textAlign(LEFT, BOTTOM);
  text(
    playlist[musicaAtual].replace(".mp3", ""),
    20,
    height - 20
  );
}

function mousePressed() {
  if (!play) {
    som.loop();
    som.setVolume(0);
    fade = 0;
    fading = true;
    play = true;
  } else {
    som.pause();
    play = false;
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW || key === 'd' || key === 'D') {
    trocarMusica(1);
  }

  if (keyCode === LEFT_ARROW || key === 'a' || key === 'A') {
    trocarMusica(-1);
  }
}

function trocarMusica(direcao) {
  som.stop();

  musicaAtual += direcao;

  if (musicaAtual >= playlist.length) musicaAtual = 0;
  if (musicaAtual < 0) musicaAtual = playlist.length - 1;

  som = loadSound(`./playlist/${playlist[musicaAtual]}`, () => {
    if (play) {
      som.loop();
      som.setVolume(0);
      fade = 0;
      fading = true;
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}