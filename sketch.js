let linhaElls = 10;
let diametro = 30;

let m;
let amp;
let c = false;

function preload() {
    m = loadSound("bruninho.mp3");
}

function setup() {
    createCanvas(400, 400);
    linhaElls = width / diametro;
    amp = new p5.Amplitude();
}

function draw() {
    background(0);

    if (c) {
        let level = amp.getLevel();

        let nivel = map(level, 0, 0.3, 0, 25, true);

        for (let i = 0; i < linhaElls; i++) {
            for (let j = 0; j < height; j += diametro) {

                fill(map(i, 0, linhaElls, 0, 255), j, 255);

                ellipse(
                    i * diametro + random(-nivel, nivel),
                    j + random(-nivel, nivel),
                    diametro,
                    diametro
                );
            }
        }
    } else {
        fill(255);
        textAlign(CENTER, CENTER);
        text("Clique para iniciar o áudio", width / 2, height / 2);
    }
}

function mousePressed() {
    if (!c) {
        m.play();
        m.loop();
        c = true;
    }
}