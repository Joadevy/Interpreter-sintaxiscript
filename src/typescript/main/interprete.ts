import {obtenerSiguienteComplex} from '../Analizador Lexico/index.js';
import {tablaSimbolos} from '../Analizador Lexico/tablaSimbolos.js';

// Esta funcion hara el manejo del compilador completo.
export async function interprete(archivo:File){
    // codigoFuente va a guardar toda la cadena, es decir, todo el codigo del programa.
    //.trim() para remover espacios en blanco al inicio y al final del archivo.
    let codigoFuente:string = (await archivo.text()).trim();
    // Aca se debe declarar las variables para manejar el string codigoFuente (control,lexema)
    let control:number = 0;
    let lexema:string = "";
    let compLex = '';
    let inicio = obtenerSiguienteComplex(codigoFuente, control, lexema, tablaSimbolos,compLex);
}