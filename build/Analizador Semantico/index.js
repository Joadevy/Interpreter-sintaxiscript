const language = (localStorage.getItem('language') || 'es');
function agregarVariable(estado, dato) {
    estado.push(dato);
}
function leerValor(estado, variable) {
    for (let elemento in estado) {
        if (estado[elemento].variable == variable) {
            return estado[elemento].valor;
        }
    }
    const log = language == 'en' ?
        "-- the variable " + variable + " was not found, it has not been declared --" :
        "-- no se encontro la variable " + variable + ", no ha sido declarada --";
    mostrarInfoSemantico(log);
}
function asignarValor(estado, variable, valorAsignar) {
    let flag = false;
    for (let elemento in estado) {
        if (estado[elemento].variable == variable) {
            estado[elemento].valor = valorAsignar;
            flag = true;
        }
    }
    if (!flag) {
        const log = language == 'en' ?
            "-- the variable " + variable + " was not found, it has not been declared --" :
            "-- no se encontro la variable " + variable + ", no ha sido declarada --";
        mostrarInfoSemantico(log);
    }
}
// *** EVALUADORES ***
// PROGRAMA → program id {CUERPO}
export function evaluarPrograma(arbol) {
    let Estado = []; // Inicializa el estado del programa a un Array vacio.
    evaluarCUERPO(arbol.hijos[3], Estado);
}
// CUERPO → SENTENCIA SENTENCIAS
function evaluarCUERPO(arbol, estado) {
    evaluarSENTENCIA(arbol.hijos[0], estado);
    evaluarSENTENCIAS(arbol.hijos[1], estado);
}
// SENTENCIAS → ;CUERPO | epsilon 
function evaluarSENTENCIAS(arbol, estado) {
    if (arbol.cantHijos !== 0) {
        if (arbol.hijos[0].simbolo == "tPuntoComa") {
            evaluarCUERPO(arbol.hijos[1], estado);
        }
    }
}
// SENTENCIA → DECLARACION | ASIGNACION | LECTURA | ESCRITURA | CONDICIONAL | MIENTRAS
function evaluarSENTENCIA(arbol, estado) {
    if (arbol.hijos[0].simbolo == "vDECLARACION") {
        evaluarDECLARACION(arbol.hijos[0], estado);
    }
    else if (arbol.hijos[0].simbolo == "vASIGNACION") {
        evaluarASIGNACION(arbol.hijos[0], estado);
    }
    else if (arbol.hijos[0].simbolo == "vLECTURA") {
        evaluarLECTURA(arbol.hijos[0], estado);
    }
    else if (arbol.hijos[0].simbolo == "vESCRITURA") {
        evaluarESCRITURA(arbol.hijos[0], estado);
    }
    else if (arbol.hijos[0].simbolo == "vCONDICIONAL") {
        evaluarCONDICIONAL(arbol.hijos[0], estado);
    }
    else if (arbol.hijos[0].simbolo == "vMIENTRAS") {
        evaluarMIENTRAS(arbol.hijos[0], estado);
    }
}
// DECLARACION → var VARIABLES 
function evaluarDECLARACION(arbol, estado) {
    evaluarVARIABLES(arbol.hijos[1], estado);
}
// VARIABLES → id VARIABLE
function evaluarVARIABLES(arbol, estado) {
    agregarVariable(estado, { variable: arbol.hijos[0].lexema, valor: 0 }); // Guarda en la lista el id (y lo inicializa en 0)
    evaluarVARIABLE(arbol.hijos[1], estado);
}
// VARIABLE → ,VARIABLES | epsilon
function evaluarVARIABLE(arbol, estado) {
    if (arbol.cantHijos !== 0) {
        evaluarVARIABLES(arbol.hijos[1], estado);
    }
}
// ASIGNACION → id opAsignacion EXPARIT  <<<<<<<<<<<<< 
function evaluarASIGNACION(arbol, estado) {
    let valorAsignar = [];
    evaluarEXPARIT(arbol.hijos[2], estado, valorAsignar);
    asignarValor(estado, arbol.hijos[0].lexema, valorAsignar[0]);
}
// LECTURA → Read (cadena, id)
function evaluarLECTURA(arbol, estado) {
    // @ts-ignore
    let valorLeido = parseFloat(prompt(arbol.hijos[2].lexema, ''));
    asignarValor(estado, arbol.hijos[4].lexema, valorLeido);
}
// ESCRITURA → Print (SALIDAS)
function evaluarESCRITURA(arbol, estado) {
    evaluarSALIDAS(arbol.hijos[2], estado);
}
// SALIDAS → SALIDA SAUX
function evaluarSALIDAS(arbol, estado) {
    let salida = evaluarSALIDA(arbol.hijos[0], estado);
    mostrarSalida(salida); // Funcion que maneja el DOM para mostrar las salidas en el navegador.
    evaluarSAUX(arbol.hijos[1], estado);
}
// SAUX → ,SALIDAS | epsilon
function evaluarSAUX(arbol, estado) {
    if (arbol.cantHijos !== 0) {
        evaluarSALIDAS(arbol.hijos[1], estado);
    }
}
// SALIDA → EXPARIT | cadena
function evaluarSALIDA(arbol, estado) {
    let terminal = [];
    if (arbol.hijos[0].simbolo == "vEXPARIT") {
        evaluarEXPARIT(arbol.hijos[0], estado, terminal);
    }
    else if (arbol.hijos[0].simbolo == "tCadena") {
        terminal[0] = arbol.hijos[0].lexema;
    }
    return terminal[0];
}
// CONDICIONAL → if [CONDICION] {CUERPO} CONDICIONALFACT
function evaluarCONDICIONAL(arbol, estado) {
    let resultado = [];
    evaluarCONDICION(arbol.hijos[2], estado, resultado);
    if (resultado[0]) {
        evaluarCUERPO(arbol.hijos[5], estado);
    }
    else {
        evaluarCONDICIONALFACT(arbol.hijos[7], estado);
    }
}
// CONDICIONALFACT → else {CUERPO} | epsilon
function evaluarCONDICIONALFACT(arbol, estado) {
    if (arbol.cantHijos !== 0) { // Este checkeo no deberia ser necesario por como esta planteado evalCONDICIONAL
        evaluarCUERPO(arbol.hijos[2], estado);
    }
}
// MIENTRAS → while [CONDICION] {CUERPO}
function evaluarMIENTRAS(arbol, estado) {
    let resultadoCond = [];
    evaluarCONDICION(arbol.hijos[2], estado, resultadoCond);
    while (resultadoCond[0]) {
        evaluarCUERPO(arbol.hijos[5], estado);
        evaluarCONDICION(arbol.hijos[2], estado, resultadoCond);
    }
    // El array va por referencia entonces puede escribirlo.
}
// CONDICION → IZQCOND DISYUNCION
function evaluarCONDICION(arbol, estado, resultado) {
    let operando1 = [];
    evaluarIZQCOND(arbol.hijos[0], estado, operando1);
    evaluarDISYUNCION(arbol.hijos[1], estado, operando1, resultado);
}
// IZQCOND → NEGACION CONJUNCION
function evaluarIZQCOND(arbol, estado, resultado) {
    let temp = [];
    evaluarNEGACION(arbol.hijos[0], estado, temp);
    evaluarCONJUNCION(arbol.hijos[1], estado, temp, resultado);
}
// NEGACION → not NEGACION | EXPARIT opRel EXPARIT |  [CONDICION]
function evaluarNEGACION(arbol, estado, resultado) {
    let operador;
    let operando1 = [];
    let operando2 = [];
    if (arbol.hijos[0].simbolo == "tNot") {
        evaluarNEGACION(arbol.hijos[1], estado, resultado);
        resultado[0] = !resultado[0];
    }
    else if (arbol.hijos[0].simbolo == "vEXPARIT") {
        evaluarEXPARIT(arbol.hijos[0], estado, operando1);
        operador = arbol.hijos[1].lexema;
        evaluarEXPARIT(arbol.hijos[2], estado, operando2);
        switch (operador) {
            case "==":
                resultado[0] = operando1[0] == operando2[0];
                break;
            case ">=":
                resultado[0] = operando1[0] >= operando2[0];
                break;
            case "<=":
                resultado[0] = operando1[0] <= operando2[0];
                break;
            case ">":
                resultado[0] = operando1[0] > operando2[0];
                break;
            case "<":
                resultado[0] = operando1[0] < operando2[0];
                break;
            case "<>":
                resultado[0] = operando1[0] != operando2[0];
                break;
        }
    }
    else if (arbol.hijos[0].simbolo == "tCorcheteAbre") {
        evaluarCONDICION(arbol.hijos[1], estado, resultado);
    }
}
// CONJUNCION → and NEGACION CONJUNCION | epsilon
function evaluarCONJUNCION(arbol, estado, operando1, resultado) {
    if (arbol.cantHijos !== 0) { // puede no haber un and.
        let resultadoNegacion = [];
        evaluarNEGACION(arbol.hijos[1], estado, resultadoNegacion);
        operando1[0] = operando1[0] && resultadoNegacion[0];
        evaluarCONJUNCION(arbol.hijos[2], estado, operando1, resultado);
    }
    else {
        resultado[0] = operando1[0];
    }
}
// DISYUNCION → or IZQCOND DISYUNCION | epsilon
function evaluarDISYUNCION(arbol, estado, operando1, resultado) {
    let resultadoIZQCOND = [];
    if (arbol.cantHijos == 0) { // puede no haber un or
        resultado[0] = operando1[0];
    }
    else {
        evaluarIZQCOND(arbol.hijos[1], estado, resultadoIZQCOND);
        operando1[0] = operando1[0] || resultadoIZQCOND[0];
        evaluarDISYUNCION(arbol.hijos[2], estado, operando1, resultado);
    }
}
//EXPARIT -> IZQARIT SUMARESTA
function evaluarEXPARIT(arbol, estado, resultado) {
    let resultadoIZQARIT = []; // Tiene que contener el valor de la parte izquierda de la op aritmetica.
    let resultadoSUMARESTA = []; // Contiene el resultado total de la op aritmetica.
    evaluarIZQARIT(arbol.hijos[0], estado, resultadoIZQARIT);
    evaluarSUMARESTA(arbol.hijos[1], estado, resultadoIZQARIT, resultadoSUMARESTA); // Le pasa el resultado de la izq y derecha vacio para que opere.
    resultado[0] = resultadoSUMARESTA[0];
}
// IZQARIT → RAIZPOT MULTDIV
function evaluarIZQARIT(arbol, estado, resultado) {
    let resultadoRAIZPOT = [];
    evaluarRAIZPOT(arbol.hijos[0], estado, resultadoRAIZPOT);
    evaluarMULTDIV(arbol.hijos[1], estado, resultadoRAIZPOT, resultado);
}
// RAIZPOT → opRaiz (EXPARIT) POT | OPERANDOS POT
function evaluarRAIZPOT(arbol, estado, resultado) {
    let resultadoOPARIT = [];
    let base = [];
    if (arbol.hijos[0].simbolo == "tRaiz") {
        evaluarEXPARIT(arbol.hijos[2], estado, resultadoOPARIT);
        resultadoOPARIT[0] = Math.round(resultadoOPARIT[0]);
        base[0] = Math.sqrt(resultadoOPARIT[0]);
        evaluarPOT(arbol.hijos[4], estado, base, resultado);
    }
    else if (arbol.hijos[0].simbolo == "vOPERANDOS") {
        evaluarOPERANDOS(arbol.hijos[0], estado, base);
        evaluarPOT(arbol.hijos[1], estado, base, resultado);
    }
}
// POT → ^ OPERANDOS | epsilon
function evaluarPOT(arbol, estado, base, resultado) {
    let exponente = [];
    if (arbol.cantHijos == 0) {
        resultado[0] = base[0];
    }
    else {
        evaluarOPERANDOS(arbol.hijos[1], estado, exponente);
        exponente[0] = Math.round(exponente[0]);
        resultado[0] = Math.pow(base[0], exponente[0]);
    }
}
// SUMARESTA → + OPERANDOS SUMARESTA |  - OPERANDOS SUMARESTA | epsilon
function evaluarSUMARESTA(arbol, estado, operandoIZQ, resultado) {
    let temp = [];
    let operandoDER = [];
    if (arbol.cantHijos == 0) {
        resultado[0] = operandoIZQ[0];
    }
    else if (arbol.hijos[0].simbolo == "tSuma") {
        evaluarOPERANDOS(arbol.hijos[1], estado, operandoDER);
        temp[0] = operandoIZQ[0] + operandoDER[0];
        evaluarSUMARESTA(arbol.hijos[2], estado, temp, resultado);
    }
    else if (arbol.hijos[0].simbolo == "tResta") {
        evaluarOPERANDOS(arbol.hijos[1], estado, operandoDER);
        temp[0] = operandoIZQ[0] - operandoDER[0];
        evaluarSUMARESTA(arbol.hijos[2], estado, temp, resultado);
    }
}
// MULTDIV → * OPERANDOS MULTDIV |  / OPERANDOS MULTDIV | epsilon
function evaluarMULTDIV(arbol, estado, operandoIZQ, resultado) {
    let temp = [];
    let operandoDER = [];
    if (arbol.cantHijos == 0) {
        resultado[0] = operandoIZQ[0];
    }
    else if (arbol.hijos[0].simbolo == "tProducto") {
        evaluarOPERANDOS(arbol.hijos[1], estado, operandoDER);
        temp[0] = operandoIZQ[0] * operandoDER[0];
        evaluarMULTDIV(arbol.hijos[2], estado, temp, resultado);
    }
    else if (arbol.hijos[0].simbolo == "tDivision") {
        evaluarOPERANDOS(arbol.hijos[1], estado, operandoDER);
        temp[0] = operandoIZQ[0] / operandoDER[0];
        evaluarMULTDIV(arbol.hijos[2], estado, temp, resultado);
    }
}
// OPERANDOS → -OPERANDOS | constReal | id  | (EXPARIT)
function evaluarOPERANDOS(arbol, estado, resultado) {
    if (arbol.hijos[0].simbolo == "tConstReal") {
        resultado[0] = parseFloat(arbol.hijos[0].lexema); // es una string lo que guarda, hay que convertir a numero flotante.
    }
    else if (arbol.hijos[0].simbolo == "tParentesisAbre") {
        evaluarEXPARIT(arbol.hijos[1], estado, resultado);
    }
    else if (arbol.hijos[0].simbolo == "tResta") {
        evaluarOPERANDOS(arbol.hijos[1], estado, resultado);
        resultado[0] = -resultado[0];
    }
    else if (arbol.hijos[0].simbolo == "tId") { // HAY QUE VERIFICAR QUE ESTE DECLARADO
        if (arbol.hijos[0].cantHijos == 0) {
            resultado[0] = leerValor(estado, arbol.hijos[0].lexema);
        }
    }
}
function mostrarSalida(salida) {
    var _a;
    let output = document.getElementById('output');
    let regex = /[^"]/gi;
    // Si no esta el contenedor (nunca esta si es la primera vez que pasa por esta funcion) lo crea.
    if (!output) {
        const main = document.getElementById('main');
        const templateOutput = document.getElementById('template-output');
        // @ts-ignore
        const outputContainer = templateOutput.content.cloneNode(true);
        // @ts-ignore
        main.appendChild(outputContainer);
        output = document.getElementById('output'); // Asigno ya que sino output esta vacio porque no capturo nada.
    }
    // agrega la salida correspondiente en el contenedor.
    const text = document.createElement('p');
    text.classList.add('output-text');
    salida = salida.toString().match(regex).join(''); // Le quita las " " a las cadenas asi no se muestran como salida.
    text.textContent = salida;
    if (output && !((_a = output.firstElementChild) === null || _a === void 0 ? void 0 : _a.classList.contains("wrong"))) {
        output.appendChild(text);
        output.classList.add('output-show');
    }
}
function mostrarInfoSemantico(errorLog) {
    let output = document.getElementById('output');
    // Si no esta el contenedor (nunca esta si es la primera vez que pasa por esta funcion) lo crea.
    if (!output) { // Este bloque podria (deberia) ser una funcion aparte porque esta duplicado.
        const main = document.getElementById('main');
        const templateOutput = document.getElementById('template-output');
        // @ts-ignore
        const outputContainer = templateOutput.content.cloneNode(true);
        // @ts-ignore
        main.appendChild(outputContainer);
        output = document.getElementById('output'); // Asigno ya que sino output esta vacio porque no capturo nada.
    }
    if (output) {
        output.textContent = '';
        let text = document.createElement('p');
        text.classList.add('output-text');
        text.classList.add('wrong');
        language == 'en' ?
            text.innerHTML = `A <span class="error">semantic error</span> occurred. Log: <span class="complex">${errorLog}</span>` :
            text.innerHTML = `Ocurrio un <span class="error">error semantico</span>. Log: <span class="complex">${errorLog}</span>`;
        output.appendChild(text);
        output.classList.add('output-show');
    }
}
