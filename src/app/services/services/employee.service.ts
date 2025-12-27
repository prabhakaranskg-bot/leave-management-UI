import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8081/api/employees';
  private deptUrl = 'http://localhost:8081/api/departments';

  constructor(private http: HttpClient) {}

  // GET all
  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // GET single by ID
  getEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // GET by department
  getByDepartment(deptId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/department/${deptId}`);
  }

  // POST
  addEmployee(emp: any): Observable<any> {
    return this.http.post(this.baseUrl, emp);
  }

  // PUT
  updateEmployee(id: number, emp: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, emp);
  }

  // DELETE
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // GET departments
  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(this.deptUrl);
  }
}
