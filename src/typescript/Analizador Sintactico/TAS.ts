// export type variables = 'vPROGRAMA' | 'vCUERPO'| 'vSENTENCIAS' | 'vSENTENCIA' | 'vDECLARACION' | 'vVARIABLES' | 'vVARIABLE' | 'vASIGNACION' | 'vEXPARIT' | 'vIZQARIT' | 'vRAIZPOT' | 'vPOT' | 'vSUMARESTA' | 'vMULTDIV' | 'vOPERANDOS' | 'vLECTURA' | 'vESCRITURA' | 'vSALIDAS' | 'vSAUX' | 'vSALIDA' | 'vCONDICIONAL' | 'vCONDICIONALFACT' | 'vMIENTRAS' | 'vCONDICION' | 'vIZQCOND' | 'vNEGACION' | 'vCONJUNCION' | 'vDISYUNCION' ;
// export type terminales = 'tPrograma' | 'tEscribir' | 'tVariables' | 'tLeer' | 'tWhile' | 'tIf' | 'tElse' | 'tAnd' | 'tOr' | 'tNot' | 
// 'tId' | 'tCadena' | 'tConstReal' | 'tPuntoComa' | 'tComa' | 'tOpRel' | 'tOpAsignacion' | 'tMas' | 'tMenos' | 'tProducto' | 'tDivision' |'tPotencia' | 'tRaiz' | 
// 'tParentesisAbre' | 'tParentesisCierra' | 'tLlaveAbre' | 'tLlaveCierra' | 'tCorcheteAbre' | 'tCorcheteCierra';
//import { simboloGramatical } from "./manejoArbol";

type simboloGramatical = 'vPROGRAMA' | 'vCUERPO'| 'vSENTENCIAS' | 'vSENTENCIA' | 'vDECLARACION' | 'vVARIABLES' | 'vVARIABLE' | 'vASIGNACION' | 'vEXPARIT' | 'vIZQARIT' | 'vRAIZPOT' | 'vPOT' | 'vSUMARESTA' | 'vMULTDIV' | 'vOPERANDOS' | 'vLECTURA' | 'vESCRITURA' | 'vSALIDAS' | 'vSAUX' | 'vSALIDA' | 'vCONDICIONAL' | 'vCONDICIONALFACT' | 'vMIENTRAS' | 'vCONDICION' | 'vIZQCOND' | 'vNEGACION' | 'vCONJUNCION' | 'vDISYUNCION' |'tPrograma' | 'tEscribir' | 'tVariables' | 'tLeer' | 'tWhile' | 'tIf' | 'tElse' | 'tAnd' | 'tOr' | 'tNot' | 
'tId' | 'tCadena' | 'tConstReal' | 'tPuntoComa' | 'tComa' | 'tOpRel' | 'tOpAsignacion' | 'tMas' | 'tMenos' | 'tProducto' | 'tDivision' |'tPotencia' | 'tRaiz' | 
'tParentesisAbre' | 'tParentesisCierra' | 'tLlaveAbre' | 'tLlaveCierra' | 'tCorcheteAbre' | 'tCorcheteCierra';

enum variables{
  'vPROGRAMA','vCUERPO','vSENTENCIAS','vSENTENCIA','vDECLARACION','vVARIABLES','vVARIABLE','vASIGNACION','vEXPARIT','vIZQARIT','vRAIZPOT','vPOT','vSUMARESTA','vMULTDIV','vOPERANDOS','vLECTURA','vESCRITURA','vSALIDAS','vSAUX','vSALIDA','vCONDICIONAL','vCONDICIONALFACT','vMIENTRAS','vCONDICION','vIZQCOND','vNEGACION','vCONJUNCION', 'vDISYUNCION'
}

enum terminales{
  'tPrograma' , 'tEscribir' , 'tVariables' , 'tLeer' , 'tWhile' , 'tIf' , 'tElse' , 'tAnd' , 'tOr' , 'tNot' , 
  'tId' , 'tCadena' , 'tConstReal' , 'tPuntoComa' , 'tComa' , 'tOpRel' , 'tOpAsignacion' , 'tMas' , 'tMenos' , 'tProducto' , 'tDivision' ,'tPotencia' , 'tRaiz' , 
  'tParentesisAbre' , 'tParentesisCierra' , 'tLlaveAbre' , 'tLlaveCierra' , 'tCorcheteAbre' , 'tCorcheteCierra'
}

type celda = {
  'elementos': Array<simboloGramatical>,
  'cantidad': 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 // Hasta la maxima cantidad de partes derechas de la CFG (que son 8 por CONDICIONAL)
}


export function creaTAS():Array<any>{
  const cantidadVariables:number = 28; // Defino la cantidad de variables que tiene la CFG para crear la TAS.
  let TAS:Array<any> = [];  
  // Creando cada subArray para cargar los datos en la tabla
      for (let celdas = 0; celdas < cantidadVariables; celdas++){
        TAS.push([]);
      } 
      return TAS
  }


export function cargaEpsilonProd(TAS:Array<any>):Array<any>{

  // Cada celda sera donde estaran los elementos que hay que derivar (parte derecha de la CFG), cantidad es el length de elementos.
  class celda{
    elementos:Array<simboloGramatical>;
    cantidad: number ;// Hasta la maxima cantidad de partes derechas de la CFG (que son 8 por CONDICIONAL)
    
    constructor(elemento:Array<simboloGramatical>){
      this.elementos = elemento;
      this.cantidad = elemento.length;
    }
  }

  TAS[variables.vSENTENCIAS][terminales.tLlaveCierra] = new celda ([]);

  TAS[variables.vVARIABLE][terminales.tLlaveCierra] = new celda ([]);
  TAS[variables.vVARIABLE][terminales.tPuntoComa] = new celda ([]);

  TAS[variables.vPOT][terminales.tLlaveCierra] = new celda ([]);
  TAS[variables.vPOT][terminales.tParentesisCierra] = new celda ([]);
  TAS[variables.vPOT][terminales.tPuntoComa] = new celda ([]);
  TAS[variables.vPOT][terminales.tComa] = new celda ([]);
  TAS[variables.vPOT][terminales.tCorcheteCierra] = new celda ([]);
  TAS[variables.vPOT][terminales.tMas] = new celda ([]);
  TAS[variables.vPOT][terminales.tMenos] = new celda ([]);
  TAS[variables.vPOT][terminales.tProducto] = new celda ([]);
  TAS[variables.vPOT][terminales.tDivision] = new celda ([]);
  TAS[variables.vPOT][terminales.tCorcheteCierra] = new celda ([]);
  TAS[variables.vPOT][terminales.tOpRel] = new celda ([]);
  TAS[variables.vPOT][terminales.tAnd] = new celda ([]);
  TAS[variables.vPOT][terminales.tOr] = new celda ([]);


  return TAS;
}

// Testeando
let TAS = creaTAS()
TAS = cargaEpsilonProd(TAS);

console.log(TAS);
console.log(TAS[variables.vPOT][terminales.tCadena] === undefined) // SIgnifica que hay error lexico, no hay derivacion posible (no hay nada en la celda)
console.log(TAS[variables.vPOT][terminales.tOr].cantidad)