import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { CollegesComponent } from './modules/colleges/colleges.component';
import { ExamsComponent } from './modules/exams/exams.component';
import { ExamInfoComponent } from './modules/exams/components/examInfo.component';
export const routes: Routes = [
    { path: '', component: HomeComponent, },
    { path: 'colleges', component: CollegesComponent, },
    { path: 'exams', component: ExamsComponent, },
    { path: 'exams/:examId', component: ExamInfoComponent, },

];
