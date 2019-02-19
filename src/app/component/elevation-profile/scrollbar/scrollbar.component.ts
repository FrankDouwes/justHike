import {
  Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  SimpleChanges,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit, ChangeDetectionStrategy
} from '@angular/core';
import {Trail} from '../../../type/trail';
import {Waypoint} from '../../../type/waypoint';
import {normalizeElevation} from '../../../_util/math';
import {environment} from '../../../../environments/environment.prod';
import * as Hammer from 'hammerjs/hammer.min';
declare const SVG: any;    // fixed SVG installation bug

@Component({
  selector: 'scrollbar-component',
  templateUrl: './scrollbar.component.html',
  styleUrls: ['./scrollbar.component.sass'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollbarComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('main') main: ElementRef;
  @ViewChild('viewport') viewport: ElementRef;

  @Input() trailData:       Trail;
  @Input() visibleRange:    object;
  @Input() resize:          object;

  @Output() scrollToEvent: EventEmitter<number> = new EventEmitter<number>();

  public viewportSize = 0;
  public viewportOffset = 0;
  public mapOffset: number;

  private _verticalPadding: number = 8;
  private _svgCanvas;
  private _svgWidth:        number;
  private _svgHeight:       number;
  private _segments:        number;
  private _sectionLength = 100;       // miles per scroll map section


  constructor() {}




  // LIFECYCLE HOOKS

  ngOnInit(): void {

    var sliderManager = new Hammer.Manager(this.main.nativeElement);
    sliderManager.add(new Hammer.Pan({threshold: 0, pointers: 0, direction: Hammer.DIRECTION_HORIZONTAL}));
    sliderManager.on('pan', this._onSlide.bind(this));
  }

  ngAfterViewInit(): void {

    // show 100 miles
    this._segments = (Math.ceil(this.trailData.length) / this._sectionLength < 1) ? 1 : Math.ceil(this.trailData.length) / this._sectionLength;

    this._svgWidth =  this._segments * this.main.nativeElement.clientWidth;
    this._svgHeight =  this.main.nativeElement.clientHeight;

    this._svgCanvas = SVG('scroll-map')
      .size(this._svgWidth, this._svgHeight)
      .viewbox(0, 0, this._svgWidth, this._svgHeight);

    this._drawMap();
    //this._drawGuides();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.visibleRange && changes.visibleRange.currentValue) {

      this.visibleRange = changes.visibleRange;
      const _start: number = this.visibleRange['currentValue']['visibleRange'].start;
      const _end: number = this.visibleRange['currentValue']['visibleRange'].end;
      const _range: number = _end - _start;
      const _scrollX: number = this.visibleRange['currentValue']['scrollX'];

      // map
      const _maxOffset = this._svgWidth - this.main.nativeElement.clientWidth;
      const _mileWidth = this.main.nativeElement.clientWidth / 4.5;
      const _scrollXPerc = (_scrollX / _mileWidth) / this.trailData.miles.length;
      this.mapOffset = (_scrollXPerc * _maxOffset);

      // viewport
      const _viewPortWidthPerc = _range / this._sectionLength;
      const _viewPortWidth = _viewPortWidthPerc * this.main.nativeElement.clientWidth;

      // todo: not sure why this is...
      let _maxViewPortOffset = this.main.nativeElement.clientWidth;
      if (this.trailData.abbr !== 'DEMO') {
        _maxViewPortOffset = this.main.nativeElement.clientWidth - _viewPortWidth;
      }

      this.viewportOffset = (_scrollXPerc * (_maxViewPortOffset + 5));
      this.viewportSize = _viewPortWidth;
    }

    if (changes.resize) {

      this._svgWidth = this._segments * this.main.nativeElement.clientWidth;
      this._svgHeight = this.main.nativeElement.clientHeight;

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
        this._drawMap();
        //this._drawGuides();
      }
    }
  }




  // DRAW

  private _drawMap(): void {

    const min: number = Number(this.trailData.elevationRange.low) / environment.FOOT;
    const max: number = Number(this.trailData.elevationRange.high) / environment.FOOT;
    let elevation: number;

    const drawPoints: Array<any> = [];

    let counter = 0;

    const range = (max - min);

    const l = (this._svgWidth / this.trailData.waypoints.length);

    // start points
    drawPoints.push([0, max]);
    elevation = this._invertValue(normalizeElevation(this._svgHeight - (this._verticalPadding * 2)
      , this.trailData.waypoints[0]['elevation'], min, range, this._verticalPadding));

    drawPoints.push([0, elevation]);

    let prevPoint: object;
    let totalDistancePerc = 0;

    for (var i = 0; i < this.trailData.waypoints.length; i += this.trailData.scrollbarSegmentSize) {

      const waypoint: Waypoint = this.trailData.waypoints[i];

      // calculate distance, starting at 2nd point
      if (counter > 0) {
        totalDistancePerc = (waypoint.distanceTotal / environment.MILE) / this.trailData.length;
      }

      elevation = this._invertValue(normalizeElevation(this._svgHeight - (this._verticalPadding * 2)
        , waypoint.elevation, min, range, this._verticalPadding));

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

  private _drawGuides(): void {

    for (let i = 1; i < Math.ceil(this._segments); i++) {
      const line = this._svgCanvas.line(this.main.nativeElement.clientWidth * i, 0, this.main.nativeElement.clientWidth * i, this._svgHeight).stroke({ width: 1, color: '#AAA', opacity: '0.85', dasharray: '2, 2'});
    }

  }

  // svg draws from lop to bottom
  private _invertValue(input): number {
    return Math.abs(input - 1) + this._verticalPadding;
  }



  // EVENT HANDLERS

  public onClick(event: MouseEvent): void {
    const percent = (event.clientX + this.mapOffset) / this._svgWidth;
    this.scrollToEvent.emit(percent);
  }

  // fast scrolling
  private _onSlide(event): void {
    const percent = event.srcEvent.x / this.main.nativeElement.clientWidth;
    this.scrollToEvent.emit(percent);
  }

}
