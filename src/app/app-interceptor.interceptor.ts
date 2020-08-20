import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let modifiedReq;
    const globalCookie = this.cookieService.get('globals');
    const parsedGlobalCookie = globalCookie ? JSON.parse(globalCookie) : {};
    const requestId = request.url + JSON.stringify(parsedGlobalCookie['currentUser']);
    const storedRequest = localStorage.getItem(requestId);
    const expirationDate = storedRequest
      ? moment(storedRequest).add(5, 'minutes')
      : null;
    if (expirationDate?.isBefore(moment()) || !storedRequest) {
      localStorage.setItem(
        requestId,
        moment().toDate().toISOString()
      );
      if (!parsedGlobalCookie['currentUser']) {
        modifiedReq = request.clone({
          headers: request.headers.set(
            'Authorization',
            'Basic ' + parsedGlobalCookie['currentUser']['authdata']
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
