import {Component, Input, OnInit, OnChanges, ElementRef, SimpleChanges, Output, EventEmitter, ViewChild} from '@angular/core';
import {toMile} from '../../../_geo/geoCalc';
import {Trail} from '../../../type/trail';
import {Settings} from '../../../settings';
import {Waypoint} from '../../../type/waypoint';
import {normalizeElevation} from '../../../_util/math';
declare const SVG: any;    // fixed SVG installation bug

@Component({
  selector: 'scrollbar-component',
  templateUrl: './scrollbar.component.html',
  styleUrls: ['./scrollbar.component.sass']
})
export class ScrollbarComponent implements OnInit {

  @ViewChild('main') main: ElementRef;

  @Input() trailData: Trail;
  @Input() visibleRange: object;
  @Input() resize: object;

  @Output() scrollToEvent: EventEmitter<number> = new EventEmitter<number>();

  private _verticalPadding = 10;
  // private _container: ElementRef;

  // SVG MAP
  private _svgCanvas;
  private _svgWidth: number;
  private _svgHeight: number;

  // VIEWPORT
  public viewportSize = 0;
  public viewportOffset = 0;

  constructor(_element: ElementRef) {
    // this._container = _element;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this._svgWidth =  Math.ceil(this.main.nativeElement.clientWidth);
    this._svgHeight =  Math.ceil(this.main.nativeElement.clientHeight);

    this._svgCanvas = SVG('scroll-map')
      .size(this._svgWidth, this._svgHeight)
      .viewbox(0, 0, this._svgWidth, this._svgHeight);

    this.drawMap();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.visibleRange && changes.visibleRange.currentValue) {
      this.visibleRange = changes.visibleRange;
      this.viewportSize = (( this.visibleRange['currentValue']['visibleRange'].end -  this.visibleRange['currentValue']['visibleRange'].start) / this.trailData.miles.length) * 100;
      this.viewportOffset = (this.visibleRange['currentValue']['scrollX'] / (this.trailData.miles.length * ((this.main.nativeElement.clientWidth) / 4.5))) * 100;

    } else if (changes.resize) {

      this._svgWidth = Math.ceil(this.main.nativeElement.clientWidth);
      this._svgHeight = Math.ceil(this.main.nativeElement.clientHeight);

      // update svg size
      if (this._svgCanvas) {
        const svg = window.document.getElementById(this._svgCanvas.node.id);
        if (svg) {
          svg.setAttribute('viewBox', '0 0 ' + this._svgWidth + ' ' + this._svgHeight + '');
          svg.setAttribute('width', this._svgWidth + '');
          svg.setAttribute('height', this._svgHeight + '');
        }
      }

      if (this.visibleRange) {
        this.drawMap();
      }
    }
  }

  drawMap() {

    const min: number = Number(this.trailData.elevationRange.low) / Settings.FOOT;
    const max: number = Number(this.trailData.elevationRange.high) / Settings.FOOT;
    let elevation: number;

    const drawPoints: Array<any> = new Array<Array<number>>();

    let counter = 0;

    const range = (max - min);

    const l = (this._svgWidth / this.trailData.waypoints.length);

    // start points
    drawPoints.push([0, max]);
    elevation = this.invertValue(normalizeElevation(this._svgHeight - (this._verticalPadding * 2), this.trailData['waypoints'][0]['elevation'], min, range, this._verticalPadding));

    drawPoints.push([0, elevation]);

    let prevPoint: object;
    let totalDistancePerc = 0;

    for (const waypoint of this.trailData.waypoints) {

      // calculate distance, starting at 2nd point
      if (counter > 0) {

        const waypointDistPerc: number = geolib.getDistance(prevPoint as Waypoint, waypoint as Waypoint, 6, 6) / this.trailData['calcLength'];

        totalDistancePerc += toMile(waypointDistPerc);
      }

      elevation = this.invertValue(normalizeElevation(this._svgHeight - (this._verticalPadding * 2), waypoint.elevation, min, range, this._verticalPadding));

      drawPoints.push([this._svgWidth * totalDistancePerc, elevation]);
      counter += l;
      prevPoint = waypoint;
    }

    // fill til end, back down to 0
    drawPoints.push([this._svgWidth, elevation]);
    drawPoints.push([this._svgWidth, max]);

    if (this._svgCanvas) {
      this._svgCanvas.clear();
    }

    const polyline = this._svgCanvas.polyline(drawPoints).fill('#C3C3C3');
  }

  // svg draws from lop to bottom
  invertValue(input) {
    return Math.abs(input - 1) + this._verticalPadding;
  }

  onClick(event: MouseEvent): void {
    const percent = event.clientX / this.main.nativeElement.clientWidth;
    this.scrollToEvent.emit(percent);
  }

}
