let linhaElls = 10;
let diametro = 30;

let playlist = [
  "brunão.mp3",
  "bruninho.mp3",
  "golden.mp3",
  "hell.mp3",
  "infinita.mp3",
  "mine.mp3",
  "moonwalking.mp3",
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
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(0, 40);

  linhaElls = width / diametro;

  let level = amp.getLevel();
  level = map(level, 0, 0.3, 0, 150);

  let centroX = width / 2;
  let centroY = height / 2;

  let maxDist = dist(0, 0, centroX, centroY);

  for (let i = 0; i < linhaElls; i++) {
    for (let j = 0; j < height; j += diametro) {

      let x = i * diametro;
      let y = j;

      let distCentro = dist(x, y, centroX, centroY);

      // influência do som (mais forte no centro)
      let influencia = map(distCentro, 0, maxDist, 1, 0);

      let tamanho = diametro + level * influencia;

      // COR: degradê rosa → amarelo usando lerpColor
      let corCentro = color(330, 90, 100); // rosa
      let corBorda = color(60, 90, 100);   // amarelo
      let t = distCentro / maxDist;        // 0 no centro, 1 nas bordas
      let corFinal = lerpColor(corCentro, corBorda, t);

      // brilho adicional reativo ao som
      let brilhoExtra = level * 0.3;
      corFinal = color(
        hue(corFinal),
        saturation(corFinal),
        constrain(brightness(corFinal) + brilhoExtra, 0, 100)
      );

      fill(corFinal);

      ellipse(
        x + random(-1, 1),
        y + random(-1, 1),
        tamanho,
        tamanho
      );
    }
  }

  mostrarNomeMusica();

  // Fade in do som
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