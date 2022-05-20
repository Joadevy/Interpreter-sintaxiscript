
# Ejemplo automata finito deterministico

## Uso y carga de un AFD: ejemplo en cadenas de longitud par sobre {a,b}

La funcion 'carAsimb' tiene que devolver el caracter del alfabeto correspondiente segun cada caracter de entrada.
```typescript
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
```

La funcion 'cargaTabla' carga la tabla de transiciones que es un array bidimensional que almacena el estado siguiente en la posicion [estado][simbolo]
  ```typescript
// Se debe modificar para cada AFD la insercion de los elementos en la tabla:

tablaTransiciones[estado.q0][simbolo.a] = 1; // Desde el estado q0 a traves de a => estado 1.
tablaTransiciones[estado.q0][simbolo.b] = 1;
tablaTransiciones[estado.q0][simbolo.otro] = 2; // Desde el estado q0 a traves de otro => estado 2.
```

La funcion 'main' se debe modificar con los elementos del AFD que se carga
  ```typescript
  // Modificar los elementos:

// Cargar el alfabeto
 enum simbolo{
  a,
  b,
  otro
}

// Cargar los estados
enum estado{
  q0,
  q1,
  q2
}

// Definir estado inicial y estados finales (siempre usando los enums)
let estadoFinal:Array<number> = [estado.q0];
let estadoInicial: number = estado.q0;

// Modificar la cadena de entrada para testing antes de llamar para validarla.
const cadena: string = 'ababbabb';
```