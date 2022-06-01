export function creaTabla(tablaTransiciones:Array<any>,cantidadSimbolos:number):void{
    // Creando cada subArray para cargar los datos en la tabla
      for (let celdas = 0; celdas < cantidadSimbolos; celdas++){
        tablaTransiciones.push([]);
      } 
  }