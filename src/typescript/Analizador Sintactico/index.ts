import { nodo, Arbol, simboloGramatical } from "./manejoArbol";
import { creaTAS,cargarTAS } from "./TAS";
import { tablaSimbolos } from "../Analizador Lexico/tablaSimbolos";
import { obtenerSiguienteCompLex } from "../Analizador Lexico/index"; 
import {elementoPila, crearPila, Apilar, Desapilar} from "./manejoPila" 
import { variables, terminales } from "./TAS";

// Testing con DENO
// @ts-ignore
// import { creaTAS,cargarTAS } from "./TAS.ts";
// @ts-ignore
// import {elementoPila, crearPila, Apilar, Desapilar} from "./manejoPila.ts" 
// @ts-ignore
// import { nodo, Arbol } from "./manejoArbol.ts";

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
    let compLex: simboloGramatical = 'vPROGRAMA'; // tiene que ser de tipo simboloGramatical
    let TAS = creaTAS();
    let pila: Array<elementoPila> = crearPila();
    cargarTAS(TAS)
    //console.log(TAS[][])
    const arbol = new Arbol(raiz)
    pila = inicializarPila(pila,raiz)
    //let nodoCompLex = obtenerSiguienteCompLex(codigoFuente, control, lexema, tablaSimbolos,compLex);
    //compLex = nodoCompLex[0] // Guarda el compLex devuelto por el analizador lexico.
    //lexema = nodoCompLex[2] // Guarda el lexema devulto por el analizador lexico.
    console.log(Desapilar(pila))
    console.log(pila)

    let y: elementoPila;
    let x:elementoPila;
    while(compLex !== 'errorLexico' && !exito){
        x = Desapilar(pila) as any // Obtengo un elemento de la pila de elementos a encontrar en el programa.

        if (arrayTerminales.includes(x.simbolo)){
            console.log(x.simbolo + ' es terminal')

            if (x.simbolo == compLex){
                // x.arbolPila.lexema = lexema
                // Llama de nuevo al analizador lexico para seguir el reconocimiento.
                //nodoCompLex = obtenerSiguienteCompLex(codigoFuente, control, lexema, tablaSimbolos,compLex);
                //compLex = nodoCompLex[0]
                console.log('Se obtuvo el elemento: ' + compLex)
            }
        }

        else if (arrayVariables.includes(x.simbolo)){
            console.log(x.simbolo + ' es una variable');
            let posicion1 = variables[x.simbolo.toString() as any]
            let posicion2 = terminales[compLex.toString() as any]
            if (TAS[posicion1 as any][terminales[posicion2 as any]] === undefined){
                console.log('TAS NO DEFINIDA PARA '+ x.simbolo + ' HACIA ' + compLex)
                compLex = 'errorLexico';
            } else{
                let contador:number= 1;
                let cantidad : number= TAS[posicion1 as any][terminales[posicion2 as any]].cantidad
            }
        }
    }
}

const nodoPrueba = new nodo('tPrograma','Program',0,[]);
const arbol = new Arbol(nodoPrueba)
AnalizadorSintactico('test',arbol)