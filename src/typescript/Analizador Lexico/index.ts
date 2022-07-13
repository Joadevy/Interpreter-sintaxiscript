import {esConstReal} from '../Analizador Lexico/Automatas/constanteReal.js';
import {esSimboloEspecial} from '../Analizador Lexico/Automatas/simboloEspecial.js';

export function mostrarInfo(resultado:Array<any>):void{
    let output = document.getElementById('output');
    if (output){
      if (resultado){
      output.textContent = 'Se encontro el compLex: ' + resultado[0] + " y  el lexema asociado es: " + resultado[2];
    } else{
      alert('Ha ocurrido un error, intentalo de nuevo.');
    }
  }
} 

  export function obtenerSiguienteCompLex(codigoFuente:string, control:number, lexema:string, tablaSimbolos:object, compLex:string):Array<any>{
    // Aca habria que hacer el manejo general del analizador lexico

    // Asigna [1,2, ... , 32] que son los ASCII a saltear en el archivo
    let evitarASCII = [...Array(33).keys()].slice(1);
    // Si  caracter del codigo fuente es distinto de un caracter de control, avanza control.
    while (evitarASCII.includes(codigoFuente.charCodeAt(control))){
      control++;
    }

    if (control == codigoFuente.length){ 
      // Devuelve el componente lexico que representa el fin de archivo.
      compLex = "$"; 
    } else if (esConstReal(codigoFuente,control,lexema)[0]) {
      // Se necesita devolver un array que contenga el lexema, el componente lexico y el control
      let resultado = esConstReal(codigoFuente,control,lexema); // Guarda el resultado (devuelve un array [true,control,lexema])
      compLex = "constReal";
      return [compLex,resultado[1],resultado[2]]
    }
    else if (esSimboloEspecial(codigoFuente,control,lexema)[0]) {        
      let resultado = esSimboloEspecial(codigoFuente,control,lexema); // Guarda el resultado (devuelve un array [true,control,lexema,compLex]
      return [resultado[3],resultado[1],resultado[2]];
    }
    else {
      compLex = "ERROR";
    }
    // Si se llego hasta aca es porque o es error, o es fin de archivo y entonces devuelvo solo em compLex
    return [compLex]
  }
