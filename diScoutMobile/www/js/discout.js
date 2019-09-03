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
      var position = localStorage.getItem("position");
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
            if (
              position == "GR" ||
              position == "Gr" ||
              position == "gr" ||
              position == "gR" ||
              position == "GK" ||
              position == "Gk" ||
              position == "gk" ||
              position == "gK"
            ) {
              localStorage.setItem("buttonId", "Recuperacao");
              window.location.replace("discoutGR.html");
              break;
            } else {
              localStorage.setItem("buttonId", "Recuperacao");
              window.location.replace("discout.html");
              break;
            }
          case "ParaFora":
            localStorage.setItem("buttonId", "ParaFora");
            window.location.replace("perda.html");
            break;
          case "FaltaSofrida":
            if (
              position == "GR" ||
              position == "Gr" ||
              position == "gr" ||
              position == "gR" ||
              position == "GK" ||
              position == "Gk" ||
              position == "gk" ||
              position == "gK"
            ) {
              localStorage.setItem("buttonId", "FaltaSofrida");
              window.location.replace("discoutGR.html");
              break;
            } else {
              localStorage.setItem("buttonId", "FaltaSofrida");
              window.location.replace("discout.html");
              break;
            }
          case "LançamentoFavor":
            if (
              position == "GR" ||
              position == "Gr" ||
              position == "gr" ||
              position == "gR" ||
              position == "GK" ||
              position == "Gk" ||
              position == "gk" ||
              position == "gK"
            ) {
              localStorage.setItem("buttonId", "LançamentoFavor");
              window.location.replace("discoutGR.html");
              break;
            } else {
              localStorage.setItem("buttonId", "LançamentoFavor");
              window.location.replace("discout.html");
              break;
            }

          case "PontapeBalizaFavor":
            if (
              position == "GR" ||
              position == "Gr" ||
              position == "gr" ||
              position == "gR" ||
              position == "GK" ||
              position == "Gk" ||
              position == "gk" ||
              position == "gK"
            ) {
              localStorage.setItem("buttonId", "PontapeBalizaFavor");
              window.location.replace("discoutGR.html");
              break;
            } else {
              localStorage.setItem("buttonId", "PontapeBalizaFavor");
              window.location.replace("discout.html");
              break;
            }

          case "FaltaCometida":
            if (
              position == "GR" ||
              position == "Gr" ||
              position == "gr" ||
              position == "gR" ||
              position == "GK" ||
              position == "Gk" ||
              position == "gk" ||
              position == "gK"
            ) {
              localStorage.setItem("buttonId", "FaltaCometida");
              window.location.replace("perda.html");
              break;
            } else {
              localStorage.setItem("buttonId", "FaltaCometida");
              window.location.replace("perda.html");
              break;
            }

          case "LançamentoContra":
            if (
              position == "GR" ||
              position == "Gr" ||
              position == "gr" ||
              position == "gR" ||
              position == "GK" ||
              position == "Gk" ||
              position == "gk" ||
              position == "gK"
            ) {
              localStorage.setItem("buttonId", "LançamentoContra");
              window.location.replace("perda.html");
              break;
            } else {
              localStorage.setItem("buttonId", "LançamentoContra");
              window.location.replace("perda.html");
              break;
            }

          case "PontapeBalizaEquipaAdversaria":
            if (
              position == "GR" ||
              position == "Gr" ||
              position == "gr" ||
              position == "gR" ||
              position == "GK" ||
              position == "Gk" ||
              position == "gk" ||
              position == "gK"
            ) {
              localStorage.setItem("buttonId", "PontapeBalizaEquipaAdversaria");
              window.location.replace("perda.html");
              break;
            } else {
              localStorage.setItem("buttonId", "PontapeBalizaEquipaAdversaria");
              window.location.replace("perda.html");
              break;
            }

          case "PasseRemate":
            localStorage.setItem("buttonId", "PasseRemate");
            window.location.replace("passeRemate.html");
            break;
          case "PerdaGR":
            localStorage.setItem("buttonId", "PerdaGR");
            window.location.replace("perda.html");
            break;
          case "InterrupcaoGR":
            localStorage.setItem("buttonId", "InterrupcaoGR");
            window.location.replace("interrupcao.html");
            break;
          case "Defesa":
            localStorage.setItem("buttonId", "Defesa");
            window.location.replace("defesa.html");
            break;
          case "Agarrou":
            localStorage.setItem("buttonId", "Agarrou");
            window.location.replace("discoutGR.html");
            break;
          case "naoAgarrou":
            localStorage.setItem("buttonId", "naoAgarrou");
            window.location.replace("naoAgarrar.html");
            break;
          case "PosseDeBola":
            localStorage.setItem("buttonId", "PosseDeBola");
            window.location.replace("discoutGR.html");
            break;
          case "BolaNaEquipaAdversaria":
            localStorage.setItem("buttonId", "BolaNaEquipaAdversaria");
            window.location.replace("perda.html");
            break;
          case "InterrupcaoNaoAgarrar":
            localStorage.setItem("buttonId", "InterrupcaoNaoAgarrar");
            window.location.replace("interrupcao.html");
            break;
          case "PasseGR":
            localStorage.setItem("buttonId", "PasseGR");
            window.location.replace("discoutGR.html");
            break;
          case "RemateGR":
            localStorage.setItem("buttonId", "RemateGR");
            window.location.replace("remate.html");
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
    case "LançamentoFavor":
      window.location.replace("interrupcao.html");
      break;
    case "PontapeBalizaFavor":
      window.location.replace("interrupcao.html");
      break;
    case "FaltaCometida":
      window.location.replace("interrupcao.html");
      break;
    case "LançamentoContra":
      window.location.replace("interrupcao.html");
      break;
    case "PontapeBalizaEquipaAdversaria":
      window.location.replace("interrupcao.html");
      break;
    case "PasseRemate":
      window.location.replace("discoutGR.html");
      break;
    case "PerdaGR":
      window.location.replace("discoutGR.html");
      break;
    case "InterrupcaoGR":
      window.location.replace("discoutGR.html");
      break;
    case "Defesa":
      window.location.replace("discoutGR.html");
      break;
    case "Agarrou":
      window.location.replace("defesa.html");
      break;
    case "naoAgarrou":
      window.location.replace("defesa.html");
      break;
    case "PosseDeBola":
      window.location.replace("naoAgarrar.html");
      break;
    case "BolaNaEquipaAdversaria":
      window.location.replace("naoAgarrar.html");
      break;
    case "InterrupcaoNaoAgarrar":
      window.location.replace("naoAgarrar.html");
      break;
    case "PasseGR":
      window.location.replace("discoutGR.html");
      break;
    case "RemateGR":
      window.location.replace("discoutGR.html");
      break;
  }
}

function terminar_jogo() {
  window.location.replace("perfilPlayer.html");
}
