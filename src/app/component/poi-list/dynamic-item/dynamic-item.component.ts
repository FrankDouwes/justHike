import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  Input,
  ComponentRef,
  ComponentFactoryResolver,
  OnChanges,
  SimpleChanges,
  HostBinding, ChangeDetectorRef, Type
} from '@angular/core';
import { PoiListItemComponent } from '../poi-list-item/poi-list-item.component';
import { PoiUserItemComponent } from '../poi-user-item/poi-user-item.component';

@Component({
  selector: 'poi-dynamic-item',
  templateUrl: './dynamic-item.component.html',
  styleUrls: ['./dynamic-item.component.sass']
})

/* renders dynamic list item types based on type
use multiple components as list items in a CDK virtual scroll
if type === user, use user-item, else use poi-item */
export class DynamicItemComponent implements OnInit, OnDestroy, OnChanges {

  @HostBinding('class.offtrail') isHidden = false;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input() data: object;
  @Input() status: string = 'idle';
  @Input() timestamp: number;

  private _componentRef: ComponentRef<{}>;
  private _instance: any;             // the dynamic list item instance (user or poi)

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this._setup();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this._instance) {
      return;
    }

    if (changes.data) {

      if (changes.data.currentValue.type !== this._instance.data.type) {

        this.isHidden = (this.data['type'].includes('offtrail'));
        this._changeDetector.markForCheck();

        // item type mismatch, render new instance of correct item
        if (this._instance instanceof PoiListItemComponent && this.data['type'] === 'user'
          || this._instance instanceof PoiUserItemComponent && this.data['type'] !== 'user') {
          this.ngOnDestroy();
          this._setup();
          return;
        }
      }
    }

    if (changes.status) {
      this._instance.status = changes.status.currentValue;
    }

    if (changes.data) {
      this._instance.data = changes.data.currentValue;
      if (this._instance.setupIcons) {
        this._instance.setupIcons();
      }
    }

    this._instance.timeStamp = new Date().getTime();
  }

  ngOnDestroy(): void {
    if (this._componentRef) {
      this._componentRef.destroy();
      this._componentRef = null;
    }
  }

  private _setup(): void {

    const componentType: any = (this.data['type'] === 'user') ? PoiUserItemComponent : PoiListItemComponent;

    this.isHidden = (this.data['type'] === 'offtrail');

    const factory = this._componentFactoryResolver.resolveComponentFactory(componentType);

    this._componentRef = this.container.createComponent(factory);

    // set dynamic component data
    this._instance = <any> this._componentRef.instance;

    // inject data
    this._instance.data = this.data;
    this._instance.status = this.status;
    this._instance.timeStamp = new Date().getTime();
    this._changeDetector.markForCheck();
  }

}
