import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id?: number;
  username: string;
  password?: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = `${environment.apiUrl}/users`;
  private authApi = `${environment.apiUrl}/auth/login`;

  constructor(private http: HttpClient) {}

  doLogin(data: any): Observable<any> {
    return this.http.post(this.authApi, data);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  createUser(data: User): Observable<User> {
    return this.http.post<User>(this.api, data);
  }

  updateUser(id: number, data: User): Observable<User> {
    return this.http.put<User>(`${this.api}/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
