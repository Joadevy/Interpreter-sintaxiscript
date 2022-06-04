import {esConstReal} from '../Analizador Lexico/Automatas/constanteReal.js';

export function analizadorLexico(codigoFuente:string,control:number):void{
    let output = document.getElementById('output');
    if (output){
      let resultado = esConstReal(codigoFuente.slice(control),'TEST',control);
      console.log(resultado);
      if (resultado){
        output.textContent = '"' + codigoFuente + '"'+ " es una cadena valida";
        console.log('CADENA VALIDA')
      } else {
        output.textContent = '"' + codigoFuente + '"' + " es una cadena invalida";
        console.log('CADENA INVALIDA')
      }
      // llama a la funcion ObtenerSiguienteCompLex para empezar a reconocer las cadenas.
    }else{
      alert('Ha ocurrido un error, intentalo de nuevo.');
    }
  } 

  export function obtenerSiguienteComplex(codigoFuente:string, control:number, lexema:string, tablaSimbolos:object, compLex:string):number{
    // Aca habria que hacer el manejo general del analizador lexico

    // Asigna [1,2, ... , 32] que son los ASCII a saltear en el archivo
    let evitarASCII = [...Array(33).keys()].slice(1);
    // Si  caracter del codigo fuente es distinto de un caracter de control, avanza control.
    while (evitarASCII.includes(codigoFuente.charCodeAt(control))){
      control++;
    }

    if (codigoFuente.charCodeAt(control) == 0){
      compLex = "EOF";
    } else if (esConstReal(codigoFuente,lexema,control)) {
      compLex = "constReal";
    }

    // Se necesita devolver un array que contenga el lexema, el componente lexico y el control
    analizadorLexico(codigoFuente,control);
    console.log(control);
    console.log('se encontro el componente: ',compLex)
    return control;
  }
