let maxima = 10; // es el Emax (cantidad maxima de hijos que podria haber - depende de la cantidad maxima del lado derecho de la CFG)
export class nodo {
    constructor(compLex, lexema, cantHijos, hijos) {
        this.simbolo = compLex;
        this.lexema = lexema;
        this.cantHijos = cantHijos;
        this.hijos = hijos;
    }
    insertarHijo(hijo) {
        if (this.cantHijos < maxima) {
            this.hijos.push(hijo);
            this.cantHijos++;
        }
    }
}
export class CrearArbol {
    constructor(raiz) {
        this.simbolo = raiz.simbolo;
        this.lexema = raiz.lexema;
        this.cantHijos = 0;
        this.hijos = raiz.hijos;
    }
    insertarHijo(hijo) {
        if (this.cantHijos < maxima) {
            this.hijos.push(hijo);
            this.cantHijos++;
        }
    }
    mostrarArbol(raiz, desplazamiento) {
        console.log(desplazamiento + raiz.lexema);
        for (let i = 0; i < raiz.cantHijos; i++) {
            this.mostrarArbol(raiz.hijos[i], desplazamiento + " ");
        }
    }
}
