import { nodo, Arbol, simboloGramatical } from "../Analizador Sintactico/manejoArbol.js";

// @ts-ignore
//  import { nodo, Arbol, simboloGramatical} from "../Analizador Sintactico/manejoArbol.ts";

type dato = {
    variable:string;
    valor: number;
}

function mostrarEstado (estado:Array<dato>):void{
    for (let elemento in estado){
        console.log('Variable: ' + estado[elemento].variable )
        console.log('Valor: ' + estado[elemento].valor )
    }
}

function agregarVariable(estado:Array<dato>,dato:dato):void{
    estado.push(dato);
}

function leerValor(estado:Array<dato>,variable:string):any{
    console.log('llamado a leer valor')
    for (let elemento in estado){
        if (estado[elemento].variable == variable){
            return estado[elemento].valor;
        }
    }
    console.log("--- NO SE ENCONTRO LA VARIABLE Y POR TANTO NO SE PUDO LEER EL VALOR ---")
}

function asignarValor(estado:Array<dato>,variable:string,valorAsignar:number):void{
    console.log('llamado a asignar valor')
    let flag:boolean = false;
    for (let elemento in estado){
        if (estado[elemento].variable == variable){
            console.log('se va a asignar a ' + estado[elemento].variable + ' el ' + valorAsignar)
            estado[elemento].valor = valorAsignar;
            flag = true;
        }
    }
    if (!flag){
        console.log("--- NO SE ENCONTRO LA VARIABLE, NO HA SIDO DECLARADA ---")
    }
}

// *** EVALUADORES ***

// PROGRAMA → program id {CUERPO}
export function evaluarPrograma(arbol:Arbol){
    console.log(arbol)
    let Estado: Array<dato> = [{variable:'td',valor:123}];
    console.log('evaluando programa');
    evaluarCUERPO(arbol.hijos[3],Estado);
}

// CUERPO → SENTENCIA SENTENCIAS
function evaluarCUERPO(arbol:nodo,estado:Array<dato>){
    console.log('evaluando cuerpo');
    // console.log(arbol)
    evaluarSENTENCIA(arbol.hijos[0],estado);
    evaluarSENTENCIAS(arbol.hijos[1],estado);
}

