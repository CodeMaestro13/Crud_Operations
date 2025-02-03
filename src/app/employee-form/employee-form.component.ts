import { EmployeeService } from './../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../common/employee';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit{

  isCreateEmployee:boolean=true;
  employee:any;
  // array create kla
  skills:string[]=[];

  constructor( private employeeService:EmployeeService,
    private router:Router,private activatedRoute:ActivatedRoute){

  }
  ngOnInit(): void {
    this.employee=this.activatedRoute.snapshot.data['employee'];

    console.log(this.employee);

    if(this.employee && this.employee.employeeId >0){
      this.isCreateEmployee=false;
      if(this.employee.employeeSkills != ''){
        this.skills=[];
        this.skills=this.employee.employeeSkills.split(',');
      }
    }
    else{
      this.isCreateEmployee=true;
    }


  }

  checkGender(gender:string){
    return this.employee.employeeGender !=null && this.employee.employeeGender==gender;


  }

  checkSkills(skill:string){
    return this.employee.employeeSkills!=null && this.employee.employeeSkills.includes(skill);
  }

  saveEmployee(employeeForm:NgForm):void {
   // we have to call service here so first create service
   // use employeeService



   // we have to check if we are creating or updating existing record so for this if condiditon used

   if(this.isCreateEmployee){
    delete this.employee.employeeId;
    // console.log(this.employee);



    this.employeeService.saveEmployee(this.employee).subscribe(
      {
        next:(res:Employee) =>{
          console.log(res);
          console.log(res);

          employeeForm.reset();
          this.employee.employeeGender='';
          this.skills=[];
          this.employee.employeeSkills='';
          this.router.navigate(["/employee-list"]);

        },
        error:(err :HttpErrorResponse) =>{
          console.log(err);
        }
      }

    );

   }
   else{

    // else update kra form
    this.employeeService.updateEmployee(this.employee).subscribe(
      {
        next:(res:Employee) =>{
          this.router.navigate(["/employee-list"]);
        },
        error:(err:HttpErrorResponse) =>{
          console.log(err);

        }
      }
    );

   }
  }

  selectGender(gender:string):void{
    this.employee.employeeGender=gender;
  }

  onSkillsChanges(event:any):void {
    console.log(event);
    if(event.checked){
      this.skills.push(event.source.value);
    }else{
      this.skills.forEach(
        (item,index)=>{
          if(item==event.source.value){
            this.skills.splice(index,1);
          }
        }
      );
    }
    this.employee.employeeSkills=this.skills.toString();
  }
}
