// export type variables = 'vPROGRAMA' | 'vCUERPO'| 'vSENTENCIAS' | 'vSENTENCIA' | 'vDECLARACION' | 'vVARIABLES' | 'vVARIABLE' | 'vASIGNACION' | 'vEXPARIT' | 'vIZQARIT' | 'vRAIZPOT' | 'vPOT' | 'vSUMARESTA' | 'vMULTDIV' | 'vOPERANDOS' | 'vLECTURA' | 'vESCRITURA' | 'vSALIDAS' | 'vSAUX' | 'vSALIDA' | 'vCONDICIONAL' | 'vCONDICIONALFACT' | 'vMIENTRAS' | 'vCONDICION' | 'vIZQCOND' | 'vNEGACION' | 'vCONJUNCION' | 'vDISYUNCION' ;
// export type terminales = 'tPrograma' | 'tEscribir' | 'tVariables' | 'tLeer' | 'tWhile' | 'tIf' | 'tElse' | 'tAnd' | 'tOr' | 'tNot' | 
// 'tId' | 'tCadena' | 'tConstReal' | 'tPuntoComa' | 'tComa' | 'tOpRel' | 'tOpAsignacion' | 'tMas' | 'tMenos' | 'tProducto' | 'tDivision' |'tPotencia' | 'tRaiz' | 
// 'tParentesisAbre' | 'tParentesisCierra' | 'tLlaveAbre' | 'tLlaveCierra' | 'tCorcheteAbre' | 'tCorcheteCierra';
//import { simboloGramatical } from "./manejoArbol";
var variables;
(function (variables) {
    variables[variables["vPROGRAMA"] = 0] = "vPROGRAMA";
    variables[variables["vCUERPO"] = 1] = "vCUERPO";
    variables[variables["vSENTENCIAS"] = 2] = "vSENTENCIAS";
    variables[variables["vSENTENCIA"] = 3] = "vSENTENCIA";
    variables[variables["vDECLARACION"] = 4] = "vDECLARACION";
    variables[variables["vVARIABLES"] = 5] = "vVARIABLES";
    variables[variables["vVARIABLE"] = 6] = "vVARIABLE";
    variables[variables["vASIGNACION"] = 7] = "vASIGNACION";
    variables[variables["vEXPARIT"] = 8] = "vEXPARIT";
    variables[variables["vIZQARIT"] = 9] = "vIZQARIT";
    variables[variables["vRAIZPOT"] = 10] = "vRAIZPOT";
    variables[variables["vPOT"] = 11] = "vPOT";
    variables[variables["vSUMARESTA"] = 12] = "vSUMARESTA";
    variables[variables["vMULTDIV"] = 13] = "vMULTDIV";
    variables[variables["vOPERANDOS"] = 14] = "vOPERANDOS";
    variables[variables["vLECTURA"] = 15] = "vLECTURA";
    variables[variables["vESCRITURA"] = 16] = "vESCRITURA";
    variables[variables["vSALIDAS"] = 17] = "vSALIDAS";
    variables[variables["vSAUX"] = 18] = "vSAUX";
    variables[variables["vSALIDA"] = 19] = "vSALIDA";
    variables[variables["vCONDICIONAL"] = 20] = "vCONDICIONAL";
    variables[variables["vCONDICIONALFACT"] = 21] = "vCONDICIONALFACT";
    variables[variables["vMIENTRAS"] = 22] = "vMIENTRAS";
    variables[variables["vCONDICION"] = 23] = "vCONDICION";
    variables[variables["vIZQCOND"] = 24] = "vIZQCOND";
    variables[variables["vNEGACION"] = 25] = "vNEGACION";
    variables[variables["vCONJUNCION"] = 26] = "vCONJUNCION";
    variables[variables["vDISYUNCION"] = 27] = "vDISYUNCION";
})(variables || (variables = {}));
var terminales;
(function (terminales) {
    terminales[terminales["tPrograma"] = 0] = "tPrograma";
    terminales[terminales["tEscribir"] = 1] = "tEscribir";
    terminales[terminales["tVariables"] = 2] = "tVariables";
    terminales[terminales["tLeer"] = 3] = "tLeer";
    terminales[terminales["tWhile"] = 4] = "tWhile";
    terminales[terminales["tIf"] = 5] = "tIf";
    terminales[terminales["tElse"] = 6] = "tElse";
    terminales[terminales["tAnd"] = 7] = "tAnd";
    terminales[terminales["tOr"] = 8] = "tOr";
    terminales[terminales["tNot"] = 9] = "tNot";
    terminales[terminales["tId"] = 10] = "tId";
    terminales[terminales["tCadena"] = 11] = "tCadena";
    terminales[terminales["tConstReal"] = 12] = "tConstReal";
    terminales[terminales["tPuntoComa"] = 13] = "tPuntoComa";
    terminales[terminales["tComa"] = 14] = "tComa";
    terminales[terminales["tOpRel"] = 15] = "tOpRel";
    terminales[terminales["tOpAsignacion"] = 16] = "tOpAsignacion";
    terminales[terminales["tMas"] = 17] = "tMas";
    terminales[terminales["tMenos"] = 18] = "tMenos";
    terminales[terminales["tProducto"] = 19] = "tProducto";
    terminales[terminales["tDivision"] = 20] = "tDivision";
    terminales[terminales["tPotencia"] = 21] = "tPotencia";
    terminales[terminales["tRaiz"] = 22] = "tRaiz";
    terminales[terminales["tParentesisAbre"] = 23] = "tParentesisAbre";
    terminales[terminales["tParentesisCierra"] = 24] = "tParentesisCierra";
    terminales[terminales["tLlaveAbre"] = 25] = "tLlaveAbre";
    terminales[terminales["tLlaveCierra"] = 26] = "tLlaveCierra";
    terminales[terminales["tCorcheteAbre"] = 27] = "tCorcheteAbre";
    terminales[terminales["tCorcheteCierra"] = 28] = "tCorcheteCierra";
})(terminales || (terminales = {}));
export function creaTAS() {
    const cantidadVariables = 28; // Defino la cantidad de variables que tiene la CFG para crear la TAS.
    let TAS = [];
    // Creando cada subArray para cargar los datos en la tabla
    for (let celdas = 0; celdas < cantidadVariables; celdas++) {
        TAS.push([]);
    }
    return TAS;
}
export function cargaEpsilonProd(TAS) {
    // Cada celda sera donde estaran los elementos que hay que derivar (parte derecha de la CFG), cantidad es el length de elementos.
    class celda {
        constructor(elemento) {
            this.elementos = elemento;
            this.cantidad = elemento.length;
        }
    }
    TAS[variables.vSENTENCIAS][terminales.tLlaveCierra] = new celda([]);
    TAS[variables.vVARIABLE][terminales.tLlaveCierra] = new celda([]);
    TAS[variables.vVARIABLE][terminales.tPuntoComa] = new celda([]);
    TAS[variables.vPOT][terminales.tLlaveCierra] = new celda([]);
    TAS[variables.vPOT][terminales.tParentesisCierra] = new celda([]);
    TAS[variables.vPOT][terminales.tPuntoComa] = new celda([]);
    TAS[variables.vPOT][terminales.tComa] = new celda([]);
    TAS[variables.vPOT][terminales.tCorcheteCierra] = new celda([]);
    TAS[variables.vPOT][terminales.tMas] = new celda([]);
    TAS[variables.vPOT][terminales.tMenos] = new celda([]);
    TAS[variables.vPOT][terminales.tProducto] = new celda([]);
    TAS[variables.vPOT][terminales.tDivision] = new celda([]);
    TAS[variables.vPOT][terminales.tCorcheteCierra] = new celda([]);
    TAS[variables.vPOT][terminales.tOpRel] = new celda([]);
    TAS[variables.vPOT][terminales.tAnd] = new celda([]);
    TAS[variables.vPOT][terminales.tOr] = new celda([]);
    return TAS;
}
// Testeando
let TAS = creaTAS();
TAS = cargaEpsilonProd(TAS);
console.log(TAS);
console.log(TAS[variables.vPOT][terminales.tCadena] === undefined); // SIgnifica que hay error lexico, no hay derivacion posible (no hay nada en la celda)
console.log(TAS[variables.vPOT][terminales.tOr].cantidad);
