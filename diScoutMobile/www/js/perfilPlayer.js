function loadPlayer() {
   
    var player = localStorage.getItem("followPlayer");
    document.getElementById("playerID").innerHTML = player;
}

function registarAction() {
    window.location.replace("discout.html");
}

function seeStats() {
    window.location.replace("stats.html");
         
}


