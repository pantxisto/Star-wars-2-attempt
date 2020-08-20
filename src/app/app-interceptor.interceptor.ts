import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import * as moment from 'moment';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private AuthenticationService: AuthenticationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let modifiedReq;
    const requestId =
      request.url + JSON.stringify(this.AuthenticationService.globals['currentUser']);
    const storedRequest = localStorage.getItem(requestId);
    const expirationDate = storedRequest
      ? moment(storedRequest).add(5, 'minutes')
      : null;
    if (expirationDate?.isBefore(moment()) || !storedRequest) {
      localStorage.setItem(requestId, moment().toDate().toISOString());
      if (!this.AuthenticationService.globals['currentUser']) {
        modifiedReq = request.clone({
          headers: request.headers.set(
            'Authorization',
            'Basic ' + this.AuthenticationService.globals['currentUser']['authdata']
          ),
        });
      } else {
        modifiedReq = request.clone({
          headers: request.headers.set('Authorization', 'Basic'),
        });
      }
      return next.handle(modifiedReq);
    } else {
      return EMPTY;
    }
  }
}
