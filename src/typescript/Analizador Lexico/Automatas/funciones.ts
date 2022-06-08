export function creaTabla(tablaTransiciones:Array<any>,cantidadEstados:number):void{
    // Creando cada subArray para cargar los datos en la tabla
      for (let celdas = 0; celdas < cantidadEstados; celdas++){
        tablaTransiciones.push([]);
      } 
  }