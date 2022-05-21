"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esConstEntera = void 0;
const funciones_1 = require("./funciones");
// Convierte un simbolo de entrada en el equivalente en el alfabeto que se esta trabajando.
const carAsimb = (caracter) => {
    let simbolo;
    switch (caracter) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            simbolo = 'digito';
            break;
        case '-':
            simbolo = '-';
            break;
        default: simbolo = 'otro';
    }
    return simbolo;
};
function esValida(estadoInicial, estadosFinales, tablaTransiciones, simbolo, cadena) {
    let estadoActual = estadoInicial;
    // Toma un caracter y busca el estado siguiente en la tabla de transiciones.
    for (let caracter of cadena) {
        estadoActual = tablaTransiciones[estadoActual][simbolo[carAsimb(caracter)]]; // as any esta ya que carAsimb devuelve un string, y se accede al index del enum con una string
    }
    // estadoActual contendra el estado final al que llego el automata.
    return estadosFinales.includes(estadoActual);
}
function esConstEntera(cadena) {
    let simbolo;
    (function (simbolo) {
        simbolo[simbolo["digito"] = 0] = "digito";
        simbolo[simbolo["-"] = 1] = "-";
        simbolo[simbolo["otro"] = 2] = "otro";
    })(simbolo || (simbolo = {}));
    let estado;
    (function (estado) {
        estado[estado["q0"] = 0] = "q0";
        estado[estado["q1"] = 1] = "q1";
        estado[estado["q2"] = 2] = "q2";
    })(estado || (estado = {}));
    // Definiendo estado inicial y finales.
    let estadoFinal = [estado.q1];
    let estadoInicial = estado.q0;
    let cantidadSimbolos = (Object.keys(simbolo).length / 2); // Porque es un enum numerico.
    let tablaTransiciones = [];
    (0, funciones_1.creaTabla)(tablaTransiciones, cantidadSimbolos);
    // ***** CARGA DE LA TABLA DE TRANSICIONES *****
    tablaTransiciones[estado.q0][simbolo.digito] = 1;
    tablaTransiciones[estado.q0][simbolo['-']] = 1;
    tablaTransiciones[estado.q0][simbolo.otro] = 2;
    tablaTransiciones[estado.q1][simbolo.digito] = 1;
    tablaTransiciones[estado.q1][simbolo['-']] = 2;
    tablaTransiciones[estado.q1][simbolo.otro] = 2;
    tablaTransiciones[estado.q2][simbolo.digito] = 2;
    tablaTransiciones[estado.q2][simbolo['-']] = 2;
    tablaTransiciones[estado.q2][simbolo.otro] = 2;
    const resultado = esValida(estadoInicial, estadoFinal, tablaTransiciones, simbolo, cadena);
    if (resultado) {
        console.log('CADENA VALIDA');
    }
    else {
        console.log('CADENA NO VALIDA');
    }
}
exports.esConstEntera = esConstEntera;
// Paso la cadena a comprobar
esConstEntera('-12345');
