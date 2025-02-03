import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeResolver } from './employee-reslover';

const routes: Routes = [
  {path: 'header',component:HeaderComponent},
  {path: 'employee',component:EmployeeFormComponent,resolve:{employee:EmployeeResolver} },
  {path: 'employee-list',component:EmployeeListComponent},
  {path: '',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
