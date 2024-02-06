import { Routes } from '@angular/router';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [
    {
        path:'',
        component:EmployeesListComponent
    },
    {
        path:'employees-list',
        component:EmployeesListComponent
    },
    {
        path:'create-employees',
        component: EmployeeFormComponent
    },
    {
        path:'employee/:id',
        component: EmployeeFormComponent
    }


];
