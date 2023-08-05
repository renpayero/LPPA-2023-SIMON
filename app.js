//selectores
var botones = document.querySelectorAll(".botones"); //devuelve una nodeList
botones = Array.from(botones); //transformo la nodeList a arrayd
var start = document.getElementById("start");
var puntuacionSpan = document.getElementById("puntuacionSpan");
var nivelSpan = document.getElementById("nivelSpan");
var tiempoSpan = document.getElementById("tiempoSpan");
var contactanos = document.getElementById("contactanos");

//selectores de modales
var modalNombreJugador = document.getElementById("modalNombreJugador");
var modalJuegoTerminado = document.getElementById("modalJuegoTerminado");
var modalSiguienteNivel = document.getElementById("modalSiguienteNivel");
var displayNoneDiv = document.getElementById("displayNoneDiv");
var nombreJugadorInput = document.getElementById("nombreJugadorInput");
var sumbitNombreJugador = document.getElementById("sumbitNombreJugador");
var spanNombreJugador = document.getElementById("spanNombreJugador");
var spanPuntuacionFinal = document.getElementById("spanPuntuacionFinal");
var spanNivelFinal = document.getElementById("spanNivelFinal");

//variables de jugador
var nombreJugador = "";
var coloresJugador = [];
var nivelJugador = 1;
var puntajeJugador = 0;
var tiempoJugador = 30;
var tiempoPorNivel = [];
var puntajeFinalJugador = 0;

//variables de los scripts
var colores = ["verde", "rojo", "amarillo", "azul"];
var reproduciendoSecuencia = false;
var secuenciaColores = [];
var len = botones.length;
var tiempoUsado = 0;
var jugando = false; //inicializa en false porque cuando cargamos la pagina no estamos jugando

//sonidos
var sonidoClick = new Audio("./SONIDOS/PIP_SOUND.wav");
var juegoTerminadoSound = new Audio("./SONIDOS/GAME_OVER_SOUND.wav");
var siguienteNivel = new Audio("./SONIDOS/LEVEL_UP_SOUND.wav");
var popUp = new Audio("./SONIDOS/POPUP_SOUND.wav");
var mostrarColor = new Audio("./SONIDOS/MOSTRAR_COLOR.wav");

puntuacionSpan.textContent = puntajeJugador;
nivelSpan.textContent = nivelJugador;

//funciones de sonidos
var sonidoClickPlay = function () {
  sonidoClick.play();
};
var juegoTerminadoSoundPlay = function () {
  juegoTerminadoSound.play();
};

var siguienteNivelPlay = function () {
  siguienteNivel.play();
};

var popUpPlay = function () {
  popUp.play();
};

var mostrarColorPlay = function () {
  mostrarColor.play();
};

//funcion que agrega la clase click al boton que este disparando el evento mousedown
var pintar = function (event) {
  var button = document.getElementById(event.target.id);
  button.classList.add("click");
};

//funcion que quita la clase click al boton que este disparando el evento mouseup el cual se accionara inmediatamente luego del evento mousedown
var despintar = function (event) {
  var button = document.getElementById(event.target.id);
  button.classList.remove("click");
};

var generarColoresAleatorios = function () {
  for (var i = 0; i < 1; i++) {
    var randomNum = Math.floor(Math.random() * len);
    var newColor = colores[randomNum];
    secuenciaColores.push(newColor);
  }
};

//funcion que registra los clicks del jugador para luego comparar con la secuencia
var click = function (boton) {
  if (jugando == false) {
    return; //ignoramos los clicks fuera de juego
  }
  if (reproduciendoSecuencia == true) {
    return; //ignoramos los clicks mientras se reproduce la secuencia
  }
  if (boton.target.id == "verde") {
    coloresJugador.push("verde");
  }
  if (boton.target.id == "rojo") {
    coloresJugador.push("rojo");
  }
  if (boton.target.id == "amarillo") {
    coloresJugador.push("amarillo");
  }
  if (boton.target.id == "azul") {
    coloresJugador.push("azul");
  }
  compararSecuencia();
};
var compararSecuencia = function () {
  if (jugando == false) {
    return;
  }
  for (var i = 0; i < coloresJugador.length; i++) {
    if (
      coloresJugador[coloresJugador.length - 1] ==
      secuenciaColores[coloresJugador.length - 1]
    ) {
      puntajeJugador += 1;
      puntuacionSpan.textContent = puntajeJugador;
      if (coloresJugador.length == secuenciaColores.length) {
        nivelJugador += 1; //subo el nivel del jugador
        displayNoneDiv.classList.remove("displayNone");
        modalSiguienteNivel.classList.remove("displayNone");
        siguienteNivelPlay();
        setTimeout(function () {
          displayNoneDiv.classList.add("displayNone");
          modalSiguienteNivel.classList.add("displayNone");
        }, 600);
        tiempoPorNivel.push(tiempoJugador);
        nivelSpan.textContent = nivelJugador;
        coloresJugador = []; //reseteamos el registro de colores para el nuevo nivel
        tiempoSpan.textContent = tiempoJugador;
        mostrarColorAleatorio();
        clearInterval(intervalTiempo);
        tiempoJugador = 30; //ESTO VA DESPUES PORQUE SINO SE EJECTURA PERDISTE COMO BUG
        tiempoSpan.textContent = "";
      }
      return;
    }
  }
  juegoTerminado();
};

