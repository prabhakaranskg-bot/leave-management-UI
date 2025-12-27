import { Component } from '@angular/core';
import { DepartmentService } from '../../services/services/department.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
  departments: any[] = [];
  showAddForm = false;
  deptName = '';

  constructor(private deptService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments() {
    this.deptService.getAll().subscribe(res => {
      this.departments = res;
    });
  }

  toggleForm() {
    this.showAddForm = !this.showAddForm;
  }

  saveDepartment() {
    const body = { deptName: this.deptName };

    this.deptService.add(body).subscribe(() => {
      this.deptName = '';
      this.showAddForm = false;
      this.loadDepartments();
    });
  }
}
