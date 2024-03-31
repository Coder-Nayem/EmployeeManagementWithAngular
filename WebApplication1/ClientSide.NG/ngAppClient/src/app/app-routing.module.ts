import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';

const routes: Routes = [
  {
    path: "list", component: EmployeeListComponent
  }
  ,

  {
    path: "", redirectTo: "list", pathMatch: "full"
  }
  , {
    path: "add", component: EmployeeAddComponent
  }
  , {
    path: "edit/:empid", component: EmployeeEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
