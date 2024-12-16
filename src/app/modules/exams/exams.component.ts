import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/DataService';
import { Exams } from '../../models/Exams';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'exams',
    templateUrl: 'exams.component.html',
    imports: [RouterLink]
})

export class ExamsComponent implements OnInit {

    allExams: Exams[] = [];


    constructor(private dataService: DataService) {
        this.allExams = dataService.getExams();
    }

    ngOnInit() { }
}