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
            window.location.replace("discout.html");
            break;
          case "Remate":
            window.location.replace("remate.html");
            break;
          case "Perda":
            window.location.replace("perda.html");
            break;
          case "Interrupcao":
            window.location.replace("interrupcao.html");
            break;
          case "InterrupcaoPerda":
            window.location.replace("interrupcao.html");
            break;
          case "Recuperacao":
            window.location.replace("discout.html");
            break;
          case "ParaFora":
            window.location.replace("perda.html");
            break;
          case "FaltaSofrida":
            window.location.replace("discout.html");
            break;
          case "LinhaLateralSofrida":
            window.location.replace("discout.html");
            break;
          case "LinhaFinalSofrida":
            window.location.replace("discout.html");
            break;
          case "FaltaCometida":
            window.location.replace("perda.html");
            break;
          case "LinhaLateralCometida":
            window.location.replace("perda.html");
            break;
          case "LinhaFinalCometida":
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

/*function changeRemate() {
  window.location.replace("remate.html");
}*/

/*function changePerda() {
  window.location.replace("perda.html");
}*/

/*function changeInterrupcao() {
  window.location.replace("interrupcao.html");
}*/

/*function paraFora() {
  window.location.replace("perda.html");
}*/

/*function faltaSofrida() {
  window.location.replace("discout.html");
}*/

/*function faltaCometida() {
  window.location.replace("perda.html");
}*/

/*function linhaLateralSofrida() {
  window.location.replace("discout.html");
}*/

/*function linhaLateralCometida() {
  window.location.replace("perda.html");
}*/

/*function linhaFinalSofrida() {
  window.location.replace("discout.html");
}*/

/*function linhaFinalCometida() {
  window.location.replace("perda.html");
}*/

/*function interrupcaoPerda() {
  window.location.replace("interrupcao.html");
}*/

/*function recuperacao() {
  window.location.replace("discout.html");
}*/


function retro_perfilPlayer() {
  window.location.replace("perfilPlayer.html");
}

function terminar_jogo() {
  
}
