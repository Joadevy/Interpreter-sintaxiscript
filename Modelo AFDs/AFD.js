// Recibe y carga la tabla de transiciones.
const funcionTransicion = (estados,alfabeto,tablaTransiciones) => { 
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
const carAsimb = (caracter) => {
  let simbolo;
	switch(caracter){
      case 'a': simbolo = 'a';
      break;
    	case 'b': simbolo = 'b'
      break;
    	default: simbolo = 'otro';
  }
  return simbolo
}

const esValida = (estadoInicial,estadosFinales,tablaTransiciones,cadena) => {
  let estadoActual = estadoInicial;
  // Toma un caracter y busca el estado siguiente en la tabla de transiciones.
  for (let caracter of cadena){
   estadoActual = tablaTransiciones
     .filter(transicion=> transicion[0] == estadoActual)
     .find(transicion=> transicion[1].simbolo == carAsimb(caracter))
   	 [1].estadoSiguiente;	
  }
  // estadoActual contendra el estado final al que llego el automata.
  return estadosFinales.includes(estadoActual);
}

function main(){
  // Definiendo los elementos del AFD
  const estados = [0,1,2];
  const alfabeto = ['a','b','otro'];
  const estadosFinales = [0];
  const estadoInicial = 0;
  let tablaTransiciones = [];
  
  // Cargo la tabla de transiciones
  funcionTransicion(estados,alfabeto,tablaTransiciones);
  let cadena = 'ababbabb';
  // Compruebo que sea valida o no segun el AFD.
	const resultado = esValida(estadoInicial,estadosFinales,tablaTransiciones,cadena);
  if (resultado){
    console.log('CADENA VALIDA')
  } else if (!resultado){
    console.log('CADENA NO VALIDA');
  }
}

// Llamo a la funcion para test.
main()
