import { Component, inject } from '@angular/core';
import { Alert, AlertService } from '../services/services/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  private alertService = inject(AlertService);

  // readonly signal from service
  alerts = this.alertService.alerts$;

  close(alert: Alert) {
    this.alertService.remove(alert);
  }

}
