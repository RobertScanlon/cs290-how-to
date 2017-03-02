// codeExample1.js
// Robert Scanlon
// CS290 Winter 2017
// How-To Project

// var APIurl = "http://127.0.0.1:8000/api/deck/";
var APIurl = "https://deckofcardsapi.com/api/deck/";

document.addEventListener("DOMContentLoaded", bindGetFreshDeck);
var deckId;

function bindGetFreshDeck() {
  document.getElementById("ex1Button").addEventListener(
    "click", function(event) {
      var request = new XMLHttpRequest();
      var url = APIurl + "new/";
      request.open("GET", url, true);
      request.send(null);
      request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
          var freshDeck = JSON.parse(request.responseText);
          showDeckResult(freshDeck);
          deckId = freshDeck.deck_id;
          bindDraw();
          bindShuffle();
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
      var url = APIurl;
      url += deckId;
      url += "/draw/?count=1";
      request.open("GET", url, true);
      request.send(null);
      request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
          var card = JSON.parse(request.responseText);
          if (!document.getElementById("ex2Suc")) {
            showDrawResults(card);
          } else {
            updateDrawResults(card);
          }
          printCard(card, url);
        } else {
          console.log("error");
        }
      });
    event.preventDefault();
  });
}

function bindShuffle() {
  document.getElementById("shuffleButton").addEventListener(
    "click", function(event) {
      var request = new XMLHttpRequest();
      var url = APIurl + deckId + "/shuffle/";
      request.open("GET", url, true);
      request.send(null);
      request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {
          var shuffledDeck = JSON.parse(request.responseText);
        } else {
          console.log("error");
        }
      });
    event.preventDefault();
  });
}

function showDeckResult(res) {
  var p = document.getElementById("ex1Div");
  var txt = document.createElement("p");
  var heading = document.createElement("h3");
  heading.style.margin = "0";
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

function showDrawResults(res) {
  var p = document.getElementById("ex2Div");
  var txt = document.createElement("p");
  var heading = document.createElement("h3");
  heading.style.margin = "0";
  heading.textContent = "What The API Returns";
  txt.appendChild(heading);
  var lst = document.createElement("ul");
  var suc = document.createElement("li");
  suc.id = "ex2Suc";
  suc.textContent = "success = " + res.success;
  lst.appendChild(suc);
  var cards = document.createElement("li");
  cards.id = "ex2Cards";
  cards.textContent = "cards = " + JSON.stringify(res.cards);
  lst.appendChild(cards);
  var did = document.createElement("li");
  did.id = "ex2Did";
  did.textContent = "deck_id = " + res.deck_id;
  lst.appendChild(did);
  var rem = document.createElement("li");
  rem.id = "ex2Rem";
  rem.textContent = "remaining: = " + res.remaining;
  lst.appendChild(rem);
  txt.appendChild(lst);
  p.appendChild(txt);
}

function updateDrawResults(res) {
  document.getElementById("ex2Suc").textContent =
  "success = " + res.success;
  document.getElementById("ex2Cards").textContent =
  "cards = " + JSON.stringify(res.cards);
  document.getElementById("ex2Did").textContent =
  "deck_id = " + res.deck_id;
  document.getElementById("ex2Rem").textContent =
  "remaining = " + res.remaining;
}

function printCard(res, add) {
  var p = document.getElementById("ex2Div");
  if (document.getElementById("imgDiv")) {
    p.removeChild(document.getElementById("imgDiv"));
  }
  if (!document.getElementById("urlDiv")) {
    var urlDiv = document.createElement("div");
    urlDiv.id = "urlDiv";
    urlDiv.style.textAlign = "center";
    var url = document.createElement("code");
    url.textContent = add;
    urlDiv.appendChild(url);
    p.appendChild(urlDiv);
  }
  var imgDiv = document.createElement("div");
  imgDiv.id = "imgDiv";
  imgDiv.style.textAlign = "center";
  var cardImage = document.createElement("img");
  cardImage.alt = "No Card";
  if (res.cards.length > 0) {
    cardImage.src = res.cards[0].image;
  }
  imgDiv.appendChild(cardImage);
  p.appendChild(imgDiv);
}
