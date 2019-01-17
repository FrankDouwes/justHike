import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {LoaderService} from '../../service/loader.service';

@Component({
  selector: 'loader-overlay',
  templateUrl: './loader-overlay.component.html',
  styleUrls: ['./loader-overlay.component.sass']
})

export class LoaderOverlayComponent implements OnInit {

  @Input() showLoader: boolean;

  public state: string = 'show';

  // simple loader animation component, uses the loader service
  constructor() {}

  ngOnInit() {}

  // only gets triggered through @Input showLoader
  ngOnChanges(changes: SimpleChanges) {
    this.state = (this.showLoader) ? 'show' : 'hide';
  }
}
