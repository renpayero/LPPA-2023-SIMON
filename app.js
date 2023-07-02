var botones=document.querySelectorAll(".botones")

var pintar = function(event){
    var button = document.getElementById(event.target.id);
    button.classList.add('click');
}

var despintar = function(event) {
    var button = document.getElementById(event.target.id);
    button.classList.remove('click');
  }

botones.forEach(function(i){
    console.log("sex")
    i.addEventListener("mousedown", pintar)
    i.addEventListener("mouseup", despintar)
})
