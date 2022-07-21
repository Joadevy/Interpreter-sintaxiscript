import { nodo, Arbol, simboloGramatical } from "./manejoArbol.js";
import { creaTAS,cargarTAS, variables, terminales } from "./TAS.js";
import { tablaSimbolos as TS} from "../Analizador Lexico/tablaSimbolos.js";
import { obtenerSiguienteCompLex } from "../Analizador Lexico/index.js"; 
import {elementoPila, crearPila, Apilar, Desapilar} from "./manejoPila.js"

// Testing con DENO
// @ts-ignore
// import { creaTAS,cargarTAS,variables, terminales } from "./TAS.ts";
// @ts-ignore
// import {elementoPila, crearPila, Apilar, Desapilar} from "./manejoPila.ts" 
// @ts-ignore
//  import { nodo, Arbol, simboloGramatical} from "./manejoArbol.ts";
// @ts-ignore
// import { tablaSimbolos as TS} from "../Analizador Lexico/tablaSimbolos.ts";
// @ts-ignore
// import { obtenerSiguienteCompLex } from "../Analizador Lexico/index.ts"; 


const arrayVariables = ['vPROGRAMA','vCUERPO','vSENTENCIAS','vSENTENCIA','vDECLARACION','vVARIABLES','vVARIABLE','vASIGNACION','vEXPARIT','vIZQARIT','vRAIZPOT','vPOT','vSUMARESTA','vMULTDIV','vOPERANDOS','vLECTURA','vESCRITURA','vSALIDAS','vSAUX','vSALIDA','vCONDICIONAL','vCONDICIONALFACT','vMIENTRAS','vCONDICION','vIZQCOND','vNEGACION','vCONJUNCION', 'vDISYUNCION']
  
const arrayTerminales = ['tPrograma' , 'tEscribir' , 'tVariables' , 'tLeer' , 'tWhile' , 'tIf' , 'tElse' , 'tAnd' , 'tOr' , 'tNot' , 
    'tId' , 'tCadena' , 'tConstReal' , 'tPuntoComa' , 'tComa' , 'tOpRel' , 'tOpAsignacion' , 'tMas' , 'tMenos' , 'tProducto' , 'tDivision' ,'tPotencia' , 'tRaiz' , 
    'tParentesisAbre' , 'tParentesisCierra' , 'tLlaveAbre' , 'tLlaveCierra' , 'tCorcheteAbre' , 'tCorcheteCierra']

function inicializarPila(pila:Array<elementoPila>,raiz:nodo):Array<elementoPila>{
    pila = crearPila();
    let simboloInicial:elementoPila = {
        simbolo: "vPROGRAMA",
        arbolPila:raiz
    }
    let finDeCadena: elementoPila = {
        simbolo:'pesos'
    }
    Apilar(pila,finDeCadena)
    Apilar(pila,simboloInicial)
    return pila
}

export function AnalizadorSintactico(codigoFuente:string , raiz:nodo){
    let exito:boolean = false;
    let control: number = 0;
    let lexema:string ='';
    let compLex: simboloGramatical; // tiene que ser de tipo simboloGramatical
    let TAS = creaTAS();
    let pila: Array<elementoPila> = crearPila();
    let tablaSimbolos = TS; // Igual a la que importamos (esto es para poder ir actualizandola)
    cargarTAS(TAS)
    const arbol = new Arbol(raiz)
    pila = inicializarPila(pila,raiz)
    let nodoCompLex = obtenerSiguienteCompLex(codigoFuente, control, tablaSimbolos);
    compLex = nodoCompLex[0]; // Guarda el compLex devuelto por el analizador lexico.
    lexema = nodoCompLex[2];// Guarda el lexema devuelto por el analizador lexico.
    tablaSimbolos = nodoCompLex[3];
    control = nodoCompLex[1]
    console.log(TAS[0][0])

    console.log('compLex encontrado: ' + compLex)
    console.log('lexema encontrado: ' + lexema)
    console.log('tabla de simbolos ' + JSON.stringify(tablaSimbolos))

    let y: elementoPila;
    let x:elementoPila;
    while(compLex !== 'errorLexico' && !exito){
        x = Desapilar(pila) as any // Obtengo un elemento de la pila de elementos a encontrar en el programa.

        if (arrayTerminales.includes(x.simbolo)){
            console.log(x.simbolo + ' es terminal')

            if (x.simbolo == compLex){
                if (x.arbolPila?.lexema){
                    x.arbolPila.lexema = lexema // Si es distinto de undefined, lo asigna (esta comprobacion es por ts)
                }
                // Llama de nuevo al analizador lexico para seguir el reconocimiento.
                nodoCompLex = obtenerSiguienteCompLex(codigoFuente, control, tablaSimbolos);
                compLex = nodoCompLex[0]
                tablaSimbolos = nodoCompLex[3];
                control = nodoCompLex[1]
                console.log('Se obtuvo el elemento: ' + compLex)
            }
        }

        else if (arrayVariables.includes(x.simbolo)){
        console.log(x.simbolo + ' es una variable');
        let posicion1 = variables[x.simbolo as any]
        console.log(posicion1)
        let posicion2 = terminales[compLex as any]
        console.log(posicion2)
        if (TAS[posicion1 as any][posicion2 as any] === undefined){
            console.log('TAS NO DEFINIDA PARA '+ x.simbolo + ' hacia ' + compLex)
            compLex = 'errorLexico';
        } else{
            let contador:number= 1;
            let cantidad : number= TAS[posicion1 as any][posicion2 as any].cantidad
            console.log(cantidad)
        }
    }
        exito = true;
    } 
}

const nodoPrueba = new nodo('tPrograma','Program',0,[]);
const arbol = new Arbol(nodoPrueba)
AnalizadorSintactico('Program{}',arbol)