var mostrarColorAleatorio = function () {
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
        document.getElementById("verde").classList.add("click");
        mostrarColorPlay();
        setTimeout(function () {
          document.getElementById("verde").classList.remove("click");
        }, 600);
      }

      if (color == "rojo") {
        document.getElementById("rojo").classList.add("click");
        mostrarColorPlay();
        setTimeout(function () {
          document.getElementById("rojo").classList.remove("click");
        }, 600);
      }

      if (color == "amarillo") {
        document.getElementById("amarillo").classList.add("click");
        mostrarColorPlay();
        setTimeout(function () {
          document.getElementById("amarillo").classList.remove("click");
        }, 600);
      }

      if (color == "azul") {
        document.getElementById("azul").classList.add("click");
        mostrarColorPlay();
        setTimeout(function () {
          document.getElementById("azul").classList.remove("click");
        }, 600);
      }

      // si ya recorrimos el array secuenciaColores es decir ya pintamos todos los colores debidos, empieza el contador
      if (i == secuenciaColores.length - 1) {
        iniciarTiempo();
        reproduciendoSecuencia = false;
      }
    }, (i + 1) * 1000);
  });
};

var iniciarTiempo = function () {
  intervalTiempo = setInterval(function () {
    if (tiempoJugador <= 0) {
      juegoTerminado();
      return;
    }
    tiempoSpan.textContent = tiempoJugador;
    tiempoJugador--;
  }, 1000);
};

var calcularPuntajeFinal = function () {
  tiempoPorNivel.forEach(function (valor, i) {
    // puntajeFinalJugador += valor / puntajeJugador;
    tiempoUsado += 30 - tiempoPorNivel[i];
  });
  puntajeFinalJugador = puntajeJugador - tiempoUsado;
  console.log(tiempoUsado);
  console.log(puntajeJugador);
};

var juegoTerminado = function () {
  calcularPuntajeFinal();
  spanNivelFinal.textContent = nivelJugador;
  spanPuntuacionFinal.textContent = puntajeFinalJugador;
  modalJuegoTerminado.classList.remove("displayNone");
  displayNoneDiv.classList.remove("displayNone");
  juegoTerminadoSoundPlay();
  document.getElementById("continuar").addEventListener("click", function () {
    displayNoneDiv.classList.add("displayNone");
    modalJuegoTerminado.classList.add("displayNone");
    sonidoClickPlay();
  });
  clearInterval(intervalTiempo);
  start.classList.remove("displayNone");
  guardarEnStorage();
  jugando = false;
  reproduciendoSecuencia = false;
  nivelJugador = 1;
  tiempoJugador = 30;
  puntajeJugador = 0;
  nivelSpan.textContent = nivelJugador;
  tiempoSpan.textContent = 30;
  puntuacionSpan.textContent = puntajeJugador;
  coloresJugador = [];
  secuenciaColores = [];
  tiempoUsado = 0;
  puntajeFinalJugador = 0;
  tiempoPorNivel = [];
  tiempoSpan.textContent = "";
};

//inicia la pagina con el modal de registro
var modalNombreJugadorFunction = function () {
  modalNombreJugador.classList.remove("displayNone");
  displayNoneDiv.classList.remove("displayNone");
};

//valida el nombre del jugador y lo guarda en una variable
var guardarNombreJugador = function () {
  sonidoClickPlay();
  variablesSinEspacios = nombreJugadorInput.value.trim();
  if (variablesSinEspacios.length >= 3) {
    nombreJugador = nombreJugadorInput.value;
    modalNombreJugador.classList.add("displayNone");
    displayNoneDiv.classList.add("displayNone");
  } else {
    spanNombreJugador.classList.add("resaltarEnRojo");
    setTimeout(function () {
      spanNombreJugador.classList.remove("resaltarEnRojo");
    }, 1000);
  }
};

//funcion que hace que empiece el juego luego de 1 segundos
var comenzarJuego = function () {
  intervalo = setInterval(function () {
    mostrarColorAleatorio();
  }, 1000);
  start.classList.add("displayNone");
};

var guardarEnStorage = function () {
  var fecha = new Date().toLocaleDateString(); //hace que la fecha tenga un formato legible
  var resultados = [
    nombreJugador,
    puntajeFinalJugador,
    puntajeJugador,
    nivelJugador,
    fecha,
  ]; //puntaje jugador representa los botones presionados
  localStorage.setItem("resultados", JSON.stringify(resultados));
};

//MANEJO DE EVENTOS
botones.forEach(function (i) {
  i.addEventListener("mousedown", pintar);
  i.addEventListener("mouseup", despintar);
  i.addEventListener("click", click); //feedback del click
  i.addEventListener("click", sonidoClickPlay);
});

start.addEventListener("click", comenzarJuego);
start.addEventListener("click", sonidoClickPlay);
sumbitNombreJugador.addEventListener("click", guardarNombreJugador);
modalNombreJugadorFunction();
contactanos.addEventListener("click", sonidoClickPlay);
