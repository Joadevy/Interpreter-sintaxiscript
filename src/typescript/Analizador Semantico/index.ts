import { nodo, Arbol, simboloGramatical } from "../Analizador Sintactico/manejoArbol.js";

// @ts-ignore
//  import { nodo, Arbol, simboloGramatical} from "../Analizador Sintactico/manejoArbol.ts";

type dato = {
    variable:string;
    valor: number;
}

let Estado: Array<dato> = [];

function mostrarEstado (estado:Array<dato>):void{
    for (let elemento of estado){
        console.log('Variable: ' + elemento.variable);
        console.log('Valor: ' + elemento.valor);
    }
}

function agregarVariable(estado:Array<dato>,dato:dato):void{
    estado.push(dato);
}

function leerValor(estado:Array<dato>,variable:string):any{
    for (let elemento of estado){
        if (elemento.variable == variable){
            return elemento.valor
        }
    }
}

function asignarValor(estado:Array<dato>,variable:string,valorAsignar:number):void{
    for (let elemento of estado){
        if (elemento.variable = variable){
            elemento.valor = valorAsignar
        }
    }
}

// *** EVALUADORES ***

// PROGRAMA → program id {CUERPO}
function evaluarPrograma(arbol:Arbol,estado:Array<dato>){
    evaluarCUERPO(arbol.hijos[3],estado);
}

// CUERPO → SENTENCIA SENTENCIAS
function evaluarCUERPO(arbol:nodo,estado:Array<dato>){
    evaluarSENTENCIA(arbol.hijos[0],estado);
    evaluarSENTENCIAS(arbol.hijos[1],estado);
}

// SENTENCIAS → ;CUERPO | epsilon 
function evaluarSENTENCIAS(arbol:nodo,estado:Array<dato>){
    if (arbol.cantHijos!==0){
        if(arbol.hijos[0].simbolo == "tPuntoComa"){
            evaluarCUERPO(arbol.hijos[1],estado);
        }
    }
}

// SENTENCIA → DECLARACION | ASIGNACION | LECTURA | ESCRITURA | CONDICIONAL | MIENTRAS
function evaluarSENTENCIA(arbol:nodo,estado:Array<dato>){
        if (arbol.hijos[0].simbolo == "vDECLARACION") {
            evaluarDECLARACION(arbol.hijos[0],estado);
        }else if (arbol.hijos[0].simbolo == "vASIGNACION"){
            evaluarASIGNACION(arbol.hijos[0],estado);
        } else if (arbol.hijos[0].simbolo == "vLECTURA"){
            evaluarLECTURA(arbol.hijos[0],estado);
        } else if (arbol.hijos[0].simbolo == "vESCRITURA"){
            evaluarESCRITURA(arbol.hijos[0],estado);       
        } else if (arbol.hijos[0].simbolo == "vCONDICIONAL"){
            evaluarCONDICIONAL(arbol.hijos[0],estado);      
        } else if (arbol.hijos[0].simbolo == "vMIENTRAS"){
            evaluarMIENTRAS(arbol.hijos[0],estado);        
        } 
}

// DECLARACION → var VARIABLES 
function evaluarDECLARACION(arbol:nodo,estado:Array<dato>){
    evaluarVARIABLES(arbol.hijos[1],estado);
}

// VARIABLES → id VARIABLE
function evaluarVARIABLES(arbol:nodo,estado:Array<dato>){
    agregarVariable(estado,{variable:arbol.hijos[0].lexema,valor:0}) // Guarda en la lista el id (y lo inicializa en 0)
    evaluarVARIABLE(arbol.hijos[1],estado);
}

// VARIABLE → ,VARIABLES | epsilon
function evaluarVARIABLE(arbol:nodo,estado:Array<dato>){
    if(arbol.cantHijos !== 0){
        evaluarVARIABLES(arbol.hijos[1],estado);
    }
}

// ASIGNACION → id opAsignacion EXPARIT  <<<<<<<<<<<<< 
function evaluarASIGNACION(arbol:nodo,estado:Array<dato>){
    // let resultado:number = evaluarEXPARIT(arbol.hijos[2],estado); // ASINCRONISMO? debe hacer await del resultado?
    //asignarValor(estado,arbol.hijos[0].lexema,resultado)
}

