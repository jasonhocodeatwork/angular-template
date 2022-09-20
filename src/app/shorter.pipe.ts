import { Pipe, PipeTransform } from "@angular/core";

//shorter.pipe.ts
@Pipe({
    name: 'shorter'
})
export class ShorterPipe implements PipeTransform {
    transform(value: any, limit: number, divdeBy2: boolean) {
        // transform always need return sth
        if (divdeBy2) 
            return value.substr(0, limit/2) + '...';
        if (value.length>limit)
            return value.substr(0, limit) + '...';
        return value;
    }
}