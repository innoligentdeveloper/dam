import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abiertacerrada'
})
export class AbiertacerradaPipe implements PipeTransform {

  transform(value: number): string {
    if (value==1){
      return "ABIERTA";  
    }
    if (value==0){
      return "CERRADA";  
    }
    return null;
  }

}
