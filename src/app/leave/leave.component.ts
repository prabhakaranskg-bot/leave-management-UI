import { Component, OnInit } from '@angular/core';
import { LeaveRequest, LeaveService } from '../services/services/leave.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LeaveRequestDTO {
  employeeId: number;
  leaveTypeId: number;
  startDate: string;
  endDate: string;
  reason: string;
}

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css'
})
export class LeaveComponent implements OnInit{
  leaveRequests: LeaveRequest[] = [];
  leaveTypes: any[] = [];

  showForm = false;

  // form fields
  empId!: number;
  leaveTypeId!: number;
  startDate!: string;
  endDate!: string;
  reason!: string;
  approverId: number | null = null;


  approverIds: any = {};

  form: any = {
    empId: '',
    leaveTypeId: '',
    startDate: '',
    endDate: '',
    reason: '',
    approverId: '',
    managerId: ''
  };



  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.loadLeaveTypes();
    this.loadAll();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  loadLeaveTypes() {
    this.leaveService.getLeaveTypes().subscribe(data => {
      this.leaveTypes = data;
    });
  }

  loadAll() {
    this.leaveService.getAll().subscribe(res => this.leaveRequests = res);
  }

  applyLeave() {
    const req: LeaveRequestDTO = {
      employeeId: this.form.employeeId,
      leaveTypeId: Number(this.form.leaveTypeId),
      startDate: this.form.startDate,
      endDate: this.form.endDate,
      reason: this.form.reason
    };
    console.log(req);  
    this.leaveService.applyLeave(req).subscribe(() => {
      alert("Leave applied successfully");
      this.showForm = false;
      this.loadAll();
    });
  }

  approve(req: LeaveRequest,approverId: any) {
    if (!approverId) {
      alert("Enter approver id first");
      return;
    }
    this.leaveService.approve(req.leaveId!, approverId).subscribe(() => {
      this.loadAll();
    });
  }

  reject(req: LeaveRequest,approverId: any) {
    if (!approverId) {
      alert("Enter approver id first");
      return;
    }

    this.leaveService.reject(req.leaveId!, approverId).subscribe(() => {
      this.loadAll();
    });
  }
}
