import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class ShipsGuard implements CanActivate {
  constructor(private router: Router, private AuthenticationService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    | UrlTree {

    if (!this.AuthenticationService.globals['currentUser']) {
      return this.router.createUrlTree(['/login']);
    } else {
      return true;
    }
  }
}
