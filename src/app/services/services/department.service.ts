import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Department {
  deptId: number;
  deptName: string;
  createdAt: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl = `${environment.apiUrl}/departments`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  add(dept: any): Observable<any> {
    return this.http.post(this.baseUrl, dept);
  }




}
