import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/DataService';

interface Student {
    studentId: number;
    name: string;
    collegeId: number;
    year: number;
    examResults: Object[];
}


@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
    imports: []
})

export class HomeComponent implements OnInit {

    data: Student[] = []

    constructor(private dataService: DataService) {
        this.data = this.dataService.getStudents()
    }

    name = 'Vivek'

    ngOnInit() {
        this.name = "vivek"
        console.log("hello")

    }
}