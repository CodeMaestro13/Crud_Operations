import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../common/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient){ }

  api="http://localhost:8080"

  public saveEmployee(employee:Employee) :Observable<Employee>{
    console.log(employee);
    return  this.http.post<Employee>(`${this.api}/save/employee`,employee)
  }

  // get method
  public getEmployees():Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.api}/get/employee`);
  }


  // delete method

  public deleteEmploye(employeeId:number){
    return this.http.delete(`${this.api}/delete/employee/${employeeId}`);

  }

  // get single employeedata in form when click on edit button in table method

  public getEmployee(employeeId:number){
    return this.http.get<Employee>(`${this.api}/get/employee/${employeeId}`);
  }

  // update method used

  public updateEmployee(employee:Employee){
    return this.http.put<Employee>(`${this.api}/update/employee`,employee);
  }

}
