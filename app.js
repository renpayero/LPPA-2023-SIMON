var botones=document.querySelectorAll(".botones")
var start = document.getElementById("start")
botones = Array.from(botones)

//funcion que agrega la clase click al boton que este disparando el evento mousedown
var pintar = function(event){
    var button = document.getElementById(event.target.id);
    button.classList.add('click');
}

//funcion que quita la clase click al boton que este disparando el evento mouseup el cual se accionara inmediatamente luego del evento mousedown
var despintar = function(event) {
    var button = document.getElementById(event.target.id);
    button.classList.remove('click');
  }

var len = botones.length
function secuencia() {
    var randomNum = Math.floor(Math.random() * len);
    botones[randomNum].classList.add('click');
    setTimeout(function () {
        botones[randomNum].classList.remove('click');
    }, 1000);
}

botones.forEach(function(i){
    i.addEventListener("mousedown", pintar)
    i.addEventListener("mouseup", despintar)
})

// start.addEventListener("click", secuencia)
var intervalo = setInterval(secuencia, 3000);
