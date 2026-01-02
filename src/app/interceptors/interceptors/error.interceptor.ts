import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { NotificationService } from '../../services/services/notification.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(NotificationService); 
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Something went wrong!';

      // Handle specific HTTP status codes
      if (error.status === 401) {
        message = 'You are not authenticated';
      } else if (error.status === 403) {
        message = error.error?.message || 'You do not have permission';
      } else if (error.status === 404) {
        message = 'Resource not found';
      } else if (error.status === 500) {
        message = 'Internal server error';
      } else if (error.error?.message) {
        message = error.error.message;
      }

      // Show notification
      notify.showError(message);

      return throwError(() => new Error(message));
    })
  );
};
