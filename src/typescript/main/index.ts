import { analizadorLexico } from '../Analizador Lexico/index.js';
import { analizadorSintactico } from '../Analizador Sintactico/index.js';
// @ts-ignore
import { toggleLanguage } from '../../../build/utils/utils.js'

// Tomamos el elemento HTML del input file.
const input = document.getElementById('input');
const language:string = localStorage.getItem('language')||"es";

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
        mostrarOpciones();
        manejarOpciones(archivos);
      } else {
        alert(language == 'en' ? 'Please, enter a .TXT file':'Porfavor, introduce un archivo de texto .TXT');
      }
    }
})

function mostrarOpciones(){
  toggleLanguage(language);
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
  opcionSintactico?.addEventListener('click', () => llamarSintactico(archivos,false));
  let opcionInterprete = document.querySelector('.opcion-interprete');
  opcionInterprete?.addEventListener('click', () => llamarSintactico(archivos,true));
}

function llamarLexico(archivos:any){
  eliminarOpciones();
  const main = document.getElementById('main');
  
  const templateOutput= document.getElementById('template-output')
    // @ts-ignore
  const output = templateOutput.content.cloneNode(true);
    // @ts-ignore
  main.appendChild(output)
  analizadorLexico(archivos[0]);
}

function eliminarOpciones(){
  const opciones = document.querySelector('.opciones');
  if (opciones){
    opciones.classList.add('hide') // Seria mejor modificarlo con style
  }
}

function llamarSintactico(archivos:any,interprete:boolean){
  eliminarOpciones();
  // Si no hay que ejecutar el interprete, entonces crea ya el contenedor.
  // Si hay que ejecutarlo, lo crea mas tarde porque sino queda vacio en la pantalla 
  // hasta que se procesen las salidas y queda mal.
  if (!interprete){
    const main = document.getElementById('main');
    const templateOutput= document.getElementById('template-output')
    // @ts-ignore
    const output = templateOutput.content.cloneNode(true);
    // @ts-ignore
    main.appendChild(output)
  }
  analizadorSintactico(archivos[0],interprete);
}


