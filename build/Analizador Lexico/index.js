import { esConstReal } from '../Analizador Lexico/Automatas/constanteReal.js';
import { esSimboloEspecial } from '../Analizador Lexico/Automatas/simboloEspecial.js';
import { esIdentificador } from '../Analizador Lexico/Automatas/identificador.js';
import { esCadena } from '../Analizador Lexico/Automatas/cadena.js';
export function mostrarInfo(resultado) {
    let output = document.getElementById('output');
    if (output) {
        if (resultado) {
            let text = document.createElement('p');
            text.classList.add('output-text');
            text.textContent = ' Se encontro el compLex: ' + resultado[0] + " y el lexema asociado es: " + resultado[2];
            output.appendChild(text);
        }
        else {
            alert('Ha ocurrido un error, intentalo de nuevo.');
        }
    }
}
export function obtenerSiguienteCompLex(codigoFuente, control, lexema, tablaSimbolos, compLex) {
    // Aca habria que hacer el manejo general del analizador lexico
    // Asigna [1,2, ... , 32] que son los ASCII a saltear en el archivo
    let evitarASCII = [...Array(33).keys()].slice(1);
    // Si  caracter del codigo fuente es distinto de un caracter de control, avanza control.
    while (evitarASCII.includes(codigoFuente.charCodeAt(control))) {
        control++;
    }
    if (control == codigoFuente.length) {
        // Devuelve el componente lexico que representa el fin de archivo.
        compLex = "$";
    }
    else if (esConstReal(codigoFuente, control, lexema)[0]) {
        // Se necesita devolver un array que contenga el lexema, el componente lexico y el control
        let resultado = esConstReal(codigoFuente, control, lexema); // Guarda el resultado (devuelve un array [true,control,lexema])
        compLex = "tConstanteReal";
        return [compLex, resultado[1], resultado[2]];
    }
    else if (esSimboloEspecial(codigoFuente, control, lexema)[0]) {
        let resultado = esSimboloEspecial(codigoFuente, control, lexema); // Guarda el resultado (devuelve un array [true,control,lexema,compLex]
        return [resultado[3], resultado[1], resultado[2]];
    }
    else if (esIdentificador(codigoFuente, control, lexema)[0]) {
        let resultado = esIdentificador(codigoFuente, control, lexema); // Guarda el resultado (devuelve un array [true,control,lexema,compLex]
        if (!tablaSimbolos.hasOwnProperty(resultado[2].toUpperCase())) {
            compLex = 'tId';
            // Insertar el identificador en la tabla de simbolos (luego de convertirlo a mayusculas)
            tablaSimbolos[resultado[2].toUpperCase()] = 'tId';
            console.log(tablaSimbolos);
        }
        else {
            // Si esta en la tabla de simbolos, buscamos cual es el componente lexico asociado.
            compLex = tablaSimbolos[resultado[2].toUpperCase()];
        }
        return [compLex, resultado[1], resultado[2]];
    }
    else if (esCadena(codigoFuente, control, lexema)[0]) {
        let resultado = esCadena(codigoFuente, control, lexema); // Guarda el resultado (devuelve un array [true,control,lexema,compLex]
        compLex = 'tCadena';
        return [compLex, resultado[1], resultado[2]];
    }
    else {
        compLex = "ERROR";
    }
    return [compLex];
}
