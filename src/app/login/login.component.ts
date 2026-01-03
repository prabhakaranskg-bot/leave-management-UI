import { AlertService } from './../services/services/alert.service';
import { AuthService } from './../services/services/auth.service';
import { Component } from '@angular/core';
import { UserService } from '../services/services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = { username: '', password: '' };

  constructor(private alertService: AlertService,private userService: UserService, private router: Router, private authService:  AuthService) {}

  doLogin() {
    this.authService.login(this.loginForm).subscribe({
      next: (res) => {
        console.log(res);
        const token: string = res.token;
        localStorage.setItem('token', token);
        this.alertService.success('Login Success');
        this.router.navigate(['/users']);   // go to user list after login
      },
      error: () => {
        this.alertService.warning('Invalid username or password');
      }
    });
  }
}
