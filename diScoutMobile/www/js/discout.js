var basePath = "localhost:5000";
var user = JSON.parse(localStorage.getItem("userId"));
var playerId = localStorage.getItem("idPlayer");

function changePasse() {
  
  var body = {
    userID: user,
    appID: 1,
    timestamp: Date.now(),
    gameID: "bbdc55d6-0b4f-4065-a6e8-0712b8028a60",
    playerID: playerId,
    event: 'Passe'
  }
    
  $.ajax({
    url: "http://" + basePath + "/event",

    headers: {
      clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
      apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    type: "POST",
    data: JSON.stringify(body),
    dataType: "json",
    success: function(data) {
      alert(JSON.stringify(data));
      window.location.replace("discout.html");
    },
    error: function(data) {
      alert(JSON.stringify(data));
    }
  });
}

function changeRemate() {
  window.location.replace("remate.html");
}

function changePerda() {
  window.location.replace("perda.html");
}

function changeInterrupcao() {
  window.location.replace("interrupcao.html");
}

function paraFora() {
  window.location.replace("perda.html");
}

function faltaSofrida() {
  window.location.replace("discout.html");
}

function faltaCometida() {
  window.location.replace("perda.html");
}

function linhaLateralSofrida() {
  window.location.replace("discout.html");
}

function linhaLateralCometida() {
  window.location.replace("perda.html");
}

function linhaFinalSofrida() {
  window.location.replace("discout.html");
}

function linhaFinalCometida() {
  window.location.replace("perda.html");
}

function interrupcaoPerda() {
  window.location.replace("interrupcao.html");
}

function recuperacao() {
  window.location.replace("discout.html");
}

function update() {
  $.ajax({
    url: "http://" + basePath + "/update",

    headers: {
      clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
      apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    type: "POST",
    data: { action: "Passe" },
    success: function(data) {
      alert(JSON.stringify(data));
      //document.getElementById("registerForm").setAttribute("action", "index.html");
      //document.getElementById("idRegistar").style.display = "none";
    },
    error: function(data) {
      alert(JSON.stringify(data));
    }
  });
}
