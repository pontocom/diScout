var basePath = "localhost:5000";

function changePasse() {

  update();
  if (document.getElementById("Passe").innerText == "Falta Sofrida") {
    /*    document.getElementById("painel").style="grid-template-columns: repeat(2, 1fr)"; */
    document.getElementById("Passe").innerText = "Passe";
    document.getElementById("Perda").innerText = "Perda de Bola";
    document.getElementById("BolaFundoSofrida").style.display = "none";
    document.getElementById("Interrupcao").innerText = "Interrupção";
    document.getElementById("Remate").innerText = "Remate";
    document.getElementById("BolaFundoCometida").style.display = "none";
    return;
  }

  if (document.getElementById("Passe").innerText == "Interrupção") {
    /*     document.getElementById("painel").style="grid-template-columns: repeat(3, 1fr)"; */
    document.getElementById("Passe").innerText = "Falta Sofrida";
    document.getElementById("Perda").innerText = "Bola Fundo Lateral Sofrida";

    document.getElementById("BolaFundoSofrida").style.display = "inline";
    document.getElementById("BolaFundoSofrida").style.width = "200px";
    document.getElementById("BolaFundoSofrida").style.marginRight = "10px";

    document.getElementById("Interrupcao").innerText = "Falta Cometida";
    document.getElementById("Interrupcao").style.display = "inline";
    document.getElementById("Interrupcao").disabled = false;

    document.getElementById("Remate").innerText = "Bola Fundo Lateral Cometida";
    document.getElementById("Remate").style.display = "inline";
    document.getElementById("Remate").disabled = false;
    document.getElementById("BolaFundoCometida").style.display = "inline";
    return;
  }

  document.getElementById("Passe").innerText = "Passe";
  document.getElementById("Perda").innerText = "Perda de Bola";
  document.getElementById("Interrupcao").innerText = "Interrupção";
  document.getElementById("Remate").innerText = "Remate";
}

function changeRemate() {
  if (
    document.getElementById("Remate").innerText == "Bola Fundo Lateral Cometida"
  ) {
    /*  document.getElementById("painel").style="grid-template-columns: repeat(2, 1fr)"; */
    document.getElementById("Passe").innerText = "Interrupção";
    document.getElementById("Perda").innerText = "Recuperou a Bola";
    document.getElementById("BolaFundoSofrida").style.display = "none";
    document.getElementById("Interrupcao").style.display = "none";
    document.getElementById("Interrupcao").disabled = true;
    document.getElementById("Remate").style.display = "none";
    document.getElementById("Remate").disabled = true;
    document.getElementById("BolaFundoCometida").style.display = "none";
    return;
  }

  document.getElementById("Passe").innerText = "À baliza";
  document.getElementById("Passe").disabled = true;
  document.getElementById("Perda").innerText = "Para Fora";
  document.getElementById("Interrupcao").innerText = "Bola Parada";
  document.getElementById("Interrupcao").disabled = true;
  document.getElementById("Remate").innerText = "Intercetado";
  document.getElementById("Remate").disabled = true;
}

