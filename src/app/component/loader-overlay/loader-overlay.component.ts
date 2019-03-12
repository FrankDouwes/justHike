import {Component, Input, OnInit, OnChanges, SimpleChanges, isDevMode, ChangeDetectorRef} from '@angular/core';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'loader-overlay',
  templateUrl: './loader-overlay.component.html',
  styleUrls: ['./loader-overlay.component.sass']
})

export class LoaderOverlayComponent implements OnInit, OnChanges {

  @Input() showLoader: boolean;

  public state = 'show';
  public spinner: boolean;
  public message: number;
  public button: object;

  public activeMetaObjects: Array<string> = [];

  // simple loader animation component, uses the loader service
  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _loaderService: LoaderService
  ) {}

  ngOnInit(): void {

    this._loaderService.observe.subscribe((obj: object) => {

      if (isDevMode()) {
        console.log(obj['action'], obj['type'], obj['data']);
      }

      if (obj['action'] === 'show' && obj['type'] !== 'self') {

        if (obj['type'] === 'spinner') {
          this.spinner = true;
        } else {
          this[obj['type']] = obj['data'] as String;
        }

      } else if (obj['action'] === 'hide' && obj['type'] !== 'self') {

         if (obj['type'] === 'spinner') {
            this.spinner = false;
         } else {
           this[obj['type']] = null;
         }
      }

      this._changeDetector.detectChanges();

    });
  }

  // only gets triggered through @Input showLoader
  ngOnChanges(changes: SimpleChanges): void {
    this.state = (this.showLoader) ? 'show' : 'hide';
  }
}
