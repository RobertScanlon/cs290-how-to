// cardsBorder.js
// Robert Scanlon
// CS290 Winter 2017
// How-To Project

document.addEventListener("DOMContentLoaded", function() {printBorder("leftBorder");});
document.addEventListener("DOMContentLoaded", function() {printBorder("rightBorder");});

var length = 73;

function printBorder(id) {
  var leftBorder = document.getElementById(id);
  for (var i = 0; i < length; i++) {
    var spade = document.createElement("span");
    spade.textContent = '\u2660';
    leftBorder.appendChild(spade);
    leftBorder.appendChild(document.createElement("br"));
    var heart = document.createElement("span");
    heart.textContent = '\u2665';
    heart.style.color = "red";
    leftBorder.appendChild(heart);
    leftBorder.appendChild(document.createElement("br"));
    var club = document.createElement("span");
    club.textContent = '\u2663';
    leftBorder.appendChild(club);
    leftBorder.appendChild(document.createElement("br"));
    var diam = document.createElement("span");
    diam.textContent = '\u2666';
    diam.style.color = "red";
    leftBorder.appendChild(diam);
    leftBorder.appendChild(document.createElement("br"));
  }
}
