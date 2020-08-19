import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class ShipsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const storedRequest = localStorage.getItem(request.url);
    const expirationDate = storedRequest
      ? moment(storedRequest).add(5, 'minutes')
      : null;
    if (expirationDate?.isBefore(moment()) || !storedRequest) {
      localStorage.setItem(request.url, moment().toDate().toISOString());
      const modifiedReq = request.clone({
        headers: request.headers.set('Authorization', 'none'),
      });
      return next.handle(modifiedReq);
    }
  }
}
