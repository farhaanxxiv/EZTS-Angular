import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rankBy'
})
export class RankByPipe implements PipeTransform {

  transform(colleges: any[], field: string): any[] {
    if (!colleges || !field) {
      return colleges;
    }
    
    return colleges.sort((a, b) => {
      const aStudentCount = a[field].length;
      const bStudentCount = b[field].length;
      return bStudentCount - aStudentCount;
    });
  }
}
