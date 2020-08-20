import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import * as moment from 'moment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ShipsInterceptor implements HttpInterceptor {
  constructor(
    private AuthenticationService: AuthenticationService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const requestId =
      request.url + JSON.stringify(this.AuthenticationService.globals['currentUser']);
    const storedRequest = localStorage.getItem(requestId);
    const expirationDate = storedRequest
      ? moment(storedRequest).add(5, 'minutes')
      : null;
    if (expirationDate?.isBefore(moment()) || !storedRequest) {
      localStorage.setItem(requestId, moment().toDate().toISOString());
      const modifiedReq = request.clone({
        headers: request.headers.set('Authorization', 'none'),
      });
      return next.handle(modifiedReq);
    }
    return EMPTY;
  }
}
