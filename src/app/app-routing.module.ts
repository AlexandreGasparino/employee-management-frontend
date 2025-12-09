import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// componentes standalone
import { LoginComponent } from './pages/login/login';
import { EmployeesListComponent } from './pages/employees-list/employees-list';
import { EmployeeFormComponent } from './pages/employee-form/employee-form';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'employees',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: EmployeesListComponent },
      { path: 'new', component: EmployeeFormComponent },
      { path: ':id', component: EmployeeFormComponent }
    ]
  },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: '**', redirectTo: '/employees' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}