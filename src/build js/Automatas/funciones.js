"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creaTabla = void 0;
function creaTabla(tablaTransiciones, cantidadSimbolos) {
    // Creando cada subArray para cargar los datos en la tabla
    for (let celdas = 0; celdas < cantidadSimbolos; celdas++) {
        tablaTransiciones.push([]);
    }
}
exports.creaTabla = creaTabla;
