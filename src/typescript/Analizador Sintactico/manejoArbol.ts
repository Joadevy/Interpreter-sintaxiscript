type simboloGramatical = 'tProgram' | 'tEscribir' | 'tVariables' | 'tLeer' | 'tWhile' | 'tIf' | 'tElse' | 'tAnd' | 'tOr' | 'tNot' | 
'tId' | 'tCadena' | 'tConstReal' | 'tPuntoComa' | 'tComa' | 'tOpRel' | 'tOpAsignacion' | 'tMas' | 'tMenos' | 'tProducto' | 'tDivision' | 
'tParentesisAbre' | 'tParentesisCierra' | 'tLlaveAbre' | 'tLlaveCierra';

let maxima = 10; // es el Emax (cantidad maxima de hijos que podria haber - depende de la cantidad maxima del lado derecho de la CFG)
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

export class CrearArbol{
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
      console.log(desplazamiento + raiz.lexema);
      for(let i = 0; i < raiz.cantHijos; i++){
        this.mostrarArbol(raiz.hijos[i],desplazamiento + " ");
      }
    }
  }