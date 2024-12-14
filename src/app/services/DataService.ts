import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private students = require('../data/students.json');
  private exams = require('../data/exams.json');
  private colleges = require('../data/colleges.json');
  private examResults = require('../data/examResults.json');

  constructor() {}

  getStudents() {
    return this.students;
  }

  getExams() {
    return this.exams;
  }

  getColleges() {
    return this.colleges;
  }

  getExamResults() {
    return this.examResults;
  }
}
