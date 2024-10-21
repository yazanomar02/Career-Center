import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutTwoLetters'
})
export class CutTwoLettersPipe implements PipeTransform {

  transform(value: string | undefined, ...args: unknown[]): unknown {
    if(typeof(value) == 'string')
      return value.substring(0,2);
    return '';
  }

}
