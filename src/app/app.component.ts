import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertComponent } from "./alert/alert.component";
import { AlertService } from './services/services/alert.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Leave-management-app';
  showNavbar = true;
  constructor(private router: Router,private alertService:AlertService) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.showNavbar = !event.url.includes('user-login');
      }
    });
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.alertService.info("Logged out successfully");
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const exp = Number(localStorage.getItem('token_expiry'));
  
    if (!token || !exp) return false;
  
    return Date.now() < exp;
  }
  
}
