import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, Input, ComponentRef, ComponentFactoryResolver, OnChanges, SimpleChanges } from '@angular/core';
import { PoiListItemComponent } from '../poi-list-item/poi-list-item.component';
import { PoiUserItemComponent } from '../poi-user-item/poi-user-item.component';

@Component({
  selector: 'poi-dynamic-item',
  templateUrl: './dynamic-item.component.html',
  styleUrls: ['./dynamic-item.component.sass']
})
export class DynamicItemComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input() data: object;
  @Input() status: string = "idle";
  @Input() timestamp: number;

  private _componentRef: ComponentRef<{}>;
  private _instance: any;             // the dynamic list item instance (user or poi)

  // use multiple components as list items in a CDK virtual scroll
  // if type === user, use user-item, else use poi-item

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {

    const componentType: any = (this.data['type'] === 'user') ? PoiUserItemComponent : PoiListItemComponent;

    const factory = this._componentFactoryResolver.resolveComponentFactory(componentType);
    this._componentRef = this.container.createComponent(factory);

    // set dynamic component data
    this._instance = <any> this._componentRef.instance;

    // inject data
    this._instance.data = this.data;
    this._instance.status = this.status;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this._instance) {
      return;
    }

    if (changes.status) {
      this._instance.status = changes.status.currentValue;
    }

    if (changes.timestamp) {
      console.log('stamp changed');
    }

    if (changes.data) {
      this._instance.data = changes.data.currentValue;
    }
  }

  ngOnDestroy(): void {
    if (this._componentRef) {
      this._componentRef.destroy();
      this._componentRef = null;
    }
  }

}
