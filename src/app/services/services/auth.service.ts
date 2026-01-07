import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // LOGIN -> /auth/login
  login(credentials: any) {
    return this.http.post<any>(`${this.base}/auth/login`, credentials);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const decoded: any = jwtDecode(token);
    return decoded.roles || [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  // USER CRUD -> /api/users/**
  getAllUsers() {
    return this.http.get(`${this.base}/users`);
  }

  getUser(id: number) {
    return this.http.get(`${this.base}/users/${id}`);
  }

  createUser(data: any) {
    return this.http.post(`${this.base}/users`, data);
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.base}/users/${id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.base}/users/${id}`);
  }
}
