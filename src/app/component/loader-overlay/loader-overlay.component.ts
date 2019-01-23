import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'loader-overlay',
  templateUrl: './loader-overlay.component.html',
  styleUrls: ['./loader-overlay.component.sass']
})

export class LoaderOverlayComponent implements OnInit, OnChanges {

  @Input() showLoader: boolean;

  public state: string = 'show';

  // simple loader animation component, uses the loader service
  constructor() {}

  ngOnInit(): void {}

  // only gets triggered through @Input showLoader
  ngOnChanges(changes: SimpleChanges): void {
    this.state = (this.showLoader) ? 'show' : 'hide';
  }
}
