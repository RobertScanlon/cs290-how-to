document.addEventListener("DOMContentLoaded", bindGetFreshDeck);

var deckId;

function bindGetFreshDeck() {
  document.getElementById("ex1Button").addEventListener(
    "click", function(event) {
      var request = new XMLHttpRequest();
      var APIurl = "https://deckofcardsapi.com/api/deck/new/";
      request.open("GET", APIurl, true);
      request.send(null);
      request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
          var freshDeck = JSON.parse(request.responseText);
          showResult(freshDeck);
          deckId = freshDeck.deck_id;
          bindDraw();
        } else {
          console.log("error");
        }
      });
    event.preventDefault();
  });
}

function bindDraw() {
  document.getElementById("draw1").addEventListener(
    "click", function(event) {
      var request = new XMLHttpRequest();
      var APIurl = "https://deckofcardsapi.com/api/deck/";
      APIurl += deckId;
      APIurl += "/draw/?count=1";
      request.open("GET", APIurl, true);
      request.send(null);
      request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
          var card = JSON.parse(request.responseText);
          printCard(card);
        } else {
          console.log("error");
        }
      });
    event.preventDefault();
  });
}

function showResult(res) {
  var p = document.getElementById("ex1Div");
  var txt = document.createElement("p");
  var heading = document.createElement("h3");
  heading.textContent = "What The API Returns";
  txt.appendChild(heading);
  var lst = document.createElement("ul");
  var succ = document.createElement("li");
  succ.textContent = "success = " + res.success;
  lst.appendChild(succ);
  var did = document.createElement("li");
  did.textContent = "deck_id = " + res.deck_id;
  lst.appendChild(did);
  var sh = document.createElement("li");
  sh.textContent = "shuffled: = " + res.shuffled;
  lst.appendChild(sh);
  var rem = document.createElement("li");
  rem.textContent = "remaining: = " + res.remaining;
  lst.appendChild(rem);
  txt.appendChild(lst)
  p.appendChild(txt);
}

function printCard(res) {
  var p = document.getElementById("ex2Div");
  if (document.getElementById("imgDiv")) {
    p.removeChild(document.getElementById("imgDiv"));
  }
  var imgDiv = document.createElement("div");
  imgDiv.id = "imgDiv";
  imgDiv.style.textAlign = "center";
  var cardImage = document.createElement("img");
  cardImage.src = res.cards[0].image;
  imgDiv.appendChild(cardImage);
  p.appendChild(imgDiv);
}
