import { Component, OnInit } from '@angular/core';
import { Settings } from '../../settings';

@Component({
  selector: 'fa-sampler',
  templateUrl: './fa-sampler.component.html',
  styleUrls: ['./fa-sampler.component.sass']
})

export class FaSamplerComponent implements OnInit {

  // create a Font awesome icon for each poi type and hide it)
  // give the svg element the correct id so it can be sampled/cloned by svgjs (through _utils/marker.ts)

  public data: object = Settings.POITYPES;

  constructor() {}

  ngOnInit(): void {}
}
