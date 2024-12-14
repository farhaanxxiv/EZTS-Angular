import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'rankBy'
})
export class RankByCollegePipe implements PipeTransform {

  transform(colleges: any[], filterBy: string): any[] {
    if (!colleges || !filterBy) {
      return colleges;
    }

    if (filterBy === 'count') {
      return colleges.sort((a, b) => {
        const aStudentCount = a.students.length;
        const bStudentCount = b.students.length;
        return bStudentCount - aStudentCount;
      });
    } else {
      return colleges.sort((a, b) => {
        const aStudentCount = a.students.length;
        const bStudentCount = b.students.length;
        return aStudentCount - bStudentCount;
      });
    }


  }
}
