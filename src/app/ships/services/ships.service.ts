import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarshipModel } from '../starships-list/starship/starship.model';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ShipsService {
  constructor(private http: HttpClient) {}
  lastResponse = {
    results: [],
  };
  getShip(id: number) {
    return { ...this.lastResponse.results.find((ship) => ship.shipId === id) };
  }

  getLastResponse() {
    return { ...this.lastResponse };
  }

  getJSON() {
    return this.http.get<{
      count: number;
      next: string;
      previous: string;
      results: StarshipModel[];
    }>('../../../assets/starships.example.json');
  }

  GetStarships(url: string) {
    if (!url) {
      url = 'https://swapi.dev/api/starships/';
    }
    return this.http
      .get<{
        count: number;
        next: string;
        previous: string;
        results: StarshipModel[];
      }>(url)
      .pipe(
        map((val) => {
          return {
            ...val,
            results: this.lastResponse.results.concat(
              this.createStarshipsModelArray(val)
            ),
            next: val.next?.replace('http:', 'https:'),
            previous: val.previous?.replace('http:', 'https:'),
          };
        }),
        tap((val) => {
          this.lastResponse = { ...val };
          return val;
        }),
      );
  }

  GetStarship(id: number) {
    const url = `https://swapi.dev/api/starships/${id}/`;
    return this.http.get<StarshipModel>(url).pipe(
      map((val) => {
        return this.createStarShipModel(val);
      })
    );
  }

  createStarShipModel(data) {
    const response = new StarshipModel(
      data.MGLT,
      data.cargo_capacity,
      data.consumables,
      data.cost_in_credits,
      data.created,
      data.crew,
      data.edited,
      data.films,
      data.hyperdrive_rating,
      data.length,
      data.manufacturer,
      data.model,
      data.name,
      data.passengers,
      data.pilots,
      data.starship_class,
      data.url
    );
    return response;
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
