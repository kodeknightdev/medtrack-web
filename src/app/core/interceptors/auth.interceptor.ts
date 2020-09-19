import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.token;
    const isApi = request.url.startsWith(environment.apiUrl);

    if (token && isApi) {
      request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        // expired/invalid token - but don't bounce a failed login attempt
        if (err.status === 401 && isApi && !request.url.includes('/auth/')) {
          this.auth.logout();
        }
        return throwError(err);
      })
    );
  }
}
