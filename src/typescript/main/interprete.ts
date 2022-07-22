import {obtenerSiguienteCompLex} from '../Analizador Lexico/index.js';
import {tablaSimbolos} from '../Analizador Lexico/tablaSimbolos.js';
import {mostrarInfo} from '../Analizador Lexico/index.js';

// Esta funcion hara el manejo del compilador completo.
export async function interprete(archivo:File){
    // codigoFuente va a guardar toda la cadena, es decir, todo el codigo del programa.
    //.trim() para remover espacios en blanco al nodoCompLex y al final del archivo.
    let codigoFuente:string = (await archivo.text()).trim();
    let control:number = 0;
    let compLex = '';
    // Llamo a la funcion para obtener el compLex
    while(compLex !== 'pesos' && compLex !== 'errorLexico'){
        let nodoCompLex = obtenerSiguienteCompLex(codigoFuente, control,tablaSimbolos);

        compLex = nodoCompLex[0];
        control = nodoCompLex[1];
        // Mostrar en la interfaz la data del resultado.
        mostrarInfo(nodoCompLex);
    } 
}