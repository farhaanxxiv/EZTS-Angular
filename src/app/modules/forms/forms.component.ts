import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/DataService';
import { RouterLink } from '@angular/router';
import { Form } from '../../models/Forms';

@Component({
    selector: 'forms',
    templateUrl: 'forms.component.html',
    imports: [RouterLink]
})

export class FormsComponent implements OnInit {

    allForms: Form[] = [];

    genderCount = {
        male: 0,
        female: 0,
        other: 0
    }


    countGender = (gender: string): number => {
        return this.allForms.filter((person) => person.gender === gender).length;
    };

    constructor(private dataService: DataService) {
        this.allForms = dataService.getForms();
        this.initData()
    }

    initData(): void {
        console.log(this.allForms.length)
        this.genderCount.male = this.countGender('Male')
        this.genderCount.female = this.countGender('Female')
        this.genderCount.other = this.countGender('Other')

    }

    calculatePercentage(count: number): number {
        if (this.allForms.length === 0) return 0;
        return Number(((count / this.allForms.length) * 100).toFixed(1));
      }

    ngOnInit() { }

}