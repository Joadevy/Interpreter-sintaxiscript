var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { esConstEntera } from '../Automatas/constanteEntera.js';
// Muestra el contenido del archivo en el HTML, es la input del analizador lexico.
const input = document.getElementById('input');
input === null || input === void 0 ? void 0 : input.addEventListener('change', (e) => {
    if (e.target.files[0] != null) { // No entiendo porque esto no lo soluciona, nunca puede ser null.
        const archivo = e.target.files[0];
        // Expresion regular que comprueba que se haya pasado un .txt
        let compruebaTXT = /\w+\.txt$/;
        if (compruebaTXT.test(archivo.name)) {
            mostrarArchivo(archivo);
        }
        else {
            alert('Porfavor, introduce un archivo de texto .TXT');
        }
    }
});
function mostrarArchivo(file) {
    return __awaiter(this, void 0, void 0, function* () {
        // Contenido va a guardar toda la cadena, es decir, todo el codigo del programa.
        let contenido = yield file.text();
        let output = document.getElementById('output');
        if (output) {
            output.textContent = contenido;
            //.trim() para remover espacios en blanco al inicio y al final del archivo.
            let resultado = esConstEntera(contenido.trim());
            console.log(resultado);
            if (resultado) {
                console.log('CADENA VALIDA');
            }
            else {
                console.log('CADENA INVALIDA');
            }
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
