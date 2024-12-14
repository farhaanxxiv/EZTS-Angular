import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/DataService';
import { CollegeRankbyComponent } from './components/college-rankby.component';


interface College {
    "collegeId": Number,
    "collegeName": String,
    "location": String,
    "students": Number[]
}
@Component({
    selector: 'colleges',
    templateUrl: 'colleges.component.html',
    styleUrls: ['colleges.component.scss'],
    imports:[CollegeRankbyComponent]
})

export class CollegesComponent implements OnInit {

    allColleges: College[] = []

    rankByStudents = this.allColleges 

    constructor(private dataService: DataService) {
        this.allColleges = dataService.getColleges()
    }



    ngOnInit() {
        console.log("hello")
    }
}