const maxima = 8; // es la cantidad maxima de hijos que podria haber, depende de la cantidad maxima del lado derecho de la CFG, en CONDICIONAL se da la maxima)
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
export class Arbol {
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
        var _a;
        const nodo = document.createElement('p');
        nodo.classList.add('output-text');
        nodo.innerHTML += `<span class="desplazamiento">${desplazamiento}</span>${raiz.simbolo}(<span class="lexema">${raiz.lexema}</span>)`;
        (_a = document.querySelector('.arbolSintactico')) === null || _a === void 0 ? void 0 : _a.appendChild(nodo);
        for (let i = 0; i < raiz.cantHijos; i++) {
            this.mostrarArbol(raiz.hijos[i], desplazamiento + "-");
        }
    }
    mostrarArbolConsola(raiz, desplazamiento) {
        console.log(desplazamiento + raiz.simbolo + '(' + raiz.lexema + ')');
        for (let i = 0; i < raiz.cantHijos; i++) {
            this.mostrarArbolConsola(raiz.hijos[i], desplazamiento + " ");
        }
    }
}
