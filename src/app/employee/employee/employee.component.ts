import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  employees: any[] = [];
  departments: any[] = [];
  showAddForm = false;
  // form
  showForm = false;
  isEdit = false;
  editId: number | null = null;

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  selectedDeptId: any = '';
  joinDate: any = '';

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
  }

  loadEmployees(): void {
    this.empService.getAllEmployees().subscribe({
      next: data => this.employees = data,
      error: err => console.error(err)
    });
  }

  loadDepartments(): void {
    this.empService.getDepartments().subscribe({
      next: data => this.departments = data,
      error: err => console.error(err)
    });
  }

  toggleForm(edit: boolean = false, emp?: any): void {
    this.showForm = !this.showForm;
    this.isEdit = edit;
    if (edit && emp) {
      this.editId = emp.empId;
      this.firstName = emp.firstName;
      this.lastName = emp.lastName;
      this.email = emp.email;
      this.phone = emp.phone;
      this.selectedDeptId = emp.department?.deptId;
      this.joinDate = emp.joinDate;
    } else {
      this.resetForm();
    }
  }

  saveEmployee(): void {
    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      department: { deptId: this.selectedDeptId },
      joinDate: this.joinDate
    };

    if (this.isEdit && this.editId) {
      this.empService.updateEmployee(this.editId, body).subscribe({
        next: () => {
          this.resetForm();
          this.loadEmployees();
        },
        error: err => console.error(err)
      });
    } else {
      this.empService.addEmployee(body).subscribe({
        next: () => {
          this.resetForm();
          this.loadEmployees();
        },
        error: err => console.error(err)
      });
    }
  }

  deleteEmployee(id: number): void {
    if (!confirm("Are you sure you want to delete?")) return;
    this.empService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: err => console.error(err)
    });
  }

  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.selectedDeptId = '';
    this.joinDate = '';
    this.isEdit = false;
    this.editId = null;
  }

  cancel(): void {
    this.showForm = false;   // always close
    this.isEdit = false;     // exit edit mode
    this.resetForm();        // clear fields
  }

}
