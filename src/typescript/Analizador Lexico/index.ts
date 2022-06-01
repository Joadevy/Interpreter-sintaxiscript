import {esConstEntera} from '../Analizador Lexico/Automatas/constanteEntera.js';

export async function mostrarArchivo(file:File):Promise<void> {
    // Contenido va a guardar toda la cadena, es decir, todo el codigo del programa.
    let contenido:string = await file.text();
    let output = document.getElementById('output');
    if (output){
      output.textContent = contenido;
      //.trim() para remover espacios en blanco al inicio y al final del archivo.
      let resultado = esConstEntera(contenido.trim());
      console.log(resultado);
      if (resultado){
        console.log('CADENA VALIDA')
      } else {
        console.log('CADENA INVALIDA')
      }
      // llama a la funcion ObtenerSiguienteCompLex para empezar a reconocer las cadenas.
    }else{
      alert('Ha ocurrido un error, intentalo de nuevo.');
    }
  }