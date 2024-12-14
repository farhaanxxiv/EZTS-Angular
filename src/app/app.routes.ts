import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { CollegesComponent } from './modules/colleges/colleges.component';
export const routes: Routes = [
    { path: '', component: HomeComponent, },
    { path: 'colleges', component: CollegesComponent, },
];
