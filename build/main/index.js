"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Muestra el contenido del archivo en el HTML, es la input del analizador lexico.
function mostrarArchivo(file) {
    return __awaiter(this, void 0, void 0, function* () {
        // if (typeof file == .txt) que haga esto, sino un alert('Ingrese archivo .txt') para evitar errores.
        let contenido = yield file.text();
        let output = document.getElementById('output');
        if (output) {
            output.textContent = contenido;
            // llama a la funcion ObtenerSiguienteCompLex para empezar a reconocer las cadenas.
        }
        else {
            alert('Ha ocurrido un error, intentalo de nuevo.');
        }
    });
}
let tablaSimbolos = {
    // Tiene la forma de lexema: componente lexico, se ira actualizando a medida que se encuentren identificadores.
    'program': 'PROGRAM',
    'while': 'WHILE',
    'for': 'FOR',
    'if': 'IF',
    'then': 'THEN',
    'else': 'ELSE',
    'do': 'DO',
    ',': ',',
    '[': '[',
    ']': ']',
    '{': '{',
    '}': '}',
    ':': ':',
    '>': 'opRel',
    '<': 'opRel',
    '>=': 'opRel',
    '<=': 'opRel',
    '==': 'opRel',
    '!=': 'opRel',
    "=": 'opAsignacion',
};
