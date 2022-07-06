
// liste von Wörtern die man erraten kann 
var wordList = [
  "hallo",
  "orthopäde",
  "zahnarzt",
  "laptop",
  "berlin",
  "brandschutz",
  "wohnung",
  "kommunikationssystem",
  "formel1",
  "google",
  "python",
  "javascript",
  "mongodb",
  "json",
  "java",
  "html",
  "css",
  "c",
  "csharp",
  "golang",
  "kotlin",
  "php",
  "sql",
  "ruby",
  "mehmet",
  "eman",
  "sadeddin",
  "ertugrul",
  "basri",
  "hasan",
  "metehan",
];
document.getElementById(
  "hangmanImage"
).src = `1.png`;
// wort welches zu erraten gilt
let answer = "";
let maxMistakes = 8;
let mistakes = 0;
// liste von bereits verwendeten Buchtsaben 
let guessed = [];
//let guessed = ["a"];
// derzeitiges Wort 
let wordStatus = null;

document.getElementById("maxMistakes").innerHTML = maxMistakes;



// generiert ein zufälliges Wort aus dem Array
function randomWord() {
  answer = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(answer);
  console.log(answer.split(""));
}

// erstellt die Button im Browser
function generateButton() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button class="btn letter" id = "${letter}" onclick= "guessedLetter('${letter}')"> ${letter} </button>`
    )
    .join("");
  // console.log(buttonsHTML)
  document.querySelector(".keyboard").innerHTML = buttonsHTML;
}

// Zusatzfunktion zum aktualsieren des Wortes, falls ein Buchstabe richtig erraten wurde
function guessedWord() {
  console.log(answer);
  wordStatus = answer
    .split("")
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : " _ "))
    .join("");
  console.log(wordStatus);
  document.getElementById("wordResult").innerHTML = wordStatus;
}

// je nach Eingabe wird das Wort aktualisiert oder die Mistakes erhöhen sich 
function guessedLetter(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null; // tenary operator -> ähnlich wie if else 
  document.getElementById(chosenLetter).setAttribute("disabled", true); // alle button die geklickt wurden, werden disabled

  // wenn der Buchstabe vorhanden ist, also sein indexOf > 0, dann wird überprüft wo der Buchtsabe vorhanden ist, durch die Zusatzfunktion guessedWord() und ob der Spieler, das Spiel gewonnen hat 
  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkWin();
  } else if (answer.indexOf(chosenLetter) == -1) { // wenn der Buchstabe nicht vorhanden ist, also sein indexOf == -1 ist, dann werden die mistakes erhöht und geschaut ob der Spieler verloren hat , zusätzlich wird das Bild aktualisiert 
    mistakes++;
    updateMistakes();
    checkLost();
    updateHangmanImage();
  }

  console.log("bisher benutzte Buchstaben " + guessed);
}


// aktualsiert das Bild je nach Mistakeanzahl 
function updateHangmanImage() {
  document.getElementById(
    "hangmanImage"
  ).src = `${mistakes}.png`;
}

function updateMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes;
}

// überprüft, ob das Spiel gewonnen wurde 
function checkWin() {
  if (wordStatus == answer) {
    document.querySelector(".keyboard").innerHTML = "Du hast gewonnen";
    document.getElementById(
      "hangmanImage"
    ).src = `8.png`;
  }
  
}

// überprüft, ob das Spiel verloren wurde 
function checkLost() {
  if (mistakes == maxMistakes) {
    document.getElementById("wordResult").innerHTML =
      "Das zu eratene Wort war: " + answer;
    document.querySelector(".keyboard").innerHTML = "Du hast verloren.";
  }
}
// setzt das Spiel zurück und lässt es von vorne beginnen 
function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById(
    "hangmanImage"
  ).src = `1.png`;
  randomWord();
  guessedWord();
  updateMistakes();
  generateButton();
}

// generiert das zufällige wort 
randomWord();
// erstellt die leeren Linien für das zu erratene Wort 
guessedWord();
// generiert die Button 
generateButton();


