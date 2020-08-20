import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { StarshipModel } from './starships-list/starship/starship.model';
import { Observable, of } from 'rxjs';
import { ShipsService } from './services/ships.service';

@Injectable({ providedIn: 'root' })
export class ShipsResolver implements Resolve<StarshipModel> {
  constructor(private ShipsService: ShipsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    if (state.url === '/ships') {
      if (this.ShipsService.lastResponse.results.length > 0) {
        return of(this.ShipsService.getLastResponse());
      } else {
        return this.ShipsService.GetStarships(null);
      }
    } else {
      if (this.ShipsService.lastResponse.results.length > 0) {
        return of(this.ShipsService.getShip(+route.params['id']));
      } else {
        return this.ShipsService.GetStarship(+route.params['id']);
      }
    }
  }
}
