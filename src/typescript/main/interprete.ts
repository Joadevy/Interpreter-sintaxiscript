import {obtenerSiguienteCompLex} from '../Analizador Lexico/index.js';
import {tablaSimbolos} from '../Analizador Lexico/tablaSimbolos.js';
import {mostrarInfo} from '../Analizador Lexico/index.js';

// Esta funcion hara el manejo del compilador completo.
export async function interprete(archivo:File){
    // codigoFuente va a guardar toda la cadena, es decir, todo el codigo del programa.
    //.trim() para remover espacios en blanco al nodoCompLex y al final del archivo.
    let codigoFuente:string = (await archivo.text()).trim();

    // Aca se debe declarar las variables para manejar el string codigoFuente (control,lexema)
    let control:number = 0;
    let lexema:string = "";
    let compLex = '';
    // Llamo a la funcion para obtener el compLex
    while(compLex !== '$'){
    let nodoCompLex = obtenerSiguienteCompLex(codigoFuente, control, lexema, tablaSimbolos,compLex);
    
    // Testing en consola
    console.log('compLex encontrado: ' + nodoCompLex[0]);
    if (nodoCompLex[0] !== 'ERROR'){
        console.log('Lexema encontrado: ' + nodoCompLex[2]);
        console.log('Posicion del control actual: ' + nodoCompLex[1])
    }
    compLex = nodoCompLex[0];
    control = nodoCompLex[1];
    console.log(control);
    // Mostrar en la interfaz la data del resultado.
    mostrarInfo(nodoCompLex);
    }
}