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
    if (reproduciendoSecuencia == true){
        return //ignoramos los clicks mientras se reproduce la secuencia
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
    compararSecuencia();
}

var compararSecuencia = function(){
    for (var i=0; i< coloresJugador.length; i++){
        if (coloresJugador[coloresJugador.length-1] == secuenciaColores[coloresJugador.length-1]){
            puntajeJugador+= 1;
            puntuacionSpan.textContent=puntajeJugador;
            if (coloresJugador.length == secuenciaColores.length){
                nivelJugador+=1; //subo el nivel del jugador
                nivelSpan.textContent = nivelJugador;
                coloresJugador = [] //reseteamos el registro de colores para el nuevo nivel
                tiempoSpan.textContent=tiempoJugador;
                mostrarColorAleatorio();
                clearInterval(intervalTiempo);
                tiempoJugador= 30; //ESTO VA DESPUES PORQUE SINO SE EJECTURA PERDISTE COMO BUG
                tiempoSpan.textContent= "";
            }
            return
        }
    }
    juegoTerminado();
}

var mostrarColorAleatorio = function (){
    // agregamos colores al arreglo de colores y limpiamos el intervalo para que no se ejecute mas el bucle del timeout
    generarColoresAleatorios();
    clearInterval(intervalo);
  
    // establecemos que se esta jugando y se esta reproduciendo la secuencia
    reproduciendoSecuencia = true;
    jugando = true;

    // recorremos el arrayd con los colores que se van a mostrar y los pintamos
    secuenciaColores.forEach(function (color, i) {
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
        
        // si ya recorrimos el array secuenciaColores es decir ya pintamos todos los colores debidos, empieza el contador
        if (i == secuenciaColores.length - 1) {
            iniciarTiempo();
            reproduciendoSecuencia = false;
        }
      }, (i + 1) * 1000);
    });
}

var iniciarTiempo = function(){
    intervalTiempo = setInterval(function () {
        if (tiempoJugador <= 0) {
            console.log("PERDI POR ACA")
            juegoTerminado();
            return;
        }
        tiempoSpan.textContent = tiempoJugador;
        tiempoJugador--;
      }, 1000);
}

var juegoTerminado = function () {
    clearInterval(intervalTiempo);
    start.classList.remove("displayNone");
    sinJugar = false;
    reproduciendoSecuencia= false;
    nivelJugador = 1;
    tiempoJugador = 30;
    puntajeJugador = 0;
    nivelSpan.textContent = nivelJugador;
    tiempoSpan.textContent = 30;
    puntuacionSpan.textContent = puntajeJugador;
    coloresJugador = [];
    secuenciaColores = [];
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



