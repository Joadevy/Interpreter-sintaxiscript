import { interprete } from './interprete.js';
// Este modulo tiene como responsabilidad el manejo del input file.
// Tomamos el elemento HTML del input file.
const input = document.getElementById('input');
// Establecemos las acciones inmediatas luego de que se sube un archivo.
input === null || input === void 0 ? void 0 : input.addEventListener('change', (e) => {
    const archivos = e.target.files;
    // Si se subio al menos un archivo.
    if (archivos) {
        // Expresion regular que comprueba que se haya pasado un .txt
        let compruebaTXT = /\w+\.txt$/;
        // Usamos solamente el primer archivo que se haya pasado (aunque por defecto solo se puede pasar uno)
        if (compruebaTXT.test(archivos[0].name)) {
            // Llamamos a la funcion que se encargara del manejo del compilador.
            // Podria llamar a un cartel donde si selecciona analizador lexico, le muestra el lexico.
            // Si selecciona sintactico que muestre ambos
            interprete(archivos[0]);
            // DEBE BORRAR EL CARTEL DE SELECCIONAR EL ARCHIVO (SINO SE PUEDE SEGUIR INPUTEANDO COSAS)
        }
        else {
            alert('Porfavor, introduce un archivo de texto .TXT');
        }
    }
});
