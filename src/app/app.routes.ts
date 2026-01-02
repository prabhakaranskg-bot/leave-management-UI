import { Routes } from '@angular/router';
import { DepartmentComponent } from './department/department/department.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { HolidayComponent } from './holiday/holiday.component';
import { LeaveComponent } from './leave/leave.component';
import { LeavetypesComponent } from './leavetypes/leavetypes.component';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';


export const routes: Routes = [
    { path: 'departments', component: DepartmentComponent },
    { path: 'employees', component: EmployeeComponent },
    { path: 'holidays', component: HolidayComponent },
    { path: 'leave-requests', component: LeaveComponent },
    { path: 'leave-types', component: LeavetypesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UserListComponent },
    { path: '', redirectTo: 'departments', pathMatch: 'full' }
  ];