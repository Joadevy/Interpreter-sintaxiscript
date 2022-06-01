import { esConstEntera } from '../Analizador Lexico/Automatas/constanteEntera.js';
export function analizadorLexico(codigoFuente) {
    // Aca habria que hacer el manejo general del analizador lexico
    let output = document.getElementById('output');
    if (output) {
        let resultado = esConstEntera(codigoFuente);
        console.log(resultado);
        if (resultado) {
            output.textContent = '"' + codigoFuente + '"' + " es una cadena valida";
            console.log('CADENA VALIDA');
        }
        else {
            output.textContent = '"' + codigoFuente + '"' + " es una cadena invalida";
            console.log('CADENA INVALIDA');
        }
        // llama a la funcion ObtenerSiguienteCompLex para empezar a reconocer las cadenas.
    }
    else {
        alert('Ha ocurrido un error, intentalo de nuevo.');
    }
}
