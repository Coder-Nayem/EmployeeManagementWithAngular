import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { Designation } from '../models/designation';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  apiUrl: string = "https://localhost:7058/api/Employees";
  constructor(private http: HttpClient) {

  }

  public GetEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(this.apiUrl);
  }

  public GetEmployee(id: number): Observable<Employee> {

    return this.http.get<Employee>(this.apiUrl + '/' + id);
  }
  public SaveEmployee(employee: any): Observable<any> {

    return this.http.post(this.apiUrl, employee);
  }
  public UpdateEmployee(employee: Employee): Observable<Employee> {

    return this.http.put<Employee>(this.apiUrl + '/' + employee.id, employee);
  }
  public DeleteEmployee(id: number): Observable<any> {

    return this.http.delete(this.apiUrl + '/' + id);
  }


  public GetDesignations(): Observable<Designation[]> {

    return this.http.get<Designation[]>("https://localhost:7058/api/Designations");
  }
}
