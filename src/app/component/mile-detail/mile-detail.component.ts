import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mile } from '../../type/mile';

@Component({
  selector: 'app-mile-detail',
  templateUrl: './mile-detail.component.html',
  styleUrls: ['./mile-detail.component.sass']
})

export class MileDetailComponent implements OnInit {

  public visibleMilesList:        Array<Mile>;
  public visibleMilesLeaflet:     Array<Mile>;
  public routedMile:              number;

  private _trail: object;

  private _mapLineSegmentPadding = 1;
  private _milesBehindExtra: number = 0;
  private _milesAheadExtra: number = 0;
  private _milesBehind: number = 2;
  private _milesAhead: number = 1;

  constructor(
    private _route:               ActivatedRoute,
  ) {}

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    // get miles data based on route id
    this.routedMile = Number(this._route.snapshot.paramMap.get('id'));

    this._route.data.subscribe(result => {

      // extra line segments to show, at start/end, since leaflet works with fixed zoom levels
      // fitting map to markers/line segments using bounds isn't precise

        this._trail = result.data['trail'];
        this._isolateVisibleMiles();
      }
    );

    const _self = this;

    setInterval(function() {
      _self.loadAhead();
    }, 5000)
  }

  private _isolateVisibleMiles(): void {

    this.visibleMilesList = this._getMilesSegmentData(this._trail, this._milesBehind + this._milesAheadExtra, this._milesAhead + this._milesAheadExtra);
    this.visibleMilesLeaflet = this._getMilesSegmentData(this._trail, (this._milesBehind + this._milesAheadExtra + this._mapLineSegmentPadding), (this._milesAhead + this._milesAheadExtra + this._mapLineSegmentPadding));
  }

  // OTHER
  // the mile (line) segments data to show using leaflet
  // there's some overlap so you can look ahead/behind.
  private _getMilesSegmentData(data: any, milesBehind: number, milesAhead: number): Array<Mile> {

    const _startIndex: number = (this.routedMile >= milesBehind) ? this.routedMile - milesBehind : 0;
    const _endIndex: number = (this.routedMile + milesAhead <= data.miles.length) ? this.routedMile + milesAhead : data.miles.length;

    return data.miles.slice(_startIndex, _endIndex);
  }

  public loadAhead(): void {
    this._milesAheadExtra += 3;
    this._isolateVisibleMiles();
  }

  public loadBehind(): void {
    this._milesBehindExtra += 3;
    this._isolateVisibleMiles();
  }
}
