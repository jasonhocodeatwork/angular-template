import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterstring: string, propName: string): any {
    if (value.length===0)
      return value;
    const resultArr = [];
    for (const item of value) {
        if (item[propName]===filterstring)
          resultArr.push(item);
      }
    return resultArr;
  }

}
