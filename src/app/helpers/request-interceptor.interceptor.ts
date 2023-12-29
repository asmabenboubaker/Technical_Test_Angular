import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RequestInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;
    let token = this.tokenService.getToken();
    if (token != null) {
      authReq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
      console.log(error);
      if (error.status == 401 || error.status == 403) {
        // handling unauthorized errors or token expired
        if (token != null) {
          this.authService.logout();
        } else {
          this.tokenService.removeToken();
          // sessionStorage.removeItem("permissions");
          // this.permissionService.flushPermissions();
          this.router.navigate(["/login"]);
        }
      }
      return throwError(() => new Error('Authentication error'));
    }));
  }
}
