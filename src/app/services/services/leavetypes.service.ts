import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LeaveType {
  leaveTypeId: number;
  leaveCode: string;
  leaveName: string;
  annualAllocation: number;
  carryForward: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class LeavetypesService {

  private baseUrl = 'http://localhost:8081/api/leave-types';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LeaveType[]> {
    return this.http.get<LeaveType[]>(this.baseUrl);
  }

  create(lt: LeaveType): Observable<LeaveType> {
    return this.http.post<LeaveType>(this.baseUrl, lt);
  }

  update(id: number, lt: LeaveType): Observable<LeaveType> {
    return this.http.put<LeaveType>(`${this.baseUrl}/${id}`, lt);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
