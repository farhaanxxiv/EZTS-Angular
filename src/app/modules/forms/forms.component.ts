import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/DataService';
import { RouterLink } from '@angular/router';
import { Form } from '../../models/Forms';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchCountryField, CountryISO } from 'ngx-intl-tel-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input'

@Component({
    selector: 'forms',
    templateUrl: 'forms.component.html',
    imports: [RouterLink, FormsModule, ReactiveFormsModule, NgxIntlTelInputModule]
})

export class FormsComponent implements OnInit {

    allForms: Form[] = [];

    minDate: string = "";

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

    ngOnInit() {
        const today = new Date();
        this.minDate = today.toISOString().split('T')[0];
    }

    leadForm = new FormGroup({

        name: new FormControl('', [
            Validators.required,
            Validators.minLength(10)
        ]),
        email: new FormControl('', [
         
        ]),
        phone: new FormControl(null, [
            Validators.required,
            Validators.min(1000000000),
            Validators.max(9999999999)
        ]),
        course: new FormControl(''),
        gender: new FormControl(''),
        knowledge: new FormControl('0'),
        student: new FormControl(''),
        photo: new FormControl(),
        ide: new FormControl(''),
        date: new FormControl(new Date()),
        why: new FormControl(''),
        password: new FormControl(''),

    });

    isFormSubmitting: boolean = false;

    onSubmit() {
        this.isFormSubmitting = true;
        const formValues = this.leadForm.value;

        const formattedValues = JSON.stringify(formValues, null, 2);

        setTimeout(() => {
            //upload images, or to db
            this.isFormSubmitting = false;
            alert('Form Contents:\n' + formattedValues);

        }, 3000);
    }

    isFieldTouched(fieldName: string): boolean {
        const field = this.leadForm.get(fieldName);
        return !!field && (field.dirty || field.touched);
    }

    hasError(fieldName: string, errorType: string): boolean {
        const field = this.leadForm.get(fieldName);
        return !!field && field.hasError(errorType) && (field.dirty || field.touched);
    }

    getMinLength(fieldName: string): number {
        const field = this.leadForm.get(fieldName);
        return field?.hasError('minlength')
            ? field.getError('minlength').requiredLength
            : 0;
    }
    getMaxLength(fieldName: string): number {
        const field = this.leadForm.get(fieldName);
        return field?.hasError('maxlength')
            ? field.getError('maxlength').requiredLength
            : 0;
    }



    separateDialCode = false;
    SearchCountryField = SearchCountryField;
    CountryISO = CountryISO;
    preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
}