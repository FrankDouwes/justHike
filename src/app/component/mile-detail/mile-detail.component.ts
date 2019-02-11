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

  constructor(
    private _route:               ActivatedRoute,
  ) {}

  // LIFECYCLE HOOKS

  ngOnInit(): void {

    // get miles data based on route id
    this.routedMile = Number(this._route.snapshot.paramMap.get('id'));

    this._route.data.subscribe(result => {
        const _milesBehind = 2;
        const _milesAhead = 1;

        // extra line segments to show, at start/end, since leaflet works with fixed zoom levels
        // fitting map to markers/line segments using bounds isn't precise
        const _mapLineSegmentPadding = 1;

        this.visibleMilesList = this.getMilesSegmentData(result.data['trail'], _milesBehind, _milesAhead);
        this.visibleMilesLeaflet = this.getMilesSegmentData(result.data['trail'], (_milesBehind + _mapLineSegmentPadding), (_milesAhead + _mapLineSegmentPadding));
      });
  }

  // OTHER
  // the mile (line) segments data to show using leaflet
  // there's some overlap so you can look ahead/behind.
  private getMilesSegmentData(data: any, milesBehind: number, milesAhead: number): Array<Mile> {

    const _startIndex: number = (this.routedMile >= milesBehind) ? this.routedMile - milesBehind : 0;
    const _endIndex: number = (this.routedMile + milesAhead <= data.miles.length) ? this.routedMile + milesAhead : data.miles.length;

    return data.miles.slice(_startIndex, _endIndex);
  }
}
