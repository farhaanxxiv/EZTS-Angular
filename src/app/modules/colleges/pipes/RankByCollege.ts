import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'rankBy'
})
export class RankByCollegePipe implements PipeTransform {

  transform(colleges: any[]): any[] {
    if (!colleges) {
      return colleges;
    }

    return colleges.sort((a, b) => {
      const aStudentCount = a.students.length;
      const bStudentCount = b.students.length;
      return bStudentCount - aStudentCount;
    });



  }

}
