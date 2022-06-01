import {analizadorLexico} from '../Analizador Lexico/index.js';

// Esta funcion hara el manejo del compilador completo.
export async function interprete(archivo:File){
    // codigoFuente va a guardar toda la cadena, es decir, todo el codigo del programa.
    //.trim() para remover espacios en blanco al inicio y al final del archivo.
    let codigoFuente:string = (await archivo.text()).trim();

    // Aca se debe declarar las variables para manejar el string codigoFuente (control,lexema)

    analizadorLexico(codigoFuente);
}