import { Routes } from '@angular/router';
import { DepartmentComponent } from './department/department/department.component';
import { EmployeeComponent } from './employee/employee/employee.component';

export const routes: Routes = [
    { path: 'departments', component: DepartmentComponent },
    { path: 'employees', component: EmployeeComponent },
    { path: '', redirectTo: 'departments', pathMatch: 'full' }
  ];