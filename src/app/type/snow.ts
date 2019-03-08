export class Snow {
  trailId: number;
  version: string;
  abbr: string;
  direction: number;
  snowMiles: Array<Array<Snowpoint>>;
}

export class Snowpoint {
  elevation?:       number;           // optional elevation
  distance?:        number;           // percentage within mile (so it won't have to be recalculated)
}
