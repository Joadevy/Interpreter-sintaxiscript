// Recibe y carga la tabla de transiciones.
const tsFuncionTransicion = (estados:Array<number>,alfabeto:Array<string>,tablaTransiciones:Array<any>):void => { 
    // Estado a traves de cada simbolo => exactamente una salida. Se guarda en un array con la logica: [estadoPartida, {"simboloEntrada","estadoSiguiente"}]. Esto podria mejorarse, no es muy legible.
    tablaTransiciones.push(
      [estados[0],
      {"simbolo":alfabeto[0],
      "estadoSiguiente":estados[1]}]
    );
    
    tablaTransiciones.push(
      [estados[0],
      {"simbolo":alfabeto[1],
      "estadoSiguiente":estados[1]}]
    );
    
    tablaTransiciones.push(
      [estados[0],
      {"simbolo":alfabeto[2],
      "estadoSiguiente":estados[2]}]
    );
  
    tablaTransiciones.push(
      [estados[1],
      {"simbolo":alfabeto[0],
      "estadoSiguiente":estados[0]}]
    );
  
    tablaTransiciones.push(
      [estados[1],
      {"simbolo":alfabeto[1],
      "estadoSiguiente":estados[0]}]
    );
    
    tablaTransiciones.push(
      [estados[1],
      {"simbolo":alfabeto[2],
      "estadoSiguiente":estados[2]}]
    );
    
    tablaTransiciones.push(
      [estados[2],
      {"simbolo":alfabeto[0],
      "estadoSiguiente":estados[2]}]
    );
        
    tablaTransiciones.push(
      [estados[2],
      {"simbolo":alfabeto[1],
      "estadoSiguiente":estados[2]}]
    );
    
    tablaTransiciones.push(
      [estados[2],
      {"simbolo":alfabeto[2],
      "estadoSiguiente":estados[2]}]
    );	
  }
  
  // Convierte un simbolo de entrada en el equivalente en el alfabeto que se esta trabajando.
  const tsCarAsimb = (caracter:string):string => {
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
  
  const tsEsValida = (estadoInicial:number,estadosFinales:Array<number>,tablaTransiciones:Array<any>,cadena:string):boolean => {
    let estadoActual:number= estadoInicial;
    // Toma un caracter y busca el estado siguiente en la tabla de transiciones.
    for (let caracter of cadena){
     estadoActual= tablaTransiciones
       .filter(transicion => transicion[0] == estadoActual)
       .find(transicion=> transicion[1].simbolo == tsCarAsimb(caracter))
          [1].estadoSiguiente;	
    }
    // estadoActual contendra el estado final al que llego el automata.
    return estadosFinales.includes(estadoActual);
  }
  
  function tsmain():void{
    // Definiendo los elementos del AFD
    const estados: Array<number>= [0,1,2];
    const alfabeto:Array<string>=['a','b','otro'];
    const estadosFinales: Array<number> = [0];
    const estadoInicial: number = 0;
    let tablaTransiciones: Array<any> = [];
    
    // Cargo la tabla de transiciones
    tsFuncionTransicion(estados,alfabeto,tablaTransiciones);
    let cadena: string = 'ababbabb';
    // Compruebo que sea valida o no segun el AFD.
      const resultado: boolean = tsEsValida(estadoInicial,estadosFinales,tablaTransiciones,cadena);
    if (resultado){
      console.log('CADENA VALIDA')
    } else if (!resultado){
      console.log('CADENA NO VALIDA');
    }
  }
  
  // Llamo a la funcion para test.
  tsmain()