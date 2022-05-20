// Forma mas compacta y legible de resolver el problema y mas parecida a la que dio el profesor.

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

function creaTabla(tablaTransiciones:Array<any>,cantidadSimbolos:number):void{
  // Creando cada subArray para cargar los datos en la tabla
    for (let celdas = 0; celdas < cantidadSimbolos; celdas++){
      tablaTransiciones.push([]);
    } 
}

// ***** CARGA DE LA TABLA DE TRANSICIONES *****
function cargaTabla(tablaTransiciones:Array<any>,estado:any,simbolo:any):void{
tablaTransiciones[estado.q0][simbolo.a] = 1;
tablaTransiciones[estado.q0][simbolo.b] = 1;
tablaTransiciones[estado.q0][simbolo.otro] = 2;
tablaTransiciones[estado.q1][simbolo.a] = 0;
tablaTransiciones[estado.q1][simbolo.b] = 0;
tablaTransiciones[estado.q1][simbolo.otro] = 2;
tablaTransiciones[estado.q2][simbolo.a] = 2;
tablaTransiciones[estado.q2][simbolo.b] = 2;
tablaTransiciones[estado.q2][simbolo.otro] = 2;  
}

function esValida(estadoInicial:number,estadosFinales:Array<number>,tablaTransiciones:Array<any>,simbolo:any,cadena:string):boolean{
  let estadoActual: number = estadoInicial;
  // Toma un caracter y busca el estado siguiente en la tabla de transiciones.
  for (let caracter of cadena){
   estadoActual = tablaTransiciones[estadoActual][simbolo[carAsimb(caracter) as any]]; // as any esta ya que carAsimb devuelve un string, y se accede al index del enum con una string
  }
  // estadoActual contendra el estado final al que llego el automata.
  return estadosFinales.includes(estadoActual);
}

function main():void{
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

// Definiendo estado inicial y finales.
let estadoFinal:Array<number> = [estado.q0];
let estadoInicial: number = estado.q0;

let cantidadSimbolos: number= (Object.keys(simbolo).length / 2); // Porque es un enum numerico.
let tablaTransiciones: Array<any> = [];
creaTabla(tablaTransiciones,cantidadSimbolos);
cargaTabla(tablaTransiciones,estado,simbolo);

// Cargar la cadena a comprobar
const cadena: string = 'ababbabb';
const resultado: boolean = esValida(estadoInicial,estadoFinal,tablaTransiciones,simbolo,cadena);
if (resultado){
    console.log('CADENA VALIDA')
  } else {
    console.log('CADENA NO VALIDA');
  }
}

main();

  