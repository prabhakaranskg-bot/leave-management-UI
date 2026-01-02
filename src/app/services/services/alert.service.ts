import { Injectable, signal, WritableSignal } from '@angular/core';

export interface Alert {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  autoClose?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // 🔔 signal store
  alerts: WritableSignal<Alert[]> = signal<Alert[]>([]);

  // 👉 read-only version if needed in components
  get alerts$() {
    return this.alerts.asReadonly();
  }

  // ⭐ generic add
  add(alert: Alert) {
    this.alerts.update(list => [...list, alert]);

    // Auto remove if autoClose enabled
    if (alert.autoClose) {
      setTimeout(() => this.remove(alert), 4000);
    }
  }

  // 🟢 success
  success(message: string, autoClose = true) {
    this.add({ type: 'success', message, autoClose });
  }

  // 🔴 error
  error(message: string, autoClose = true) {
    this.add({ type: 'error', message, autoClose });
  }

  // 🔵 info
  info(message: string, autoClose = true) {
    this.add({ type: 'info', message, autoClose });
  }

  // 🟡 warning
  warning(message: string, autoClose = true) {
    this.add({ type: 'warning', message, autoClose });
  }

  // ❌ remove single alert
  remove(alert: Alert) {
    this.alerts.update(list => list.filter(a => a !== alert));
  }

  // 🧹 clear all
  clear() {
    this.alerts.set([]);
  }
}
