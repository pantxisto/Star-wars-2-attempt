import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { StarshipModel } from './starships-list/starship/starship.model';
import { Observable, of, EMPTY } from 'rxjs';
import { ShipsService } from './services/ships.service';
import * as moment from 'moment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class ShipsResolver implements Resolve<StarshipModel> {
  constructor(
    private ShipsService: ShipsService,
    private AuthenticationService: AuthenticationService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    if (state.url === '/ships') {
      if (this.ShipsService.lastResponse.results.length > 0) {
        return of(this.ShipsService.getLastResponse());
      } else {
        const requestId =
          'https://swapi.dev/api/starships/' +
          JSON.stringify(this.AuthenticationService.globals['currentUser']);
        const storedRequest = localStorage.getItem(requestId);
        const expirationDate = storedRequest
          ? moment(storedRequest).add(5, 'minutes')
          : null;
        if (expirationDate?.isBefore(moment()) || !storedRequest) {
          return this.ShipsService.GetStarships(null);
        } else {
          return of(undefined);
        }
      }
    } else {
      if (this.ShipsService.lastResponse.results.length > 0) {
        return of(this.ShipsService.getShip(+route.params['id']));
      } else {
        const requestId =
          `https://swapi.dev/api/starships/${+route.params['id']}/` +
          JSON.stringify(this.AuthenticationService.globals['currentUser']);
        const storedRequest = localStorage.getItem(requestId);
        const expirationDate = storedRequest
          ? moment(storedRequest).add(5, 'minutes')
          : null;
        if (expirationDate?.isBefore(moment()) || !storedRequest) {
          return this.ShipsService.GetStarship(+route.params['id']);
        } else {
          return of(undefined);
        }
      }
    }
  }
}
