import { Arbol } from "./manejoArbol";
import { nodo } from "./manejoArbol";
export function AnalizadorSintactico(codigoFuente /*, raiz:nodo */) {
    console.log('TEST');
    let nodoPrueba = new nodo('tPrograma', 'Program', 0, []);
    let arbol = new Arbol(nodoPrueba);
    let hijoPrueba = new nodo('tId', 'calculadora', 0, []);
    arbol.insertarHijo(hijoPrueba);
    arbol.mostrarArbol(arbol, '');
}
AnalizadorSintactico('test');
