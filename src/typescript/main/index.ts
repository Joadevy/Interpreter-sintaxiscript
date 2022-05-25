import {esConstEntera} from "../Automatas/constanteEntera";

// Muestra el contenido del archivo en el HTML, es la input del analizador lexico.
 async function mostrarArchivo(file:File):Promise<void> {
   // if (typeof file == .txt) que haga esto, sino un alert('Ingrese archivo .txt') para evitar errores.
    let contenido:string = await file.text();
    let output = document.getElementById('output');
    if (output){
      output.textContent = contenido;
      // llama a la funcion ObtenerSiguienteCompLex para empezar a reconocer las cadenas.
    }else{
      alert('Ha ocurrido un error, intentalo de nuevo.');
    }
    let resultado:boolean= esConstEntera('1234');
    if (resultado){
      console.log('CADENA VALIDA')
    } else {
      console.log('CADENA NO VALIDA');
    }
  }

  let tablaSimbolos: object = {
  // Tiene la forma de lexema: componente lexico, se ira actualizando a medida que se encuentren identificadores.
  'program':'PROGRAM',
  'while':'WHILE',
  'for':'FOR',
  'if':'IF',
  'then':'THEN',
  'else':'ELSE',
  'do':'DO',
  ',':',',
  '[':'[',
  ']':']',
  '{':'{',
  '}':'}',
  ':':':',
  '>' : 'opRel',
  '<' : 'opRel',
  '>=' : 'opRel',
  '<=' : 'opRel',
  '==' : 'opRel',
  '!=' : 'opRel',
  "=" : 'opAsignacion',
};