function load() {
  var favTeams = JSON.parse(localStorage.getItem("favTeams"));
  var teams = JSON.parse(localStorage.getItem("teams"));
  //var teamsFavId = JSON.parse(localStorage.getItem("teamsFavId"));
  var teamNames = [];

  for (var i = 0; i < favTeams.length; i++) {
    for (var j = 0; j < teams.length; j++) {
      if (favTeams[i] == teams[j].uuid) {
        teamNames.splice(teamNames.length - 1, 0, teams[j].name);
      }
    }
  }

  if (favTeams[0]) {
    document.getElementById("b-ft1").innerHTML = teamNames[0];
  }
  if (favTeams[1]) {
    document.getElementById("b-ft2").innerHTML = teamNames[1];
  } else {
    document.getElementById("b-ft2").style.display = "none";
  }

  if (favTeams[2]) {
    document.getElementById("b-ft3").innerHTML = teamNames[2];
  } else {
    document.getElementById("b-ft3").style.display = "none";
  }
}

function selectTeam(select) {
  $.ajax({
    url: "http://" + basePath + "/teams",
    type: "GET",
    headers: {
      clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
      apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token":
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjNiYmViZGY5LTZkOTgtNDA1Ny1hNzlmLTdjYjhjMWE3MTk2NiIsImVtYWlsIjoiY2FybG9zQGdtYWlsLnB0IiwidHlwZSI6InBhcmVudCIsImV4cCI6MTU1MDUzMzM3NX0.9BGbX75bFtbu3FVkp1YirsEGgwY9cJpMdEaYfqKSuBc" //for object property name, use quoted notation shown in second
    },
    success: function(data) {
      var b1 = document.getElementById("b-ft1").textContent;
      var b2 = document.getElementById("b-ft2").textContent;
      var b3 = document.getElementById("b-ft3").textContent;
      var ts1 = document.getElementById("ts1");

      if (select.options.length == 1) {
        for (var t = 0; t < data.teams.length; t++) {
          if (
            b1 != data.teams[t].name &&
            b2 != data.teams[t].name &&
            b3 != data.teams[t].name
          ) {
            select.options[select.options.length] = new Option(
              data.teams[t].name,
              data.teams
            );
          }
        }
      }

      if (
        select.options[select.selectedIndex].text &&
        select.options[select.selectedIndex].text != "Escolha a sua equipa"
      ) {
        if (select.id == ts1.id) {
          document.getElementById("confirmTeam").disabled = false;
        }
      }
    },
    error: function(data) {
      alert(JSON.stringify(data));
    }
  });
}


function getTeam1() {
  var teams = JSON.parse(localStorage.getItem("teams"));
  for (var i = 0; i < teams.length; i++) {
    if (document.getElementById("b-ft1").textContent == teams[i].name) {
      localStorage.setItem("selectedTeam", JSON.stringify(teams[i].uuid));
      window.location.replace("choosePlayer.html");
    }
  }
}

function getTeam2() {
  var teams = JSON.parse(localStorage.getItem("teams"));
  for (var i = 0; i < teams.length; i++) {
    if (document.getElementById("b-ft2").textContent == teams[i].name) {
      localStorage.setItem("selectedTeam", JSON.stringify(teams[i].uuid));
      window.location.replace("choosePlayer.html");
    }
  }
}

function getTeam3() {
  var teams = JSON.parse(localStorage.getItem("teams"));
  for (var i = 0; i < teams.length; i++) {
    if (document.getElementById("b-ft3").textContent == teams[i].name) {
      localStorage.setItem("selectedTeam", JSON.stringify(teams[i].uuid));
      window.location.replace("choosePlayer.html");
    }
  }
}

function selectPlayer() {
  $.ajax({
    url: "http://" + basePath + "/team/7f67e48e-69ab-4156-b94f-0fd0e1e937b8",
    type: "GET",
    headers: {
      clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
      apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token":
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjNiYmViZGY5LTZkOTgtNDA1Ny1hNzlmLTdjYjhjMWE3MTk2NiIsImVtYWlsIjoiY2FybG9zQGdtYWlsLnB0IiwidHlwZSI6InBhcmVudCIsImV4cCI6MTU1MDUzMzM3NX0.9BGbX75bFtbu3FVkp1YirsEGgwY9cJpMdEaYfqKSuBc" //for object property name, use quoted notation shown in second
    },
    success: function(data) {
      //alert(JSON.stringify(data.team.players));
      var ps1 = document.getElementById("ps1");

      if (select.options.length == 1) {
        for (var t = 0; t < data.team.players.length; t++) {
          select.options[select.options.length] = new Option(
            data.team.players[t].name,
            data.team.players
          );
        }
      }

      if (
        select.options[select.selectedIndex].text &&
        select.options[select.selectedIndex].text != "Escolha o seu jogador"
      ) {
        if (select.id == ps1.id) {
          document.getElementById("confirmPlayer").disabled = false;
        }
      }
    },
    error: function(data) {
      alert(JSON.stringify(data));
    }
  });
}
/*
var btn = document.createElement("BUTTON");   // Create a <button> element
btn.innerHTML = "CLICK ME";                   // Insert text
document.body.appendChild(btn);               // Append <button> to <body>
*/

function confirmTeam() {
  var ts1 = document.getElementById("ts1");
  $.ajax({
    url: "http://" + basePath + "/team/",
    type: "GET",
    headers: {
      clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
      apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token":
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjNiYmViZGY5LTZkOTgtNDA1Ny1hNzlmLTdjYjhjMWE3MTk2NiIsImVtYWlsIjoiY2FybG9zQGdtYWlsLnB0IiwidHlwZSI6InBhcmVudCIsImV4cCI6MTU1MDUzMzM3NX0.9BGbX75bFtbu3FVkp1YirsEGgwY9cJpMdEaYfqKSuBc" //for object property name, use quoted notation shown in second
    },
    success: function(data) {},
    error: function(data) {
      alert(JSON.stringify(data));
    }
  });
}
