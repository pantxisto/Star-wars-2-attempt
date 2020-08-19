export class StarshipModel {
  MGLT: number;
  cargo_capacity: number;
  consumables: string;
  cost_in_credits: number;
  created: string;
  crew: number;
  edited: string;
  films: string[];
  hyperdrive_rating: string;
  length: number;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: number;
  pilots: String[];
  starship_class: string;
  url: string;
  shipId: number;
  constructor(
    MGLT,
    cargo_capacity,
    consumables,
    cost_in_credits,
    created,
    crew,
    edited,
    films,
    hyperdrive_rating,
    length,
    manufacturer,
    model,
    name,
    passengers,
    pilots,
    starship_class,
    url
  ) {
    this.MGLT = parseInt(MGLT, 10);
    this.cargo_capacity = parseInt(cargo_capacity, 10);
    this.consumables = consumables;
    this.cost_in_credits = parseInt(cost_in_credits, 10);
    this.created = created;
    this.crew = parseInt(crew, 10);
    this.edited = edited;
    this.films = films;
    this.hyperdrive_rating = hyperdrive_rating;
    this.length = parseInt(length, 10);
    this.manufacturer = manufacturer;
    this.model = model;
    this.name = name;
    this.passengers = parseInt(passengers, 10);
    this.pilots = pilots;
    this.starship_class = starship_class;
    this.url = url;
    this.shipId = parseInt(
      url
        .split('/')
        .filter(function (item) {
          return item !== '';
        })
        .slice(-1)[0],
      10
    );
  }
}
