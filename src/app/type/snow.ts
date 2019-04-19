export class Snow {
  trailId:        number;
  version:        string;
  abbr:           string;
  direction:      number;
  snowMiles:      Array<Array<Snowpoint>>;
}

export class Snowpoint {

  public elevation?:       number;           // optional elevation
  public distance?:        number;           // percentage within mile (so it won't have to be recalculated)

  constructor(elevation: number, distance: number) {
    this.elevation = elevation;
    this.distance = distance;
  }
}
