var expresiones = {
  nombreCompletoRegex: /^(?=.*\s).{6,}$/,
  emailRegex: /^\S+@\S+\.\S+$/,
  mensajeRegex: /^.{6,}$/,
};
var inputs = document.querySelectorAll("input");
var sumbit = document.querySelector("button");
var formulario = document.querySelector("form");

var validarFormulario = function (e) {
  switch (e.target.name) {
    case "nombre":
      document.getElementById("titulo-nombre").textContent =
        "Hola " + e.target.value + "!";
      if (expresiones.nombreCompletoRegex.test(e.target.value)) {
        //test y match sirven para este caso, devuelven true o false si se cumple la expresion regular
        document.getElementById("nombre-correcto").style.display = "flex";
        document.getElementById("nombre-incorrecto").style.display = "none";
      } else {
        document.getElementById("nombre-incorrecto").style.display = "flex";
        document.getElementById("nombre-correcto").style.display = "none";
      }
      if (e.target.value == "") {
        document.getElementById("nombre-correcto").style.display = "none";
        document.getElementById("nombre-incorrecto").style.display = "none";
      }
      break;
    case "email":
      if (expresiones.emailRegex.test(e.target.value)) {
        //test y match sirven para este caso, devuelven true o false si se cumple la expresion regular
        document.getElementById("email-correcto").style.display = "flex";
        document.getElementById("email-incorrecto").style.display = "none";
      } else {
        document.getElementById("email-incorrecto").style.display = "flex";
        document.getElementById("email-correcto").style.display = "none";
      }
      if (e.target.value == "") {
        document.getElementById("email-correcto").style.display = "none";
        document.getElementById("email-incorrecto").style.display = "none";
      }
      break;
  }
};

inputs.forEach(function (i) {
  i.addEventListener("keyup", validarFormulario);
  i.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  var nombreCompleto = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var asunto = document.getElementById("asunto").value;
  var mensaje = document.getElementById("mensaje").value;
  
  nombreCompletoRegex = /^(?=.*\s).{6,}$/;
  emailRegex = /^\S+@\S+\.\S+$/;
  mensajeRegex = /^.{6,}$/;

  if (!nombreCompletoRegex.test(nombreCompleto)) {
    alert(
      "El nombre completo es inválido, debe tener más de 6 letras y al menos un espacio entre medio."
    );
    return;
  }

  if (!emailRegex.test(email)) {
    alert(
      "El correo electrónico es inválido, debe tener un formato de email válido."
    );
    return;
  }

  if (mensaje.length <= 6) {
    alert("El mensaje debe contener almenos 6 caracteres."
	);
    return;
  }
  formulario.action = `mailto:renzopayero@hotmail.com?mail=joaksd@ojasdnl.com&subject=${asunto}&body=${mensaje}`;
  formulario.submit();
});
