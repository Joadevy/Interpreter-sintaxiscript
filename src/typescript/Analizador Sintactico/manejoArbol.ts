type simboloGramatical = 'tId' | 'tPuntoYComa' | 'tWhile' | 'tOpRel' | 'tConstReal' | 'tMas' | 'tMenos' | 'tProducto' | 'tDivision'
let maxima = 10; // es el Emax (cantidad maxima de hijos que podria haber)

class nodo{
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

class CrearArbol{
    simbolo:simboloGramatical; // deberia ser de tipo simbolo gramatical
    lexema:string; // deberia ser string
    cantHijos:number;
    hijos:Array<nodo>
    
    constructor(node:nodo){
      this.simbolo = node.simbolo;
      this.lexema = node.lexema;
      this.cantHijos = 0;
      this.hijos = node.hijos;
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