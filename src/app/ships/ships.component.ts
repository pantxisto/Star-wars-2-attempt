import { Component, OnInit, OnDestroy } from '@angular/core';
import { StarshipModel } from './starships-list/starship/starship.model';
import { ShipsService } from './services/ships.service';
import { catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
  error: boolean;
  starships: StarshipModel[];
  lastResponse: {};
  constructor(private shipsService: ShipsService) {}

  ngOnInit(): void {
    this.error;
    this.starships = [];
    this.lastResponse = {};
    this.shipsService
      .GetStarships(null)
      .pipe(catchError((error) => of({ error: true, message: error })))
      .subscribe((response) => {
        if (response['error']) {
          this.error = true;
        } else {
          this.starships = this.starships.concat(
            this.createStarshipsModelArray(response)
          );
          this.lastResponse = response;
        }
      });
  }

  fetchNext(message: string) {
    if (message === 'FetchNext') {
      var url = this.lastResponse ? this.lastResponse['next'] : null;
      this.shipsService
        .GetStarships(url)
        .pipe(catchError((error) => of({ error: true, message: error })))
        .subscribe((response) => {
          if (response['error']) {
            this.error = true;
          } else {
            this.starships = this.starships.concat(
              this.createStarshipsModelArray(response)
            );
            this.lastResponse = response;
          }
        });
    }
  }

  createStarshipsModelArray(data) {
    const responseArray: StarshipModel[] = [];
    data.results.forEach((result) => {
      responseArray.push(
        new StarshipModel(
          result.MGLT,
          result.cargo_capacity,
          result.consumables,
          result.cost_in_credits,
          result.created,
          result.crew,
          result.edited,
          result.films,
          result.hyperdrive_rating,
          result.length,
          result.manufacturer,
          result.model,
          result.name,
          result.passengers,
          result.pilots,
          result.starship_class,
          result.url
        )
      );
    });
    return responseArray;
  }
}
