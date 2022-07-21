import {interprete} from './interprete.js';

// Este modulo tiene como responsabilidad el manejo del input file.

// Tomamos el elemento HTML del input file.
const input = document.getElementById('input');

// Establecemos las acciones inmediatas luego de que se sube un archivo.
input?.addEventListener('change', (e) => {
    const archivos = (e.target as HTMLInputElement).files;
    // Si se subio al menos un archivo.
    if (archivos) {
      // Expresion regular que comprueba que se haya pasado un .txt
      let compruebaTXT = /\w+\.txt$/;
      // Usamos solamente el primer archivo que se haya pasado (aunque por defecto solo se puede pasar uno)
      if (compruebaTXT.test(archivos[0].name)){
        let output = document.getElementById('output');
        if (output){
          output.textContent = '' // Limpia el contenedor del output para poder mostrar el resultado del analisis correctamente.
        }
        // Llamamos a la funcion que se encargara del manejo del compilador.
        mostrarOpciones();
        manejarOpciones(archivos);
        // Podria llamar a un cartel donde si selecciona analizador lexico, le muestra el lexico.
        // Si selecciona sintactico que muestre ambos
        // DEBE BORRAR EL CARTEL DE SELECCIONAR EL ARCHIVO (SINO SE PUEDE SEGUIR INPUTEANDO COSAS)
      } else {
        alert('Porfavor, introduce un archivo de texto .TXT')
      }
    }
})

function mostrarOpciones(){
  const main = document.getElementById('main');
  
  const contenedor = document.querySelector('.verificador');
  if (contenedor){
    contenedor.classList.add('hide') // Seria mejor modificarlo con style
  }

  const templateOpciones = document.getElementById('template-opciones')
  // @ts-ignore
  const opciones = templateOpciones.content.cloneNode(true);
  // @ts-ignore
  main.appendChild(opciones)
}

function manejarOpciones(archivos:any){
  let opcionLexico = document.querySelector('.opcion-lexico');
  opcionLexico?.addEventListener('click', () => llamarLexico(archivos));
  let opcionSintactico = document.querySelector('.opcion-sintactico');
  opcionSintactico?.addEventListener('click', () => console.log('TEST'))
}

function llamarLexico(archivos:any){
  eliminarOpciones();
  const main = document.getElementById('main');
  
  const templateOutput= document.getElementById('template-output')
   // @ts-ignore
   const output = templateOutput.content.cloneNode(true);
   // @ts-ignore
   main.appendChild(output)
  interprete(archivos[0]);
}

function eliminarOpciones(){
  console.log('OLA')
  const opciones = document.querySelector('.opciones');
  if (opciones){
    opciones.classList.add('hide') // Seria mejor modificarlo con style
  }
}



