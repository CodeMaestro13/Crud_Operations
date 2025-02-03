import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { EmployeeService } from "./services/employee.service";
import { inject } from "@angular/core";
import { Observable, of } from "rxjs";
import { Employee } from "./common/employee";

export const EmployeeResolver: ResolveFn<any> =
    (route :ActivatedRouteSnapshot,
          state:RouterStateSnapshot,
          employeeService:EmployeeService=inject(EmployeeService)) :Observable<Employee> => {

            const employeeId=route.paramMap.get("employeeId");

            // check if employeeid is present then make api call otherwise not
            if(employeeId){
              // make api call and get data for employee id
              return employeeService.getEmployee(Number(employeeId));
            }
            else{
              // create and return empty employee details
              const employee : Employee={
                employeeId:0,
                employeeName:'',
                employeeContactNumber:'',
                employeeAddress:'',
                employeeGender:'',
                employeeDepartment:'',
                employeeSkills:'',
              }

              return of(employee);
            }



          }

