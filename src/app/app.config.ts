import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/interceptors/auth.interceptor';
import { errorInterceptor } from './interceptors/interceptors/error.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor,errorInterceptor])
    )],
};
