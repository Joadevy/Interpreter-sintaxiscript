import { Arbol } from "./manejoArbol";
import { nodo } from "./manejoArbol";

export function AnalizadorSintactico(codigoFuente:string /*, raiz:nodo */){
    console.log('TEST')
    const nodoPrueba = new nodo('tPrograma','Program',0,[]);
    const arbol = new Arbol(nodoPrueba);
    const hijoPrueba = new nodo('tId','calculadora',0,[]);
    arbol.insertarHijo(hijoPrueba);
    arbol.mostrarArbol(arbol,'');
}

AnalizadorSintactico('test')