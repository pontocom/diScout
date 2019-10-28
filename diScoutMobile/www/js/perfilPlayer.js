function loadPlayer() {
  var player = localStorage.getItem("followPlayer");
  document.getElementById("playerID").innerHTML = player;
}

function registarAction() {
  localStorage.removeItem("buttonId");
  var description = localStorage.getItem("description");

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
    window.location.replace("discoutGR.html");
  } else {
    window.location.replace("discout.html");
  }
}
function instrucoes() {
  window.location.replace("instrucoes.html");
}
function seeStats() {
  window.location.replace("stats.html");
}

function retro_choosePlayer() {
  window.location.replace("choosePlayer.html");
}
