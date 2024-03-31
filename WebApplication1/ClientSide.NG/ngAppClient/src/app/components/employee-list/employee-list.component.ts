import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {

  empList: Employee[] = [];



  constructor(private service: EmployeeService) {

  }


  ngOnInit(): void {
    this.LoadData();
  }


  LoadData() {
    this.service.GetEmployees().subscribe((response: Employee[]) => {
      this.empList = response;
      console.log(response);
    },
      (err: any) => {
        console.log(err);
      })


  }
  DeleteEmployee(emp: Employee) {
    let confirmDelete: boolean = confirm(`Delete ${emp.name}?`);
    if (confirmDelete) {
      this.service.DeleteEmployee(emp.id).subscribe(() => {
        this.LoadData();
      }, (error) => {
        console.log('Observable emitted an error: ' + error);
      });
    }
  }


}
