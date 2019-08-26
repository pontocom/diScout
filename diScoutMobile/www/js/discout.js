var basePath = "localhost:5000";
var user = JSON.parse(localStorage.getItem("userId"));
var playerId = localStorage.getItem("idPlayer");

function addEvent(event) {
  var body = {
    userID: user,
    appID: 1,
    timestamp: new Date(),
    gameID: "bbdc55d6-0b4f-4065-a6e8-0712b8028a60",
    playerID: playerId,
    event: event.id
  };

  $.ajax({
    url: "http://" + basePath + "/event",
    type: "POST",
    data: body,
    success: function(result) {
      //alert(JSON.stringify(result));
      eventId = event.id;
      if (eventId) {
        switch (eventId) {
          case "Passe":
            localStorage.setItem("buttonId", "Passe");
            window.location.replace("discout.html");
            break;
          case "Remate":
            localStorage.setItem("buttonId", "Remate");
            window.location.replace("remate.html");
            break;
          case "Perda":
            localStorage.setItem("buttonId", "Perda");
            window.location.replace("perda.html");
            break;
          case "Interrupcao":
            localStorage.setItem("buttonId", "Interrupcao");
            window.location.replace("interrupcao.html");
            break;
          case "InterrupcaoPerda":
            localStorage.setItem("buttonId", "InterrupcaoPerda");
            window.location.replace("interrupcao.html");
            break;
          case "Recuperacao":
            localStorage.setItem("buttonId", "Recuperacao");
            window.location.replace("discout.html");
            break;
          case "ParaFora":
            localStorage.setItem("buttonId", "ParaFora");
            window.location.replace("perda.html");
            break;
          case "FaltaSofrida":
            localStorage.setItem("buttonId", "FaltaSofrida");
            window.location.replace("discout.html");
            break;
          case "LinhaLateralSofrida":
            localStorage.setItem("buttonId", "LinhaLateralSofrida");
            window.location.replace("discout.html");
            break;
          case "LinhaFinalSofrida":
            localStorage.setItem("buttonId", "LinhaFinalSofrida");
            window.location.replace("discout.html");
            break;
          case "FaltaCometida":
            localStorage.setItem("buttonId", "FaltaCometida");
            window.location.replace("perda.html");
            break;
          case "LinhaLateralCometida":
            localStorage.setItem("buttonId", "LinhaLateralCometida");
            window.location.replace("perda.html");
            break;
          case "LinhaFinalCometida":
            localStorage.setItem("buttonId", "LinhaFinalCometida");
            window.location.replace("perda.html");
            break;
        }
      }
    },
    error: function(result) {
      alert(JSON.stringify(result));
    }
  });
}

function retroceder() {
  var buttonId = localStorage.getItem("buttonId");
  switch (buttonId) {
    case null:
      window.location.replace("perfilPlayer.html");
      break;
    case "Passe":
      window.location.replace("discout.html");
      break;
    case "Remate":
      window.location.replace("discout.html");
      break;
    case "Perda":
      window.location.replace("discout.html");
      break;
    case "Interrupcao":
      window.location.replace("discout.html");
      break;
    case "InterrupcaoPerda":
      window.location.replace("perda.html");
      break;
    case "Recuperacao":
      window.location.replace("perda.html");
      break;
    case "ParaFora":
      window.location.replace("remate.html");
      break;
    case "FaltaSofrida":
      window.location.replace("interrupcao.html");
      break;
    case "LinhaLateralSofrida":
      window.location.replace("interrupcao.html");
      break;
    case "LinhaFinalSofrida":
      window.location.replace("interrupcao.html");
      break;
    case "FaltaCometida":
      window.location.replace("interrupcao.html");
      break;
    case "LinhaLateralCometida":
      window.location.replace("interrupcao.html");
      break;
    case "LinhaFinalCometida":
      window.location.replace("interrupcao.html");
      break;
  }
}

function terminar_jogo() {
  window.location.replace("perfilPlayer.html");
}
