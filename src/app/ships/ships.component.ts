import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StarshipModel } from './starships-list/starship/starship.model';
import { ShipsService } from './services/ships.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss'],
})
export class ShipsComponent implements OnInit {
  error: boolean;
  starships: StarshipModel[];
  lastResponse: {};
  disableButton: boolean;
  fetching: boolean;
  constructor(
    private shipsService: ShipsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.error;
    this.starships = [];
    this.lastResponse = {};
    this.disableButton = false;
    this.fetching = false;
    const response = this.route.snapshot.data.response;
    if (response) {
      this.lastResponse = this.route.snapshot.data.response;
      this.starships = this.lastResponse['results'];
      if (!this.lastResponse['next']) {
        this.disableButton = true;
      }
    } else {
      this.error = true;
      this.disableButton = true;
    }
  }

  fetchNext(message: string) {
    if (message === 'FetchNext' && !this.fetching) {
      this.fetching = true;
      var url = this.lastResponse ? this.lastResponse['next'] : null;
      this.shipsService.GetStarships(url).subscribe((response) => {
        this.lastResponse = response;
        this.starships = this.lastResponse['results'];
        if (!response.next) {
          this.disableButton = true;
        }
        this.fetching = false;
      });
    }
  }
}
