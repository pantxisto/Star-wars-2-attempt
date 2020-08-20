import { Component, OnInit, Input } from '@angular/core';
import { StarshipModel } from './starship.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss'],
})
export class StarshipComponent implements OnInit {
  @Input() starship: StarshipModel;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  navigateToCard(id: number) {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}
