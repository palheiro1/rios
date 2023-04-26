var rivers = [
  "Eume",
  "Ulla",
  "Miño",
  "Sil",
  "Lérez",
  "Tambre",
  "Deza",
  "Louriña",
  "Avia",
  "Mandeo",
  "Barbanza",
  "Limia",
  "Umia",
  "Lobos",
  "Cabe",
  "Sar",
  "Bibei",
  "Xallas",
  "Támega",
  "Furelos",
  "Ladra",
  "Landro",
  "Mande",
  "Masma",
  "Mera",
  "Mero",
  "Neira",
  "Oitavén",
  "Oro",
  "Rato",
  "Sever"
];

var currentRiver = null;
var maxRounds = 10;
var currentRound = 0;
var score = 0;

function startGame() {
  score = 0;
  currentRound = 0;
  document.getElementById("score").textContent = "Pontuação: " + score;
  document.getElementById("start-button").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  playRound();
}

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("novo-jogo").addEventListener("click", function() {
  document.getElementById("end-container").style.display = "none";
  startGame();
});

function playRound() {
  currentRiver = randomRiver();
  var riverOptions = rivers.slice();
  var index = riverOptions.indexOf(currentRiver);
  riverOptions.splice(index, 1);
  riverOptions.sort(function() { return 0.5 - Math.random(); });
  var optionsHTML = "";
  for (var i = 0; i < 4; i++) {
    optionsHTML += "<button class=\"river-option\" data-river=\"" + riverOptions[i] + "\">" + riverOptions[i] + "</button>";
  }
  document.getElementById("options").innerHTML = optionsHTML;
  currentRound++;
  document.getElementById("round").textContent = "Prova " + currentRound + "/" + maxRounds;
  document.getElementById("current-river").textContent = currentRiver;
  document.querySelectorAll(".river-option").forEach(function(button) {
    button.addEventListener("click", checkAnswer);
  });
}

function checkAnswer(event) {
  var selectedRiver = event.target.getAttribute("data-river");
  if (selectedRiver === currentRiver) {
    score++;
    alert("Correto!");
  } else {
    alert("Errado!");
  }
  document.getElementById("score").textContent = "Pontuação: " + score;
  if (currentRound >= maxRounds) {
    endGame();
  } else {
    playRound();
  }
}

function randomRiver() {
  var index = Math.floor(Math.random() * rivers.length);
  return rivers[index];
}

function endGame() {
  var message, image;
  if (score >= 7) {
    message = "Parabéns!";
    image = "trofeo.png";
  } else {
    message = "Tenta novamente!";
    image = "mochila.png";
  }
  document.getElementById("game-container").style.display = "none";
  document.getElementById("end-message").textContent = message;
  document.getElementById("end-image").setAttribute("src", image);
  document.getElementById("end-container").style.display = "block";
}

