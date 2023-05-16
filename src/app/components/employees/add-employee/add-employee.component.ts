import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  
  addEmployeeRequest = {
    id: '',
    name: '',
    email: '',
    gender: '',
    phone: 0,
    salary: 0,
    department: ''
  };

  employeeAddedMessage= '';
  showSuccessMessage = false;


  constructor(private employeeService: EmployeesService, private router: Router) {}
  ngOnInit(): void {}

  addEmployee() {
    const errorMessages = {
      name: 'Please enter a name.',
      email: 'Please enter a email address.',
      gender: 'Please enter a gender.',
      phone:  'Please enter the phone number',
      salary: 'Please enter a salary.',
      department: 'Please enter a department.'
    };
  
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const salaryInput = document.getElementById('salary') as HTMLInputElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const departmentInput = document.getElementById('department') as HTMLInputElement;
    const genderInput = document.getElementById('gender') as HTMLInputElement;
  
    let hasError = false;
  
    // Check each field for a valid value
    if (!this.addEmployeeRequest.name) {
      const errorDiv = document.createElement('div');
      errorDiv.innerHTML = errorMessages.name;
      errorDiv.style.color = 'red';
      if (nameInput && nameInput.parentNode) {
        nameInput.parentNode.insertBefore(errorDiv, nameInput.nextSibling);
        setTimeout(() => {
          errorDiv.remove();
        }, 5000);
      }
      hasError = true;
    }
    
    if (!this.addEmployeeRequest.email || !/^\S+@\S+\.\S+$/.test(this.addEmployeeRequest.email)) {
      const errorDiv = document.createElement('div');
      errorDiv.innerHTML = errorMessages.email;
      errorDiv.style.color = 'red';
      if (emailInput && emailInput.parentNode) {
        emailInput.parentNode.insertBefore(errorDiv, emailInput.nextSibling);
        setTimeout(() => {
          errorDiv.remove();
        }, 5000);
      }
      hasError = true;
    }
    
    if (!this.addEmployeeRequest.gender) {
      const errorDiv = document.createElement('div');
      errorDiv.innerHTML = errorMessages.gender;
      errorDiv.style.color = 'red';
      if (genderInput && genderInput.parentNode) {
        genderInput.parentNode.appendChild(errorDiv);
        setTimeout(() => {
          errorDiv.remove();
        }, 5000);
      }
      hasError = true;
    }
    
    if (!this.addEmployeeRequest.salary) {
      const errorDiv = document.createElement('div');
      errorDiv.innerHTML = errorMessages.salary;
      errorDiv.style.color = 'red';
      if (salaryInput && salaryInput.parentNode) {
        salaryInput.parentNode.insertBefore(errorDiv, salaryInput.nextSibling);
        setTimeout(() => {
          errorDiv.remove();
        }, 5000);
      }
      hasError = true;
    }
    
    if (!this.addEmployeeRequest.department) {
      const errorDiv = document.createElement('div');
      errorDiv.innerHTML = errorMessages.department;
      errorDiv.style.color = 'red';
      if (departmentInput && departmentInput.parentNode) {
        departmentInput.parentNode.insertBefore(errorDiv, departmentInput.nextSibling);
        setTimeout(() => {
          errorDiv.remove();
        }, 5000);
      }
      hasError = true;
    }
    
    if (!this.addEmployeeRequest.phone) {
      const errorDiv = document.createElement('div');
      errorDiv.innerHTML = errorMessages.phone;
      errorDiv.style.color = 'red';
      if (phoneInput && phoneInput.parentNode) {
        phoneInput.parentNode.insertBefore(errorDiv, phoneInput.nextSibling);
        setTimeout(() => {
          errorDiv.remove();
        }, 5000);
      }
      hasError = true;
    }
  
    if (hasError) {
      return;
    }
    
    this.employeeService.addEmployee(this.addEmployeeRequest).subscribe({
      next: (employee) => {
        this.employeeAddedMessage = 'Employee added successfully';
        setTimeout(() => {
          this.employeeAddedMessage = '';
        }, 10000);
        this.showSuccessMessage = true;
      },
      error: (err) => {
        console.error(err);
        // handle error
      }
    });
  }
  
  clearForm() {
    this.addEmployeeRequest = {
      id: '',
      name: '',
      email: '',
      gender: '',
      phone: 0,
      salary: 0,
      department: ''
    };
    const errorDivs = document.querySelectorAll('.error-message');
    errorDivs.forEach((errorDiv) => errorDiv.remove());
    this.employeeAddedMessage = '';
    this.showSuccessMessage = false;
  }
  

}
