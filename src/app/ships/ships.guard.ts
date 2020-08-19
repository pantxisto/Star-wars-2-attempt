import {
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class ShipsGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    | UrlTree {
    const globalCookie = this.cookieService.get('globals');
    const parsedGlobalCookie = globalCookie ? JSON.parse(globalCookie) : {};
    if (!parsedGlobalCookie['currentUser']) {
      return this.router.createUrlTree(['/login']);
    } else {
      return true;
    }
  }
}
