let speechRec;
let f = [
  "Sopra la panca la capra campa sotto la panca la capra crepa",
  "Tre tigri contro tre tigri tre tigri contro tre tigri",
  "Che orrore che orrore ho visto un ramarro verde su un muro marrone",
];
let intro =
  "Hello guys! \n \nThis is a small game that allows you to improve \n on the pronunciation of SCIOGLILINGUA.\n It won't be easy to beat a dull voice recognizer,\n but if you get to the end, you can get yourself\n an epic souvenir photo.\n Read aloud the text on the left and hope to pass \n the 3 levels.";

let incitazioni = [
  "Good one brother",
  "Sei forte",
  "daje fratè",
  "sei il migliore",
  "Quasi finito roccia",
];
let counter = 0;
let cambio = 0;
let cambio2 = -1;

let voice = new p5.Speech();

let myImage1;
let myImage2;
let myImage3;

let capture;

function preload() {
  myImage1 = loadImage("./assets/felice.png");
  myImage2 = loadImage("./assets/triste.png");
  myImage3 = loadImage("./assets/DIEGO.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 255);
  rectMode(CORNER);

  capture = createCapture(VIDEO);
  capture.hide();

  let lang = navigator.language || "en-US";
  let speechRec = new p5.SpeechRec(lang, gotSpeech);

  let inizio = true;
  let fine = false;

  speechRec.start(inizio, fine);

  //RICONOSCIMENTO
  function gotSpeech() {
    if (f[cambio].match(speechRec.resultString)) {
      background(0, 0, 255);

      cambio2 = cambio2 + 1;
      cambio = cambio + 1;
      textFont("Libre Baskerville");
      textAlign(LEFT);
      textStyle(BOLDITALIC);
      textSize(35);
      text(incitazioni[cambio2], windowWidth / 2 + 50, 530);
      voice.speak(incitazioni[cambio2]);

      //image(myImage2, 870, 100, myImage2.width - 100, myImage2.height - 100);
    } else {
      background(255, 0, 0);
      counter = counter + 1;
      cambio2 = cambio2;
      cambio = cambio;
      textFont("Libre Baskerville");
      textAlign(LEFT);
      textStyle(BOLDITALIC);
      textSize(35);
      text("Try again brother :(", windowWidth / 2 + 50, 530);
      voice.speak("Try again brother");
      //image(myImage1, 870, 100, myImage1.width - 100, myImage1.height - 100);
    }
    console.log(speechRec);
  }
}

// TESTI
function draw() {
  textFont("Archivo");
  textSize(80);
  textStyle(BOLD);
  textAlign(LEFT);
  textLeading(90);
  text(f[cambio], 70, 70, windowWidth / 2 - 200, 800);
  textSize(30);
  textLeading(30);
  text(intro, windowWidth / 2 + 50, 100);
  text(counter, windowWidth / 2 + 240, 700);
  textFont("Libre Baskerville");
  textStyle(BOLDITALIC);
  text("Fail counter:", windowWidth / 2 + 50, 700);
  if (cambio == 3) {
    if (capture.loadedmetadata) {
      image(capture, windowWidth / 2 - 400, 440, 640, 480);

      filter(GRAY);
    }
    image(myImage3, 0, 0, windowWidth, windowHeight);
    fill("red");
    text("press s to save", windowWidth / 2 - 400, 700);
  }
}

//salvare
function keyTyped() {
  if (key === "s") {
    saveCanvas("CAMPEON", "jpg");
  }
}
