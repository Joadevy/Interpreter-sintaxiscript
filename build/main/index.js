import { mostrarArchivo } from '../Analizador Lexico/index.js';
// Muestra el contenido del archivo en el HTML, es la input del analizador lexico.
const input = document.getElementById('input');
input === null || input === void 0 ? void 0 : input.addEventListener('change', (e) => {
    const archivos = e.target.files;
    // Si se subio al menos un archivo.
    if (archivos != null) {
        // Expresion regular que comprueba que se haya pasado un .txt
        let compruebaTXT = /\w+\.txt$/;
        // Usamos solamente el primer archivo que se haya pasado (aunque por defecto solo se puede pasar uno)
        if (compruebaTXT.test(archivos[0].name)) {
            mostrarArchivo(archivos[0]);
        }
        else {
            alert('Porfavor, introduce un archivo de texto .TXT');
        }
    }
});
