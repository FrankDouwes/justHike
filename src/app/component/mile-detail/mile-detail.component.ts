import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Mile} from '../../type/mile';

@Component({
  selector: 'app-mile-detail',
  templateUrl: './mile-detail.component.html',
  styleUrls: ['./mile-detail.component.sass']
})

export class MileDetailComponent implements OnInit {

  public visibleMiles: Array<Mile>;
  public routedMile: number;

  constructor(
    private _route: ActivatedRoute,
  ) {}

  ngOnInit() {

    // get miles data based on route id
    this.routedMile = Number(this._route.snapshot.paramMap.get('id'));

    this._route.data
      .subscribe(result => {

        const _milesBehind = 2;
        const _milesAhead = 1;

        const _startIndex: number = (this.routedMile >= _milesBehind) ? this.routedMile - _milesBehind : 0;
        const _endIndex: number = (this.routedMile <= result.trailData.miles.length) ? this.routedMile + _milesAhead : result.trailData.miles.length;

        this.visibleMiles = result.trailData.miles.slice(_startIndex, _endIndex);
        console.log(this.visibleMiles);
      });
  }
}


