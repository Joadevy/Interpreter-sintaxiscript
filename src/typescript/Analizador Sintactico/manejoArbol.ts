export type simboloGramatical = 'vPROGRAMA' | 'vCUERPO'| 'vSENTENCIAS' | 'vSENTENCIA' | 'vDECLARACION' | 'vVARIABLES' | 'vVARIABLE' | 'vASIGNACION' | 'vEXPARIT' | 'vIZQARIT' | 'vRAIZPOT' | 'vPOT' | 'vSUMARESTA' | 'vMULTDIV' | 'vOPERANDOS' | 'vLECTURA' | 'vESCRITURA' | 'vSALIDAS' | 'vSAUX' | 'vSALIDA' | 'vCONDICIONAL' | 'vCONDICIONALFACT' | 'vMIENTRAS' | 'vCONDICION' | 'vIZQCOND' | 'vNEGACION' | 'vCONJUNCION' | 'vDISYUNCION' |'tPrograma' | 'tEscribir' | 'tVariables' | 'tLeer' | 'tWhile' | 'tIf' | 'tElse' | 'tAnd' | 'tOr' | 'tNot' | 
'tId' | 'tCadena' | 'tConstReal' | 'tPuntoComa' | 'tComa' | 'tOpRel' | 'tOpAsignacion' | 'tSuma' | 'tResta' | 'tProducto' | 'tDivision' |'tPotencia' | 'tRaiz' | 
'tParentesisAbre' | 'tParentesisCierra' | 'tLlaveAbre' | 'tLlaveCierra' | 'tCorcheteAbre' | 'tCorcheteCierra' | 'tPunto' | 'pesos' | 'errorLexico';

const maxima = 8; // es la cantidad maxima de hijos que podria haber, depende de la cantidad maxima del lado derecho de la CFG, en CONDICIONAL se da la maxima)
export class nodo{
  simbolo:simboloGramatical; // deberia ser de tipo simbolo gramatical
  lexema:string; // deberia ser string
  cantHijos:number;
  hijos:Array<nodo>

  constructor(compLex:simboloGramatical,lexema:string,cantHijos:number,hijos:Array<nodo>){
    this.simbolo = compLex;
    this.lexema = lexema;
    this.cantHijos = cantHijos;
    this.hijos = hijos
  }

  insertarHijo(hijo:nodo){
    if(this.cantHijos < maxima){
      this.hijos.push(hijo);
      this.cantHijos++;
    }
  }
}

export class Arbol{
    simbolo:simboloGramatical; // deberia ser de tipo simbolo gramatical
    lexema:string; // deberia ser string
    cantHijos:number;
    hijos:Array<nodo>
    
    constructor(raiz:nodo){
      this.simbolo = raiz.simbolo;
      this.lexema = raiz.lexema;
      this.cantHijos = 0;
      this.hijos = raiz.hijos;
    }

    insertarHijo(hijo:nodo){
      if(this.cantHijos < maxima){
        this.hijos.push(hijo);
        this.cantHijos++;
      }
    }

    mostrarArbol(raiz:nodo,desplazamiento:string){
      const nodo = document.createElement('p');
      nodo.classList.add('output-text');
      nodo.innerHTML += `<span class="desplazamiento">${desplazamiento}</span>${raiz.simbolo}(<span class="lexema">${raiz.lexema}</span>)`;
      document.querySelector('.arbolSintactico')?.appendChild(nodo);
      for(let i = 0; i < raiz.cantHijos; i++){
        this.mostrarArbol(raiz.hijos[i],desplazamiento + "-");
      }
    }

    mostrarArbolConsola(raiz:nodo,desplazamiento:string){
      console.log(desplazamiento + raiz.simbolo + '(' + raiz.lexema + ')');
      for(let i = 0; i < raiz.cantHijos; i++){
        this.mostrarArbolConsola(raiz.hijos[i],desplazamiento + " ");
      }
    }
  }