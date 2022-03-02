import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut'
})
export class CutPipe implements PipeTransform {

  transform(value: string, limit: number = 25, def: string = '...'): string {
    if(value.length > limit){
      return value.substr(0, limit) + def;
    }
    return value;
  }
}
