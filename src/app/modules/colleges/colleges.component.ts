import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/DataService';
import { CollegeRankbyComponent } from './components/college-rankby.component';
import { TableModule } from 'primeng/table';
import { College } from '../../models/Colleges';
import { ExamResults } from '../../models/ExamResults';




@Component({
    selector: 'colleges',
    templateUrl: 'colleges.component.html',
    styleUrls: ['colleges.component.scss'],
    imports: [CollegeRankbyComponent]
})

export class CollegesComponent implements OnInit {

    allColleges: College[] = []
    allExams: ExamResults[] = []

    rankByStudents = this.allColleges

    constructor(private dataService: DataService) {
        this.allColleges = dataService.getColleges()
        this.allExams = dataService.getExamResults()

    }

    ngOnInit() {
        console.log("hello")
    }
}