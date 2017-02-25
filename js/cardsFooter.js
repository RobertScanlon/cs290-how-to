document.addEventListener("DOMContentLoaded", function() {
  var footer = document.getElementById("pageFooter");
  for (var i = 0; i < 15; i++) {
    footer.textContent += '\u2660';
    footer.textContent += '\u2665';
    footer.textContent += '\u2663';
    footer.textContent += '\u2666';
  }
});
