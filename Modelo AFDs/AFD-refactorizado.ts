// **** EN PROCESO ****
// Forma mas compacta y legible de resolver el problema y mas parecida a la que dio el profesor.

enum simbolo{
    a,
    b,
    otro
  }
  
  enum estado{
    q0,
    q1,
    q2
  }
  
  let tablaTransiciones: Array<any>= [];
  let cantidadSimbolos: number= (Object.keys(simbolo).length / 2); // Porque es un enum numerico.
  
  function creaTablaTransiciones(tablaTransiciones:Array<any>,cantidadSimbolos:number):void{
    // Creando cada subArray para cargar los datos en la tabla
      for (let celdas = 0; celdas < cantidadSimbolos; celdas++){
        tablaTransiciones.push([]);
      } 
  }
  
  creaTablaTransiciones(tablaTransiciones,cantidadSimbolos);
  
  tablaTransiciones[estado.q0][simbolo.a] = 1;
  tablaTransiciones[estado.q0][simbolo.b] = 1;
  tablaTransiciones[estado.q0][simbolo.otro] = 2;
  tablaTransiciones[estado.q1][simbolo.a] = 0;
  tablaTransiciones[estado.q1][simbolo.b] = 0;
  tablaTransiciones[estado.q1][simbolo.otro] = 2;
  tablaTransiciones[estado.q2][simbolo.a] = 2;
  tablaTransiciones[estado.q2][simbolo.b] = 2;
  tablaTransiciones[estado.q2][simbolo.otro] = 2;
  
  // Convierte un simbolo de entrada en el equivalente en el alfabeto que se esta trabajando.
  const carAsimb = (caracter:string):string => {
    let simbolo:string;
      switch(caracter){
        case 'a': simbolo = 'a';
        break;
          case 'b': simbolo = 'b'
        break;
          default: simbolo = 'otro';
    }
    return simbolo
  }
  
  function esValida(estadoInicial:number,estadosFinales:Array<number>,tablaTransiciones:Array<any>,cadena:string):boolean{
    let estadoActual: number = estadoInicial;
    // Toma un caracter y busca el estado siguiente en la tabla de transiciones.
    for (let caracter of cadena){
     estadoActual = tablaTransiciones[estadoActual][simbolo[carAsimb(caracter) as any]]; // as any esta ya que carAsimb devuelve un string, y se accede al index del enum con una string
    }
    // estadoActual contendra el estado final al que llego el automata.
    return estadosFinales.includes(estadoActual);
  }
  
  esValida(0,[0],tablaTransiciones,"abbbabba");
  