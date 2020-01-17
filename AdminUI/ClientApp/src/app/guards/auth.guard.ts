import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
      private authSvc: AuthService,
      private router: Router
  ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authSvc.isLogedIn) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
  }
}
