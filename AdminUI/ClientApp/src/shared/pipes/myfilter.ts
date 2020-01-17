import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilter implements PipeTransform {
    transform(items: any[], filter: any): any {

        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item.name.toLowerCase().indexOf(filter.toLowerCase()) != -1 || item.email.toLowerCase().indexOf(filter.toLowerCase()) != -1 || item.phone.toLowerCase().indexOf(filter.toLowerCase()) != -1);
    }

}
