import { Component, OnInit } from '@angular/core';
import { Designation } from '../../models/designation';
import { Employee } from '../../models/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Experience } from '../../models/experience';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.css'
})
export class EmployeeEditComponent implements OnInit {
  designationList: Designation[] = [];
  model!: Employee;
  id!: number;

  constructor(private empService: EmployeeService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {

    this.id = this.route.snapshot.params['empid'];
    this.LoadDesignations();
    this.LoadData();


  }


  OnSubmit() {

    let test: string = '';




    


    this.empService.UpdateEmployee(this.model).subscribe({
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
    }, (error: string) => {
      console.log('Observable emitted an error: ' + error);
    });
  }
  LoadData() {
    this.empService.GetEmployee(this.id).subscribe((data: Employee) => {
      this.model = data;
      console.log(data);
    }, (error: string) => {
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