function changePerda() {
  if (document.getElementById("Perda").innerText == "Recuperou a Bola") {
    document.getElementById("Passe").innerText = "Passe";
    document.getElementById("Perda").innerText = "Perda de Bola";
    document.getElementById("Interrupcao").innerText = "Interrupção";
    document.getElementById("Interrupcao").style.display = "inline";
    document.getElementById("Interrupcao").disabled = false;
    document.getElementById("Remate").innerText = "Remate";
    document.getElementById("Remate").style.display = "inline";
    document.getElementById("Remate").disabled = false;
    return;
  }

  if (
    document.getElementById("Perda").innerText == "Bola Fundo Lateral Sofrida"
  ) {
    /* document.getElementById("painel").style="grid-template-columns: repeat(2, 1fr)"; */
    document.getElementById("Passe").innerText = "Passe";
    document.getElementById("Perda").innerText = "Perda de Bola";
    document.getElementById("BolaFundoSofrida").style.display = "none";
    document.getElementById("Interrupcao").innerText = "Interrupção";
    document.getElementById("Remate").innerText = "Remate";
    document.getElementById("BolaFundoCometida").style.display = "none";
    return;
  }

  if (document.getElementById("Perda").innerText == "Para Fora") {
    document.getElementById("Passe").innerText = "Interrupção";
    document.getElementById("Passe").disabled = false;
    document.getElementById("Perda").innerText = "Recuperou a Bola";
    document.getElementById("Perda").disabled = false;
    document.getElementById("Interrupcao").style.display = "none";
    document.getElementById("Remate").style.display = "none";
    return;
  }

  document.getElementById("Passe").innerText = "Interrupção";
  document.getElementById("Perda").innerText = "Recuperou a Bola";
  document.getElementById("Interrupcao").style.display = "none";
  document.getElementById("Interrupcao").disabled = true;
  document.getElementById("Remate").style.display = "none";
  document.getElementById("Remate").disabled = true;
}

function changeInterrupcao() {
  
  if (document.getElementById("Interrupcao").innerText == "Falta Cometida") {
    document.getElementById("Passe").innerText = "Interrupção";
    document.getElementById("Perda").innerText = "Recuperou a Bola";
    document.getElementById("BolaFundoSofrida").style.display = "none";
    document.getElementById("Interrupcao").style.display = "none";
    document.getElementById("Interrupcao").disabled = true;
    document.getElementById("Remate").style.display = "none";
    document.getElementById("Remate").disabled = true;
    document.getElementById("BolaFundoCometida").style.display = "none";
    return;
  }

  document.getElementById("Passe").innerText = "Falta Sofrida";

  document.getElementById("Perda").innerText = "Bola Fundo Lateral Sofrida";
  document.getElementById("BolaFundoSofrida").style.display = "inline";

  document.getElementById("Interrupcao").innerText = "Falta Cometida";
  document.getElementById("Remate").innerText = "Bola Fundo Lateral Cometida";

  document.getElementById("BolaFundoCometida").style.display = "inline";
}

function changeBolaFundoSofrida() {

  document.getElementById("Passe").innerText = "Passe";
  document.getElementById("Perda").innerText = "Perda de Bola";
  document.getElementById("BolaFundoSofrida").style.display = "none";
  document.getElementById("Interrupcao").innerText = "Interrupção";
  document.getElementById("Remate").innerText = "Remate";
  document.getElementById("BolaFundoCometida").style.display = "none";
}

function changeBolaFundoCometida() {

  document.getElementById("Passe").innerText = "Interrupção";
  document.getElementById("Perda").innerText = "Recuperou a Bola";
  document.getElementById("BolaFundoSofrida").style.display = "none";
  document.getElementById("Interrupcao").style.display = "none";
  document.getElementById("Interrupcao").disabled = true;
  document.getElementById("Remate").style.display = "none";
  document.getElementById("Remate").disabled = true;
  document.getElementById("BolaFundoCometida").style.display = "none";
}


function update() {

  $.ajax({
    
    url: 'http://' + basePath + '/update',
    
    headers: {
        'clientID': '44d50934-ed6c-45bb-abfc-dcb3e242c9a5',   //If your header name has spaces or any other char not appropriate
        'apiKey': '5b55aa8a1da5513373710bc844f0b227b0cd96c2',
        'Content-Type': 'application/x-www-form-urlencoded'
        
    },
    type: 'POST',
    data: {action: "Passe"},
    success: function (data) {
       alert(JSON.stringify(data));
       //document.getElementById("registerForm").setAttribute("action", "index.html");
      //document.getElementById("idRegistar").style.display = "none";
    },
    error: function(data){
      alert(JSON.stringify(data));
    }
});

}