// SENTENCIAS → ;CUERPO | epsilon 
function evaluarSENTENCIAS(arbol:nodo,estado:Array<dato>){
    console.log('evaluando SENTENCIAS');
    // console.log(arbol)
    if (arbol.cantHijos!==0){
        console.log('detecto mas de un hijo');
        if(arbol.hijos[0].simbolo == "tPuntoComa"){
            console.log('detecto punto y coma')
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
    console.log(estado);
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
    let valorAsignar:Array<number> = []
    console.log('antes de llamar a EXPARIT');
    // console.log(arbol)
    //evaluarEXPARIT(arbol.hijos[2],estado,valorAsignar); // ASINCRONISMO? debe hacer await del resultado?
    valorAsignar[0] = 123;
    console.log('esta variable puede mutar ' + valorAsignar[0]);
    asignarValor(estado,arbol.hijos[0].lexema,valorAsignar[0])
    console.log(estado);
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
        evaluarSALIDAS(arbol.hijos[1],estado);
    }
}

// SALIDA → EXPARIT | cadena
function evaluarSALIDA(arbol:nodo,estado:Array<dato>):string|number{
    let terminal:Array<any> = []; // Esta inicializacion como cadena no deberia pero creo no afecta.
    // console.log(arbol)
    if (arbol.hijos[0].simbolo == "vEXPARIT"){
        evaluarEXPARIT(arbol.hijos[0],estado,terminal);
    } else if (arbol.hijos[0].simbolo == "tCadena"){
        terminal[0] = arbol.hijos[0].lexema;
    }
    return terminal[0]
}

// CONDICIONAL → if [CONDICION] {CUERPO} CONDICIONALFACT
function evaluarCONDICIONAL(arbol:nodo, estado:Array<dato>){
    let resultado:Array<boolean> = [];
    evaluarCONDICION(arbol,estado,resultado);
    if (resultado[0]){
        evaluarCUERPO(arbol.hijos[5],estado);
    } else {
        evaluarCONDICIONALFACT(arbol.hijos[7],estado);
    }
}

// CONDICIONALFACT → else {CUERPO} | epsilon
function evaluarCONDICIONALFACT(arbol:nodo,estado:Array<dato>){
    if (arbol.cantHijos !== 0){ // Este checkeo no deberia ser necesario por como esta planteado evalCONDICIONAL
        evaluarCUERPO(arbol.hijos[2],estado);
    }
}

// MIENTRAS → while [CONDICION] {CUERPO}
function evaluarMIENTRAS(arbol:nodo,estado:Array<dato>){
    let resultadoCond: Array<boolean> = [];
    evaluarCONDICION(arbol.hijos[2],estado,resultadoCond);
    while (resultadoCond){
        evaluarCUERPO(arbol.hijos[5],estado);
        evaluarCONDICION(arbol.hijos[2],estado,resultadoCond);
    }
        // El array va por referencia entonces puede escribirlo.
}

// CONDICION → IZQCOND DISYUNCION
function evaluarCONDICION(arbol:nodo,estado:Array<dato>,resultado:Array<boolean>){
    let operando1:Array<boolean> = [];
    evaluarIZQCOND(arbol.hijos[0],estado,operando1);
    evaluarDISYUNCION(arbol.hijos[1],estado,operando1,resultado);
}

// IZQCOND → NEGACION CONJUNCION
function evaluarIZQCOND(arbol:nodo,estado:Array<dato>,resultado:Array<boolean>){
    let temp:Array<boolean> = [];
    evaluarNEGACION(arbol.hijos[0],estado,temp);
    evaluarCONJUNCION(arbol.hijos[1],estado,temp,resultado)
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
        evaluarEXPARIT(arbol.hijos[0],estado,operando1);
        operador = arbol.hijos[1].lexema;
        evaluarEXPARIT(arbol.hijos[2],estado,operando2);
        switch(operador){
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
    } else if(arbol.hijos[0].simbolo == "tCorcheteAbre"){
        evaluarCONDICION(arbol.hijos[1],estado,resultado)
    }
} 

// CONJUNCION → and NEGACION CONJUNCION | epsilon
function evaluarCONJUNCION(arbol:nodo,estado:Array<dato>,operando1:Array<boolean>,resultado:Array<boolean>){
    if (arbol.cantHijos!== 0){ // puede no haber un and.
        let resultadoNegacion:Array<boolean> = [];
        evaluarNEGACION(arbol.hijos[1],estado,resultadoNegacion)
        operando1[0] = operando1[0] && resultadoNegacion[0];
        evaluarCONJUNCION(arbol.hijos[2],estado,operando1,resultado)

    } else {
        resultado[0] = operando1[0];
    }
}

// DISYUNCION → or IZQCOND DISYUNCION | epsilon
function evaluarDISYUNCION(arbol:nodo,estado:Array<dato>,operando1:Array<boolean>,resultado:Array<boolean>){
    let resultadoIZQCOND:Array<boolean> = [];
    if (arbol.cantHijos == 0){ // puede no haber un or
        resultado[0] = operando1[0]
    } else {
        evaluarIZQCOND(arbol.hijos[1],estado,resultadoIZQCOND);
        operando1[0] = operando1[0] || resultadoIZQCOND[0];
        evaluarDISYUNCION(arbol.hijos[2],estado,operando1,resultado);
    }
}

//EXPARIT -> IZQARIT SUMARESTA
function evaluarEXPARIT(arbol:nodo,estado:Array<dato>,resultado:Array<number>){
    console.log("evaluando EXPARIT");
    console.log(arbol);
    let resultadoIZQARIT:Array<number> = [];
    let resultadoSUMARESTA:Array<number> = [0.0];
    evaluarIZQARIT(arbol.hijos[0],estado,resultadoIZQARIT);
    evaluarSUMARESTA(arbol.hijos[1],estado,resultadoIZQARIT,resultadoSUMARESTA);
    resultado[0] = resultadoSUMARESTA[0];
}

// IZQARIT → RAIZPOT MULTDIV
function evaluarIZQARIT(arbol:nodo,estado:Array<dato>,resultado:Array<number>){
    console.log('IZQPOT');
    let resultadoRAIZPOT:Array<number> = [];
    evaluarRAIZPOT(arbol.hijos[0],estado,resultadoRAIZPOT);
    evaluarMULTDIV(arbol.hijos[1],estado,resultadoRAIZPOT,resultado);
}

// RAIZPOT → opRaiz (EXPARIT) POT | OPERANDOS POT
function evaluarRAIZPOT(arbol:nodo,estado:Array<dato>,resultado:Array<number>){
    console.log('RAIZPOT');
    console.log(arbol)
    let resultadoOPARIT:Array<number> = []
    let base:Array<number> = []

    if (arbol.hijos[0].simbolo = "tRaiz"){
        console.log('ACA'); // Esta detectando como raiz??
        evaluarEXPARIT(arbol.hijos[2],estado,resultadoOPARIT);
        resultadoOPARIT[0] = Math.round(resultadoOPARIT[0]);
        base[0] = Math.sqrt(resultadoOPARIT[0]);
        evaluarPOT(arbol.hijos[4],estado,base,resultado); 
    } else if (arbol.hijos[0].simbolo = "vOPERANDOS" ){
        console.log('es vOPERANDOS')
        evaluarOPERANDOS(arbol.hijos[0],estado,base);
        evaluarPOT(arbol.hijos[1],estado,base,resultado);
    }
}

// POT → ^ OPERANDOS | epsilon
function evaluarPOT(arbol:nodo,estado:Array<dato>,base:Array<number>,resultado:Array<number>){
    let exponente:Array<number> = [];
    if (arbol.cantHijos == 0){
        resultado[0] = base[0];
    } else {
        evaluarOPERANDOS(arbol.hijos[1],estado,exponente);
        base[0] = Math.round(base[0]);
        exponente[0] = Math.round(exponente[0]);
        resultado[0] = Math.pow(base[0],exponente[0]);
    }
}

// SUMARESTA → + OPERANDOS SUMARESTA |  - OPERANDOS SUMARESTA | epsilon
function evaluarSUMARESTA(arbol:nodo,estado:Array<dato>,operandoIZQ:Array<number>,resultado:Array<number>){
    let temp:Array<number> = [];
    let operandoDER:Array<number> = [];
    if (arbol.cantHijos == 0){
        resultado[0] = operandoIZQ[0];
    } else if (arbol.hijos[0].simbolo = "tMas"){
        evaluarOPERANDOS(arbol.hijos[1],estado,operandoDER);
        temp[0] = operandoIZQ[0] + operandoDER[0];
        evaluarSUMARESTA(arbol.hijos[2],estado,temp,resultado);
    } else if (arbol.hijos[0].simbolo = "tMenos"){
        evaluarOPERANDOS(arbol.hijos[1],estado,operandoDER);
        temp[0] = operandoIZQ[0] - operandoDER[0];
        evaluarSUMARESTA(arbol.hijos[2],estado,temp,resultado);
    }
}

// MULTDIV → * OPERANDOS MULTDIV |  / OPERANDOS MULTDIV | epsilon
function evaluarMULTDIV(arbol:nodo,estado:Array<dato>, operandoIZQ:Array<number>,resultado:Array<number>){
    let temp:Array<number> = [];
    let operandoDER:Array<number> = [];
    if (arbol.cantHijos == 0){
        resultado[0] = operandoIZQ[0];
    } else if (arbol.hijos[0].simbolo = "tProducto"){
        evaluarOPERANDOS(arbol.hijos[1],estado,operandoDER);
        temp[0] = operandoIZQ[0] * operandoDER[0];
        evaluarMULTDIV(arbol.hijos[2],estado,temp,resultado);
    } else if (arbol.hijos[0].simbolo = "tDivision"){
        evaluarOPERANDOS(arbol.hijos[1],estado,operandoDER);
        temp[0] = operandoIZQ[0] / operandoDER[0];
        evaluarMULTDIV(arbol.hijos[2],estado,temp,resultado);
    }
}

// OPERANDOS → -OPERANDOS | constReal | id  | (EXPARIT)
function evaluarOPERANDOS (arbol:nodo,estado:Array<dato>,resultado:Array<number>){
    console.log('OPERANDOS');
    if (arbol.hijos[0].simbolo == "tConstReal"){
        resultado[0] = arbol.hijos[0].lexema as any // es una string lo que guarda.
    } else if (arbol.hijos[0].simbolo == "tParentesisAbre"){
        evaluarEXPARIT(arbol.hijos[1],estado,resultado)
    } else if (arbol.hijos[0].simbolo == "tMenos"){
        resultado[0] = -1*resultado[0];
        evaluarOPERANDOS(arbol.hijos[1],estado,resultado);
    } else if (arbol.hijos[0].simbolo == "tId"){ // HAY QUE VERIFICAR QUE ESTE DECLARADO
        if (arbol.hijos[1].cantHijos == 0){
            resultado[0] = leerValor(estado,arbol.hijos[0].lexema);
        }
    }
}


/* el "estado" del programa es una lista con todas las variables que están declaradas en el programa fuente y sus valores 
actuales.esa lista parte como lista vacía
cuando hay una declaración de variables, cada una de esas variables se agrega en la lista y se inicializa en 0.
cuando en una expresión tenés un "id", ese id (el lexema asociado en realidad) se busca en el estado para conocer su valor. 
Si no se encuentra, devolvés un error que debe decir que la variable no fue declarada. */