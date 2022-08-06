import { nodo, Arbol, simboloGramatical } from "../Analizador Sintactico/manejoArbol.js";

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
    for (let elemento in estado){
        if (estado[elemento].variable == variable){
            return estado[elemento].valor;
        }
    }
    const log = "-- no se encontro la variable " + variable + ", no ha sido declarada --"
    console.log(log)
    mostrarInfoSemantico(log)
}

function asignarValor(estado:Array<dato>,variable:string,valorAsignar:number):void{
    let flag:boolean = false;
    for (let elemento in estado){
        if (estado[elemento].variable == variable){
            estado[elemento].valor = valorAsignar;
            flag = true;
        }
    }
    if (!flag){
        const log = "-- no se encontro la variable " + variable + ", no ha sido declarada --"
        console.log(log);
        mostrarInfoSemantico(log)
    }
}

// *** EVALUADORES ***

// PROGRAMA → program id {CUERPO}
export function evaluarPrograma(arbol:Arbol){
    let Estado: Array<dato> = []; // Inicializa el estado del programa a un Array vacio.
    evaluarCUERPO(arbol.hijos[3],Estado);
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
    let valorAsignar:Array<number> = []
    evaluarEXPARIT(arbol.hijos[2],estado,valorAsignar);
    asignarValor(estado,arbol.hijos[0].lexema,valorAsignar[0])
}

// LECTURA → Read (cadena, id)
function evaluarLECTURA(arbol:nodo,estado:Array<dato>){
    // @ts-ignore
    let valorLeido:number = parseFloat(prompt(arbol.hijos[2].lexema,''));
    asignarValor(estado,arbol.hijos[4].lexema,valorLeido)
}

// ESCRITURA → Print (SALIDAS)
function evaluarESCRITURA(arbol:nodo,estado:Array<dato>){
    evaluarSALIDAS(arbol.hijos[2],estado);
}

// SALIDAS → SALIDA SAUX
function evaluarSALIDAS(arbol:nodo,estado:Array<dato>){
    let salida = evaluarSALIDA(arbol.hijos[0],estado);
    mostrarSalida(salida); // Funcion que maneja el DOM para mostrar las salidas en el navegador.
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
    let terminal:Array<any> = [];
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
    evaluarCONDICION(arbol.hijos[2],estado,resultado);
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
    while (resultadoCond[0]){ 
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
    } else if(arbol.hijos[0].simbolo == "vEXPARIT"){
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
    let resultadoIZQARIT:Array<number> = []; // Tiene que contener el valor de la parte izquierda de la op aritmetica.
    let resultadoSUMARESTA:Array<number> = []; // Contiene el resultado total de la op aritmetica.
    evaluarIZQARIT(arbol.hijos[0],estado,resultadoIZQARIT);
    evaluarSUMARESTA(arbol.hijos[1],estado,resultadoIZQARIT,resultadoSUMARESTA); // Le pasa el resultado de la izq y derecha vacio para que opere.
    resultado[0] = resultadoSUMARESTA[0];
}

// IZQARIT → RAIZPOT MULTDIV
function evaluarIZQARIT(arbol:nodo,estado:Array<dato>,resultado:Array<number>){
    let resultadoRAIZPOT:Array<number> = [];
    evaluarRAIZPOT(arbol.hijos[0],estado,resultadoRAIZPOT);
    evaluarMULTDIV(arbol.hijos[1],estado,resultadoRAIZPOT,resultado);
}

// RAIZPOT → opRaiz (EXPARIT) POT | OPERANDOS POT
function evaluarRAIZPOT(arbol:nodo,estado:Array<dato>,resultado:Array<number>){
    let resultadoOPARIT:Array<number> = []
    let base:Array<number> = []

    if (arbol.hijos[0].simbolo == "tRaiz"){
        evaluarEXPARIT(arbol.hijos[2],estado,resultadoOPARIT);
        resultadoOPARIT[0] = Math.round(resultadoOPARIT[0]);
        base[0] = Math.sqrt(resultadoOPARIT[0]);
        evaluarPOT(arbol.hijos[4],estado,base,resultado); 
    } else if (arbol.hijos[0].simbolo == "vOPERANDOS" ){
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
    } else if (arbol.hijos[0].simbolo == "tSuma"){
        evaluarOPERANDOS(arbol.hijos[1],estado,operandoDER);
        temp[0] = operandoIZQ[0] + operandoDER[0];
        evaluarSUMARESTA(arbol.hijos[2],estado,temp,resultado);
    } else if (arbol.hijos[0].simbolo == "tResta"){
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
    } else if (arbol.hijos[0].simbolo == "tProducto"){
        evaluarOPERANDOS(arbol.hijos[1],estado,operandoDER);
        temp[0] = operandoIZQ[0] * operandoDER[0];
        evaluarMULTDIV(arbol.hijos[2],estado,temp,resultado);
    } else if (arbol.hijos[0].simbolo == "tDivision"){
        evaluarOPERANDOS(arbol.hijos[1],estado,operandoDER);
        temp[0] = operandoIZQ[0] / operandoDER[0];
        evaluarMULTDIV(arbol.hijos[2],estado,temp,resultado);
    }
}

// OPERANDOS → -OPERANDOS | constReal | id  | (EXPARIT)
function evaluarOPERANDOS (arbol:nodo,estado:Array<dato>,resultado:Array<number>){
    if (arbol.hijos[0].simbolo == "tConstReal"){
        resultado[0] = parseFloat(arbol.hijos[0].lexema) // es una string lo que guarda, hay que convertir a numero flotante.
    } else if (arbol.hijos[0].simbolo == "tParentesisAbre"){
        evaluarEXPARIT(arbol.hijos[1],estado,resultado)
    } else if (arbol.hijos[0].simbolo == "tResta"){
        resultado[0] = -1*resultado[0];
        evaluarOPERANDOS(arbol.hijos[1],estado,resultado);
    } else if (arbol.hijos[0].simbolo == "tId"){ // HAY QUE VERIFICAR QUE ESTE DECLARADO
        if (arbol.hijos[0].cantHijos == 0){
            resultado[0] = leerValor(estado,arbol.hijos[0].lexema);
        }
    }
}

function mostrarSalida(salida:any){
    let output = document.getElementById('output');
    let regex = /[^"]/gi;

    // Si no esta el contenedor (nunca esta si es la primera vez que pasa por esta funcion) lo crea.
    if (!output){
        const main = document.getElementById('main');
        const templateOutput= document.getElementById('template-output')
        // @ts-ignore
        const outputContainer = templateOutput.content.cloneNode(true);
        // @ts-ignore
        main.appendChild(outputContainer);
        output = document.getElementById('output'); // Asigno ya que sino output esta vacio porque no capturo nada.
    }
    // agrega la salida correspondiente en el contenedor.
    const text = document.createElement('p');
    text.classList.add('output-text');
    salida = salida.toString().match(regex).join(''); // Le quita las " " a la;s cadenas asi no se muestran como salida.
    text.textContent = salida;
        if (output){
            output.appendChild(text);                 
            output.classList.add('output-show');
        }
}

function mostrarInfoSemantico(errorLog:string){
    let output = document.getElementById('output');
        const text = document.createElement('p');
        text.classList.add('output-text');
        if (output){
            output.textContent = '';
            let text = document.createElement('p');
            text.classList.add('output-text');
            text.innerHTML = `Ocurrio un <span class="error">error semantico</span>. Log: <span class="complex">${errorLog}</span>`
            output.appendChild(text);
            output.classList.add('output-show');
        }
}