import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StarshipModel } from './starship/starship.model';

@Component({
  selector: 'app-starships-list',
  templateUrl: './starships-list.component.html',
  styleUrls: ['./starships-list.component.scss'],
})
export class StarshipsListComponent implements OnInit {
  @Input() starships: StarshipModel[];
  @Output() fetchNext = new EventEmitter<string>();;
  constructor() {}

  ngOnInit(): void {
    this.starships = [];
  }

  fetchNextPage() {
    this.fetchNext.emit('FetchNext');
  }
}
