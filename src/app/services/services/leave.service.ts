import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveType } from './leavetypes.service';
import { Employee } from './employee.service';
import { LeaveRequestDTO } from '../../leave/leave.component';



export interface LeaveRequest {
  leaveId: number;
  employee: Employee;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status?: string;
  appliedOn: string;
  approvedBy?: number | null;
  approvedOn?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {


  private baseUrl = 'http://localhost:8081/api/leave-requests';

  constructor(private http: HttpClient) {}

  getLeaveTypes(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/api/leave-types`);
  }

  applyLeave(request: LeaveRequestDTO): Observable<LeaveRequestDTO> {
    return this.http.post<LeaveRequestDTO>(this.baseUrl, request);
  }

  getAll(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.baseUrl);
  }

  getByEmployee(empId: number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}/employee/${empId}`);
  }

  approve(leaveId: number, approverId: number): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.baseUrl}/${leaveId}/approve/${approverId}`, {});
  }

  reject(leaveId: number, approverId: number): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.baseUrl}/${leaveId}/reject/${approverId}`, {});
  }

  getByStatus(status: string): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}/status/${status}`);
  }
}
