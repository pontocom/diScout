function loadPlayer() {
  var player = localStorage.getItem("followPlayer");
  document.getElementById("playerID").innerHTML = player;
}

function registarAction() {
  localStorage.removeItem("buttonId");
  window.location.replace("discout.html");
}

function seeStats() {
  window.location.replace("stats.html");
}

function retro_choosePlayer() {
  window.location.replace("choosePlayer.html");
}
