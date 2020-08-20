import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  loginSubscription: Subscription;
  isAuthenticated: boolean;
  constructor(
    private AuthenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loginSubscription = this.AuthenticationService.loginSubject.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      }
    );

    if (!this.AuthenticationService.globals['currentUser']) {
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
