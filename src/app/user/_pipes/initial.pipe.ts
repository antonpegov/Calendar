import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initial'
})
export class InitialPipe implements PipeTransform {

  transform(value: string, args?: string[]): any {
    if (!value) return value;
    
    //return value.replace(/\w\S*/g, function(txt) {
      return value.charAt(0).toUpperCase()+'.';
    //});
  }

}
