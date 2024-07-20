import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'million'
})
export class MillionPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
  }

}
