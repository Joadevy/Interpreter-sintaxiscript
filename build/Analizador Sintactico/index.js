import { nodo, Arbol } from "./manejoArbol";
import { creaTAS, cargarTAS } from "./TAS";
import { crearPila, Apilar, Desapilar } from "./manejoPila";
import { variables, terminales } from "./TAS";
// Testing con DENO
// @ts-ignore
// import { creaTAS,cargarTAS } from "./TAS.ts";
// @ts-ignore
// import {elementoPila, crearPila, Apilar, Desapilar} from "./manejoPila.ts" 
// @ts-ignore
// import { nodo, Arbol } from "./manejoArbol.ts";
const arrayVariables = ['vPROGRAMA', 'vCUERPO', 'vSENTENCIAS', 'vSENTENCIA', 'vDECLARACION', 'vVARIABLES', 'vVARIABLE', 'vASIGNACION', 'vEXPARIT', 'vIZQARIT', 'vRAIZPOT', 'vPOT', 'vSUMARESTA', 'vMULTDIV', 'vOPERANDOS', 'vLECTURA', 'vESCRITURA', 'vSALIDAS', 'vSAUX', 'vSALIDA', 'vCONDICIONAL', 'vCONDICIONALFACT', 'vMIENTRAS', 'vCONDICION', 'vIZQCOND', 'vNEGACION', 'vCONJUNCION', 'vDISYUNCION'];
const arrayTerminales = ['tPrograma', 'tEscribir', 'tVariables', 'tLeer', 'tWhile', 'tIf', 'tElse', 'tAnd', 'tOr', 'tNot',
    'tId', 'tCadena', 'tConstReal', 'tPuntoComa', 'tComa', 'tOpRel', 'tOpAsignacion', 'tMas', 'tMenos', 'tProducto', 'tDivision', 'tPotencia', 'tRaiz',
    'tParentesisAbre', 'tParentesisCierra', 'tLlaveAbre', 'tLlaveCierra', 'tCorcheteAbre', 'tCorcheteCierra'];
function inicializarPila(pila, raiz) {
    pila = crearPila();
    let simboloInicial = {
        simbolo: "vPROGRAMA",
        arbolPila: raiz
    };
    let finDeCadena = {
        simbolo: 'pesos'
    };
    Apilar(pila, finDeCadena);
    Apilar(pila, simboloInicial);
    return pila;
}
export function AnalizadorSintactico(codigoFuente, raiz) {
    let exito = false;
    let control = 0;
    let lexema = '';
    let compLex = 'vPROGRAMA'; // tiene que ser de tipo simboloGramatical
    let TAS = creaTAS();
    let pila = crearPila();
    cargarTAS(TAS);
    //console.log(TAS[][])
    const arbol = new Arbol(raiz);
    pila = inicializarPila(pila, raiz);
    //let nodoCompLex = obtenerSiguienteCompLex(codigoFuente, control, lexema, tablaSimbolos,compLex);
    //compLex = nodoCompLex[0] // Guarda el compLex devuelto por el analizador lexico.
    //lexema = nodoCompLex[2] // Guarda el lexema devulto por el analizador lexico.
    console.log(Desapilar(pila));
    console.log(pila);
    let y;
    let x;
    while (compLex !== 'errorLexico' && !exito) {
        x = Desapilar(pila); // Obtengo un elemento de la pila de elementos a encontrar en el programa.
        if (arrayTerminales.includes(x.simbolo)) {
            console.log(x.simbolo + ' es terminal');
            if (x.simbolo == compLex) {
                // x.arbolPila.lexema = lexema
                // Llama de nuevo al analizador lexico para seguir el reconocimiento.
                //nodoCompLex = obtenerSiguienteCompLex(codigoFuente, control, lexema, tablaSimbolos,compLex);
                //compLex = nodoCompLex[0]
                console.log('Se obtuvo el elemento: ' + compLex);
            }
        }
        else if (arrayVariables.includes(x.simbolo)) {
            console.log(x.simbolo + ' es una variable');
            let posicion1 = variables[x.simbolo.toString()];
            let posicion2 = terminales[compLex.toString()];
            if (TAS[posicion1][terminales[posicion2]] === undefined) {
                console.log('TAS NO DEFINIDA PARA ' + x.simbolo + ' HACIA ' + compLex);
                compLex = 'errorLexico';
            }
            else {
                let contador = 1;
                let cantidad = TAS[posicion1][terminales[posicion2]].cantidad;
            }
        }
    }
}
const nodoPrueba = new nodo('tPrograma', 'Program', 0, []);
const arbol = new Arbol(nodoPrueba);
AnalizadorSintactico('test', arbol);
