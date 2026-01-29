let linhaElls = 10;
let diametro = 30;

let playlist = [
  "abracadabra.mp3",
  "bang.mp3",
  "beijar.mp3",
  "best.mp3",
  "boom.mp3",
  "bottle.mp3",
  "brick.mp3",
  "brunão.mp3",
  "bruninho.mp3",
  "butterfly.mp3",
  "california.mp3",
  "crying.mp3",
  "dancing.mp3",
  "dream.mp3",
  "easy.mp3",
  "everlong.mp3",
  "fire.mp3",
  "floor.mp3",
  "forget.mp3",
  "girlfriend.mp3",
  "golden.mp3",
  "god.mp3",
  "hurricane.mp3",
  "hell.mp3",
  "infinita.mp3",
  "judas,mp3",
  "kissed.mp3",
  "lazy.mp3",
  "levels.mp3",
  "love.mp3",
  "matters.mp3",
  "mine.mp3",
  "miss.mp3",
  "moonwalking.mp3",
  "mujeriego.mp3",
  "ophelia.mp3",
  "payphone.mp3",
  "persuasion.mp3",
  "rebel.mp3",
  "rock.mp3",
  "rockn.mp3",
  "satisfaction.mp3",
  "sina.mp3",
  "soda.mp3",
  "starships.mp3",
  "sweaterweather.mp3",
  "taste.mp3",
  "takitaki.mp3",
  "thing.mp3",
  "thunderstruck.mp3",
  "timber.mp3",
  "uai.mp3",
  "upside.mp3",
  "vagalumes.mp3",
  "way.mp3",
  "wonderwall.mp3"
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
  level = map(level, 0, 0.3, 0, 100); // intensidade da música para brilho

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

      let tamanho = diametro + level * influencia * 0.5; // leve aumento de tamanho

      // COR: cinza base, brilho reage ao som
      let brightnessBase = map(influencia, 0, 1, 10, 80); // cinza médio
      let brightnessReactive = constrain(brightnessBase + level * 0.5, 0, 100); // fica mais claro conforme a música
      fill(0, 0, brightnessReactive); // HSB: 0/0 = cinza

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