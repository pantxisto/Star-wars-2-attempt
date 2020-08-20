import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarshipModel } from '../starships-list/starship/starship.model';

@Component({
  selector: 'app-ship-card',
  templateUrl: './ship-card.component.html',
  styleUrls: ['./ship-card.component.scss'],
})
export class ShipCardComponent implements OnInit {
  id: number;
  starship: StarshipModel;
  error: boolean;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.error = false;
    const response = this.route.snapshot.data.ship;
    if (response) {
      this.starship = this.route.snapshot.data.ship;
    } else {
      this.error = true;
    }
    // this.route.params.subscribe((params: Params) => {
    //   console.log(params['id'])
    // });
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

  goBack() {
    this.router.navigate(['/ships']);
  }
}
