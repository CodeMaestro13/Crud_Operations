import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../common/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  datasource:any;
  dataSource: Employee[]=[];
  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeNumber', 'employeeAddress','employeeGender','employeeDepartment','employeeSkills','edit','delete'];
  constructor(private employeeService : EmployeeService,private router:Router){
    this.getEmployeeList();
  }

  ngOnInit(): void {

  }

  getEmployeeList() :void{
    this.employeeService.getEmployees().subscribe(
      {
        next:(res : Employee[])=>{
          this.dataSource=res;

        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);

        }
      }
    );
  }

  // delete method in this employee-list comonent
  deleteEmployee(employeeId:number):void{
    console.log(employeeId);
    this.employeeService.deleteEmploye(employeeId).subscribe(
      {
        next: (res) =>{
          console.log(res);
          this.getEmployeeList();
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
        }
      }
    );
  }

  // update functions creation

  updateEmployee(employeeId:number):void {
    this.router.navigate(['/employee',{employeeId:employeeId}]);




  }
}
