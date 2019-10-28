var basePath = "localhost:5000";

function loginReg() {
  window.location.replace("login.html");
}

function retroceder() {
  window.location.replace("index.html");
}

function openLoginModal() {
  document.getElementById("idLogin").style.display = "block";
}

function openRegisterModal() {
  document.getElementById("idRegistar").style.display = "block";
}

var validatePassword = function() {
  if (
    document.getElementById("nPsw").value ==
      document.getElementById("cPsw").value &&
    document.getElementById("nPsw").value.length >= 5
  ) {
    document.getElementById("registerMessage").style.color = "green";
    document.getElementById("registerMessage").innerHTML = "Matching";

    return true;
  } else {
    document.getElementById("registerMessage").style.color = "red";
    document.getElementById("registerMessage").innerHTML = "Not matching";

    return false;
  }
};

var validateRegister = function() {
  if (document.getElementById("nUser").value != "" && validatePassword()) {
    document.getElementById("registerBtn").disabled = false;
  }
};

var validateLogin = function() {
  document.getElementById("loginBtn").disabled = false;
};

// Registar
function register() {
  $.ajax({
    url: "http://" + basePath + "/user",

    headers: {
      clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
      apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    type: "POST",
    data: $.param({
      name: document.getElementById("nUser").value,
      email: document.getElementById("rEmail").value,
      password: document.getElementById("nPsw").value,
      description: document.getElementById("desc").value,
      type: document.getElementById("tipo").value
    }),
    success: function(data) {
      alert(JSON.stringify(data));
      
    },
    error: function(data) {
      alert(JSON.stringify(data));
    }
  });
}

//Login
function login() {
  var body = {
    email: document.getElementById("uEmail").value,
    password: document.getElementById("uPsw").value
  };

  $.ajax({
    url: "http://" + basePath + "/user/auth",

    headers: {
      clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
      apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    type: "POST",
    data: body,
    success: function(result) {
      
      localStorage.setItem("userId", JSON.stringify(result.userId));
      getUser();
    },
    error: function(result) {
      alert("Username ou password incorretos. / Não tem registo criado na aplicação.");
    }
  });
}

// Obter informações do user
function getUser() {
  var user = JSON.parse(localStorage.getItem("userId"));

  $.ajax({
    url: "http://" + basePath + "/user/" + user,
    type: "GET",
    headers: {
      clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
      apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
      "Content-Type": "application/x-www-form-urlencoded",
      "x-access-token":
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRJZCI6IjNiYmViZGY5LTZkOTgtNDA1Ny1hNzlmLTdjYjhjMWE3MTk2NiIsImVtYWlsIjoiY2FybG9zQGdtYWlsLnB0IiwidHlwZSI6InBhcmVudCIsImV4cCI6MTU1MDUzMzM3NX0.9BGbX75bFtbu3FVkp1YirsEGgwY9cJpMdEaYfqKSuBc" //for object property name, use quoted notation shown in second
    },
    success: function(data) {
      //localStorage.setItem("user", JSON.stringify(data.user.uuid));
      localStorage.setItem("favTeams", JSON.stringify(data.info.teams));

      if (localStorage.getItem("favTeams").length <= 0) {
        window.location.replace("chooseFavTeams.html");
      } else {
        window.location.replace("chooseTeam.html");
      }
    },
    error: function(data) {
      //alert(JSON.stringify(data.responseJSON.user.teams));
      localStorage.setItem(
        "favTeams",
        JSON.stringify(data.responseJSON.user.teams)
      );
      window.location.replace("chooseFavTeams.html");
    }
  });
}

// Chamar todas as equipas
function getAllTeams() {
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
      localStorage.setItem("teams", JSON.stringify(data.teams));
    },
    error: function(data) {
      alert(JSON.stringify(data));
    }
  });
}

function loadFavTeams(select) {
  var teams = JSON.parse(localStorage.getItem("teams"));

  var ts1 = document.getElementById("ts1");
  var ts2 = document.getElementById("ts2");
  var ts3 = document.getElementById("ts3");

  if (select.options.length == 1) {
    for (var t = 0; t < teams.length; t++) {
      if (
        (!ts1.selectedIndex ||
          ts1.options[ts1.selectedIndex].text != teams[t].name) &&
        (!ts2.selectedIndex ||
          ts2.options[ts2.selectedIndex].text != teams[t].name)
      ) {
        select.options[select.options.length] = new Option(
          teams[t].name,
          teams[t].uuid
        );
      }
    }
  }

  if (
    select.id != ts3.id &&
    select.options[select.selectedIndex].text &&
    select.options[select.selectedIndex].text != "Escolha a sua equipa"
  ) {
    if (select.id == ts1.id) {
      document.getElementById(ts2.id).disabled = false;
      document.getElementById("confirmTeam").disabled = false;
    } else if (select.id == ts2.id) {
      document.getElementById(ts3.id).disabled = false;
    }
  }
}

//Confirmar Equipas Favoritas
function confirmFavTeams() {
  // localStorage.removeItem("favTeam");
  // localStorage.removeItem("teamsId");
  // localStorage.removeItem("favTeams")

  var ts1 = document.getElementById("ts1");
  var ts2 = document.getElementById("ts2");
  var ts3 = document.getElementById("ts3");

  var selectedTeams = [
    ts1.options[ts1.selectedIndex].value,
    ts2.options[ts2.selectedIndex].value,
    ts3.options[ts3.selectedIndex].value
  ];

  for (var i = 0; i < selectedTeams.length; i++) {
    if (selectedTeams[i] == "Escolha a sua equipa") {
      selectedTeams.splice(i, 2);
    }
  }

  for (var j = 0; j < selectedTeams.length; j++) {
    body = {
      uuid: JSON.parse(localStorage.getItem("userId")),
      favTeam: selectedTeams[j]
    };

    $.ajax({
      url: "http://" + basePath + "/user/fav",

      headers: {
        clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
        apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      type: "POST",
      data: body,
      success: function(data) {
        if (
          !localStorage.getItem("favTeams") ||
          !JSON.parse(localStorage.getItem("favTeams")).includes(
            data["favTeam"]
          )
        ) {
          var favTeams = JSON.parse(localStorage.getItem("favTeams")).concat(selectedTeams);
          localStorage.setItem("favTeams", JSON.stringify(favTeams));
        }
        var favTeamsSelected = localStorage.getItem("favTeams");
        var teamsSelected = JSON.parse(favTeamsSelected);
        if (teamsSelected.length == selectedTeams.length) {
          window.location.replace("chooseTeam.html");
        }
      },
      error: function(data) {
        alert(JSON.stringify(data));
      }
    });
  }
}
