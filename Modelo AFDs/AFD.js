// Definiendo los elementos del AFD como globales.
var alfabeto = ['a','b'];
var estados = [0,1];
var estadosFinales = [0];
var estadoInicial = [0];
let tablaTransiciones = [];

// Recibe un conjunto finito de estados (array) y un conjunto finito de simbolos (array)
const funcionTransicion = (tablaTransiciones,estados,alfabeto) => {
    // Se necesita cargar la tabla: estado a traves de cada simbolo => salida, esto varia segun cada automata.
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
          										[estados[1],
                              {"simbolo":alfabeto[0],
                              "estadoSiguiente":estados[0]}]
        );
  			tablaTransiciones.push(
          										[estados[1],
                              {"simbolo":alfabeto[1],
                              "estadoSiguiente":estados[0]}]
        );
        //tablaTransiciones.forEach(element => console.log(element));
}

const esValida = (cadena) => {
  let estadoActual = estadoInicial;
  // Busca el estado siguiente del estado actual en la tabla de transiciones.
  for (let caracter of cadena){
    console.log(caracter);
    estadoActual = tablaTransiciones.filter(transicion=> transicion[0] == estadoActual).find(transicion=> transicion[1].simbolo == caracter)[1].estadoSiguiente;
  	console.log(estadoActual);
  }
  return estadosFinales.includes(estadoActual);
}

funcionTransicion(tablaTransiciones,estados,alfabeto);
if (esValida('babb')){
  console.log('CADENA VALIDA')
}
