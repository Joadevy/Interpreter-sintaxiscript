import {creaTabla} from "./funciones.js";

// Convierte un simbolo de entrada en el equivalente en el alfabeto que se esta trabajando.
  const carAsimb = (caracter:string):string => {
    let comillas = ['"'];
    if (comillas.includes(caracter)){
        return 'comillas'
    } else if (caracter == undefined){ // Refiere al caso de que no se cierre las comillas y no haya mas caracteres (sino seria bucle infinito)
      return 'undefined'
    }
    return 'otro'
  }

  export function esCadena(codigoFuente:string,control:number,lexema:string):Array<any>{
    enum simbolo{
      'comillas',
      'otro',
      'undefined'
    }
    
    enum estado{
      q0,
      q1,
      q2,
    }
    
    let cantidadEstados: number= (Object.keys(estado).length / 2); // Porque es un enum numerico.
    let tablaTransiciones: Array<any> = [];
    creaTabla(tablaTransiciones,cantidadEstados);
  
     // ***** CARGA DE LA TABLA DE TRANSICIONES *****
    tablaTransiciones[estado.q0][simbolo.comillas] = 1;
    tablaTransiciones[estado.q0][simbolo.otro] = 3;

    tablaTransiciones[estado.q1][simbolo.comillas] = 2;
    tablaTransiciones[estado.q1][simbolo.otro] = 1;
    tablaTransiciones[estado.q1][simbolo.undefined] = 3; // Undefined seria si se deja abierto el string.
    // ***** FIN CARGA DE LA TABLA DE TRANSICIONES *****
  
    // Elementos del analizador lexico
    let controlAnt = control;
  
    // Definicin de elementos necesarios para el automata
    let estadosFinales:Array<number> = [estado.q2];
    let estadoInicial: number = estado.q0;  
    // Inicializando estado actual en el inicial.
    let estadoActual: number = estadoInicial;
    // estadoActual contendra el estado al que llego el automata tras analizar el caracter del codigo fuente.
    console.log('CHEQUEO CADENA');
    while(estadoActual == 0 || estadoActual == 1){
      // Toma un caracter del archivo y busca el estado siguiente en la tabla de transiciones.
      estadoActual = tablaTransiciones[estadoActual][simbolo[carAsimb(codigoFuente[control]) as any]]; // as any esta ya que carAsimb devuelve un string, y se accede al index del enum con una string
      if (estadoActual ==  0 || estadoActual == 1 || estadoActual == 2){
        lexema+=codigoFuente[control];
        console.log(lexema);
      }
      console.log("el control es : " + control)
      control++;
    }

    if (estadosFinales.includes(estadoActual)){
      return [true,control,lexema] // DEBE ser control ya que hay que pasar por encima de la ultima " (sino es bucle infinito)
    } else {
      return [false,controlAnt]
    }
   }