var basePath = "localhost:5000";

function changePasse() {
  window.location.replace("discout.html");
}

function changeRemate() {
  window.location.replace("remate.html");
}

function changePerda() {
  window.location.replace("perda.html");
}

function changeInterrupcao() {
  window.location.replace("interrupcao.html");
}

function paraFora() {
  window.location.replace("perda.html");
}

function faltaSofrida() {
  window.location.replace("discout.html");
}

function faltaCometida() {
  window.location.replace("perda.html");
}

function linhaLateralSofrida() {
  window.location.replace("discout.html");
}

function linhaLateralCometida() {
  window.location.replace("perda.html");
}

function linhaFinalSofrida() {
  window.location.replace("discout.html");
}

function linhaFinalCometida() {
  window.location.replace("perda.html");
}

function interrupcaoPerda() {
  window.location.replace("interrupcao.html");
}

function recuperacao() {
  window.location.replace("discout.html");
}

function update() {
  $.ajax({
    url: "http://" + basePath + "/update",

    headers: {
      clientID: "44d50934-ed6c-45bb-abfc-dcb3e242c9a5", //If your header name has spaces or any other char not appropriate
      apiKey: "5b55aa8a1da5513373710bc844f0b227b0cd96c2",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    type: "POST",
    data: { action: "Passe" },
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
