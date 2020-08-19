import { Component, OnInit, Input } from '@angular/core';
import { StarshipModel } from './starship.model';

@Component({
  selector: 'app-starship',
  templateUrl: './starship.component.html',
  styleUrls: ['./starship.component.scss']
})
export class StarshipComponent implements OnInit {
  @Input() starship: StarshipModel;

  constructor() { }

  ngOnInit(): void {
  }

}
