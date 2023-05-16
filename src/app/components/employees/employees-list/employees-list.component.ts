import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeesService, private toastr: ToastrService) {
    console.log(this.toastr);
  }


  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }

  deleteEmployee(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.employees = this.employees.filter((employee) => employee.id !== id);

          // Display a success message to the user with the position class
          this.toastr.success('Record successfully deleted!', 'Success!', { positionClass: 'toast-top-right' });
          
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
  }
}
