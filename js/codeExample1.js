var APIurl = "http://127.0.0.1:8000/api/deck/";

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
          showResult(freshDeck);
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

function showResult(res) {
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
  if (!document.getElementById("ex2Note")) {
    var note = document.createElement("p");
    note.id = "ex2Note";
    note.innerHTML = "When we draw a card from a deck and parse the response " +
    "we can access the drawn card(s) by accessing the <code>'cards'</code> " +
    "property. <code>'cards'</code> is an array of <code>'card'</code>" +
    " objects which have an <code>'image'</code> property containing a url " +
    "which links to an image representing that card. " +
    "We can see these pieces all come together below in the code " +
    "used to produce the card image seen above. ";
    p.appendChild(note);
    var pC = document.createElement("p");
    pC.className = "pCode";
    var code = document.createElement("pre");
    code.className = "jsCode";
    code.textContent = "var cardImage = document.createElement(\"img\");" +
    "\n" + "     cardImage.src = drawResponseObj.cards[0].image" + "\n";
    pC.appendChild(code);
    p.appendChild(pC);
  }
}
