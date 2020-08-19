import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StarshipModel } from '../starships-list/starship/starship.model';

@Injectable()
export class ShipsService {
  constructor(private http: HttpClient) {}

  getJSON() {
    return this.http.get<{
      count: number;
      next: string;
      previous: number;
      results: StarshipModel[];
    }>('../../../assets/starships.example.json');
  }

  GetStarships(url: string) {
    if (!url) {
      url = 'https://swapi.dev/api/starships/';
    } else {
      // Cors problem if http
      url = url.replace('http', 'https')
    }
    return this.http.get<{
      count: number;
      next: string;
      previous: number;
      results: StarshipModel[];
    }>(url);
  }
}
