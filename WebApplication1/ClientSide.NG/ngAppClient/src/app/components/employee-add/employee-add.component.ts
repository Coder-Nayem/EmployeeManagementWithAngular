import { Component, OnInit } from '@angular/core';
import { Designation } from '../../models/designation';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Experience } from '../../models/experience';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent implements OnInit {
  public designationList: Designation[] = [];
  public model!: Employee;


  constructor(private empService: EmployeeService, private router: Router) {

  }
  ngOnInit(): void {
    this.LoadDesignations();


    this.model = new Employee();

  }


  OnSubmit() {

    let test: string = '';




    //alert(JSON.stringify(this.model));


    this.empService.SaveEmployee(this.model).subscribe({
      next: () => {
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  LoadDesignations() {
    this.empService.GetDesignations().subscribe((data: Designation[]) => {
      this.designationList = data;
      console.log(data);
    }, (error) => {
      console.log('Observable emitted an error: ' + error);
    });
  }

  AddExp() {

    this.model.experiences.push(new Experience());
  }

  DeleteExp(index: number) {
    //let exp = this.model.experiences.at(index);

    const remItem = this.model.experiences.splice(index, 1);
    console.log(`Removed Items: ${remItem[0].company}`);
  }
}
