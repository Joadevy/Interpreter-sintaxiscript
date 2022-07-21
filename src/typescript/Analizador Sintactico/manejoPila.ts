 // Asi compila
import {simboloGramatical,Arbol,nodo} from './manejoArbol.js'; 

// @ts-ignore // asi funciona con Deno
// import {simboloGramatical,Arbol,nodo} from './manejoArbol.ts';


/* La pila contendra a pesos y al simbolo inicial, en ese orden.
El simbolo inicial tendra el arbol donde a medida que se leen los compLex del analizador lexico se van agregando al arbol y
esta es la salida del analizador lexico. */

/* A partir de la TAS se obtienen los simbolos gramaticales (variables/terminales) que se tienen que ir encontrando en el
analizador lexico para que sa correcto sintacticamente. Esos se apilan de a uno en la pila para ir repitiendo el proceso.
*/

export type elementoPila = {
    simbolo: simboloGramatical;
    arbolPila?: nodo
}

export function crearPila():Array<elementoPila>{ 
    return []
}

export function Apilar(pila:Array<elementoPila>, elemento:elementoPila){
    pila.push(elemento);
}

export function Desapilar(pila:Array<elementoPila>):elementoPila|undefined{
    return pila.pop();
}

// TESTEANDO FUNCIONES
/* let simboloInicial = new nodo('tPrograma','PROGRAM',0,[]);
let nodo1 = new nodo('tId','CALCULADORA',0,[]);
let arbol = new Arbol(simboloInicial);
arbol.insertarHijo(nodo1);
let pila = crearPila();
Apilar(pila,{simbolo:'pesos'})
Apilar(pila, {simbolo: 'vPROGRAMA', arbolPila: arbol});
let elemento = Desapilar(pila) // Toma el elemento de la cima de la pila (que es el que contiene el arbol)
console.log(pila) // Ahora solo queda pesos en el arbol.
console.log(pila.length) // devuelve 1.
console.log(elemento) // Devuelve el objeto con el simbolo inicial y el arbol donde se ira acumulando la salida del Analizador sintactico */