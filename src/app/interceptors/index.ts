import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

export const httpInterceptorProviders = [
  // La clé multi  prévient que vous allez certainement ajouter plusieurs intercepteurs à la clé HTTP_INTERCEPTORS  .
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];