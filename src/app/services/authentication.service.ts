import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  globals: {};
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

    // set default auth header for http requests

    // $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

    // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
    var cookieExp = moment();
    cookieExp.add(7, 'd');
    this.cookieService.set('globals', JSON.stringify(this.globals), cookieExp.toDate());
  }

  ClearCredentials() {
    this.globals = {};
    this.cookieService.delete('globals');
    // $http.defaults.headers.common.Authorization = 'Basic';
  }
}
