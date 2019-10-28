var basePath = "localhost:5000";
var user = JSON.parse(localStorage.getItem("userId"));
var playerId = localStorage.getItem("idPlayer");

function load() {
  var player = localStorage.getItem("followPlayer");
  document.getElementById("playerID").innerHTML = player;
}

function addEvent(event) {
  var body = {
    userID: user,
    appID: 1,
    timestamp: new Date(),
    gameID: "d5b180d0-e4a5-4c58-8ac8-613c297dfbf5",
    playerID: playerId,
    event: event.id
  };

  $.ajax({
    url: "http://" + basePath + "/event",
    type: "POST",
    data: body,
    success: function(result) {
      var description = localStorage.getItem("description");
      //alert(JSON.stringify(result));
      eventId = event.id;
      if (eventId) {
        switch (eventId) {
          case "Passe":
              if (
                description == "GR" ||
                description == "Gr" ||
                description == "gr" ||
                description == "gR" ||
                description == "GK" ||
                description == "Gk" ||
                description == "gk" ||
                description == "gK"
              ) {
                localStorage.setItem("buttonId", "Passe");
                window.location.replace("discoutGR.html");
                break;
              } else {
                localStorage.setItem("buttonId", "Passe");
                window.location.replace("discout.html");
                break;
              } 
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
          case "InterrupcaoPerdaGR":
            localStorage.setItem("buttonId", "InterrupcaoPerdaGR");
            window.location.replace("interrupcaoGR.html");
            break;
          case "RecuperacaoGR":
            localStorage.setItem("buttonId", "RecuperacaoGR");
            window.location.replace("discoutGR.html");
            break;
          case "Recuperacao":
            localStorage.setItem("buttonId", "Recuperacao");
            window.location.replace("discout.html");
            break;

          case "ParaFora":
              if (
                description == "GR" ||
                description == "Gr" ||
                description == "gr" ||
                description == "gR" ||
                description == "GK" ||
                description == "Gk" ||
                description == "gk" ||
                description == "gK"
              ) {
                localStorage.setItem("buttonId", "ParaFora");
                window.location.replace("perdaGR.html");
                break;
              } else {
                localStorage.setItem("buttonId", "ParaFora");
                window.location.replace("perda.html");
                break;
              } 
          case "FaltaSofrida":
            if (
              description == "GR" ||
              description == "Gr" ||
              description == "gr" ||
              description == "gR" ||
              description == "GK" ||
              description == "Gk" ||
              description == "gk" ||
              description == "gK"
            ) {
              localStorage.setItem("buttonId", "FaltaSofridaGR");
              window.location.replace("discoutGR.html");
              break;
            } else {
              localStorage.setItem("buttonId", "FaltaSofrida");
              window.location.replace("discout.html");
              break;
            }
          case "LançamentoFavor":
            if (
              description == "GR" ||
              description == "Gr" ||
              description == "gr" ||
              description == "gR" ||
              description == "GK" ||
              description == "Gk" ||
              description == "gk" ||
              description == "gK"
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
              description == "GR" ||
              description == "Gr" ||
              description == "gr" ||
              description == "gR" ||
              description == "GK" ||
              description == "Gk" ||
              description == "gk" ||
              description == "gK"
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
              description == "GR" ||
              description == "Gr" ||
              description == "gr" ||
              description == "gR" ||
              description == "GK" ||
              description == "Gk" ||
              description == "gk" ||
              description == "gK"
            ) {
              localStorage.setItem("buttonId", "FaltaCometidaGR");
              window.location.replace("perdaGR.html");
              break;
            } else {
              localStorage.setItem("buttonId", "FaltaCometida");
              window.location.replace("perda.html");
              break;
            }

          case "LançamentoContra":
            if (
              description == "GR" ||
              description == "Gr" ||
              description == "gr" ||
              description == "gR" ||
              description == "GK" ||
              description == "Gk" ||
              description == "gk" ||
              description == "gK"
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
              description == "GR" ||
              description == "Gr" ||
              description == "gr" ||
              description == "gR" ||
              description == "GK" ||
              description == "Gk" ||
              description == "gk" ||
              description == "gK"
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
            window.location.replace("perdaGR.html");
            break;
          case "InterrupcaoGR":
            localStorage.setItem("buttonId", "InterrupcaoGR");
            window.location.replace("interrupcaoGR.html");
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
            window.location.replace("perdaGR.html");
            break;
          case "InterrupcaoNaoAgarrar":
            localStorage.setItem("buttonId", "InterrupcaoNaoAgarrar");
            window.location.replace("interrupcaoGR.html");
            break;
          case "PasseGR":
            localStorage.setItem("buttonId", "PasseGR");
            window.location.replace("discoutGR.html");
            break;
          case "RemateGR":
            localStorage.setItem("buttonId", "RemateGR");
            window.location.replace("remate.html");
            break;
          case "equipaPerdeuBola":
            localStorage.setItem("buttonId", "equipaPerdeuBola");
            window.location.replace("perda.html");
            break;
          case "equipaPerdeuBolaGR":
            localStorage.setItem("buttonId", "equipaPerdeuBolaGR");
            window.location.replace("perdaGR.html");
            break;
          case "equipaRecuperouBola":
            localStorage.setItem("buttonId", "equipaRecuperouBola");
            window.location.replace("discout.html");
            break;
          case "equipaRecuperouBolaGR":
            localStorage.setItem("buttonId", "equipaRecuperouBolaGR");
            window.location.replace("discoutGR.html");
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
    case "InterrupcaoPerdaGR":
      window.location.replace("perdaGR.html");
      break;
    case "Recuperacao":
      window.location.replace("perda.html");
      break;
    case "RecuperacaoGR":
      window.location.replace("perdaGR.html");
      break;
    case "ParaFora":
      window.location.replace("remate.html");
      break;
    case "FaltaSofrida":
      if (
        description == "GR" ||
        description == "Gr" ||
        description == "gr" ||
        description == "gR" ||
        description == "GK" ||
        description == "Gk" ||
        description == "gk" ||
        description == "gK"
      ) {
        window.location.replace("interrupcaoGR.html");
        break;
      } else {
        window.location.replace("interrupcao.html");
        break;
      }
    case "LançamentoFavor":
      window.location.replace("interrupcao.html");
      break;
    case "PontapeBalizaFavor":
      window.location.replace("interrupcaoGR.html");
      break;
    case "FaltaCometida":
      if (
        description == "GR" ||
        description == "Gr" ||
        description == "gr" ||
        description == "gR" ||
        description == "GK" ||
        description == "Gk" ||
        description == "gk" ||
        description == "gK"
      ) {
        window.location.replace("interrupcaoGR.html");
        break;
      } else {
        window.location.replace("interrupcao.html");
        break;
      }
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
      window.location.replace("perdaGR.html");
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
    case "equipaPerdeuBola":
      window.location.replace("discout.html");
      break;
    case "equipaPerdeuBolaGR":
      window.location.replace("discoutGR.html");
      break;
    case "equipaRecuperouBola":
      window.location.replace("perda.html");
      break;
    case "equipaRecuperouBolaGR":
      window.location.replace("perdaGR.html");
      break;
  }
}

function terminar_jogo() {
  window.location.replace("perfilPlayer.html");
}

function equipaPerdeuBola() {
  window.location.replace("perfilPlayer.html");
}
