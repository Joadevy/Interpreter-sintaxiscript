import { interprete } from './interprete.js';
// Este modulo tiene como responsabilidad el manejo del input file.
// Tomamos el elemento HTML del input file.
const input = document.getElementById('input');
// Establecemos las acciones inmediatas luego de que se sube un archivo.
input === null || input === void 0 ? void 0 : input.addEventListener('change', (e) => {
    const archivos = e.target.files;
    // Si se subio al menos un archivo.
    if (archivos != null) {
        // Expresion regular que comprueba que se haya pasado un .txt
        let compruebaTXT = /\w+\.txt$/;
        // Usamos solamente el primer archivo que se haya pasado (aunque por defecto solo se puede pasar uno)
        if (compruebaTXT.test(archivos[0].name)) {
            // Llamamos a la funcion que se encargara del manejo del compilador.
            interprete(archivos[0]);
        }
        else {
            alert('Porfavor, introduce un archivo de texto .TXT');
        }
    }
});
