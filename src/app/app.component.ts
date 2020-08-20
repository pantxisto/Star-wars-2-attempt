import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashService } from './services/flash.service';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title: string;
  flash: { message: string; type: string; keepAfterLocationChange: boolean };
  flashSubscription: Subscription;
  routerSubscription: Subscription;
  constructor(
    private FlashService: FlashService,
    private router: Router,
    private cookieService: CookieService,
    private AuthenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.FlashService.clearFlashMessage();
      }
    });
    this.flashSubscription = this.FlashService.flashSubject.subscribe(
      (flash) => {
        this.flash = flash;
      }
    );
    const globalCookieString = this.cookieService.get('globals');
    const globalCookie = globalCookieString ? JSON.parse(globalCookieString) : {};
    this.AuthenticationService.globals = globalCookie;
    this.title = 'star-wars-master';
  }

  ngOnDestroy() {
    this.flashSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }
}