// LECTURA → Read (cadena, id)
function evaluarLECTURA(arbol:nodo,estado:Array<dato>){
    // @ts-ignore
    let valorLeido:number = parseInt(prompt(arbol.hijos[2],'')); // Ojo con parseInt (parsea a entero? - revisar)
    asignarValor(estado,arbol.hijos[4].lexema,valorLeido)
}

// ESCRITURA → Print (SALIDAS)
function evaluarESCRITURA(arbol:nodo,estado:Array<dato>){
    evaluarSALIDAS(arbol.hijos[2],estado);
}

// SALIDAS → SALIDA SAUX
function evaluarSALIDAS(arbol:nodo,estado:Array<dato>){
    let salida = evaluarSALIDA(arbol.hijos[0],estado);
    console.log(salida); // Se mostrarian los outputs en consola (deberia poderse en el DOM)
    evaluarSAUX(arbol.hijos[1],estado);
}

// SAUX → ,SALIDAS | epsilon
function evaluarSAUX(arbol:nodo,estado:Array<dato>){
    if (arbol.cantHijos !== 0){
        evaluarSALIDAS(arbol.hijos[0],estado);
    }
}

// SALIDA → EXPARIT | cadena
function evaluarSALIDA(arbol:nodo,estado:Array<dato>):string|number{
    let terminal:string|number = ''; // Esta inicializacion como cadena no deberia pero creo no afecta.
    if (arbol.hijos[0].simbolo == "vEXPARIT"){
        // terminal = evaluarEXPARIT(arbol.hijos[0],estado);
    } else if (arbol.hijos[0].simbolo == "tCadena"){
        terminal = arbol.hijos[0].lexema;
    }
    return terminal
}

// CONDICIONAL → if [CONDICION] {CUERPO} CONDICIONALFACT
function evaluarCONDICIONAL(arbol:nodo, estado:Array<dato>){
    let resultadoCondicion = evaluarCONDICION(arbol.hijos[2],estado);
    if (resultadoCondicion){
        evaluarCUERPO(arbol.hijos[5],estado);
    } else {
        evaluarCONDICIONALFACT(arbol.hijos[7],estado);
    }
}

// CONDICIONALFACT → else {CUERPO} | epsilon
function evaluarCONDICIONALFACT(arbol:nodo,estado:Array<dato>){
    if (arbol.cantHijos !== 0){ // Este checkeo no deberia ser necesario por como esta planteado evalCONDICIONAL
        evaluarCUERPO(arbol.hijos[0],estado);
    }
}

// MIENTRAS → while [CONDICION] {CUERPO}
function evaluarMIENTRAS(arbol:nodo,estado:Array<dato>){
    //let resultadoCond: Array<boolean>;
    //evaluarCONDICION(arbol.hijos[2],estado,resultadoCond);
    // while (resultadoCond){
        // evaluarCUERPO(arbol.hijos[5],estado);
        // evaluarCONDICION(arbol.hijos[2],estado,resultadoCond);
    // }
        // El arrray va por referencia entonces puede escribirlo.

    let resultadoCondicion:boolean= evaluarCONDICION(arbol.hijos[2],estado);
    while (resultadoCondicion){
        evaluarCUERPO(arbol.hijos[5],estado);
        resultadoCondicion = evaluarCONDICION(arbol.hijos[2],estado);
    }
}

// CONDICION → IZQCOND DISYUNCION
function evaluarCONDICION(arbol:nodo,estado:Array<dato>,resultado:Array<boolean>):boolean{
    console.log('TEST')
    let operando1:boolean;
    // operando1 = evaluarIZQCOND(arbol.hijos[0],estado,0);
    // evaluarDISYUNCION(arbol.hijos[1],estado,operando1,resultado);
    return true                      // --- ELIMINAR ESTO ----
}

// IZQCOND → NEGACION CONJUNCION
function evaluarIZQCOND(arbol:nodo,estado:Array<dato>,resultado?:Array<boolean>){
    let temp:Array<boolean> = [];
    evaluarNEGACION(arbol,estado,temp);
    //evaluarCONJUNCION(arbol,estado,temp,resultado)
}

