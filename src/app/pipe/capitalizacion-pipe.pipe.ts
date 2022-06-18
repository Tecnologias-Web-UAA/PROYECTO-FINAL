import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizacionPipe'
})
export class CapitalizacionPipePipe implements PipeTransform {

  transform(value: string, todas: boolean = true): string {
    //cambiar todo a minusculas
    value = value.toLowerCase();
    //Separar a un arreglo las palabras
    let nombres = value.split(" ");
    
    if (todas) {
      for (let i in nombres) {
        //Poner en mayuscula la primer letra de cada palabra
        nombres[i] = nombres[i][0].toUpperCase() + nombres[i].substr(1);
      }
    } else {
      nombres[0] = nombres[0][0].toUpperCase() + nombres[0].substr(1);
    }
    //unir todas las palabras de nuevo.
    return nombres.join(" ");
  }

}
