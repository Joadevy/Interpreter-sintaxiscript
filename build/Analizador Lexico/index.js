var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { esConstEntera } from '../Analizador Lexico/Automatas/constanteEntera.js';
export function mostrarArchivo(file) {
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