// NEGACION → not NEGACION | EXPARIT opRel EXPARIT |  [CONDICION]
function evaluarNEGACION(arbol:nodo,estado:Array<dato>,resultado:Array<boolean>){
    let operador:string;
    let operando1:Array<number> = [];
    let operando2:Array<number> = [];
    if (arbol.hijos[0].simbolo == "tNot"){
        evaluarNEGACION(arbol.hijos[1],estado,resultado);
        resultado[0] = !resultado[0];
    } else if(arbol.hijos[0].simbolo = "vEXPARIT"){
        //evaluarEXPARIT(arbol.hijos[0],estados,operando1);
        operador = arbol.hijos[1].lexema;
        //evaluarEXPARIT(arbol.hijos[2],estados,operando2);
        switch(operador){
            case "==":
                resultado[0] = operando1 == operando2;
            break;
            case ">=":
                resultado[0] = operando1 >= operando2;
            break;
            case "<=":
                resultado[0] = operando1 <= operando2;
            break;
            case ">":
                resultado[0] = operando1 > operando2;
            break;
            case "<":
                resultado[0] = operando1 < operando2;
            break;
            case "<>":
                resultado[0] = operando1 != operando2;
            break;
        }
    } else if(arbol.hijos[0].simbolo == "tCorcheteAbre"){
        evaluarCONDICION(arbol.hijos[1],estado,resultado)
    }
} 

// CONJUNCION → and NEGACION CONJUNCION | epsilon
function evaluarCONJUNCION(arbol:nodo,estado:Array<dato>,operando1:Array<boolean>,resultado:Array<boolean>){
    if (arbol.cantHijos!== 0){ // puede no haber un or.
        let resultadoNegacion:Array<boolean> = [];
        evaluarNEGACION(arbol.hijos[1],estado,resultadoNegacion)
        operando1[0] = operando1[0] && resultadoNegacion[0];
        evaluarCONJUNCION(arbol.hijos[2],estado,operando1,resultado)
        /* 
            ASI ESTABA ANTES (SIN REFERENCIA)
        let resultadoNEGACION:boolean = evaluarNEGACION(arbol.hijos[1],estado);
        operando1 = operando1 && resultadoNEGACION;
        evaluarCONJUNCION(arbol.hijos[3],estado,operando1) */
    } else {
        resultado[0] = operando1[0];
    }
   // return operando1 // usando recursividad para devolver el valor final obtenido
}

// DISYUNCION → or IZQCOND DISYUNCION | epsilon
function evaluarDISYUNCION(arbol:nodo,estado:Array<dato>,operando1:boolean):boolean{
    if (arbol.cantHijos!== 0){ // puede no haber un or.
        let resultadoIZQCOND:boolean = evaluarIZQCOND(arbol.hijos[1],estado); // CAMBIAR ESTO, no tiene que ser asi.
        operando1 = operando1 || resultadoIZQCOND;
        evaluarDISYUNCION(arbol.hijos[3],estado,operando1)
    } 
    return operando1 // usando recursividad para devolver el valor final obtenido
}

// OPERANDOS → -OPERANDOS | constReal | id  | (EXPARIT)
function evaluarOPERANDOS (arbol:nodo,estado:Array<dato>,resultado:number){
    if (arbol.hijos[0].simbolo == "tConstReal"){
        console.log('test')
    } else if (arbol.hijos[0].simbolo == "tParentesisAbre"){
        // evaluarEXPARIT(raiz.hijos[1],estado,resultado)
    } else if (arbol.hijos[0].simbolo == "tMenos"){
        resultado = -1*resultado;
        evaluarOPERANDOS(arbol.hijos[1],estado,resultado);
    } else if (arbol.hijos[0].simbolo == "tId"){ // HAY QUE VERIFICAR QUE ESTE DECLARADO
        if (arbol.hijos[1].cantHijos == 0){
            resultado = leerValor(estado,arbol.hijos[0].lexema);
        }
    }
}


/* el "estado" del programa es una lista con todas las variables que están declaradas en el programa fuente y sus valores 
actuales.
esa lista parte como lista vacía.

cuando hay una declaración de variables, cada una de esas variables se agrega en la lista y se inicializa en 0.
cuando en una expresión tenés un "id", ese id (el lexema asociado en realidad) se busca en el estado para conocer su valor. 
Si no se encuentra, devolvés un error que debe decir que la variable no fue declarada. */