var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { obtenerSiguienteComplex } from '../Analizador Lexico/index.js';
import { tablaSimbolos } from '../Analizador Lexico/tablaSimbolos.js';
// Esta funcion hara el manejo del compilador completo.
export function interprete(archivo) {
    return __awaiter(this, void 0, void 0, function* () {
        // codigoFuente va a guardar toda la cadena, es decir, todo el codigo del programa.
        //.trim() para remover espacios en blanco al inicio y al final del archivo.
        let codigoFuente = (yield archivo.text()).trim();
        // Aca se debe declarar las variables para manejar el string codigoFuente (control,lexema)
        let control = 0;
        let lexema = "";
        let compLex = '';
        let inicio = obtenerSiguienteComplex(codigoFuente, control, lexema, tablaSimbolos, compLex);
    });
}
