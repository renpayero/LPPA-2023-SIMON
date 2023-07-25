//selectores
var botones=document.querySelectorAll(".botones"); //devuelve una nodeList
botones = Array.from(botones); //transformo la nodeList a arrayd
var start = document.getElementById("start");
var puntuacionSpan = document.getElementById("puntuacionSpan");
var nivelSpan = document.getElementById("nivelSpan");
var tiempoSpan = document.getElementById("tiempoSpan");

//variables de jugador
var coloresJugador = [];
var nivelJugador = 1;
var puntajeJugador = 0;
var tiempoJugador = 30;

//variables de los scripts
var colores= ["verde", "rojo", "amarillo", "azul"];
var reproduciendoSecuencia = false;
var secuenciaColores = [];
var len = botones.length; 
var jugando = false; //inicializa en false porque cuando cargamos la pagina no estamos jugando

puntuacionSpan.textContent = puntajeJugador;
nivelSpan.textContent = nivelJugador;
tiempoSpan.textContent = tiempoJugador;




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

var generarColoresAleatorios = function() {
    for (var i = 0; i < 2; i++) {
        var randomNum = Math.floor(Math.random() * len);
        var newColor= colores[randomNum];
        secuenciaColores.push(newColor);
    }
}

//funcion que registra los clicks del jugador para luego comparar con la secuencia
var click = function (boton){
    if (jugando == false){
        return //ignoramos los clicks fuera de juego
    }
    if (boton.target.id == "verde"){
        coloresJugador.push("verde")
    }
    if (boton.target.id == "rojo"){
        coloresJugador.push("rojo")
    }
    if (boton.target.id == "amarillo"){
        coloresJugador.push("amarillo")
    }
    if (boton.target.id == "azul"){
        coloresJugador.push("azul")
    }
}

var compararSecuencia = function(){
    if (coloresJugador.length == secuenciaColores.length){
        //transformo los array a string para comparar luego con un if y no tener que recorrer cada elemento
        //este metodo solo sirve cuando el array contiene valores primitivos simples
        var coloresJugadorSTRING = JSON.stringify(coloresJugador);
        var secuenciaColoresSTRING = JSON.stringify(secuenciaColores);
        if(coloresJugadorSTRING == secuenciaColoresSTRING){ 
            puntajeJugador+=1; //subo el puntaje del jugador
            puntuacionSpan.textContent = puntajeJugador;
            nivelJugador+=1; //subo el nivel del jugador
            nivelSpan.textContent = nivelJugador;
            coloresJugador = [] //reseteamos el registro de colores para el nuevo nivel
            //PENDIENTE: AGREGAR MODAL DE PASAR AL SIGUIENTE NIVEL
            return true; //devuelve true si el jugador paso el nivel
        }
    }
    else {
        //PENDIENTE: MOSTRAR MODAL DE PERDISTE
        false //devuelve false si el jugador PIERDE
    }
}

var mostrarColorAleatorio = function (){
    generarColoresAleatorio();
    clearInterval(intervalo);
  
    reproduciendoSecuencia = true;
    sinJugar = true;
  
    //Recorre el array de colores y agrega al callstack los colores a pintar en el html
    secuenciaColores.forEach(function (color, index) {
      setTimeout(function () {
        if (color == "verde") {
            document.getElementById("verde").classList.add('click');
            setTimeout(function () {
              document.getElementById("verde").classList.remove('click');
            }, 600);
        }
  
        if (color == "rojo") {
            document.getElementById("rojo").classList.add('click');
            setTimeout(function () {
              document.getElementById("rojo").classList.remove('click');
            }, 600);
        }
  
        if (color == "amarillo") {
            document.getElementById("amarillo").classList.add('click');
            setTimeout(function () {
              document.getElementById("amarillo").classList.remove('click');
            }, 600);
        }
  
        if (color == "azul") {
            document.getElementById("azul").classList.add('click');
            setTimeout(function () {
              document.getElementById("azul").classList.remove('click');
            }, 600);
        }
  
        // Iniciar el contador de tiempo después de mostrar los colores
        if (index == secuenciaColores.length - 1) {
            iniciarContadorTiempo();
            reproduciendoSecuencia = false; // Si es el último color de la secuencia, establecer reproduciendo secuencia en false para permitir los clics
        }
      }, (index + 1) * 1000);
    });
}

//funcion que hace que empiece el juego luego de 2 segundos
var comenzarJuego = function () {
    intervalo = setInterval(function () {
      mostrarColorAleatorio();
    }, 2000);
    start.classList.add("displayNone");
}

//MANEJO DE EVENTOS
botones.forEach(function(i){
    i.addEventListener("mousedown", pintar)
    i.addEventListener("mouseup", despintar)
    i.addEventListener("click", click) //feedback del click
})
start.addEventListener("click", comenzarJuego)



