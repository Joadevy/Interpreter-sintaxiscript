"use strict";
// Forma mas compacta y legible de resolver el problema y mas parecida a la que dio el profesor.
// Convierte un simbolo de entrada en el equivalente en el alfabeto que se esta trabajando.
const carAsimb = (caracter) => {
    let simbolo;
    switch (caracter) {
        case 'a':
            simbolo = 'a';
            break;
        case 'b':
            simbolo = 'b';
            break;
        default: simbolo = 'otro';
    }
    return simbolo;
};
function creaTabla(tablaTransiciones, cantidadSimbolos) {
    // Creando cada subArray para cargar los datos en la tabla
    for (let celdas = 0; celdas < cantidadSimbolos; celdas++) {
        tablaTransiciones.push([]);
    }
}
// ***** CARGA DE LA TABLA DE TRANSICIONES *****
function cargaTabla(tablaTransiciones, estado, simbolo) {
    tablaTransiciones[estado.q0][simbolo.a] = 1;
    tablaTransiciones[estado.q0][simbolo.b] = 1;
    tablaTransiciones[estado.q0][simbolo.otro] = 2;
    tablaTransiciones[estado.q1][simbolo.a] = 0;
    tablaTransiciones[estado.q1][simbolo.b] = 0;
    tablaTransiciones[estado.q1][simbolo.otro] = 2;
    tablaTransiciones[estado.q2][simbolo.a] = 2;
    tablaTransiciones[estado.q2][simbolo.b] = 2;
    tablaTransiciones[estado.q2][simbolo.otro] = 2;
}
function esValida(estadoInicial, estadosFinales, tablaTransiciones, simbolo, cadena) {
    let estadoActual = estadoInicial;
    // Toma un caracter y busca el estado siguiente en la tabla de transiciones.
    for (let caracter of cadena) {
        estadoActual = tablaTransiciones[estadoActual][simbolo[carAsimb(caracter)]]; // as any esta ya que carAsimb devuelve un string, y se accede al index del enum con una string
    }
    // estadoActual contendra el estado final al que llego el automata.
    return estadosFinales.includes(estadoActual);
}
function main() {
    let simbolo;
    (function (simbolo) {
        simbolo[simbolo["a"] = 0] = "a";
        simbolo[simbolo["b"] = 1] = "b";
        simbolo[simbolo["otro"] = 2] = "otro";
    })(simbolo || (simbolo = {}));
    let estado;
    (function (estado) {
        estado[estado["q0"] = 0] = "q0";
        estado[estado["q1"] = 1] = "q1";
        estado[estado["q2"] = 2] = "q2";
    })(estado || (estado = {}));
    // Definiendo estado inicial y finales.
    let estadoFinal = [estado.q0];
    let estadoInicial = estado.q0;
    let cantidadSimbolos = (Object.keys(simbolo).length / 2); // Porque es un enum numerico.
    let tablaTransiciones = [];
    creaTabla(tablaTransiciones, cantidadSimbolos);
    cargaTabla(tablaTransiciones, estado, simbolo);
    // Cargar la cadena a comprobar
    const cadena = 'ababbabb';
    const resultado = esValida(estadoInicial, estadoFinal, tablaTransiciones, simbolo, cadena);
    if (resultado) {
        console.log('CADENA VALIDA');
    }
    else {
        console.log('CADENA NO VALIDA');
    }
}
main();
