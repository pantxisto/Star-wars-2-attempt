import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  globals: {};
  loginSubject = new Subject<boolean>();
  constructor(
    private cookieService: CookieService,
    private UserService: UserService
  ) {}

  Login(username, password, callback) {
    /* Dummy authentication for testing, uses $timeout to simulate api call
     ----------------------------------------------*/
    setTimeout(() => {
      var response;
      this.UserService.GetByUsername(username).then((user) => {
        if (user !== null && user.password === password) {
          response = { success: true };
        } else {
          response = {
            success: false,
            message: 'Username or password is incorrect',
          };
        }
        callback(response);
      });
    }, 1000);

    /* Use this for real authentication
     ----------------------------------------------*/
    //$http.post('/api/authenticate', { username: username, password: password })
    //    .success(function (response) {
    //        callback(response);
    //    });
  }

  SetCredentials(username, password) {
    var authdata = btoa(username + ':' + password);

    this.globals = {
      currentUser: {
        username: username,
        authdata: authdata,
      },
    };

    // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
    var cookieExp = moment();
    cookieExp.add(7, 'd');
    this.cookieService.set('globals', JSON.stringify(this.globals), cookieExp.toDate());

    this.loginSubject.next(true);
  }

  ClearCredentials() {
    this.globals = {};
    this.cookieService.delete('globals');
    this.loginSubject.next(false);
  }
}
