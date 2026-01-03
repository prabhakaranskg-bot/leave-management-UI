import { HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const expiry = Number(localStorage.getItem('token_expiry'));

  // don't attach token for login
  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  // ---- check token expiry before request ----
  if (expiry && Date.now() > expiry) {
    localStorage.clear();
    router.navigate(['/login']);
    return next(req);  // or simply stop request by not sending token
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    // ---- if backend sends 401, logout too ----
    catchError((err) => {
      if (err.status === 401) {
        localStorage.clear();
        router.navigate(['/login']);
      }
      throw err;
    })
  );
};