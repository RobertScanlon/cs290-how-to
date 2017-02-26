document.addEventListener("DOMContentLoaded", function() {printBorder("leftBorder");});
document.addEventListener("DOMContentLoaded", function() {printBorder("rightBorder");});

function printBorder(id) {
  var leftBorder = document.getElementById(id);
  for (var i = 0; i < 15; i++) {
    var suite = document.createElement("span");
    suite.textContent = '\u2660';
    leftBorder.appendChild(suite);
    leftBorder.appendChild(document.createElement("br"));
    var suite = document.createElement("span");
    suite.textContent = '\u2665';
    leftBorder.appendChild(suite);
    leftBorder.appendChild(document.createElement("br"));
    var suite = document.createElement("span");
    suite.textContent = '\u2663';
    leftBorder.appendChild(suite);
    leftBorder.appendChild(document.createElement("br"));
    var suite = document.createElement("span");
    suite.textContent = '\u2666';
    leftBorder.appendChild(suite);
    leftBorder.appendChild(document.createElement("br"));
  }
}
