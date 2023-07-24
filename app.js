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
var secuenciaColores = [];
var len = botones.length; 
var jugando = true; //inicializa en false porque cuando cargamos la pagina no estamos jugando

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


var secuencia = function() {
    var randomNum = Math.floor(Math.random() * len);
    var newColor= colores[randomNum];
    secuenciaColores.push(newColor);
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


