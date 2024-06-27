import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild{
  constructor(private authService: AuthenticationService, 
    private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.getIsAuthenticated() || this.authService.getJwt() === null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  
  canLoad(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getIsAuthenticated() && this.authService.getJwt() !== null) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
