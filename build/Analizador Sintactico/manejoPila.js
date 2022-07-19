import { Arbol, nodo } from './manejoArbol';
export function crearPila() {
    return [];
}
export function Apilar(pila, elemento) {
    pila.push(elemento);
}
export function Desapilar(pila) {
    return pila.pop();
}
// TESTEANDO FUNCIONES
let simboloInicial = new nodo('tPrograma', 'PROGRAM', 0, []);
let nodo1 = new nodo('tId', 'CALCULADORA', 0, []);
let arbol = new Arbol(simboloInicial);
arbol.insertarHijo(nodo1);
let pila = crearPila();
Apilar(pila, { simbolo: 'pesos' });
Apilar(pila, { simbolo: 'vPROGRAMA', arbolPila: arbol });
let elemento = Desapilar(pila); // Toma el elemento de la cima de la pila (que es el que contiene el arbol)
console.log(pila); // Ahora solo queda pesos en el arbol.
console.log(pila.length); // devuelve 1.
console.log(elemento); // Devuelve el objeto con el simbolo inicial y el arbol donde se ira acumulando la salida del Analizador sintactico
