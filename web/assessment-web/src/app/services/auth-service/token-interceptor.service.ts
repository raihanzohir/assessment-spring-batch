import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthenticationService } from './auth-service';
import { environment } from '../../../environments/environment';
import { SessionTimerService } from 'src/app/services/session-timer.service';
import Swal from 'sweetalert2';
import { NavigationService } from 'src/@vex/services/navigation.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
    private sessionTimerService: SessionTimerService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const jwtToken = this.authService.getJwt();
    const url = JSON.stringify(req.url);

    if(jwtToken && url.includes(environment.baseUrl)){
      const header = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
      });
      console.log(header);
      //return next.handle(header);

      return next.handle(header).pipe(
        catchError(error => {
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['login']);
            this.sessionTimerService.clearInterval();
            Swal.fire({
              title: "Unauthorized Access. Logged out!",
              text: error.error,
              icon: "error"
            });
          }
          return throwError(error);
        })
      );
      
    }

    return next.handle(req);

  }
}
