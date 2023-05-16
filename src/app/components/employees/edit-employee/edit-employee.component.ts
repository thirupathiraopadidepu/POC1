import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  employeeDetails: Employee ={
    id: '',
    name: '',
    email: '',
    gender: '',
    phone: 0,
    salary: 0,
    department: '',
    
  };

  originalEmployeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    gender: '',
    phone: 0,
    salary: 0,
    department: '',
  };

  formSubmitted = false;

  constructor(private route: ActivatedRoute, private employeeService:
    EmployeesService, private router: Router) {}

  ngOnInit(): void{
    
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if(id){

          this.employeeService.getEmployee(id).subscribe({
            next: (response) =>{
              this.employeeDetails = response;
              this.originalEmployeeDetails = { ...response };
            }
          })
        }
      }
    })
  }

  updateEmployee() {
    if (this.employeeDetails.name && this.employeeDetails.email && this.employeeDetails.gender
        && this.employeeDetails.phone && this.employeeDetails.salary && this.employeeDetails.department) {
      // form is valid, update employee
      this.employeeService.updateEmployee(this.employeeDetails.id, this.employeeDetails)
      .subscribe({
        next: (response) =>{
          this.router.navigate(['employees']);
        }
      });
    }
  }

  clearForm(): void {
    this.employeeDetails = { ...this.originalEmployeeDetails };
  }
}
