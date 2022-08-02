import { nodo, Arbol, simboloGramatical } from "./manejoArbol.js";
import { creaTAS,cargarTAS, variables, terminales } from "./TAS.js";
import { tablaSimbolos as TS} from "../Analizador Lexico/tablaSimbolos.js";
import { obtenerSiguienteCompLex } from "../Analizador Lexico/index.js"; 
import {elementoPila, crearPila, Apilar, Desapilar} from "./manejoPila.js"
import { evaluarPrograma } from "../Analizador Semantico/index.js";

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
// @ts-ignore
// import { evaluarPrograma } from "../Analizador Semantico/index.ts"; 


const arrayVariables = ['vPROGRAMA','vCUERPO','vSENTENCIAS','vSENTENCIA','vDECLARACION','vVARIABLES','vVARIABLE','vASIGNACION','vEXPARIT','vIZQARIT','vRAIZPOT','vPOT','vSUMARESTA','vMULTDIV','vOPERANDOS','vLECTURA','vESCRITURA','vSALIDAS','vSAUX','vSALIDA','vCONDICIONAL','vCONDICIONALFACT','vMIENTRAS','vCONDICION','vIZQCOND','vNEGACION','vCONJUNCION', 'vDISYUNCION']
  
const arrayTerminales = ['tPrograma' , 'tEscribir' , 'tVariables' , 'tLeer' , 'tWhile' , 'tIf' , 'tElse' , 'tAnd' , 'tOr' , 'tNot' , 
    'tId' , 'tCadena' , 'tConstReal' , 'tPuntoComa' , 'tComa' , 'tOpRel' , 'tOpAsignacion' , 'tSuma' , 'tResta' , 'tProducto' , 'tDivision' ,'tPotencia' , 'tRaiz' , 
    'tParentesisAbre' , 'tParentesisCierra' , 'tLlaveAbre' , 'tLlaveCierra' , 'tCorcheteAbre' , 'tCorcheteCierra','tPunto']

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

export function analisisSintactico(codigoFuente:string , raiz:Arbol):void{
    let exito:boolean = false;
    let errorLog:string = '';
    let control: number = 0;
    let lexema:string ='';
    let compLex: simboloGramatical;
    let TAS = creaTAS();
    let pila: Array<elementoPila> = crearPila();
    let tablaSimbolos = TS; // Igual a la que importamos (esto es para poder ir actualizandola)
    cargarTAS(TAS)
    pila = inicializarPila(pila,raiz)
    let nodoCompLex = obtenerSiguienteCompLex(codigoFuente, control, tablaSimbolos);
    compLex = nodoCompLex[0]; // Guarda el compLex devuelto por el analizador lexico.
    lexema = nodoCompLex[2];// Guarda el lexema devuelto por el analizador lexico.
    tablaSimbolos = nodoCompLex[3];
    control = nodoCompLex[1]

    let x: elementoPila;
    while(compLex !== 'errorLexico' && !exito){
        x = Desapilar(pila) as any // Obtengo un elemento de la pila de elementos a encontrar en el programa.
        
        if (arrayTerminales.includes(x.simbolo)){
            if (x.simbolo == compLex){
                if (x.arbolPila){
                    x.arbolPila.lexema = lexema // Si es distinto de undefined, lo asigna (esta comprobacion es por ts)
                }
                // Llama de nuevo al analizador lexico para seguir el reconocimiento.
                nodoCompLex = obtenerSiguienteCompLex(codigoFuente, control, tablaSimbolos);
                compLex = nodoCompLex[0]
                if (nodoCompLex[3]){ // Para evitar que pueda asignar undefined en caso que no se devuelva la tablaSimbolos.
                    tablaSimbolos = nodoCompLex[3];
                }
                lexema = nodoCompLex[2];
                control = nodoCompLex[1]
            } else {
                errorLog = ' se esperaba ' + x.simbolo + ' y se encontro ' + compLex;
                compLex = 'errorLexico'; // No es un error lexico pero sirve para cortar el while.
            }
        }

        else if (arrayVariables.includes(x.simbolo)){
        let posicion1 = variables[x.simbolo as any]
        let posicion2 = terminales[compLex as any]
            if (TAS[posicion1 as any][posicion2 as any] === undefined){
                errorLog = '<< TAS no definida para '+ x.simbolo + ' hacia ' + compLex + ' >>';
                compLex = 'errorLexico'; // No es un error lexico pero sirve para cortar el while.
            } else{
                let contador:number= 0;
                let cantidad : number= TAS[posicion1 as any][posicion2 as any].cantidad-1

                while (contador <= cantidad){ // Mientras el contador sea menor que la cantidad de elementos en la part derecha de la CFG
                    let compL : simboloGramatical = TAS[posicion1 as any][posicion2 as any].elementos[contador]; // Guardo el elemento del array que contiene todos los elementos d la parte derecha.
                    let hijo = new nodo(compL,'',0,[]);
                    x.arbolPila?.insertarHijo(hijo);
                    contador++
                }

                while(cantidad>=0){
                    if (x.arbolPila?.hijos[cantidad].simbolo){
                        let y: elementoPila = {
                            simbolo : x.arbolPila?.hijos[cantidad].simbolo,
                            arbolPila : x.arbolPila?.hijos[cantidad],
                        };
                        Apilar(pila,y);
                    }
                    cantidad--
                }
            }
        }
        if (x.simbolo == compLex && compLex == 'pesos'){
            exito = true;
        }
    } 
    if (exito){
        mostrarInfoSintactico([true],raiz)
        evaluarPrograma(raiz);
    } else {
        console.log('******  Hay un error sintactico ******')
        mostrarInfoSintactico([false,errorLog],raiz)
    }
}

export async function analizadorSintactico (archivo:File){
    // codigoFuente va a guardar toda la cadena, es decir, todo el codigo del programa.
    //.trim() para remover espacios en blanco al nodoCompLex y al final del archivo.
    let codigoFuente:string = (await archivo.text()).trim();
    const raiz = new nodo('vPROGRAMA','',0,[]);
    const arbol = new Arbol(raiz);
    analisisSintactico(codigoFuente,arbol);
}

function mostrarInfoSintactico(resultado:Array<any>, raiz:Arbol){
    let output = document.getElementById('output');

    if (resultado[0]){ // En caso de que haya resultado en exito el analizador sintactico.
        const text = document.createElement('p');
        const arbolSintactico = document.createElement('div');
        arbolSintactico.classList.add('arbolSintactico');
        text.classList.add('output-text');
        text.innerHTML = `» No hay errores semanticos. Acceda a la consola (F12 en el teclado) para ver el resultado del programa.<br>
        » No hay errores sintacticos, se ha generado el arbol sintactico: <br><br>`;
        if (output){
            output.appendChild(text);
            output.appendChild(arbolSintactico);                    
            output.classList.add('output-show');
            raiz.mostrarArbol(raiz,''); // Muestra el arbol en la web (con "-")
        }
    } else {
        if(output){
            let text = document.createElement('p');
            text.classList.add('output-text');
            text.innerHTML = `Ocurrio un <span class="error">error sintactico.</span> Log: <span class="complex">${resultado[1]}</span>`
            output.appendChild(text);
            output.classList.add('output-show');
        }
    }
}