
# Ejemplo automata finito deterministico

## Uso / funcionamiento
Para cargar un AFD se tiene que modificar:

La funcion 'carAsimb' tiene que devolver el caracter del alfabeto correspondiente segun cada caracter de entrada.
```javascript
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
```

La funcion 'funcionTransicion' carga la tabla de transiciones que es un array bidimensional que guarda en cada poscion un array con el estado y un objeto que contiene el simbolo y la salida para ese simbolo.
  ```javascript
Se debe modificar para cada AFD la insercion de los elementos en la tabla:

tablaTransiciones.push(
    [estados[0],
    {"simbolo":alfabeto[0],
    "estadoSiguiente":estados[1]}]
  );
```

La funcion 'main' se debe modificar con los elementos del AFD que se carga
  ```javascript
  // Modificar los elementos
  const estados = [0,1,2];
  const alfabeto = ['a','b','otro'];
  const estadosFinales = [0];
  const estadoInicial = 0;

  // Modificar la cadena de entrada para testing antes de llamar para validarla.
  let cadena = 'ababbabb';
```