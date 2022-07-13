import { esConstReal } from '../Analizador Lexico/Automatas/constanteReal.js';
function mostrarInfo(resultado, lexema) {
    let output = document.getElementById('output');
    if (output) {
        // resultado contiene true/false de acuerdo a si es una constante real o no.
        if (resultado) {
            output.textContent = '"' + lexema + '"' + " es una cadena valida";
        }
        else {
            output.textContent = '"' + lexema + '"' + " es una cadena invalida";
        }
    }
    else {
        alert('Ha ocurrido un error, intentalo de nuevo.');
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
    if (codigoFuente.charCodeAt(control) == 0) { // Analiza el codigo ASCII del caracter en control (0 = Fin de archivo)
        // Devuelve el componente lexico fin de archivo.
        compLex = "$";
    }
    else if (esConstReal(codigoFuente, lexema, control)[0]) {
        compLex = "constReal";
        // Aca hay que ver lo del llamado a la funcion porque se necesita asignar lo que devuelve.
        // mostrarInfo(true,lexema); ***** Esto todavia no funciona. *****
    }
    else {
        compLex = "ERROR";
    }
    // Se necesita devolver un array que contenga el lexema, el componente lexico y el control
    //analizadorLexico(codigoFuente,control);
    console.log(control);
    console.log('se encontro el componente: ', compLex);
    return control;
}
