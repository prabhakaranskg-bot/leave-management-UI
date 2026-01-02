import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showError(message: string) {
    // You can replace this with Toastr or any modal
    alert(message);
  }
}
