var basePath = "localhost:5000";

function openLoginModal() {
  document.getElementById("idLogin").style.display = "block";
}

function openRegisterModal() {
  document.getElementById("idRegistar").style.display = "block";
}

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
      type: document.getElementById("tipo").value,
      favTeam: ""
    }),
    success: function(data) {
      alert(JSON.stringify(data));
      //document.getElementById("registerForm").setAttribute("action", "index.html");
      //document.getElementById("idRegistar").style.display = "none";
    },
    error: function(data) {
      alert(JSON.stringify(data));
    }
  });
}

//Login
function login() {
  $.ajax({
    url: "http://" + basePath + "/user/auth",

    headers: {
      clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
      apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    type: "POST",
    data: $.param({
      email: document.getElementById("uEmail").value,
      password: document.getElementById("uPsw").value
    }),
    success: function(data) {
      alert(JSON.stringify(data));
      //document.getElementById("loginForm").setAttribute("action", "discout.html");
    },
    error: function(data) {
      alert(JSON.stringify(data));
    }
  });
}

var validateLogin = function() {
  document.getElementById("loginBtn").disabled = false;
};

// Chamar todas as equipas
function getAllTeams(select) {
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
      var ts1 = document.getElementById("ts1");
      var ts2 = document.getElementById("ts2");
      var ts3 = document.getElementById("ts3");

      if (select.options.length == 1) {
        for (var t = 0; t < data.teams.length; t++) {
          if (
            (!ts1.selectedIndex ||
              ts1.options[ts1.selectedIndex].text != data.teams[t].name) &&
            (!ts2.selectedIndex ||
              ts2.options[ts2.selectedIndex].text != data.teams[t].name)
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
          document.getElementById(ts2.id).disabled = false;
          document.getElementById("confirmTeam").disabled=false;
        } else if (select.id == ts2.id) {
          document.getElementById(ts3.id).disabled = false;
        }
      }
    },
    error: function(data) {
      alert(JSON.stringify(data));
    }
  });
}

//Confirmar Equipas Favoritas
function confirmFavTeams() {
  var ts1 = document.getElementById("ts1");
  var ts2 = document.getElementById("ts2");
  var ts3 = document.getElementById("ts3");

  var selectedTeams = [
    ts1.options[ts1.selectedIndex].text,
    ts2.options[ts2.selectedIndex].text,
    ts3.options[ts3.selectedIndex].text
  ];

  $.ajax({
    url: "http://" + basePath + "/user",

    headers: {
      clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
      apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    type: "PUT",
    data: $.param({
      email: document.getElementById("uEmail").value,
      favTeams: selectedTeams
    }),
    success: function(data) {
      alert(JSON.stringify(data));
      //document.getElementById("loginForm").setAttribute("action", "discout.html");
    },
    error: function(data) {
      alert(JSON.stringify(data));
    }
  });
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
