import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AlertComponent } from "./alert/alert.component";

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
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        this.showNavbar = !event.url.includes('user-login');
      }
    });
  }
}
