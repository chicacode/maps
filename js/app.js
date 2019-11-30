const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=>{
    ui.mostrarEstablecimientos();
})

// Habilitar busqueda de establecimientos
const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => { // importante eventlistener input ya que lee todo lo que escribo en buscador
    console.log(buscador.value);
}) // evento que lee todo lo que esta ene l input