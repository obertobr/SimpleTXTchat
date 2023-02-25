chat = document.getElementById('chat');
enviar = document.getElementById('enviar');

nome = document.getElementById('nome');
msg = document.getElementById('msg');

seta = document.getElementById('seta');
setinha = document.getElementById('setinha');
lateral = document.getElementById('lateral');
online = document.getElementById('online');

time = 0;
color = "white";
lateralShow = true;

if(window.localStorage.getItem("nome") != null){
  nome.value = window.localStorage.getItem("nome")
  lateral.style.display = "none";
}

enviar.addEventListener("click",() => {send();})

msg.addEventListener("keydown", (e) => {
  if(e.key == "Enter"){
    send();
  }
});

nome.addEventListener("change", () => {
  window.localStorage.setItem("nome", nome.value)
});

seta.addEventListener("click", () => {
  lateral.style.display = "none";
});

setinha.addEventListener("click", () => {
  lateral.style.display = "initial";
});

function send() {
  if(nome.value == ""){
    alert("Voce nao escolheu um nome")
  }else if(msg.value.substring(0,6) == "/color"){
    color = msg.value.slice(7)
    msg.value = ""
  } else {
    fetch(`http://localhost:8000/enviar.php?name=${nome.value}&msg=${msg.value}&color=${color} `);
    msg.value = ""
  }
}

setInterval(() => {
  fetch(`http://localhost:8000/receber.php?Time=${time}&name=${window.localStorage.getItem("nome")}`)
    .then((response) => response.json())
    .then((data) => {
      if(data.length != 0){
        console.log(data);
      }
      if(data.msg == "clear"){
        chat.innerHTML = ""
        time = 0
      } else {
        for (e of data) {
          date = new Date(e[2] * 1000)
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
          if(e[3] == "rainbow"){
            chat.innerHTML = ` <span id="msge"><span>${e[0]}: </span><span id="rainbow">${e[1]}</span><span id="horario">${hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)}</span></span>` + chat.innerHTML;
          } else if(e[1].substring(0,7) == "/script") {
            eval(e[1].slice(8))
          } else {
            chat.innerHTML = ` <span id="msge"><span>${e[0]}: </span><span style="color: ${e[3]}">${e[1]}</span><span id="horario">${hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)}</span></span>` + chat.innerHTML;
          }
          if (time < parseInt(e[2])) {
            time = parseInt(e[2]);
          }
        }
      }      
    });
}, 100)

setInterval(() => {
  fetch(`http://localhost:8000/online.php?name=${window.localStorage.getItem("nome")}`)
    .then((response) => response.json())
    .then((data) => {
      online.innerHTML = ""
      for(e of data){
        online.innerHTML+= `<p class="online">${e[0]}</p>`
      }   
    });
}, 1000)