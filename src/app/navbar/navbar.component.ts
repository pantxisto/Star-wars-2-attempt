import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  loginSubscription: Subscription;
  isAuthenticated: boolean;
  constructor(
    private cookieService: CookieService,
    private AutheticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginSubscription = this.AutheticationService.loginSubject.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
    const globalCookie = this.cookieService.get('globals');
    const parsedGlobalCookie = globalCookie ? JSON.parse(globalCookie) : {};
    if (!parsedGlobalCookie['currentUser']) {
      console.log('false');
      this.isAuthenticated = false;
    } else {
      console.log('true');
      this.isAuthenticated = true;
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
