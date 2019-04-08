import { Component, OnInit } from '@angular/core';
import { Settings } from '../../settings';

@Component({
  selector: 'fa-sampler',
  templateUrl: './fa-sampler.component.html',
  styleUrls: ['./fa-sampler.component.sass']
})

// create a Font awesome icon for each poi type (and hide it), as rendering font awesome as graphic within an SVG gets messy
// give the svg element the correct id so it can be sampled/cloned by svgjs (through _utils/marker.ts)
export class FaSamplerComponent implements OnInit {

  public data: object = Settings.POITYPES;

  constructor() {}

  ngOnInit(): void {}
}
