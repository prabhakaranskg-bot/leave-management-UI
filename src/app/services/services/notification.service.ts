import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private alertService: AlertService) { }

  showError(message: string) {
    // You can replace this with Toastr or any modal
    this.alertService.error(message);
  }
}
