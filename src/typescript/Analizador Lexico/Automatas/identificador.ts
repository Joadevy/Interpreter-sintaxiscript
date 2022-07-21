// import {creaTabla} from "./funciones.js";
// @ts-ignore
import {creaTabla} from "./funciones.ts";

// Convierte un simbolo de entrada en el equivalente en el alfabeto que se esta trabajando.
  const carAsimb = (caracter:string):string => {
    let letras = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let numeros = ['0','1','2','3','4','5','6','7','8','9'];
    if (numeros.includes(caracter)){
        return 'digito'
    } else if (letras.includes(caracter)){
        return 'letra'
    }
    return 'otro'
  }

  export function esIdentificador(codigoFuente:string,control:number):Array<any>{
    enum simbolo{
      'digito',
      'letra',
      'otro'
    }
    
    enum estado{
      q0,
      q1,
      q2,
      q3
    }
    
    let cantidadEstados: number= (Object.keys(estado).length / 2); // Porque es un enum numerico.
    let tablaTransiciones: Array<any> = [];
    creaTabla(tablaTransiciones,cantidadEstados);
  
     // ***** CARGA DE LA TABLA DE TRANSICIONES *****
    tablaTransiciones[estado.q0][simbolo.digito] = 2;
    tablaTransiciones[estado.q0][simbolo.otro] = 2;
    tablaTransiciones[estado.q0][simbolo.letra] = 1;

    tablaTransiciones[estado.q1][simbolo.digito] = 1;
    tablaTransiciones[estado.q1][simbolo.letra] = 1;
    tablaTransiciones[estado.q1][simbolo.otro] = 3;

    // ***** FIN CARGA DE LA TABLA DE TRANSICIONES *****
  
    // Elementos del analizador lexico
    let controlAnt = control;
    let lexema = ''

    // Definicin de elementos necesarios para el automata
    let estadosFinales:Array<number> = [estado.q3];
    let estadoInicial: number = estado.q0;  
    // Inicializando estado actual en el inicial.
    let estadoActual: number = estadoInicial;
    // estadoActual contendra el estado al que llego el automata tras analizar el caracter del codigo fuente.
    console.log('PRE WHILE');
    while(estadoActual == 0 || estadoActual == 1){
      // Toma un caracter del archivo y busca el estado siguiente en la tabla de transiciones.
      estadoActual = tablaTransiciones[estadoActual][simbolo[carAsimb(codigoFuente[control]) as any]]; // as any esta ya que carAsimb devuelve un string, y se accede al index del enum con una string
      if (estadoActual ==  0 || estadoActual == 1){
        lexema+=codigoFuente[control];
        console.log(lexema);
      }
      console.log("el control es : " + control)
      control++;
    }

    if (estadosFinales.includes(estadoActual)){
      return [true,control-1,lexema] // DEBE ser control-1 porque se analiza el siguiente caracter en el reconocimiento.
    } else {
      return [false,controlAnt]
    }
   }