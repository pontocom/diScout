function loadPlayer() {
  var player = localStorage.getItem("followPlayer");
  document.getElementById("playerID").innerHTML = player;
}

function registarAction() {
  localStorage.removeItem("buttonId");
  var position = localStorage.getItem("position");

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
    window.location.replace("discoutGR.html");
  } else {
    window.location.replace("discout.html");
  }
}

function seeStats() {
  window.location.replace("stats.html");
}

function retro_choosePlayer() {
  window.location.replace("choosePlayer.html");
}
