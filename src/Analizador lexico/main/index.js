
// Muestra el contenido del archivo en el HTML, es la input del analizador lexico.
 async function mostrarArchivo(file) {
    let contenido = await file.text();
    document.getElementById('output').textContent = contenido;
  }