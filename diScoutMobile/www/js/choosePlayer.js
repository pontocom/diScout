var basePath = "localhost:5000";

function selectPlayer(select) {
    var teamId = JSON.parse(localStorage.getItem("selectedTeam"));
    $.ajax({
      url: "http://" + basePath + "/team/" + teamId,
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
        localStorage.setItem("players", JSON.stringify(data.team.players));
  
        if (select.options.length == 1) {
          for (var t = 0; t < data.team.players.length; t++) {
            
            select.options[select.options.length] = new Option(data.team.players[t].name,data.team.players);
            
            //aux.push(data.team.players[t].uuid);
            //localStorage.setItem("players", aux);
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

  function confirmPlayer() {
    var ps1 = document.getElementById("ps1");
 
      var selectedPlayer =  ps1.options[ps1.selectedIndex].text;
      
      localStorage.setItem("followPlayer", selectedPlayer);
      //localStorage.setItem("players", selectedPlayerId);
     
      var player = localStorage.getItem("followPlayer");
      var players = JSON.parse(localStorage.getItem("players"));

      for (var i = 0; i < players.length; i++) {
        if (player == players[i].name) {
          localStorage.setItem("idPlayer", players[i].uuid);
          localStorage.setItem("position", players[i].position);
        }
      }

      window.location.replace("perfilPlayer.html");
 
   }

   function retro_chooseTeam() {
     window.location.replace("chooseTeam.html")
   }